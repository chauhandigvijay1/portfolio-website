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

const REVEAL_RADIUS = 140;
const LERP = 0.16;

function applyMask(el: HTMLDivElement, x: number, y: number, active: number) {
  const radius = REVEAL_RADIUS * active;
  const mask = `radial-gradient(circle ${radius}px at ${x * 100}% ${y * 100}%, black 0%, rgba(0,0,0,0.88) 38%, transparent 72%)`;
  el.style.opacity = active > 0.02 ? "1" : "0";
  el.style.webkitMaskImage = mask;
  el.style.maskImage = mask;
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
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0.5, y: 0.5, active: 0 });
  const currentRef = useRef({ x: 0.5, y: 0.5, active: 0 });

  useEffect(() => {
    const layer = colorLayerRef.current;
    if (layer) {
      applyMask(layer, 0.5, 0.5, 0);
    }

    const runTick = () => {
      const colorLayer = colorLayerRef.current;
      if (!colorLayer) return;

      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * LERP;
      cur.y += (tgt.y - cur.y) * LERP;
      cur.active += (tgt.active - cur.active) * LERP;

      applyMask(colorLayer, cur.x, cur.y, cur.active);

      const settling =
        Math.abs(tgt.x - cur.x) > 0.001 ||
        Math.abs(tgt.y - cur.y) > 0.001 ||
        Math.abs(tgt.active - cur.active) > 0.008;

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

    const container = containerRef.current;
    if (!container) return;

    const onEnter = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: 1,
      };
      scheduleTick();
    };

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: 1,
      };
      scheduleTick();
    };

    const onLeave = () => {
      targetRef.current = { ...targetRef.current, active: 0 };
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
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-top grayscale contrast-[1.04] brightness-[0.9]"
        sizes={sizes}
      />
      <div ref={colorLayerRef} className="pointer-events-none absolute inset-0 will-change-[mask-image,opacity]">
        <Image src={src} alt="" aria-hidden fill className="object-cover object-top" sizes={sizes} />
      </div>
    </div>
  );
}
