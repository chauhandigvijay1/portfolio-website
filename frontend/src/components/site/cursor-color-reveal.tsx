"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CursorColorRevealProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

const LERP = 0.14;
const TILT_RANGE = 6;

interface MotionState {
  active: number;
  tiltX: number;
  tiltY: number;
  x: number;
  y: number;
}

function applyFrame(
  container: HTMLDivElement,
  colorLayer: HTMLDivElement,
  glowLayer: HTMLDivElement,
  state: MotionState,
) {
  const scale = 1 + state.active * 0.015;

  container.style.transform = `perspective(1200px) rotateX(${state.tiltX}deg) rotateY(${state.tiltY}deg) scale(${scale})`;
  colorLayer.style.opacity = `${0.08 + state.active * 0.88}`;
  colorLayer.style.filter = `saturate(${1 + state.active * 0.14}) contrast(${1 + state.active * 0.04})`;
  glowLayer.style.opacity = `${state.active * 0.92}`;
  glowLayer.style.background = `radial-gradient(circle at ${state.x * 100}% ${state.y * 100}%, rgba(255,255,255,0.18) 0%, rgba(174,122,255,0.14) 16%, rgba(91,33,182,0.05) 42%, transparent 68%)`;
}

export function CursorColorReveal({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: CursorColorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorLayerRef = useRef<HTMLDivElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef<MotionState>({
    active: 0,
    tiltX: 0,
    tiltY: 0,
    x: 0.5,
    y: 0.5,
  });
  const currentRef = useRef<MotionState>({
    active: 0,
    tiltX: 0,
    tiltY: 0,
    x: 0.5,
    y: 0.5,
  });

  useEffect(() => {
    const container = containerRef.current;
    const colorLayer = colorLayerRef.current;
    const glowLayer = glowLayerRef.current;

    if (!container || !colorLayer || !glowLayer) {
      return;
    }

    applyFrame(container, colorLayer, glowLayer, currentRef.current);

    const runTick = () => {
      const nextContainer = containerRef.current;
      const nextColorLayer = colorLayerRef.current;
      const nextGlowLayer = glowLayerRef.current;

      if (!nextContainer || !nextColorLayer || !nextGlowLayer) {
        frameRef.current = null;
        return;
      }

      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      current.active += (target.active - current.active) * LERP;
      current.tiltX += (target.tiltX - current.tiltX) * LERP;
      current.tiltY += (target.tiltY - current.tiltY) * LERP;

      applyFrame(nextContainer, nextColorLayer, nextGlowLayer, current);

      const settling =
        Math.abs(target.x - current.x) > 0.001 ||
        Math.abs(target.y - current.y) > 0.001 ||
        Math.abs(target.active - current.active) > 0.008 ||
        Math.abs(target.tiltX - current.tiltX) > 0.02 ||
        Math.abs(target.tiltY - current.tiltY) > 0.02;

      if (settling) {
        frameRef.current = requestAnimationFrame(runTick);
      } else {
        frameRef.current = null;
      }
    };

    const scheduleTick = () => {
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(runTick);
      }
    };

    const updateTarget = (event: PointerEvent, active: number) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      targetRef.current = {
        active,
        x,
        y,
        tiltX: (0.5 - y) * TILT_RANGE,
        tiltY: (x - 0.5) * TILT_RANGE,
      };
    };

    const onEnter = (event: PointerEvent) => {
      updateTarget(event, 1);
      scheduleTick();
    };

    const onMove = (event: PointerEvent) => {
      updateTarget(event, 1);
      scheduleTick();
    };

    const onLeave = () => {
      targetRef.current = {
        active: 0,
        x: 0.5,
        y: 0.5,
        tiltX: 0,
        tiltY: 0,
      };
      scheduleTick();
    };

    container.addEventListener("pointerenter", onEnter);
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);

    return () => {
      container.removeEventListener("pointerenter", onEnter);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden transition-transform duration-500 [transform-style:preserve-3d]", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-top grayscale contrast-[1.06] brightness-[0.9]"
        sizes={sizes}
      />
      <div ref={colorLayerRef} className="pointer-events-none absolute inset-0 opacity-[0.08] will-change-[opacity,filter]">
        <Image src={src} alt="" aria-hidden fill className="object-cover object-top" sizes={sizes} />
      </div>
      <div ref={glowLayerRef} className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen will-change-[background,opacity]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%,rgba(5,3,12,0.14)_100%)]" />
    </div>
  );
}
