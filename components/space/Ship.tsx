"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { ShipInput } from "@/hooks/useShipControls";
import { STATIONS, type StationId } from "@/lib/stations";
import { useSpace } from "./SpaceContext";

const MAX_SPEED = 14;
const ACCEL = 18;
const DRAG = 2.2;
const YAW_SPEED = 1.6;
const PITCH_SPEED = 1.1;
const CAM_LAG = 4.5;
const FLY_TO_SPEED = 22;

interface ShipProps {
  inputRef: React.MutableRefObject<ShipInput>;
  controlsEnabled: boolean;
}

export function Ship({ inputRef, controlsEnabled }: ShipProps) {
  const group = useRef<THREE.Group>(null);
  const velocity = useRef(new THREE.Vector3());
  const { camera } = useThree();
  const {
    dockedId,
    dock,
    undock,
    flyToId,
    clearFlyTo,
    launched,
    reducedMotion,
  } = useSpace();

  const lastDockCheck = useRef(0);
  const dockCooldown = useRef(0);
  const tmp = useMemo(
    () => ({
      forward: new THREE.Vector3(),
      desiredCam: new THREE.Vector3(),
      lookAt: new THREE.Vector3(),
      target: new THREE.Vector3(),
      toStation: new THREE.Vector3(),
      camOffset: new THREE.Vector3(0, 2.2, 7),
    }),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape" && dockedId) undock();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dockedId, undock]);

  // After lookAt-based dock/fly, resync Euler so WASD yaw/pitch stay stable.
  // Also push the ship out of the dock radius so proximity doesn't re-dock instantly.
  const wasDocked = useRef<StationId | null>(null);
  useEffect(() => {
    if (wasDocked.current && !dockedId && group.current) {
      const prev = STATIONS.find((s) => s.id === wasDocked.current);
      const e = new THREE.Euler().setFromQuaternion(
        group.current.quaternion,
        "YXZ"
      );
      group.current.rotation.set(e.x, e.y, 0);
      if (prev) {
        const away = new THREE.Vector3()
          .subVectors(
            group.current.position,
            new THREE.Vector3(...prev.position)
          )
          .normalize();
        if (away.lengthSq() < 0.001) away.set(0, 0, 1);
        group.current.position.addScaledVector(away, prev.dockRadius + 1.5);
      }
      velocity.current.set(0, 0, 0);
      dockCooldown.current = 1.25;
    }
    wasDocked.current = dockedId;
  }, [dockedId]);

  useEffect(() => {
    if (group.current) {
      group.current.position.set(0, 1, 12);
      group.current.rotation.set(0, Math.PI, 0);
    }
  }, []);

  useFrame((_, dt) => {
    if (!group.current || !launched) return;
    const ship = group.current;
    const clampedDt = Math.min(dt, 0.05);

    if (reducedMotion) {
      ship.position.set(0, 2, 10);
      camera.position.set(0, 8, 22);
      camera.lookAt(0, 0, 0);
      return;
    }

    if (flyToId && !dockedId) {
      const station = STATIONS.find((s) => s.id === flyToId);
      if (station) {
        tmp.target.set(...station.position);
        tmp.toStation.copy(tmp.target).sub(ship.position);
        const dist = tmp.toStation.length();
        if (dist < station.dockRadius * 0.85) {
          clearFlyTo();
          dock(flyToId);
        } else {
          tmp.toStation.normalize();
          ship.position.addScaledVector(
            tmp.toStation,
            Math.min(FLY_TO_SPEED * clampedDt, Math.max(dist - 2.5, 0))
          );
          ship.lookAt(tmp.target);
          tmp.camOffset.set(0, 2.2, 7).applyQuaternion(ship.quaternion);
          tmp.desiredCam.copy(ship.position).add(tmp.camOffset);
          camera.position.lerp(
            tmp.desiredCam,
            1 - Math.exp(-CAM_LAG * clampedDt)
          );
          tmp.lookAt.copy(ship.position);
          camera.lookAt(tmp.lookAt);
          return;
        }
      }
    }

    if (dockedId) {
      const station = STATIONS.find((s) => s.id === dockedId);
      if (station) {
        tmp.target.set(
          station.position[0],
          station.position[1] + 1.5,
          station.position[2] + 4.5
        );
        ship.position.lerp(tmp.target, 1 - Math.exp(-3 * clampedDt));
        ship.lookAt(
          station.position[0],
          station.position[1],
          station.position[2]
        );
        velocity.current.set(0, 0, 0);
        tmp.desiredCam.set(
          station.position[0] + 2,
          station.position[1] + 4,
          station.position[2] + 10
        );
        camera.position.lerp(tmp.desiredCam, 1 - Math.exp(-2.5 * clampedDt));
        camera.lookAt(...station.position);
      }
      return;
    }

    if (controlsEnabled) {
      const input = inputRef.current;
      const thrust =
        input.forward + (Math.abs(input.stickY) > 0.08 ? -input.stickY : 0);
      const yawInput =
        input.yaw + (Math.abs(input.stickX) > 0.08 ? -input.stickX : 0);
      const pitchInput = input.pitch;

      ship.rotation.y += yawInput * YAW_SPEED * clampedDt;
      ship.rotation.x = THREE.MathUtils.clamp(
        ship.rotation.x + pitchInput * PITCH_SPEED * clampedDt,
        -0.75,
        0.75
      );
      ship.rotation.z = THREE.MathUtils.lerp(
        ship.rotation.z,
        yawInput * 0.35,
        1 - Math.exp(-6 * clampedDt)
      );

      // Local forward = -Z (three.js object default face)
      tmp.forward.set(0, 0, -1).applyQuaternion(ship.quaternion);
      velocity.current.addScaledVector(tmp.forward, thrust * ACCEL * clampedDt);
      velocity.current.multiplyScalar(Math.exp(-DRAG * clampedDt));
      if (velocity.current.length() > MAX_SPEED) {
        velocity.current.setLength(MAX_SPEED);
      }
      ship.position.addScaledVector(velocity.current, clampedDt);

      ship.position.x = THREE.MathUtils.clamp(ship.position.x, -45, 45);
      ship.position.y = THREE.MathUtils.clamp(ship.position.y, -20, 25);
      ship.position.z = THREE.MathUtils.clamp(ship.position.z, -45, 45);
    }

    tmp.camOffset.set(0, 2.2, 7).applyQuaternion(ship.quaternion);
    tmp.desiredCam.copy(ship.position).add(tmp.camOffset);
    camera.position.lerp(tmp.desiredCam, 1 - Math.exp(-CAM_LAG * clampedDt));
    tmp.forward.set(0, 0, -1).applyQuaternion(ship.quaternion);
    tmp.lookAt.copy(ship.position).addScaledVector(tmp.forward, 4);
    camera.lookAt(tmp.lookAt);

    if (!controlsEnabled) return;

    if (dockCooldown.current > 0) {
      dockCooldown.current = Math.max(0, dockCooldown.current - clampedDt);
      return;
    }

    lastDockCheck.current += clampedDt;
    if (lastDockCheck.current > 0.15) {
      lastDockCheck.current = 0;
      let nearest: StationId | null = null;
      let nearestDist = Infinity;
      for (const s of STATIONS) {
        const d = ship.position.distanceTo(tmp.target.set(...s.position));
        if (d < s.dockRadius && d < nearestDist) {
          nearestDist = d;
          nearest = s.id;
        }
      }
      if (nearest && velocity.current.length() < 6) {
        dock(nearest);
      }
    }
  });

  return (
    <group ref={group}>
      {/* Nose points local -Z */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.35]}>
        <coneGeometry args={[0.32, 1.5, 7]} />
        <meshStandardMaterial
          color="#e2e8f0"
          metalness={0.7}
          roughness={0.28}
          emissive="#0f766e"
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[0, 0, 0.25]}>
        <boxGeometry args={[0.42, 0.28, 0.7]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[1.65, 0.05, 0.4]} />
        <meshStandardMaterial color="#2dd4bf" metalness={0.45} roughness={0.38} />
      </mesh>
      <mesh position={[0, 0, 0.72]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#5eead4" />
      </mesh>
      <pointLight
        position={[0, 0, 1.05]}
        intensity={0.45}
        color="#5eead4"
        distance={4}
      />
    </group>
  );
}
