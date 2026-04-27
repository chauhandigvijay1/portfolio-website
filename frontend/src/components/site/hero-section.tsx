"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { mono, nameFont } from "@/app/fonts";
import type { Profile } from "@/types/portfolio";
import { easePremium } from "@/lib/motion";

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
    <section id="top" className="relative z-10 flex min-h-screen items-center px-5 pb-16 pt-20 sm:px-8 sm:pt-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary)/0.03)] via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.07),transparent_18%),radial-gradient(circle_at_72%_24%,rgba(168,85,247,0.08),transparent_20%)]" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl">
          <motion.h1
            variants={itemVariants}
            className={`${nameFont.className} text-6xl leading-[0.92] text-[hsl(var(--primary))] sm:text-7xl md:text-[5.8rem] lg:text-[6.5rem]`}
          >
            {profile.preferredName}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`${mono.className} mt-4 text-lg text-[hsl(var(--secondary))] md:text-[1.1rem]`}
          >
            {profile.role}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-xl text-pretty text-base leading-[1.95] text-[hsl(var(--foreground)/0.78)] sm:text-[1.05rem]"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10">
            <Link
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-primary-soft inline-flex h-11 items-center justify-center rounded-full px-8 text-[11px] font-medium uppercase tracking-[0.2em]"
            >
              View Resume
            </Link>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-sm leading-relaxed text-[hsl(var(--foreground)/0.52)]"
          >
            {profile.availability}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
