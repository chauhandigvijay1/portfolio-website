"use client";

import dynamic from "next/dynamic";

const MeshGradientLayer = dynamic(
  () => import("@/components/site/mesh-gradient-layer").then((mod) => mod.MeshGradientLayer),
  { ssr: false },
);

export function AtmosphericBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden bg-[hsl(240_15%_2%)]"
    >
      <MeshGradientLayer />
    </div>
  );
}
