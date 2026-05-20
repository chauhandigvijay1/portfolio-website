"use client";

import { MapPin } from "lucide-react";
import { CursorColorReveal } from "@/components/site/cursor-color-reveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { display } from "@/app/fonts";
import type { Profile } from "@/types/portfolio";
import { easePremium } from "@/lib/motion";

interface AboutSectionProps {
  profile: Profile;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easePremium,
      staggerChildren: 0.08,
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

export function AboutSection({ profile }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const locationLine = `${profile.education.institution} · ${profile.education.duration}`;

  return (
    <section id="about" className="section-pad">
      <div className="section-bridge" />
      <motion.div
        ref={ref}
        className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="order-2 lg:order-1">
          <h2
            className={`${display.className} type-section-title text-2xl text-[hsl(var(--primary))] sm:text-3xl`}
          >
            About Me
          </h2>

          <div className="mt-10 space-y-6">
            {profile.journey.map((paragraph) => (
              <p
                key={paragraph}
                className="text-pretty text-base leading-[1.85] text-[hsl(var(--muted-foreground))] sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 text-sm text-[hsl(var(--muted-foreground))]">
            <MapPin className="mt-0.5 size-4 shrink-0 text-[hsl(var(--secondary))]" aria-hidden />
            <span>{locationLine}</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="order-1 lg:order-2">
          <div className="glass-card relative mx-auto max-w-md overflow-hidden rounded-2xl p-2 lg:mx-0 lg:max-w-none">
            <CursorColorReveal
              src={profile.headshot}
              alt={`${profile.preferredName} portrait`}
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="aspect-[4/5] rounded-xl"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
