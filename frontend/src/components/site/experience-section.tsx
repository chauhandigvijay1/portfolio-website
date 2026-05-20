"use client";

import { display } from "@/app/fonts";
import type { TimelineItem } from "@/types/portfolio";
import { SectionReveal } from "@/components/site/section-reveal";

interface ExperienceSectionProps {
  timeline: TimelineItem[];
}

export function ExperienceSection({ timeline }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section-pad">
      <div className="section-bridge" />
      <div className="mx-auto max-w-3xl space-y-14">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className={`${display.className} type-section-title text-2xl text-[hsl(var(--primary))] sm:text-3xl`}
            >
              Experience
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-lg">
              Each stage reflects how my engineering practice matured through structured study and consistent
              shipping.
            </p>
          </div>
        </SectionReveal>

        <div className="relative space-y-0">
          <div
            aria-hidden
            className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[hsl(var(--secondary)/0.5)] via-[hsl(var(--primary)/0.2)] to-transparent"
          />
          {timeline.map((item, index) => (
            <SectionReveal key={item.title} delay={0.06 + index * 0.05}>
              <article className="relative flex gap-6 pb-10 last:pb-0">
                <div className="timeline-dot relative z-10 mt-1.5 size-[22px] shrink-0 rounded-full" />
                <div className="glass-card flex-1 rounded-2xl p-6 sm:p-7">
                  <p className="font-mono text-xs tracking-wide text-[hsl(var(--secondary))]">{item.year}</p>
                  <h3 className="mt-3 text-lg font-medium tracking-tight text-[hsl(var(--primary))] sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-base">
                    {item.description}
                  </p>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
