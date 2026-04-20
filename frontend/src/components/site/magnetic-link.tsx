"use client";

import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { useRef } from "react";
import type { MotionProps } from "framer-motion";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticLinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, keyof MotionProps>,
    MotionProps {
  intensity?: number;
}

export function MagneticLink({
  children,
  className,
  intensity = 18,
  ...props
}: PropsWithChildren<MagneticLinkProps>) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.25 });
  const transform = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  return (
    <motion.a
      ref={ref}
      className={cn(
        "inline-flex will-change-transform",
        className,
      )}
      style={{ transform }}
      onMouseMove={(event) => {
        const element = ref.current;

        if (!element) {
          return;
        }

        const rect = element.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        x.set((offsetX / rect.width) * intensity);
        y.set((offsetY / rect.height) * intensity);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
