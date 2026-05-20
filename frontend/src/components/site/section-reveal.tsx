"use client";

import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { easePremium } from "@/lib/motion";

interface SectionRevealProps {
  delay?: number;
  className?: string;
}

export function SectionReveal({
  children,
  delay = 0,
  className,
}: PropsWithChildren<SectionRevealProps>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.88, delay, ease: easePremium }}
    >
      {children}
    </motion.div>
  );
}
