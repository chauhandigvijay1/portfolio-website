"use client";

import Image from "next/image";
import { ArrowUpRight, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Project, Technology } from "@/types/portfolio";

interface ProjectDialogProps {
  project: Project | null;
  technologies: Technology[];
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({
  project,
  technologies,
  onOpenChange,
}: ProjectDialogProps) {
  const techMap = new Map(technologies.map((technology) => [technology.slug, technology.name]));

  return (
    <Dialog open={Boolean(project)} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--page-panel)] p-0 text-[var(--foreground)] shadow-[0_30px_120px_rgba(15,23,42,0.32)]"
      >
        {project ? (
          <ScrollArea className="max-h-[88vh]">
            <div className="space-y-10 p-6 sm:p-8 lg:p-10">
              <DialogHeader className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-medium lowercase tracking-[0.2em] text-[var(--muted-foreground)]">
                    {project.label}
                  </Badge>
                  <div className="h-px w-12 bg-[linear-gradient(90deg,transparent,var(--page-accent-strong),transparent)]" />
                </div>
                <div className="space-y-4">
                  <DialogTitle className="font-sans text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {project.name}
                  </DialogTitle>
                  <DialogDescription className="max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
                    {project.description}
                  </DialogDescription>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium lowercase text-[var(--background)] shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition hover:translate-y-[-1px] hover:bg-[var(--foreground)]/90"
                  >
                    live demo
                    <ArrowUpRight className="size-4" />
                  </a>
                  <a
                    href={project.links.repository}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-transparent px-5 py-2.5 text-sm font-medium lowercase text-[var(--foreground)] transition hover:bg-white/6"
                  >
                    source code
                    <Link2 className="size-4" />
                  </a>
                </div>
              </DialogHeader>

              <div className="grid gap-4 lg:grid-cols-3">
                {project.images.map((image, index) => (
                  <div
                    key={image}
                    className="overflow-hidden rounded-[1.75rem] border border-black/8 bg-[var(--page-elevated)] p-2 shadow-[0_14px_50px_rgba(15,23,42,0.08)] dark:border-white/10"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
                      <Image
                        src={image}
                        alt={`${project.name} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-7">
                  <section className="space-y-3">
                    <p className="text-xs font-medium lowercase tracking-[0.28em] text-[var(--muted-foreground)]">
                      challenge
                    </p>
                    <p className="text-base leading-8 text-[var(--foreground)]">{project.challenge}</p>
                  </section>

                  <section className="space-y-3">
                    <p className="text-xs font-medium lowercase tracking-[0.28em] text-[var(--muted-foreground)]">
                      solution
                    </p>
                    <p className="text-base leading-8 text-[var(--foreground)]">{project.solution}</p>
                  </section>

                  <section className="space-y-4">
                    <p className="text-xs font-medium lowercase tracking-[0.28em] text-[var(--muted-foreground)]">
                      feature layers
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {project.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-[1.4rem] border border-black/8 bg-white/65 px-4 py-4 text-sm lowercase text-[var(--foreground)] shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/6"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <section className="rounded-[1.75rem] border border-black/8 bg-white/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/6">
                    <p className="mb-4 text-xs font-medium lowercase tracking-[0.28em] text-[var(--muted-foreground)]">
                      stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((slug) => (
                        <Badge
                          key={slug}
                          className="rounded-full border border-black/8 bg-[var(--page-background)] px-3 py-1 lowercase text-[var(--foreground)] dark:border-white/10"
                        >
                          {techMap.get(slug) ?? slug}
                        </Badge>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[1.75rem] border border-black/8 bg-white/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/6">
                    <p className="mb-4 text-xs font-medium lowercase tracking-[0.28em] text-[var(--muted-foreground)]">
                      frontend
                    </p>
                    <ul className="space-y-3 text-sm leading-7 text-[var(--foreground)]">
                      {project.frontendDetails.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-[1.75rem] border border-black/8 bg-white/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/6">
                    <p className="mb-4 text-xs font-medium lowercase tracking-[0.28em] text-[var(--muted-foreground)]">
                      backend
                    </p>
                    <ul className="space-y-3 text-sm leading-7 text-[var(--foreground)]">
                      {project.backendDetails.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </ScrollArea>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
