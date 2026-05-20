"use client";

import { motion } from "framer-motion";
import { easePremium } from "@/lib/motion";
import type { TimelineItem } from "@/types/portfolio";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionReveal } from "@/components/site/section-reveal";

interface ExperienceSectionProps {
  timeline: TimelineItem[];
}

export function ExperienceSection({ timeline }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section-pad">
      <div className="section-bridge" />
      <div className="section-ambient" />
      <div className="mx-auto max-w-3xl space-y-14">
        <SectionReveal>
          <SectionHeading
            align="center"
            eyebrow="Experience"
            title="A timeline of momentum, depth, and deliberate product building."
            description="Each stage reflects how my engineering practice matured through structured study and consistent shipping."
          />
        </SectionReveal>

        <div className="space-y-5">
          {timeline.map((item, index) => (
            <SectionReveal key={item.title} delay={0.06 + index * 0.05}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: easePremium }}
                className="glass-panel glass-panel-interactive rounded-[1.35rem] p-6 sm:rounded-[1.65rem] sm:p-8"
              >
                <p className="type-section-eyebrow text-[var(--page-accent)]">{item.year}</p>
                <h3 className="mt-4 font-sans text-xl font-medium tracking-tight text-white sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
                  {item.description}
                </p>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
