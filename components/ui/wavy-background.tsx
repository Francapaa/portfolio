"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement as HTMLElement | null;
    const rect = parent?.getBoundingClientRect();
    w = rect ? rect.width : window.innerWidth;
    h = rect ? rect.height : window.innerHeight;
    // Use at least viewport size if parent is 0
    if (w < 10) w = window.innerWidth;
    if (h < 10) h = window.innerHeight;
    ctx.canvas.width = w * dpr;
    ctx.canvas.height = h * dpr;
    ctx.canvas.style.width = `${w}px`;
    ctx.canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    ctx.filter = blur ? `blur(${blur}px)` : "none";
    nt = 0;
    const onResize = () => {
      const dpr2 = window.devicePixelRatio || 1;
      const r = (canvas.parentElement as HTMLElement | null)?.getBoundingClientRect();
      w = r ? r.width : window.innerWidth;
      h = r ? r.height : window.innerHeight;
      if (w < 10) w = window.innerWidth;
      if (h < 10) h = window.innerHeight;
      ctx.canvas.width = w * dpr2;
      ctx.canvas.height = h * dpr2;
      ctx.canvas.style.width = `${w}px`;
      ctx.canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr2, dpr2);
      ctx.filter = blur ? `blur(${blur}px)` : "none";
    };
    window.addEventListener("resize", onResize);
    // store for cleanup
    (canvas as unknown as { _onResize: () => void })._onResize = onResize;
    render();
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];
  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
      const c = canvasRef.current as unknown as { _onResize?: () => void };
      if (c?._onResize) window.removeEventListener("resize", c._onResize);
      else window.onresize = null;
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
