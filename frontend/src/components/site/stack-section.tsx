"use client";

import { useMemo } from "react";
import type { Technology } from "@/types/portfolio";
import { fallbackTechIcon, techIconMap } from "@/components/site/icon-map";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionReveal } from "@/components/site/section-reveal";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  technologies: Technology[];
}

function MarqueeRow({
  items,
  direction,
  durationClass,
}: {
  items: Technology[];
  direction: "left" | "right";
  durationClass: string;
}) {
  const doubled = [...items, ...items];
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="marquee-mask relative overflow-hidden py-3.5">
      <div
        className={cn(
          "marquee-track flex w-max gap-5 pr-5",
          animationClass,
          durationClass,
        )}
      >
        {doubled.map((technology, index) => (
          <div
            key={`${technology.slug}-${index}`}
            className="flex shrink-0 items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.035] px-5 py-2.5 opacity-90 backdrop-blur-md transition-opacity duration-300 hover:opacity-100"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white/75">
              <IconFor slug={technology.slug} />
            </span>
            <span className="whitespace-nowrap text-sm tracking-[0.02em] text-white/80">
              {technology.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IconFor({ slug }: { slug: string }) {
  const Icon = techIconMap[slug] ?? fallbackTechIcon;
  return <Icon className="size-4" />;
}

export function StackSection({ technologies }: SkillsSectionProps) {
  const { rowA, rowB } = useMemo(() => {
    const midpoint = Math.ceil(technologies.length / 2);
    return {
      rowA: technologies.slice(0, midpoint),
      rowB: technologies.slice(midpoint),
    };
  }, [technologies]);

  return (
    <section id="skills" className="section-pad">
      <div className="section-bridge" />
      <div className="relative mx-auto max-w-6xl space-y-12">
        <SectionReveal>
          <SectionHeading
            align="center"
            eyebrow="My skills"
            title="Tools that show up in real repositories, deployments, and product flows."
            description="A continuous ribbon of the stack I reach for when building full-stack products end to end."
          />
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="glass-panel relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-white/[0.02]" />
            <div className="skills-ambient-sheen pointer-events-none absolute inset-0 mix-blend-soft-light" />
            <div className="relative space-y-0.5 py-3">
              <MarqueeRow items={rowA} direction="left" durationClass="[animation-duration:62s]" />
              <MarqueeRow
                items={rowB.length ? rowB : rowA}
                direction="right"
                durationClass="[animation-duration:70s]"
              />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
