"use client";

import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float time;
  uniform vec2 resolution;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(random(i + vec2(0.0)), random(i + vec2(1.0, 0.0)), u.x),
      mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    float f = 1.0;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p * f);
      f *= 2.1;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = resolution.x / resolution.y;
    vec2 pos = (uv - 0.5) * vec2(aspect, 1.0);
    float t = time * 0.06;

    vec3 skyTop = vec3(0.459, 0.678, 0.961);
    vec3 skyBottom = vec3(0.85, 0.92, 1.0);
    vec3 cloudColor = vec3(1.0, 1.0, 1.0);
    vec3 cloudShadow = vec3(0.75, 0.82, 0.92);

    vec3 color = mix(skyBottom, skyTop, smoothstep(-0.3, 0.6, uv.y));

    float cloudBase = fbm(pos * 1.5 + vec2(t * 0.4, t * 0.1));
    float cloudDetail = fbm(pos * 3.0 + vec2(t * 0.6, -t * 0.2) + 5.0);
    float cloudMask = fbm(pos * 0.8 + vec2(t * 0.15, 0.0));

    float cloud = smoothstep(0.35, 0.75, cloudBase * 0.6 + cloudDetail * 0.4);
    cloud *= smoothstep(0.2, 0.6, cloudMask);

    float cloudShadow2 = smoothstep(0.3, 0.7, cloudBase * 0.5 + cloudDetail * 0.3);
    vec3 finalCloud = mix(cloudShadow, cloudColor, cloud);

    color = mix(color, finalCloud, cloud * 0.85);

    float wispy = fbm(pos * 4.0 + vec2(t * 0.8, t * 0.3));
    float wispyMask = smoothstep(0.45, 0.7, wispy) * cloud;
    color = mix(color, cloudColor * 0.95, wispyMask * 0.3);

    float sunDist = length(pos - vec2(0.0, 0.05));
    float sunCore = smoothstep(0.12, 0.08, sunDist);
    float sunGlow = smoothstep(0.35, 0.0, sunDist);
    float sunHalo = smoothstep(0.6, 0.0, sunDist);

    vec3 sunCoreColor = vec3(1.0, 0.92, 0.3);
    vec3 sunGlowColor = vec3(1.0, 0.85, 0.4);
    vec3 sunHaloColor = vec3(1.0, 0.9, 0.6);

    color += sunHaloColor * sunHalo * 0.15;
    color += sunGlowColor * sunGlow * 0.3;
    color += sunCoreColor * sunCore * 0.8;

    float cloudLit = cloud * sunGlow;
    color += sunGlowColor * cloudLit * 0.2;

    float vignette = 1.0 - length(pos) * length(pos) * 0.4;
    color *= clamp(vignette, 0.0, 1.0);

    color = pow(color, vec3(0.95));
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

export default function ArgentinaSky() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    uniforms: { time: { value: number }; resolution: { value: THREE.Vector2 } };
    animId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      })
    );
    scene.add(mesh);

    let prevTime = performance.now();

    function animate() {
      const now = performance.now();
      const dt = Math.min((now - prevTime) / 1000, 0.1);
      prevTime = now;
      uniforms.time.value += dt;

      renderer.render(scene, camera);
      stateRef.current!.animId = requestAnimationFrame(animate);
    }

    stateRef.current = { scene, camera, renderer, uniforms, animId: 0 };
    animate();

    function onResize() {
      uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(stateRef.current!.animId);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ background: "linear-gradient(180deg, #75AADB 0%, #dce8f5 100%)" }}
    />
  );
}
