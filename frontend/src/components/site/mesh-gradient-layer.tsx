"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export function MeshGradientLayer() {
  return (
    <MeshGradient
      className="absolute inset-0 h-full w-full"
      colors={["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"]}
      speed={0.3}
    />
  );
}
