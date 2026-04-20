"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Layers3, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionReveal } from "@/components/site/section-reveal";
import { usePortfolioStore } from "@/store/portfolio-store";
import type { Project, Technology } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
  projects: Project[];
  technologies: Technology[];
}

export function ProjectsSection({ projects, technologies }: ProjectsSectionProps) {
  const activeTechSlug = usePortfolioStore((state) => state.activeTechSlug);
  const setActiveTechSlug = usePortfolioStore((state) => state.setActiveTechSlug);
  const setSelectedProjectSlug = usePortfolioStore((state) => state.setSelectedProjectSlug);

  const activeTechnology = technologies.find((technology) => technology.slug === activeTechSlug) || null;
  const techMap = new Map(technologies.map((technology) => [technology.slug, technology.name]));

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionReveal>
          <SectionHeading
            eyebrow="projects"
            title="Three flagship builds, each shaped like a product case study instead of a throwaway card."
            description="These are the projects that best represent how I approach interface systems, backend structure, integrations, deployment, and product detail."
          />
        </SectionReveal>

        {activeTechnology ? (
          <SectionReveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-3 rounded-[1.6rem] border border-black/8 bg-white/76 px-4 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6">
              <Badge className="rounded-full border border-black/8 bg-[var(--page-background)] px-3 py-1 text-[11px] font-medium lowercase tracking-[0.2em] text-[var(--muted-foreground)] dark:border-white/10">
                active filter
              </Badge>
              <p className="text-sm lowercase text-[var(--foreground)]">
                showing where <span className="font-medium">{activeTechnology.name}</span> appears across the work
              </p>
              <button
                type="button"
                onClick={() => setActiveTechSlug(null)}
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-black/8 bg-[var(--page-background)] px-3 py-2 text-sm lowercase text-[var(--foreground)] transition hover:bg-white dark:border-white/10 dark:hover:bg-white/8"
              >
                clear filter
                <X className="size-4" />
              </button>
            </div>
          </SectionReveal>
        ) : null}

        <div className="space-y-8">
          {projects.map((project, index) => {
            const isRelated = activeTechnology ? project.stack.includes(activeTechnology.slug) : true;

            return (
              <SectionReveal key={project.slug} delay={index * 0.06}>
                <motion.article
                  id={`project-${project.slug}`}
                  whileHover={{ y: -3 }}
                  className={cn(
                    "overflow-hidden rounded-[2.3rem] border p-4 shadow-[0_30px_100px_rgba(15,23,42,0.08)] transition-all backdrop-blur-2xl sm:p-6 lg:p-8",
                    isRelated
                      ? "border-black/8 bg-white/82 dark:border-white/10 dark:bg-white/6"
                      : "border-black/5 bg-white/48 opacity-65 dark:border-white/8 dark:bg-white/4",
                  )}
                >
                  <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                    <div className={cn(index % 2 === 1 && "lg:order-2")}>
                      <div
                        className="relative overflow-hidden rounded-[2rem] p-3"
                        style={{
                          background: `linear-gradient(145deg, ${project.palette[0]}20, ${project.palette[1]}18, transparent)`,
                        }}
                      >
                        <div className="grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
                          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-black/10">
                            <div className="relative aspect-[4/3]">
                              <Image
                                src={project.images[0]}
                                alt={`${project.name} primary screenshot`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                              />
                            </div>
                          </div>

                          <div className="grid gap-3">
                            {project.images.slice(1).map((image) => (
                              <div
                                key={image}
                                className="relative overflow-hidden rounded-[1.3rem] border border-white/12 bg-black/10"
                              >
                                <div className="relative aspect-[4/3]">
                                  <Image
                                    src={image}
                                    alt={`${project.name} supporting screenshot`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 20vw"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={cn("space-y-6", index % 2 === 1 && "lg:order-1")}>
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className="rounded-full border border-black/8 bg-[var(--page-background)] px-3 py-1 text-[11px] font-medium lowercase tracking-[0.2em] text-[var(--muted-foreground)] dark:border-white/10">
                          {project.label}
                        </Badge>
                        <div className="hidden h-px w-12 bg-[linear-gradient(90deg,transparent,var(--page-accent),transparent)] sm:block" />
                        <p className="text-xs lowercase tracking-[0.24em] text-[var(--muted-foreground)]">
                          {project.deployment.frontend} + {project.deployment.backend}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-balance text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-4xl">
                          {project.name}
                        </h3>
                        <p className="text-pretty text-base leading-8 text-[var(--muted-foreground)]">
                          {project.summary}
                        </p>
                        <p className="text-sm leading-7 text-[var(--muted-foreground)]">{project.solution}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 8).map((slug) => (
                          <span
                            key={slug}
                            className="rounded-full border border-black/8 bg-[var(--page-background)] px-3 py-1.5 text-xs lowercase text-[var(--foreground)] dark:border-white/10"
                          >
                            {techMap.get(slug) ?? slug}
                          </span>
                        ))}
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {project.architectureHighlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="rounded-[1.4rem] border border-black/8 bg-[var(--page-background)]/80 px-4 py-4 text-sm lowercase text-[var(--foreground)] dark:border-white/10"
                          >
                            <div className="flex items-start gap-3">
                              <Layers3 className="mt-0.5 size-4 shrink-0 text-[var(--page-accent)]" />
                              <span>{highlight}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          type="button"
                          onClick={() => setSelectedProjectSlug(project.slug)}
                          className="rounded-full bg-[var(--foreground)] px-5 lowercase text-[var(--background)] shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:translate-y-[-1px] hover:bg-[var(--foreground)]/92"
                        >
                          open case study
                          <ArrowRight className="size-4" />
                        </Button>
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/80 px-5 py-2.5 text-sm font-medium lowercase text-[var(--foreground)] transition hover:bg-white dark:border-white/10 dark:bg-white/6 dark:hover:bg-white/10"
                        >
                          visit live
                          <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
