"use client";

import { useMemo } from "react";
import { display } from "@/app/fonts";
import type { Technology } from "@/types/portfolio";
import { fallbackTechIcon, techIconMap } from "@/components/site/icon-map";
import { SectionReveal } from "@/components/site/section-reveal";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  technologies: Technology[];
}

function MarqueeRow({
  items,
  direction,
}: {
  items: Technology[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="marquee-mask relative overflow-hidden py-3">
      <div className={cn("marquee-track flex w-max gap-4 pr-4", animationClass)}>
        {doubled.map((technology, index) => (
          <div
            key={`${technology.slug}-${index}`}
            className="tech-badge flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2"
          >
            <span className="flex size-7 items-center justify-center rounded-full border border-[hsl(var(--primary)/0.25)]">
              <IconFor slug={technology.slug} />
            </span>
            <span className="whitespace-nowrap">{technology.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IconFor({ slug }: { slug: string }) {
  const Icon = techIconMap[slug] ?? fallbackTechIcon;
  return <Icon className="size-3.5" />;
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
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className={`${display.className} type-section-title text-2xl text-[hsl(var(--primary))] sm:text-3xl`}
            >
              My Skills
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-lg">
              A continuous ribbon of the stack I reach for when building full-stack products end to end.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="glass-card overflow-hidden rounded-2xl py-2">
            <MarqueeRow items={rowA} direction="right" />
            <MarqueeRow items={rowB.length ? rowB : rowA} direction="left" />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
