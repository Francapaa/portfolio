"use client";

import { useRef, useEffect } from "react";
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
    for (int i = 0; i < 5; i++) {
      v += a * noise(p * f);
      f *= 2.2;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = resolution.x / resolution.y;
    vec2 pos = (uv - 0.5) * vec2(aspect, 1.0);
    float t = time * 0.05;

    vec3 celeste = vec3(0.459, 0.678, 0.961);
    vec3 white = vec3(1.0, 1.0, 1.0);
    vec3 cloudShadow = vec3(0.78, 0.85, 0.93);

    float bandMask = smoothstep(0.15, 0.35, uv.y) * (1.0 - smoothstep(0.65, 0.85, uv.y));

    float n1 = fbm(pos * 1.4 + vec2(t * 0.35, t * 0.06));
    float n2 = fbm(pos * 2.8 + vec2(t * 0.55, -t * 0.12) + 4.0);
    float n3 = fbm(pos * 0.7 + vec2(t * 0.12, 0.0) + 1.5);

    float cloudShape = n1 * 0.55 + n2 * 0.45;
    float cloud = smoothstep(0.32, 0.68, cloudShape);
    cloud *= smoothstep(0.15, 0.5, n3);

    float cloudEdge = smoothstep(0.28, 0.35, cloudShape) * (1.0 - smoothstep(0.65, 0.72, cloudShape));

    float wispy1 = fbm(pos * 3.5 + vec2(t * 0.7, t * 0.2) + 8.0);
    float wispy2 = fbm(pos * 5.0 + vec2(-t * 0.4, t * 0.35) + 12.0);
    float wispyMask = smoothstep(0.35, 0.6, wispy1) * 0.4 + smoothstep(0.4, 0.65, wispy2) * 0.3;
    cloud = clamp(cloud + wispyMask * cloudEdge, 0.0, 1.0);

    cloud *= bandMask;

    vec3 color = celeste;

    vec3 finalCloud = mix(cloudShadow, white, cloud);
    color = mix(color, finalCloud, cloud * 0.95);

    float sunDist = length(pos);
    float sunCore = smoothstep(0.13, 0.07, sunDist);
    float sunGlow = smoothstep(0.35, 0.0, sunDist);
    float sunHalo = smoothstep(0.6, 0.0, sunDist);

    vec3 sunCoreColor = vec3(1.0, 0.9, 0.25);
    vec3 sunGlowColor = vec3(1.0, 0.82, 0.35);
    vec3 sunHaloColor = vec3(1.0, 0.9, 0.55);

    color += sunHaloColor * sunHalo * 0.1;
    color += sunGlowColor * sunGlow * 0.22;
    color += sunCoreColor * sunCore * 0.9;

    float cloudLit = cloud * sunGlow;
    color += sunGlowColor * cloudLit * 0.15;

    float vignette = 1.0 - dot(pos, pos) * 0.28;
    color *= clamp(vignette, 0.0, 1.0);

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
    let animId = 0;

    function animate() {
      const now = performance.now();
      const dt = Math.min((now - prevTime) / 1000, 0.1);
      prevTime = now;
      uniforms.time.value += dt;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }

    stateRef.current = { scene, camera, renderer, uniforms, animId };
    animate();

    function onResize() {
      uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ background: "#75AADB" }}
    />
  );
}
