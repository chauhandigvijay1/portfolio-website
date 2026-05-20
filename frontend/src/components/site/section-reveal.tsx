"use client";

import type { PropsWithChildren } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  delay?: number;
  className?: string;
}

export function SectionReveal({
  children,
  delay = 0,
  className,
}: PropsWithChildren<SectionRevealProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: easePremium }}
    >
      {children}
    </motion.div>
  );
}
