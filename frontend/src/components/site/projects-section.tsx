"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SocialGithubIcon } from "@/components/site/social-icons";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionReveal } from "@/components/site/section-reveal";
import { usePortfolioStore } from "@/store/portfolio-store";
import { easePremium } from "@/lib/motion";
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
    <section id="projects" className="section-pad">
      <div className="section-bridge" />
      <div className="section-ambient" />
      <div className="relative mx-auto max-w-6xl space-y-12">
        <SectionReveal>
          <SectionHeading
            align="center"
            eyebrow="My projects"
            title="Flagship builds with deployment discipline and product-level detail."
            description="Each build is presented as a clean surface first, then opens into a deeper case study when you want the implementation layer."
          />
        </SectionReveal>

        {activeTechnology ? (
          <SectionReveal delay={0.05}>
            <div className="glass-card flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[hsl(var(--foreground)/0.8)]">
              <span className="type-section-eyebrow text-[var(--page-accent)]">Filtered</span>
              <span>
                Showing work involving <span className="text-white">{activeTechnology.name}</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveTechSlug(null)}
                className="ml-auto rounded-full border border-white/12 px-4 py-1.5 text-xs tracking-[0.12em] text-white/86 transition duration-300 hover:bg-white/[0.08]"
              >
                Clear
              </button>
            </div>
          </SectionReveal>
        ) : null}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const isRelated = activeTechnology ? project.stack.includes(activeTechnology.slug) : true;

            return (
              <SectionReveal key={project.slug} delay={0.08 + index * 0.04}>
                <motion.article
                  id={`project-${project.slug}`}
                  className={cn("group h-full", !isRelated && "pointer-events-none opacity-40")}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: 0.7, delay: index * 0.05, ease: easePremium }}
                >
                  <motion.div
                    className="project-card relative flex h-full flex-col overflow-hidden rounded-[1.65rem]"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.45, ease: easePremium }}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.05]" />

                    <div className="flex flex-1 flex-col gap-5 p-6 pt-5 sm:p-7 sm:pt-6">
                      <div>
                        <p className="type-section-eyebrow text-[var(--page-accent)]">{project.label}</p>
                        <h3 className="mt-2.5 text-xl font-medium tracking-[-0.01em] text-[hsl(var(--primary))]">
                          {project.name}
                        </h3>
                        <p className="mt-3 text-sm leading-[1.75] text-[hsl(var(--foreground)/0.68)]">
                          {project.summary}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 5).map((slug) => (
                          <span key={slug} className="tech-badge text-[11px]">
                            {techMap.get(slug) ?? slug}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-wrap gap-3 border-t border-white/[0.06] pt-5">
                        <Button
                          type="button"
                          onClick={() => setSelectedProjectSlug(project.slug)}
                          className="btn-glass rounded-full px-5 py-2.5 text-sm font-medium tracking-[0.12em]"
                        >
                          View Project
                        </Button>
                        <a
                          href={project.links.repository}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-sm tracking-[0.12em] text-white/86 transition duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                        >
                          <SocialGithubIcon className="size-4" />
                          Code
                        </a>
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex size-11 items-center justify-center rounded-full border border-white/12 text-white/86 transition duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                          aria-label={`${project.name} live demo`}
                        >
                          <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
