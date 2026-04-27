"use client";

import { useMemo } from "react";
import { display } from "@/app/fonts";
import type { Technology, TechnologyCategory } from "@/types/portfolio";
import { fallbackTechVisual, techVisualMap } from "@/components/site/icon-map";
import { SectionReveal } from "@/components/site/section-reveal";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  technologies: Technology[];
}

const groupedCategories: TechnologyCategory[][] = [
  ["frontend", "state"],
  ["backend", "data", "integration"],
  ["tooling", "deployment"],
];

function buildRows(technologies: Technology[]) {
  const rows = groupedCategories
    .map((categories) => technologies.filter((technology) => categories.includes(technology.category)))
    .filter((row) => row.length > 0);

  if (rows.length >= 3) {
    return rows;
  }

  const size = Math.ceil(technologies.length / 3);
  return [technologies.slice(0, size), technologies.slice(size, size * 2), technologies.slice(size * 2)].filter(
    (row) => row.length > 0,
  );
}

function SkillItem({ technology }: { technology: Technology }) {
  const visual = techVisualMap[technology.slug] ?? fallbackTechVisual;
  const Icon = visual.icon;

  return (
    <div className="group flex shrink-0 items-center gap-3 px-4 py-2.5">
      <span className="relative flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition duration-300 group-hover:border-white/18 group-hover:bg-white/[0.07]">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 blur-[18px] transition duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle, ${visual.glow} 0%, transparent 72%)` }}
        />
        <Icon
          className="relative size-5 grayscale transition duration-300 group-hover:scale-[1.08] group-hover:grayscale-0"
          style={{ color: visual.color, opacity: 0.82 }}
        />
      </span>
      <span className="whitespace-nowrap text-sm font-medium tracking-[0.08em] text-white/56 transition duration-300 group-hover:text-white/92">
        {technology.name}
      </span>
    </div>
  );
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
    <div className="marquee-mask relative overflow-hidden py-2">
      <div className={cn("marquee-track flex w-max gap-8 pr-8", animationClass)}>
        {doubled.map((technology, index) => (
          <SkillItem key={`${technology.slug}-${index}`} technology={technology} />
        ))}
      </div>
    </div>
  );
}

export function StackSection({ technologies }: SkillsSectionProps) {
  const rows = useMemo(() => buildRows(technologies), [technologies]);

  return (
    <section id="skills" className="section-pad overflow-hidden">
      <div className="section-bridge" />
      <div className="section-ambient" />
      <div className="relative mx-auto max-w-6xl space-y-14">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className={`${display.className} type-section-title text-2xl text-[hsl(var(--primary))] sm:text-3xl`}
            >
              My Skills
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-[hsl(var(--foreground)/0.72)] sm:text-lg">
              A continuous ribbon of the stack behind the products I build, deploy, and refine end to end.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="space-y-3">
            {rows.map((row, index) => (
              <MarqueeRow
                key={`${row[0]?.slug ?? "row"}-${index}`}
                items={row}
                direction={index % 2 === 0 ? "right" : "left"}
              />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
