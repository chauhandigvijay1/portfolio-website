"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { mono, nameFont } from "@/app/fonts";
import type { Profile } from "@/types/portfolio";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  profile: Profile;
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easePremium,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easePremium },
  },
};

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section id="top" className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary)/0.05)] to-transparent" />

      <motion.div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className={`${nameFont.className} text-5xl font-light tracking-wide text-[hsl(var(--primary))] md:text-7xl lg:text-8xl`}
        >
          {profile.preferredName}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`${mono.className} mt-4 text-lg text-[hsl(var(--secondary))] md:text-xl`}
        >
          {profile.role}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[hsl(var(--foreground)/0.8)] sm:text-lg"
        >
          {profile.intro}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "btn-glass inline-flex h-11 items-center justify-center rounded-full px-8 text-sm font-medium tracking-wide",
            )}
          >
            View Resume
          </Link>
          <Link
            href="#projects"
            className="inline-flex h-11 items-center justify-center rounded-full border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] px-8 text-sm tracking-wide text-[hsl(var(--foreground))] backdrop-blur-md transition hover:border-[hsl(var(--glass-border-hover))] hover:bg-[hsl(var(--glass-bg-light))]"
          >
            View Projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
