"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Highlight, Profile } from "@/types/portfolio";
import { MagneticLink } from "@/components/site/magnetic-link";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  profile: Profile;
  highlights: Highlight[];
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection({ profile, highlights }: HeroSectionProps) {
  const lines = useMemo(
    () => (profile.heroLines.length ? profile.heroLines : [profile.role]),
    [profile.heroLines, profile.role],
  );
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lines.length <= 1) {
      return;
    }

    const id = window.setInterval(() => {
      setLineIndex((current) => (current + 1) % lines.length);
    }, 3200);

    return () => window.clearInterval(id);
  }, [lines]);

  return (
    <section
      id="top"
      className="relative z-10 min-h-[min(100dvh,54rem)] px-5 pb-28 pt-32 sm:px-8 sm:pt-36 lg:px-16 lg:pt-40"
    >
      <div className="section-ambient opacity-15" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
        <div>
          <motion.p
            className="type-section-eyebrow text-[var(--muted-foreground)]"
            {...fadeUp}
            transition={{ duration: 0.8, ease: easePremium }}
          >
            {profile.role}
          </motion.p>

          <motion.div
            className="mt-8 space-y-4 sm:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.06, ease: easePremium }}
          >
            <h1 className="hero-display-name max-w-[14ch] text-[clamp(2.25rem,5.5vw,3.65rem)]">
              {profile.preferredName}
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-white/58 sm:text-xl">
              {profile.tagline}
            </p>
          </motion.div>

          <motion.p
            className="mt-9 max-w-xl text-pretty text-base leading-[1.8] text-[var(--muted-foreground)] sm:mt-10 sm:text-[1.05rem]"
            {...fadeUp}
            transition={{ duration: 0.85, delay: 0.16, ease: easePremium }}
          >
            {profile.intro}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3 sm:mt-11 sm:gap-4"
            {...fadeUp}
            transition={{ duration: 0.85, delay: 0.24, ease: easePremium }}
          >
            <MagneticLink
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium tracking-wide text-[#0a0612] shadow-[0_18px_50px_rgba(0,0,0,0.32)] transition duration-500 hover:bg-white/92 hover:shadow-[0_22px_60px_rgba(139,92,246,0.2)] sm:px-8 sm:py-3.5"
            >
              View resume
              <ArrowUpRight className="size-4" />
            </MagneticLink>
            <MagneticLink
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-6 py-3 text-sm tracking-wide text-white/85 backdrop-blur-sm transition duration-500 hover:border-white/24 hover:bg-white/[0.07] sm:px-7 sm:py-3.5"
            >
              View projects
            </MagneticLink>
          </motion.div>

          {highlights.length > 0 ? (
            <motion.div
              className="mt-12 grid gap-3 sm:grid-cols-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.34, ease: easePremium }}
            >
              {highlights.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 backdrop-blur-sm"
                >
                  <p className="type-section-eyebrow text-[10px] text-white/45">{item.label}</p>
                  <p className="mt-2 font-sans text-sm font-medium tracking-tight text-white/92">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/45">{item.note}</p>
                </div>
              ))}
            </motion.div>
          ) : null}
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: easePremium }}
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.18),transparent_68%)] blur-2xl"
          />

          <div className="glass-panel relative overflow-hidden rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-8">
            <div
              aria-hidden
              className="hero-glass-atmosphere pointer-events-none absolute inset-[-20%] opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(167, 139, 250, 0.15), transparent 50%), radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.12), transparent 45%)",
              }}
            />

            <div className="relative flex min-h-[16rem] flex-col justify-between sm:min-h-[18rem]">
              <div>
                <p className="type-section-eyebrow text-[var(--page-accent)]">Currently</p>
                <div className="mt-5 h-8 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={lines[lineIndex]}
                      className="font-sans text-lg font-medium tracking-tight text-white/90 sm:text-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.55, ease: easePremium }}
                    >
                      {lines[lineIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-10 space-y-4 border-t border-white/[0.08] pt-8">
                {profile.focusAreas.slice(0, 3).map((area) => (
                  <div key={area} className="flex items-center gap-3">
                    <span className="size-1.5 shrink-0 rounded-full bg-[var(--page-accent)]/80" />
                    <span className="text-sm tracking-wide text-white/65">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full border border-white/[0.06] bg-white/[0.02]"
              animate={{ rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -bottom-6 -left-4 size-20 rounded-full",
                "bg-[radial-gradient(circle,rgba(192,132,252,0.2),transparent_70%)] blur-xl",
              )}
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.06, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
