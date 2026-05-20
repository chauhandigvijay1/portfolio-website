"use client";

import { useReducedMotion } from "framer-motion";

/** Full-viewport environmental plates — opacity/scale evolution only, no identifiable moving blobs. */
export function CinematicBackground() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div aria-hidden className="atmosphere-root">
        <div className="atmosphere-base" />
        <div className="atmosphere-plate atmosphere-plate--depth atmosphere-plate--static" />
        <div className="atmosphere-crush" />
        <div className="atmosphere-vignette" />
        <div className="atmosphere-fog-floor" />
      </div>
    );
  }

  return (
    <div aria-hidden className="atmosphere-root">
      <div className="atmosphere-base" />
      <div className="atmosphere-plate atmosphere-plate--depth" />
      <div className="atmosphere-plate atmosphere-plate--violet" />
      <div className="atmosphere-plate atmosphere-plate--bloom" />
      <div className="atmosphere-plate atmosphere-plate--exposure" />
      <div className="atmosphere-crush" />
      <div className="atmosphere-vignette" />
      <div className="atmosphere-fog-floor" />
    </div>
  );
}
