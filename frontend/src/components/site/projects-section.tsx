"use client";

import Image from "next/image";
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
            description="Each card opens into a deeper case study while live links stay one tap away."
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
                className="ml-auto rounded-full border border-white/15 px-4 py-1.5 text-xs tracking-wide text-white/90 transition duration-300 hover:bg-white/10"
              >
                Clear
              </button>
            </div>
          </SectionReveal>
        ) : null}

        <SectionReveal delay={0.08}>
          <div className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 pt-2 sm:-mx-8 sm:px-8 lg:-mx-16 lg:px-16">
            {projects.map((project, index) => {
              const isRelated = activeTechnology ? project.stack.includes(activeTechnology.slug) : true;

              return (
                <motion.article
                  key={project.slug}
                  id={`project-${project.slug}`}
                  style={{ scrollSnapAlign: "start" }}
                  className={cn(
                    "group w-[min(100%,22rem)] shrink-0 snap-start sm:w-[26rem]",
                    !isRelated && "pointer-events-none opacity-40",
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.05, ease: easePremium }}
                >
                  <motion.div
                    className="project-card relative flex h-full flex-col overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.5, ease: easePremium }}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.05]" />
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <Image
                        src={project.images[0]}
                        alt={`${project.name} preview`}
                        fill
                        priority={index === 0}
                        className="object-cover transition duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 90vw, 26rem"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06040c]/88 via-[#06040c]/12 to-transparent transition-opacity duration-500 group-hover:from-[#06040c]/72" />
                      <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="project-card-shine absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                      <div>
                        <p className="type-section-eyebrow text-[var(--page-accent)]">{project.label}</p>
                        <h3 className="mt-2.5 text-xl font-medium tracking-[-0.01em] text-[hsl(var(--primary))]">
                          {project.name}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-[1.7] text-[var(--muted-foreground)]">
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
                          className="btn-glass flex-1 rounded-full py-2.5 text-sm font-medium tracking-wide sm:flex-none"
                        >
                          View
                        </Button>
                        <a
                          href={project.links.repository}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/14 bg-transparent py-2.5 text-sm tracking-wide text-white/88 transition duration-300 hover:border-white/24 hover:bg-white/[0.06] sm:flex-none sm:px-5"
                        >
                          <SocialGithubIcon className="size-4" />
                          GitHub
                        </a>
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex size-11 items-center justify-center rounded-full border border-white/14 text-white/88 transition duration-300 hover:border-white/24 hover:bg-white/[0.06]"
                          aria-label={`${project.name} live demo`}
                        >
                          <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
