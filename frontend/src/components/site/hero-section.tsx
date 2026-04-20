"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import type { Highlight, Profile } from "@/types/portfolio";
import { MagneticLink } from "@/components/site/magnetic-link";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  profile: Profile;
  highlights: Highlight[];
}

export function HeroSection({ profile, highlights }: HeroSectionProps) {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveLineIndex((currentIndex) => (currentIndex + 1) % profile.heroLines.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [profile.heroLines.length]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-entry]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        },
      );

      gsap.to("[data-hero-float]", {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative overflow-hidden px-4 pb-18 pt-28 sm:px-6 sm:pt-32 lg:px-10 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[32rem] max-w-6xl rounded-full bg-[radial-gradient(circle_at_top,_rgba(94,169,255,0.18),_transparent_62%)] blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="space-y-7">
          <div data-hero-entry className="flex flex-wrap items-center gap-3">
            <Badge className="rounded-full border border-black/8 bg-white/75 px-4 py-1.5 text-[11px] font-medium lowercase tracking-[0.24em] text-[var(--muted-foreground)] shadow-[0_18px_50px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/6">
              full stack developer
            </Badge>
            <p className="text-xs lowercase tracking-[0.2em] text-[var(--muted-foreground)]">
              open to internships and product-focused roles
            </p>
          </div>

          <div className="space-y-5">
            <p
              data-hero-entry
              className="text-sm font-medium tracking-[0.12em] text-[var(--muted-foreground)]"
            >
              Digvijay Kumar Singh
            </p>

            <div data-hero-entry className="space-y-5">
              <h1 className="max-w-4xl text-balance text-[clamp(3.35rem,8vw,5.85rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-[var(--foreground)]">
                building calm, product-minded experiences with real backend depth.
              </h1>

              <div className="h-8 overflow-hidden text-lg text-[var(--muted-foreground)] sm:h-10 sm:text-xl">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={profile.heroLines[activeLineIndex]}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2 lowercase"
                  >
                    <Sparkles className="size-4 text-[var(--page-accent)]" />
                    {profile.heroLines[activeLineIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <p
              data-hero-entry
              className="max-w-xl text-pretty text-base leading-8 text-[var(--muted-foreground)] sm:text-lg"
            >
              {profile.intro}
            </p>
          </div>

          <div data-hero-entry className="flex flex-wrap gap-3">
            <MagneticLink
              href="#projects"
              className="rounded-full border border-transparent bg-[var(--foreground)] px-6 py-3 text-sm font-medium lowercase tracking-[0.08em] text-[var(--background)] shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition hover:bg-[var(--foreground)]/92"
            >
              view case studies
              <ArrowRight className="ml-2 inline-flex size-4" />
            </MagneticLink>
            <MagneticLink
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/8 bg-white/75 px-6 py-3 text-sm font-medium lowercase tracking-[0.08em] text-[var(--foreground)] shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition hover:bg-white dark:border-white/10 dark:bg-white/6 dark:hover:bg-white/10"
            >
              open resume
              <ArrowUpRight className="ml-2 inline-flex size-4" />
            </MagneticLink>
          </div>

          <div data-hero-entry className="grid gap-4 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="rounded-[1.8rem] border border-black/8 bg-white/72 px-5 py-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6"
              >
                <p className="text-xs font-medium lowercase tracking-[0.24em] text-[var(--muted-foreground)]">
                  {highlight.label}
                </p>
                <p className="mt-3 text-lg font-medium lowercase tracking-[-0.02em] text-[var(--foreground)]">
                  {highlight.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{highlight.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-[rgba(121,140,255,0.2)] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[rgba(89,214,190,0.24)] blur-3xl" />

          <div
            data-hero-float
            className="relative overflow-hidden rounded-[2.4rem] border border-black/8 bg-white/78 p-4 shadow-[0_40px_120px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6"
          >
            <div className="mb-4 flex items-center justify-between rounded-[1.5rem] border border-black/6 bg-[var(--page-background)]/70 px-4 py-3 dark:border-white/10">
              <div>
                <p className="text-xs font-medium lowercase tracking-[0.24em] text-[var(--muted-foreground)]">
                  current role
                </p>
                <p className="mt-1 text-sm font-medium lowercase text-[var(--foreground)]">
                  {profile.role}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs lowercase text-emerald-600 dark:text-emerald-300">
                <span className="size-2 rounded-full bg-emerald-500" />
                available
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,rgba(247,247,250,0.8),rgba(235,240,255,0.9))] p-3 dark:bg-[linear-gradient(145deg,rgba(14,18,28,0.78),rgba(20,28,45,0.92))]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.7rem]">
                <Image
                  src={profile.headshot}
                  alt={`${profile.preferredName} portrait`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <div className="absolute bottom-6 left-6 right-6 rounded-[1.4rem] border border-white/12 bg-[rgba(17,24,39,0.56)] px-4 py-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                <p className="text-xs lowercase tracking-[0.24em] text-white/70">focus</p>
                <p className="mt-2 text-lg font-medium lowercase tracking-[-0.03em]">
                  real-world builds with thoughtful frontend systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
