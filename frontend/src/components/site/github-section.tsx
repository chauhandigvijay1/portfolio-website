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
    <section id="github" className="section-pad">
      <div className="section-bridge" />
      <div className="mx-auto max-w-6xl space-y-12">
        <SectionReveal>
          <SectionHeading
            align="center"
            eyebrow="GitHub"
            title="Public repositories and recent motion on the graph."
            description="A quieter lens on the work behind the projects: repositories, languages, and the cadence of commits."
          />
        </SectionReveal>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <SectionReveal delay={0.06}>
            <div className="glass-card h-full rounded-[1.65rem] p-7 sm:p-8">
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-white">
                    <SiGithub className="size-7" />
                  </div>
                  <div className="space-y-2">
                    <p className="type-section-eyebrow text-[var(--page-accent)]">@{github.user.login}</p>
                    <h3 className="font-sans text-2xl font-medium tracking-tight text-white">Public build trail</h3>
                    <p className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
                      I use GitHub to document product work, keep repositories public, and make the implementation side of
                      my projects easy to inspect.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
                    <p className="type-section-eyebrow text-[var(--muted-foreground)]">Repos</p>
                    <p className="mt-3 font-sans text-3xl font-medium tracking-tight text-white">
                      {github.user.publicRepos}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
                    <p className="type-section-eyebrow text-[var(--muted-foreground)]">Recent updates</p>
                    <p className="mt-3 font-sans text-3xl font-medium tracking-tight text-white">
                      {github.recentEvents.length}
                    </p>
                  </div>
                </div>

                <a
                  href={github.user.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm tracking-wide text-white/90 transition hover:text-[var(--page-accent)]"
                >
                  Open GitHub profile
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </SectionReveal>

          <div className="space-y-6">
            <SectionReveal delay={0.1}>
              <div className="glass-card rounded-[1.65rem] p-7 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <SiGithub className="size-4 text-[var(--page-accent)]" />
                  <p className="type-section-eyebrow text-white/80">Selected repositories</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {github.topRepos.length ? (
                    github.topRepos.slice(0, 4).map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium tracking-tight text-white">{repo.name}</p>
                            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                              {repo.description || "Public repository"}
                            </p>
                          </div>
                          <ArrowUpRight className="mt-1 size-4 shrink-0 text-[var(--muted-foreground)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                          <span>{repo.language || "Mixed"}</span>
                          <span>Updated {formatDate(repo.updatedAt)}</span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-6 text-sm leading-relaxed text-[var(--muted-foreground)] sm:col-span-2">
                      Repository data will appear here when GitHub is reachable.
                    </div>
                  )}
                </div>
              </div>
            </SectionReveal>

            {github.recentEvents.length ? (
              <SectionReveal delay={0.14}>
                <div className="glass-card rounded-[1.65rem] p-7 sm:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <GitBranchPlus className="size-4 text-[var(--page-accent)]" />
                    <p className="type-section-eyebrow text-white/80">Recent activity</p>
                  </div>

                  <div className="space-y-3">
                    {github.recentEvents.slice(0, 4).map((event) => (
                      <div
                        key={event.id}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium tracking-tight text-white">{event.action}</p>
                            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{event.repo}</p>
                          </div>
                          <p className="type-section-eyebrow text-[var(--muted-foreground)]">
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
