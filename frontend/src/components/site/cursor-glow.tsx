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
  const smoothX = useSpring(x, { stiffness: 90, damping: 26, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 26, mass: 0.35 });
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
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.018)_0%,rgba(120,100,160,0.03)_40%,transparent_75%)] blur-3xl lg:block"
      style={{
        translateX: smoothX,
        translateY: smoothY,
      }}
    />
  );
}
