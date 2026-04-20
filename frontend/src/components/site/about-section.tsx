"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import type { Profile, TimelineItem } from "@/types/portfolio";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionReveal } from "@/components/site/section-reveal";

interface AboutSectionProps {
  profile: Profile;
  timeline: TimelineItem[];
}

export function AboutSection({ profile, timeline }: AboutSectionProps) {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <SectionReveal className="space-y-8">
          <SectionHeading
            eyebrow="about"
            title="I learn by shipping, restructuring, deploying, and refining until the interface finally feels honest."
            description={profile.tagline}
          />

          <div className="overflow-hidden rounded-[2.2rem] border border-black/8 bg-white/76 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6">
            <div className="grid gap-6 sm:grid-cols-[0.72fr_1.28fr]">
              <div className="relative overflow-hidden rounded-[1.7rem] bg-[linear-gradient(145deg,rgba(243,244,246,0.8),rgba(224,231,255,0.9))] p-3 dark:bg-[linear-gradient(145deg,rgba(14,18,28,0.78),rgba(20,28,45,0.92))]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={profile.headshot}
                    alt={`${profile.preferredName} portrait`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
              </div>

              <div className="space-y-5 px-1 py-2">
                {profile.journey.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-pretty text-base leading-8 text-[var(--muted-foreground)]"
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="flex flex-wrap gap-2 pt-2">
                  {profile.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-black/8 bg-[var(--page-background)] px-3 py-2 text-sm lowercase text-[var(--foreground)] dark:border-white/10"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="space-y-6">
          <SectionReveal delay={0.08}>
            <div className="rounded-[2rem] border border-black/8 bg-white/76 p-6 shadow-[0_26px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium lowercase tracking-[0.28em] text-[var(--muted-foreground)]">
                    education
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                    {profile.education.degree}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                    {profile.education.institution}
                    <br />
                    {profile.education.duration} · cgpa {profile.education.cgpa}
                  </p>
                </div>
                <div className="rounded-full border border-black/8 bg-[var(--page-background)] p-3 text-[var(--foreground)] dark:border-white/10">
                  <GraduationCap className="size-5" />
                </div>
              </div>
            </div>
          </SectionReveal>

          <div className="space-y-4">
            {timeline.map((item, index) => (
              <SectionReveal key={item.title} delay={0.1 + index * 0.04}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden rounded-[1.8rem] border border-black/8 bg-white/76 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/6"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-[linear-gradient(180deg,var(--page-accent),transparent)]" />
                  <div className="flex items-start justify-between gap-5">
                    <div className="space-y-3">
                      <p className="text-xs font-medium lowercase tracking-[0.28em] text-[var(--muted-foreground)]">
                        {item.year}
                      </p>
                      <h3 className="text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-7 text-[var(--muted-foreground)]">{item.description}</p>
                    </div>
                    <Sparkles className="mt-1 size-4 shrink-0 text-[var(--page-accent)]" />
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
