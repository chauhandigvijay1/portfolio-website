"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(pointer: fine)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.3 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.3 });
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const update = (event: MouseEvent) => {
      x.set(event.clientX - 96);
      y.set(event.clientY - 96);
    };

    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [enabled, x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(105,169,255,0.18)_0%,_rgba(105,169,255,0.08)_34%,_transparent_72%)] blur-3xl lg:block"
      style={{
        translateX: smoothX,
        translateY: smoothY,
      }}
    />
  );
}
