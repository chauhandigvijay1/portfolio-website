"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export function MeshGradientLayer() {
  return (
    <MeshGradient
      className="absolute inset-0 h-full w-full"
      colors={["#09070f", "#7458ff", "#f2ecff", "#141827", "#563087"]}
      speed={0.2}
    />
  );
}
