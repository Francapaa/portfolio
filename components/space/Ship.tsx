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
const YAW_SPEED = 1.55;
const PITCH_SPEED = 1.05;
const CAM_LAG = 5.2;
const FLY_TO_SPEED = 22;
/** Local-space chase cam: behind (+Z) and above the nose (-Z). */
const CAM_BACK = 9;
const CAM_HEIGHT = 2.6;
const LOOK_AHEAD = 8;

interface ShipProps {
  inputRef: React.MutableRefObject<ShipInput>;
  controlsEnabled: boolean;
}

function ShipMesh() {
  const hull = "#e7e5e4";
  const accent = "#ea580c";
  const dark = "#292524";
  const glass = "#7dd3fc";

  return (
    <group>
      {/* Main fuselage — nose toward local -Z */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.28, 1.35, 6, 16]} />
        <meshStandardMaterial
          color={hull}
          metalness={0.72}
          roughness={0.28}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 0, -0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.28, 0.7, 16]} />
        <meshStandardMaterial
          color={accent}
          metalness={0.55}
          roughness={0.32}
          emissive={accent}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Cockpit canopy */}
      <mesh position={[0, 0.22, -0.25]} rotation={[0.15, 0, 0]}>
        <sphereGeometry args={[0.22, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial
          color={glass}
          metalness={0.2}
          roughness={0.08}
          transparent
          opacity={0.75}
          emissive="#0ea5e9"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Wings */}
      <mesh position={[0, -0.02, 0.15]}>
        <boxGeometry args={[2.1, 0.06, 0.55]} />
        <meshStandardMaterial color={dark} metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.95, 0, 0.05]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.55, 0.04, 0.85]} />
        <meshStandardMaterial color={accent} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[-0.95, 0, 0.05]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.55, 0.04, 0.85]} />
        <meshStandardMaterial color={accent} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Vertical stabilizer */}
      <mesh position={[0, 0.28, 0.55]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.05, 0.45, 0.4]} />
        <meshStandardMaterial color={dark} metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.42, 0.48]}>
        <boxGeometry args={[0.05, 0.08, 0.22]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.4}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Engine nacelles */}
      <mesh position={[0.22, -0.08, 0.72]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.14, 0.35, 12]} />
        <meshStandardMaterial color={dark} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.22, -0.08, 0.72]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.14, 0.35, 12]} />
        <meshStandardMaterial color={dark} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Engine glow */}
      <mesh position={[0.22, -0.08, 0.95]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#fdba74" />
      </mesh>
      <mesh position={[-0.22, -0.08, 0.95]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#fdba74" />
      </mesh>
      <pointLight
        position={[0, -0.05, 1.15]}
        intensity={1.1}
        color="#f97316"
        distance={7}
      />
    </group>
  );
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
      up: new THREE.Vector3(),
      desiredCam: new THREE.Vector3(),
      lookAt: new THREE.Vector3(),
      target: new THREE.Vector3(),
      toStation: new THREE.Vector3(),
      camOffset: new THREE.Vector3(),
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
        group.current.position.addScaledVector(away, prev.dockRadius + 1.8);
      }
      velocity.current.set(0, 0, 0);
      dockCooldown.current = 1.25;
    }
    wasDocked.current = dockedId;
  }, [dockedId]);

  useEffect(() => {
    if (group.current) {
      // Face home at origin: default -Z forward
      group.current.position.set(0, 1.2, 14);
      group.current.rotation.set(0, 0, 0);
    }
  }, []);

  const updateChaseCam = (ship: THREE.Group, clampedDt: number) => {
    // Camera sits behind (+Z) and above the craft, looking past the nose (-Z)
    tmp.camOffset.set(0, CAM_HEIGHT, CAM_BACK).applyQuaternion(ship.quaternion);
    tmp.desiredCam.copy(ship.position).add(tmp.camOffset);
    camera.position.lerp(tmp.desiredCam, 1 - Math.exp(-CAM_LAG * clampedDt));

    tmp.forward.set(0, 0, -1).applyQuaternion(ship.quaternion);
    tmp.lookAt.copy(ship.position).addScaledVector(tmp.forward, LOOK_AHEAD);
    tmp.lookAt.y += 0.35;
    camera.lookAt(tmp.lookAt);
  };

  useFrame((_, dt) => {
    if (!group.current || !launched) return;
    const ship = group.current;
    const clampedDt = Math.min(dt, 0.05);

    if (reducedMotion) {
      ship.position.set(0, 2, 12);
      camera.position.set(0, 6, 22);
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
            Math.min(FLY_TO_SPEED * clampedDt, Math.max(dist - 2.8, 0))
          );
          // lookAt aims local -Z at target (matches nose)
          ship.lookAt(tmp.target);
          updateChaseCam(ship, clampedDt);
          return;
        }
      }
    }

    if (dockedId) {
      const station = STATIONS.find((s) => s.id === dockedId);
      if (station) {
        // Park slightly offset so the planet stays framed behind the panel
        tmp.target.set(
          station.position[0] + 3.2,
          station.position[1] + 0.8,
          station.position[2] + 5.5
        );
        ship.position.lerp(tmp.target, 1 - Math.exp(-2.8 * clampedDt));
        ship.lookAt(
          station.position[0],
          station.position[1],
          station.position[2]
        );
        velocity.current.set(0, 0, 0);

        // Wide framing: planet centered in view behind the UI
        tmp.desiredCam.set(
          station.position[0],
          station.position[1] + 2.5,
          station.position[2] + 14
        );
        camera.position.lerp(tmp.desiredCam, 1 - Math.exp(-2.2 * clampedDt));
        camera.lookAt(
          station.position[0],
          station.position[1] + 0.4,
          station.position[2]
        );
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
        -0.7,
        0.7
      );
      ship.rotation.z = THREE.MathUtils.lerp(
        ship.rotation.z,
        yawInput * 0.32,
        1 - Math.exp(-6 * clampedDt)
      );

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

    updateChaseCam(ship, clampedDt);

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
      <ShipMesh />
    </group>
  );
}
