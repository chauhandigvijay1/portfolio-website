"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Profile } from "@/types/portfolio";
import { display, mono, nameFont } from "@/app/fonts";
import { AtmosphericBackground } from "@/components/site/atmospheric-background";
import { DigvijayLogo } from "@/components/site/digvijay-logo";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface IntroLoaderProps {
  profile: Profile;
  onComplete: () => void;
}

const INTRO_HOLD_MS = 2800;

function splitDisplayName(fullName: string, preferred: string) {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { first: preferred, rest: "" };
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { first: parts[0] ?? preferred, rest: "" };
  }
  return { first: parts[0] ?? preferred, rest: parts.slice(1).join(" ") };
}

function NamePart({ name, yInitial }: { name: string; yInitial: number }) {
  return (
    <motion.h1
      className={cn(display.className, "text-4xl tracking-[0.14em] text-slate-200/95 sm:text-5xl md:text-6xl")}
      initial={{ y: yInitial, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easePremium }}
    >
      {name}
    </motion.h1>
  );
}

export function IntroLoader({ profile, onComplete }: IntroLoaderProps) {
  const [visible, setVisible] = useState(true);
  const { first, rest } = useMemo(
    () => splitDisplayName(profile.name, profile.preferredName),
    [profile.name, profile.preferredName],
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const holdTimer = window.setTimeout(() => setVisible(false), INTRO_HOLD_MS);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(holdTimer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: easePremium }}
        >
          <AtmosphericBackground />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easePremium }}
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easePremium }}
              className="mb-10"
            >
              <DigvijayLogo size={56} variant="full" className="drop-shadow-[0_0_28px_hsl(275_60%_45%_/_0.35)]" />
            </motion.div>

            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2">
              <NamePart name={first} yInitial={36} />
              <motion.span
                className={cn(display.className, "text-3xl text-slate-300/60 sm:text-4xl")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.15, ease: easePremium }}
              >
                /
              </motion.span>
              {rest ? <NamePart name={rest} yInitial={-36} /> : null}
            </div>

            <motion.p
              className={cn(mono.className, "mt-8 text-sm tracking-[0.22em] text-[hsl(275_60%_72%)] sm:text-base")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: easePremium }}
            >
              {profile.role}
            </motion.p>

            <motion.p
              className={cn(
                nameFont.className,
                "mt-5 max-w-md text-pretty text-base font-light italic tracking-wide text-slate-300/55 sm:text-lg",
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: easePremium }}
            >
              {profile.tagline}
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
