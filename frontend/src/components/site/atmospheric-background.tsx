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
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden bg-[hsl(240_18%_6%)]"
    >
      <MeshGradientLayer />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(255,255,255,0.15),transparent_18%),radial-gradient(circle_at_74%_12%,rgba(123,92,246,0.12),transparent_20%),radial-gradient(circle_at_48%_78%,rgba(57,33,112,0.12),transparent_28%)] opacity-75" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,16,0.06)_0%,rgba(7,5,16,0.22)_54%,rgba(6,4,14,0.42)_100%)]" />
    </div>
  );
}
