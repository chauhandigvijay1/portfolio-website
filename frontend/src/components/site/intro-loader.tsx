"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Profile } from "@/types/portfolio";

interface IntroLoaderProps {
  profile: Profile;
  onComplete: () => void;
}

function splitDisplayName(fullName: string, preferred: string) {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { first: preferred, rest: "" };
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { first: parts[0] ?? preferred, rest: "" };
  }
  const first = parts[0] ?? preferred;
  const rest = parts.slice(1).join(" ");
  return { first, rest };
}

export function IntroLoader({ profile, onComplete }: IntroLoaderProps) {
  const [visible, setVisible] = useState(true);
  const { first, rest } = useMemo(
    () => splitDisplayName(profile.name, profile.preferredName),
    [profile.name, profile.preferredName],
  );

  useEffect(() => {
    const totalMs = 2400;
    const id = window.setTimeout(() => {
      setVisible(false);
    }, totalMs);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        onComplete();
      }}
    >
      {visible ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050208] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(139,92,246,0.35),transparent_55%),radial-gradient(ellipse_60%_50%_at_30%_80%,rgba(76,29,149,0.4),transparent_50%)]" />
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          <motion.div
            className="relative z-[1] flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 px-6 text-center"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-none tracking-[0.02em] text-white"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {first}
            </motion.span>
            <motion.span
              className="font-display text-[clamp(1.5rem,4vw,2rem)] font-light text-white/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              /
            </motion.span>
            {rest ? (
              <motion.span
                className="font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-none tracking-[0.02em] text-white"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {rest}
              </motion.span>
            ) : null}
          </motion.div>

          <motion.p
            className="relative z-[1] mt-10 max-w-md px-6 text-center text-xs uppercase tracking-[0.35em] text-white/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            {profile.role}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
