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

const skyFragmentShader = `
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
    float t = time * 0.3;

    vec3 celeste = vec3(0.459, 0.678, 0.961);
    vec3 white = vec3(1.0, 1.0, 1.0);
    vec3 cloudShadow = vec3(0.78, 0.85, 0.93);

    float bandMask = smoothstep(0.15, 0.35, uv.y) * (1.0 - smoothstep(0.65, 0.85, uv.y));

    float n1 = fbm(uv * 3.0 + vec2(t, t * 0.05));
    float n2 = fbm(uv * 5.5 + vec2(t * 0.6, -t * 0.03) + 4.0);
    float n3 = fbm(uv * 1.8 + vec2(t * 0.1, t * 0.01) + 1.5);

    float cloudShape = n1 * 0.55 + n2 * 0.45;
    float cloud = smoothstep(0.32, 0.68, cloudShape);
    cloud *= smoothstep(0.15, 0.5, n3);

    float cloudEdge = smoothstep(0.28, 0.35, cloudShape) * (1.0 - smoothstep(0.65, 0.72, cloudShape));

    float wispy1 = fbm(uv * 7.0 + vec2(t * 0.8, t * 0.08) + 8.0);
    float wispy2 = fbm(uv * 10.0 + vec2(t * 0.5, t * 0.05) + 12.0);
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

const compositeFragmentShader = `
  precision highp float;
  uniform sampler2D tPrev;
  uniform sampler2D tSky;
  uniform vec2 resolution;
  uniform vec2 uMouse;
  uniform vec2 uSmoothed;
  uniform float time;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float aspect = resolution.x / resolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    vec2 m = uSmoothed;
    float d = length(p - m);
    float field = exp(-d * d * 14.0);

    vec2 deltaUv = (uSmoothed - uMouse) / vec2(aspect, 1.0);
    vec2 ripple = vec2(cos(time * 2.1), sin(time * 1.7)) * 0.003;

    vec2 dragUv = uv + (deltaUv * 0.75 + ripple) * field;
    vec4 prev = texture2D(tPrev, dragUv);
    vec4 fresh = texture2D(tSky, uv);

    float w = clamp(field * 0.45, 0.0, 1.0);
    vec4 color = mix(fresh, prev, w);

    gl_FragColor = color;
  }
`;

export default function ArgentinaSky() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const pr = Math.min(window.devicePixelRatio, 2);
    const rtSky = new THREE.WebGLRenderTarget(Math.floor(window.innerWidth * pr), Math.floor(window.innerHeight * pr), {
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping,
    });
    const rtCompositeA = new THREE.WebGLRenderTarget(Math.floor(window.innerWidth * pr), Math.floor(window.innerHeight * pr), {
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping,
    });
    const rtCompositeB = new THREE.WebGLRenderTarget(Math.floor(window.innerWidth * pr), Math.floor(window.innerHeight * pr), {
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping,
    });

    const skyUniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };
    const skyScene = new THREE.Scene();
    skyScene.add(
      new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({ uniforms: skyUniforms, vertexShader, fragmentShader: skyFragmentShader })
      )
    );

    const compositeUniforms = {
      tPrev: { value: null as THREE.Texture | null },
      tSky: { value: null as THREE.Texture | null },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(10, 10) },
      uSmoothed: { value: new THREE.Vector2(10, 10) },
      time: { value: 0 },
    };
    const compositeScene = new THREE.Scene();
    compositeScene.add(
      new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({ uniforms: compositeUniforms, vertexShader, fragmentShader: compositeFragmentShader })
      )
    );

    renderer.setRenderTarget(rtCompositeA);
    renderer.render(skyScene, camera);
    renderer.setRenderTarget(rtCompositeB);
    renderer.render(skyScene, camera);
    renderer.setRenderTarget(null);

    const pointerRaw = new THREE.Vector2(10, 10);
    const pointerSmoothed = new THREE.Vector2(10, 10);

    function onPointerMove(e: MouseEvent) {
      const ww = window.innerWidth;
      const hh = window.innerHeight;
      const x = (e.clientX / ww - 0.5) * (ww / hh);
      const y = 0.5 - e.clientY / hh;
      pointerRaw.set(x, y);
    }
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mousemove", onPointerMove);

    let prevTime = performance.now();
    let read = rtCompositeA;
    let write = rtCompositeB;

    function animate() {
      try {
        const now = performance.now();
        const dt = Math.min((now - prevTime) / 1000, 0.1);
        prevTime = now;
        skyUniforms.time.value += dt;
        compositeUniforms.time.value += dt;

        const k = 1 - Math.exp(-dt * 5);
        pointerSmoothed.lerp(pointerRaw, k);
        compositeUniforms.uMouse.value.copy(pointerRaw);
        compositeUniforms.uSmoothed.value.copy(pointerSmoothed);

        renderer.setRenderTarget(rtSky);
        renderer.render(skyScene, camera);

        compositeUniforms.tPrev.value = read.texture;
        compositeUniforms.tSky.value = rtSky.texture;

        renderer.setRenderTarget(null);
        renderer.render(compositeScene, camera);

        renderer.setRenderTarget(write);
        renderer.render(compositeScene, camera);
        renderer.setRenderTarget(null);

        const tmp = read;
        read = write;
        write = tmp;
      } catch (err) {
        console.error("[ArgentinaSky] frame error", err);
      }
    }

    renderer.setAnimationLoop(animate);

    function onResize() {
      const ww = window.innerWidth;
      const hh = window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(ww, hh);
      const p = Math.min(window.devicePixelRatio, 2);
      skyUniforms.resolution.value.set(ww, hh);
      compositeUniforms.resolution.value.set(ww, hh);
      rtSky.setSize(Math.floor(ww * p), Math.floor(hh * p));
      rtCompositeA.setSize(Math.floor(ww * p), Math.floor(hh * p));
      rtCompositeB.setSize(Math.floor(ww * p), Math.floor(hh * p));
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.setAnimationLoop(null);
      rtSky.dispose();
      rtCompositeA.dispose();
      rtCompositeB.dispose();
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
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