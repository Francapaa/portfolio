import {
  Canvas,
  type ThreeEvent,
  useFrame,
  useThree,
} from "@react-three/fiber";
import * as THREE from "three";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

export type SceneProps = {
  paused: boolean;
  onReady?: () => void;
  onInteract?: () => void;
  label?: string;
  helpId?: string;
};

type Vec3 = [number, number, number];

type KeyboardCommand = { direction: string; sequence: number } | null;

type FragmentSpec = {
  position: Vec3;
  rotation: Vec3;
  scale: number;
  spin: Vec3;
  phase: number;
  kind: "box" | "tetrahedron" | "octahedron";
};

const FRAGMENTS: readonly FragmentSpec[] = [
  {
    position: [-1.92, 0.92, 0.2],
    rotation: [0.36, 0.48, 0.16],
    scale: 0.92,
    spin: [0.54, 0.78, 0.18],
    phase: 0.35,
    kind: "octahedron",
  },
  {
    position: [1.88, 0.46, -0.15],
    rotation: [0.18, 0.22, 0.62],
    scale: 0.72,
    spin: [0.72, -0.46, 0.28],
    phase: 1.7,
    kind: "tetrahedron",
  },
  {
    position: [1.64, -1.12, 0.28],
    rotation: [0.52, 0.14, 0.4],
    scale: 0.62,
    spin: [-0.42, 0.64, 0.52],
    phase: 2.9,
    kind: "box",
  },
  {
    position: [-1.6, -1.22, -0.1],
    rotation: [0.1, 0.72, 0.38],
    scale: 0.58,
    spin: [0.62, 0.34, -0.58],
    phase: 4.15,
    kind: "tetrahedron",
  },
  {
    position: [-2.18, -0.1, -0.22],
    rotation: [0.44, 0.3, 0.1],
    scale: 0.42,
    spin: [0.38, -0.7, 0.26],
    phase: 5.1,
    kind: "box",
  },
  {
    position: [2.18, 1.34, 0.05],
    rotation: [0.28, 0.64, 0.2],
    scale: 0.36,
    spin: [-0.5, 0.42, 0.76],
    phase: 5.8,
    kind: "octahedron",
  },
];

const ORBITAL_RINGS: readonly {
  radius: number;
  rotation: Vec3;
  scale: Vec3;
  opacity: number;
  color: string;
}[] = [
  {
    radius: 1.98,
    rotation: [1.08, 0.22, -0.18],
    scale: [1.03, 0.72, 1],
    opacity: 0.48,
    color: "#c8562a",
  },
  {
    radius: 2.2,
    rotation: [0.24, 1.12, 0.34],
    scale: [0.85, 1.02, 1],
    opacity: 0.38,
    color: "#e36b35",
  },
  {
    radius: 2.08,
    rotation: [1.62, -0.16, 0.42],
    scale: [1.08, 0.62, 1],
    opacity: 0.32,
    color: "#9f3e20",
  },
];

function makeRingGeometry(radius: number): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const segments = 144;

  for (let index = 0; index < segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0),
    );
  }

  return new THREE.BufferGeometry().setFromPoints(points);
}

function OrbitalRing({
  radius,
  rotation,
  scale,
  opacity,
  color,
}: (typeof ORBITAL_RINGS)[number]) {
  const geometry = useMemo(() => makeRingGeometry(radius), [radius]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <lineLoop
      geometry={geometry}
      rotation={rotation}
      scale={scale}
      renderOrder={2}
    >
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        toneMapped={false}
      />
    </lineLoop>
  );
}

function OrbitalSystem({ paused }: { paused: boolean }) {
  const orbitalRef = useRef<THREE.Group | null>(null);

  useFrame((_, delta) => {
    if (paused || !orbitalRef.current) return;

    orbitalRef.current.rotation.y += delta * 0.055;
    orbitalRef.current.rotation.z -= delta * 0.024;
  });

  return (
    <group ref={orbitalRef} rotation={[0.04, -0.16, 0.08]}>
      {ORBITAL_RINGS.map((ring) => (
        <OrbitalRing key={`${ring.radius}-${ring.opacity}`} {...ring} />
      ))}
    </group>
  );
}

function FloatingFragments({ paused }: { paused: boolean }) {
  const fragmentsRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    if (paused || !fragmentsRef.current) return;

    const time = state.clock.elapsedTime;
    fragmentsRef.current.children.forEach((fragment, index) => {
      const spec = FRAGMENTS[index];
      if (!spec) return;

      fragment.position.y =
        spec.position[1] + Math.sin(time * 0.74 + spec.phase) * 0.075;
      fragment.rotation.x += delta * spec.spin[0];
      fragment.rotation.y += delta * spec.spin[1];
      fragment.rotation.z += delta * spec.spin[2];
    });
  });

  return (
    <group ref={fragmentsRef}>
      {FRAGMENTS.map((fragment, index) => (
        <mesh
          key={`${fragment.kind}-${index}`}
          position={fragment.position}
          rotation={fragment.rotation}
          scale={fragment.scale}
          renderOrder={3}
        >
          {fragment.kind === "box" ? (
            <boxGeometry args={[0.14, 0.14, 0.14]} />
          ) : fragment.kind === "tetrahedron" ? (
            <tetrahedronGeometry args={[0.13, 0]} />
          ) : (
            <octahedronGeometry args={[0.13, 0]} />
          )}
          <meshStandardMaterial
            color="#e85f2b"
            emissive="#541606"
            emissiveIntensity={0.65}
            metalness={0.82}
            roughness={0.24}
          />
        </mesh>
      ))}
    </group>
  );
}

function StudioLights() {
  return (
    <>
      <ambientLight color="#5c1f0e" intensity={0.42} />
      <hemisphereLight color="#ffe4c7" groundColor="#090302" intensity={1.12} />
      <directionalLight
        position={[-3.8, 4.8, 4.8]}
        color="#fff0d9"
        intensity={4.7}
      />
      <directionalLight
        position={[4.2, 1.1, 2.4]}
        color="#e85b2b"
        intensity={3.3}
      />
      <pointLight
        position={[-2.8, -2.25, 2.6]}
        color="#d94d22"
        intensity={8}
        distance={7}
        decay={2}
      />
      <spotLight
        position={[0.5, 4.8, 2.8]}
        color="#ffb878"
        intensity={18}
        distance={10}
        angle={0.55}
        penumbra={0.9}
        decay={2}
      />
    </>
  );
}

function Sculpture({
  paused,
  onInteract,
  keyboardCommand,
}: Pick<SceneProps, "paused" | "onInteract"> & {
  keyboardCommand: KeyboardCommand;
}) {
  const sculptureRef = useRef<THREE.Group | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(
    null,
  );
  const rotationTarget = useRef({ x: 0.08, y: -0.42 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const { invalidate } = useThree();

  useEffect(() => {
    if (!keyboardCommand) return;
    const direction = keyboardCommand.direction;
    if (direction === "ArrowLeft") rotationTarget.current.y -= 0.22;
    if (direction === "ArrowRight") rotationTarget.current.y += 0.22;
    if (direction === "ArrowUp") rotationTarget.current.x -= 0.16;
    if (direction === "ArrowDown") rotationTarget.current.x += 0.16;
    if (direction === "Home") rotationTarget.current = { x: 0.08, y: -0.42 };
    rotationTarget.current.x = THREE.MathUtils.clamp(
      rotationTarget.current.x,
      -0.62,
      0.62,
    );
    pointerTarget.current = { x: 0, y: 0 };
    if (sculptureRef.current) {
      sculptureRef.current.rotation.x = rotationTarget.current.x;
      sculptureRef.current.rotation.y = rotationTarget.current.y;
    }
    invalidate();
  }, [keyboardCommand, invalidate]);

  const endDrag = useCallback((pointerId?: number) => {
    if (pointerId === undefined || dragRef.current?.pointerId === pointerId) {
      dragRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - drag.x;
      const deltaY = event.clientY - drag.y;
      drag.x = event.clientX;
      drag.y = event.clientY;

      rotationTarget.current.y += deltaX * 0.009;
      rotationTarget.current.x = THREE.MathUtils.clamp(
        rotationTarget.current.x + deltaY * 0.006,
        -0.62,
        0.62,
      );
      pointerTarget.current.x = THREE.MathUtils.clamp(
        (event.clientX / window.innerWidth) * 2 - 1,
        -1,
        1,
      );
      pointerTarget.current.y = THREE.MathUtils.clamp(
        -((event.clientY / window.innerHeight) * 2 - 1),
        -1,
        1,
      );
      invalidate();
    };

    const handlePointerUp = (event: PointerEvent) => endDrag(event.pointerId);
    const handleWindowBlur = () => endDrag();

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, {
      passive: true,
    });
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [endDrag, invalidate]);

  useFrame((state, delta) => {
    const sculpture = sculptureRef.current;
    if (!sculpture) return;

    if (!paused) {
      rotationTarget.current.y += delta * 0.13;
      sculpture.position.y = THREE.MathUtils.damp(
        sculpture.position.y,
        Math.sin(state.clock.elapsedTime * 0.74) * 0.075,
        3.2,
        delta,
      );
    }

    sculpture.rotation.x = THREE.MathUtils.damp(
      sculpture.rotation.x,
      rotationTarget.current.x + pointerTarget.current.y * 0.055,
      5.6,
      delta,
    );
    sculpture.rotation.y = THREE.MathUtils.damp(
      sculpture.rotation.y,
      rotationTarget.current.y + pointerTarget.current.x * 0.08,
      5.6,
      delta,
    );
    sculpture.position.x = THREE.MathUtils.damp(
      sculpture.position.x,
      pointerTarget.current.x * 0.085,
      3.8,
      delta,
    );
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const { clientX, clientY, pointerId } = event.nativeEvent;
    dragRef.current = { pointerId, x: clientX, y: clientY };
    pointerTarget.current.x = THREE.MathUtils.clamp(
      (clientX / window.innerWidth) * 2 - 1,
      -1,
      1,
    );
    pointerTarget.current.y = THREE.MathUtils.clamp(
      -((clientY / window.innerHeight) * 2 - 1),
      -1,
      1,
    );
    onInteract?.();
    invalidate();
  };

  return (
    <group
      ref={sculptureRef}
      onPointerDown={handlePointerDown}
      onPointerUp={(event) => endDrag(event.nativeEvent.pointerId)}
      onPointerCancel={(event) => endDrag(event.nativeEvent.pointerId)}
    >
      <group rotation={[0.18, -0.28, 0.04]} scale={1.02}>
        <mesh castShadow={false} receiveShadow={false}>
          <torusKnotGeometry args={[1.14, 0.31, 256, 48, 2, 3]} />
          <meshPhysicalMaterial
            color="#a94721"
            emissive="#1b0703"
            emissiveIntensity={0.18}
            metalness={0.92}
            roughness={0.3}
            clearcoat={0.5}
            clearcoatRoughness={0.22}
          />
        </mesh>
        <mesh scale={1.006} renderOrder={1}>
          <torusKnotGeometry args={[1.14, 0.31, 160, 28, 2, 3]} />
          <meshBasicMaterial
            color="#f1783c"
            wireframe
            transparent
            opacity={0.075}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
      <OrbitalSystem paused={paused} />
      <FloatingFragments paused={paused} />
    </group>
  );
}

export default function Scene({
  paused,
  onReady,
  onInteract,
  label,
  helpId,
}: SceneProps) {
  const [documentHidden, setDocumentHidden] = useState(false);
  const [keyboardCommand, setKeyboardCommand] = useState<KeyboardCommand>(null);
  const readyRef = useRef(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(
        event.key,
      )
    )
      return;
    event.preventDefault();
    const direction = event.key;
    setKeyboardCommand((previous) => ({
      direction,
      sequence: (previous?.sequence ?? 0) + 1,
    }));
    onInteract?.();
  };

  useEffect(() => {
    if (!onReady || readyRef.current) return;

    readyRef.current = true;
    onReady();
  }, [onReady]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const updateVisibility = () => setDocumentHidden(document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const effectivePaused = paused || documentHidden;
  const canvasStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    touchAction: "pan-y",
  };

  return (
    <Canvas
      tabIndex={0}
      role="group"
      aria-label={label}
      aria-describedby={helpId}
      onKeyDown={handleKeyDown}
      frameloop={effectivePaused ? "demand" : "always"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.15], fov: 39, near: 0.1, far: 100 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      style={canvasStyle}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.18;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <StudioLights />
      <Sculpture
        paused={effectivePaused}
        onInteract={onInteract}
        keyboardCommand={keyboardCommand}
      />
    </Canvas>
  );
}
