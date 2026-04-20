"use client";

import { ArrowUpRight, GitBranchPlus } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { GithubSummary } from "@/types/portfolio";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionReveal } from "@/components/site/section-reveal";

interface GithubSectionProps {
  github: GithubSummary;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function GithubSection({ github }: GithubSectionProps) {
  if (!github.user) {
    return null;
  }

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionReveal>
          <SectionHeading
            eyebrow="github"
            title="GitHub, kept focused."
            description="A cleaner look at the public side of my work: selected repositories and recent activity without the extra profile noise."
          />
        </SectionReveal>

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionReveal delay={0.06}>
            <div className="rounded-[2.1rem] border border-black/8 bg-white/76 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6">
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-2xl border border-black/8 bg-[var(--page-background)] p-4 text-[var(--foreground)] dark:border-white/10">
                    <SiGithub className="size-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium lowercase tracking-[0.24em] text-[var(--muted-foreground)]">
                      @{github.user.login}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                      public build trail
                    </h3>
                    <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                      I use GitHub to document product work, keep repositories public, and make the implementation side of my projects easy to inspect.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-black/8 bg-[var(--page-background)] px-4 py-5 dark:border-white/10">
                    <p className="text-xs font-medium lowercase tracking-[0.24em] text-[var(--muted-foreground)]">
                      repos
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
                      {github.user.publicRepos}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-black/8 bg-[var(--page-background)] px-4 py-5 dark:border-white/10">
                    <p className="text-xs font-medium lowercase tracking-[0.24em] text-[var(--muted-foreground)]">
                      recent updates
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
                      {github.recentEvents.length}
                    </p>
                  </div>
                </div>

                <a
                  href={github.user.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium lowercase text-[var(--foreground)] transition hover:text-[var(--page-accent)]"
                >
                  open GitHub profile
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </SectionReveal>

          <div className="space-y-6">
            <SectionReveal delay={0.1}>
              <div className="rounded-[2rem] border border-black/8 bg-white/76 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6">
                <div className="mb-5 flex items-center gap-3">
                  <SiGithub className="size-4 text-[var(--page-accent)]" />
                  <p className="text-sm font-medium lowercase text-[var(--foreground)]">selected repositories</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {github.topRepos.length ? (
                    github.topRepos.slice(0, 4).map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.5rem] border border-black/8 bg-[var(--page-background)] px-4 py-4 transition hover:-translate-y-1 dark:border-white/10"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium lowercase text-[var(--foreground)]">{repo.name}</p>
                            <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                              {repo.description || "public repository"}
                            </p>
                          </div>
                          <ArrowUpRight className="mt-1 size-4 shrink-0 text-[var(--muted-foreground)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <div className="mt-4 flex items-center gap-3 text-xs lowercase tracking-[0.18em] text-[var(--muted-foreground)]">
                          <span>{repo.language || "mixed"}</span>
                          <span>updated {formatDate(repo.updatedAt)}</span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="rounded-[1.5rem] border border-dashed border-black/10 bg-[var(--page-background)] px-4 py-5 text-sm leading-7 text-[var(--muted-foreground)] dark:border-white/10 sm:col-span-2">
                      Repository data will appear here when GitHub is reachable.
                    </div>
                  )}
                </div>
              </div>
            </SectionReveal>

            {github.recentEvents.length ? (
              <SectionReveal delay={0.14}>
                <div className="rounded-[2rem] border border-black/8 bg-white/76 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6">
                  <div className="mb-5 flex items-center gap-3">
                    <GitBranchPlus className="size-4 text-[var(--page-accent)]" />
                    <p className="text-sm font-medium lowercase text-[var(--foreground)]">recent activity</p>
                  </div>

                  <div className="space-y-3">
                    {github.recentEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="rounded-[1.4rem] border border-black/8 bg-[var(--page-background)] px-4 py-4 dark:border-white/10"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium lowercase text-[var(--foreground)]">
                              {event.action}
                            </p>
                            <p className="mt-1 text-sm leading-7 text-[var(--muted-foreground)]">
                              {event.repo}
                            </p>
                          </div>
                          <p className="text-xs lowercase tracking-[0.18em] text-[var(--muted-foreground)]">
                            {formatDate(event.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
