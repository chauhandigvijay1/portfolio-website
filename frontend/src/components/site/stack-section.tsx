"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CornerDownRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { Project, Technology, TechnologyCategory } from "@/types/portfolio";
import {
  categoryLabelMap,
  categoryToneMap,
  fallbackTechIcon,
  techIconMap,
} from "@/components/site/icon-map";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionReveal } from "@/components/site/section-reveal";
import { usePortfolioStore } from "@/store/portfolio-store";
import { cn } from "@/lib/utils";

interface StackSectionProps {
  technologies: Technology[];
  projects: Project[];
}

const orderedCategories: TechnologyCategory[] = [
  "frontend",
  "backend",
  "data",
  "state",
  "integration",
  "deployment",
  "tooling",
];

export function StackSection({ technologies, projects }: StackSectionProps) {
  const [activeCategory, setActiveCategory] = useState<TechnologyCategory>("frontend");
  const activeTechSlug = usePortfolioStore((state) => state.activeTechSlug);
  const setActiveTechSlug = usePortfolioStore((state) => state.setActiveTechSlug);

  const groupedTechnologies = useMemo(
    () =>
      orderedCategories.reduce<Record<TechnologyCategory, Technology[]>>((accumulator, category) => {
        accumulator[category] = technologies.filter((technology) => technology.category === category);
        return accumulator;
      }, {} as Record<TechnologyCategory, Technology[]>),
    [technologies],
  );

  useEffect(() => {
    const availableInCategory = groupedTechnologies[activeCategory];

    if (!availableInCategory.length) {
      return;
    }

    if (!activeTechSlug || !availableInCategory.some((item) => item.slug === activeTechSlug)) {
      setActiveTechSlug(availableInCategory[0]?.slug ?? null);
    }
  }, [activeCategory, activeTechSlug, groupedTechnologies, setActiveTechSlug]);

  const activeTechnology =
    technologies.find((technology) => technology.slug === activeTechSlug) ||
    groupedTechnologies[activeCategory]?.[0] ||
    technologies[0];

  const relatedProjects = useMemo(
    () => projects.filter((project) => activeTechnology.projectSlugs.includes(project.slug)),
    [activeTechnology.projectSlugs, projects],
  );

  return (
    <section id="stack" className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionReveal>
          <SectionHeading
            eyebrow="tech stack"
            title="Each tool here maps back to actual product work, not a decorative badge wall."
            description="Click through the stack to see where it shows up, what it helped implement, and which projects carry that experience."
          />
        </SectionReveal>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <SectionReveal delay={0.08}>
            <Tabs
              value={activeCategory}
              onValueChange={(value) => setActiveCategory(value as TechnologyCategory)}
              className="gap-6"
            >
              <TabsList
                variant="line"
                className="flex w-full flex-wrap justify-start rounded-[1.6rem] bg-transparent p-0"
              >
                {orderedCategories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-full border border-black/8 bg-white/70 px-4 py-2 text-xs lowercase tracking-[0.2em] text-[var(--muted-foreground)] shadow-[0_12px_30px_rgba(15,23,42,0.04)] data-active:border-transparent data-active:bg-[var(--foreground)] data-active:text-[var(--background)] dark:border-white/10 dark:bg-white/6"
                  >
                    {categoryLabelMap[category]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {orderedCategories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {groupedTechnologies[category].map((technology, index) => {
                      const Icon = techIconMap[technology.slug] ?? fallbackTechIcon;
                      const isActive = technology.slug === activeTechnology.slug;

                      return (
                        <motion.button
                          key={technology.slug}
                          type="button"
                          onClick={() => setActiveTechSlug(technology.slug)}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ delay: index * 0.03, duration: 0.45 }}
                          className={cn(
                            "group rounded-[1.8rem] border p-5 text-left shadow-[0_18px_60px_rgba(15,23,42,0.05)] transition-all backdrop-blur-xl",
                            isActive
                              ? "border-transparent bg-[var(--foreground)] text-[var(--background)]"
                              : "border-black/8 bg-white/76 text-[var(--foreground)] hover:-translate-y-1 hover:border-black/12 hover:bg-white dark:border-white/10 dark:bg-white/6 dark:hover:bg-white/8",
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className={cn(
                                "inline-flex rounded-full border px-3 py-3",
                                isActive
                                  ? "border-white/10 bg-white/8"
                                  : "border-black/8 bg-[var(--page-background)] dark:border-white/10",
                              )}
                            >
                              <Icon className="size-5" />
                            </span>
                            <span
                              className={cn(
                                "text-xs font-medium lowercase tracking-[0.24em]",
                                isActive ? "text-white/70" : categoryToneMap[technology.category],
                              )}
                            >
                              {categoryLabelMap[technology.category]}
                            </span>
                          </div>
                          <div className="mt-5 space-y-2">
                            <h3 className="text-lg font-semibold tracking-[-0.04em] lowercase">
                              {technology.name}
                            </h3>
                            <p
                              className={cn(
                                "text-sm leading-7",
                                isActive ? "text-white/72" : "text-[var(--muted-foreground)]",
                              )}
                            >
                              {technology.summary}
                            </p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <div className="rounded-[2rem] border border-black/8 bg-white/76 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6">
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-black/8 bg-[var(--page-background)] p-3 dark:border-white/10">
                  <Sparkles className="size-4 text-[var(--page-accent)]" />
                </div>
                <div>
                  <p className="text-xs font-medium lowercase tracking-[0.24em] text-[var(--muted-foreground)]">
                    active technology
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.05em] lowercase">
                    {activeTechnology.name}
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium lowercase text-[var(--foreground)]">experience</p>
                  <p className="text-base leading-8 text-[var(--muted-foreground)]">
                    {activeTechnology.experience}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium lowercase text-[var(--foreground)]">implemented features</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeTechnology.implementedFeatures.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-[1.4rem] border border-black/8 bg-[var(--page-background)]/75 px-4 py-4 text-sm lowercase text-[var(--foreground)] dark:border-white/10"
                      >
                        <CornerDownRight className="mt-0.5 size-4 shrink-0 text-[var(--page-accent)]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium lowercase text-[var(--foreground)]">
                      related projects
                    </p>
                    {relatedProjects.length ? (
                      <Badge className="rounded-full border border-black/8 bg-[var(--page-background)] px-3 py-1 text-[11px] font-medium lowercase tracking-[0.18em] text-[var(--muted-foreground)] dark:border-white/10">
                        {relatedProjects.length} project
                        {relatedProjects.length > 1 ? "s" : ""}
                      </Badge>
                    ) : null}
                  </div>

                  {relatedProjects.length ? (
                    <div className="space-y-3">
                      {relatedProjects.map((project) => (
                        <a
                          key={project.slug}
                          href={`#project-${project.slug}`}
                          className="group flex items-center justify-between rounded-[1.5rem] border border-black/8 bg-[var(--page-background)] px-4 py-4 transition hover:-translate-y-0.5 dark:border-white/10"
                        >
                          <div>
                            <p className="font-medium lowercase text-[var(--foreground)]">{project.name}</p>
                            <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                              {project.summary}
                            </p>
                          </div>
                          <ArrowRight className="size-4 text-[var(--muted-foreground)] transition group-hover:translate-x-1" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[1.5rem] border border-dashed border-black/10 bg-[var(--page-background)] px-4 py-5 text-sm leading-7 text-[var(--muted-foreground)] dark:border-white/10">
                      This is part of the toolkit I am actively exploring and folding into stronger backend architecture thinking.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
