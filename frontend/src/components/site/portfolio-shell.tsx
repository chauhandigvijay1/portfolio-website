"use client";

import { useMemo, useState } from "react";
import { Command, Menu, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HeroSection } from "@/components/site/hero-section";
import { AboutSection } from "@/components/site/about-section";
import { StackSection } from "@/components/site/stack-section";
import { ProjectsSection } from "@/components/site/projects-section";
import { GithubSection } from "@/components/site/github-section";
import { ContactSection } from "@/components/site/contact-section";
import { ProjectDialog } from "@/components/site/project-dialog";
import { CommandMenu } from "@/components/site/command-menu";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { CursorGlow } from "@/components/site/cursor-glow";
import { usePortfolioStore } from "@/store/portfolio-store";
import type { GithubSummary, PortfolioContent } from "@/types/portfolio";

interface PortfolioShellProps {
  content: PortfolioContent;
  github: GithubSummary;
}

const navigation = [
  { label: "about", href: "#about" },
  { label: "stack", href: "#stack" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export function PortfolioShell({ content, github }: PortfolioShellProps) {
  const selectedProjectSlug = usePortfolioStore((state) => state.selectedProjectSlug);
  const setSelectedProjectSlug = usePortfolioStore((state) => state.setSelectedProjectSlug);
  const setCommandMenuOpen = usePortfolioStore((state) => state.setCommandMenuOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedProject = useMemo(
    () => content.projects.find((project) => project.slug === selectedProjectSlug) || null,
    [content.projects, selectedProjectSlug],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--page-background)] text-[var(--foreground)]">
      <CursorGlow />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(122,162,255,0.11),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(109,224,205,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.25),transparent_24%)] dark:bg-[radial-gradient(circle_at_15%_18%,rgba(122,162,255,0.16),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(109,224,205,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:96px_96px] dark:opacity-20" />

      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-black/8 bg-white/72 px-4 py-3 shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6">
          <a href="#top" className="text-sm font-semibold tracking-[-0.02em] text-[var(--foreground)]">
            Digvijay
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm lowercase text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCommandMenuOpen(true)}
              className="rounded-full border-white/15 bg-white/60 px-3 lowercase shadow-[0_14px_40px_rgba(15,23,42,0.08)] hover:bg-white/80 dark:bg-white/6 dark:hover:bg-white/10"
            >
              <Command className="size-4" />
              quick menu
            </Button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full border-white/15 bg-white/60 shadow-[0_14px_40px_rgba(15,23,42,0.08)] hover:bg-white/80 dark:bg-white/6 dark:hover:bg-white/10"
                  />
                }
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-white/10 bg-[var(--page-panel)] px-0 text-[var(--foreground)] backdrop-blur-2xl"
              >
                <SheetHeader className="px-6 pb-2 pt-6">
                  <SheetTitle className="lowercase">navigation</SheetTitle>
                  <SheetDescription className="lowercase text-[var(--muted-foreground)]">
                    jump through the portfolio or open the command palette.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-2 px-4 py-4">
                  {navigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 text-sm lowercase text-[var(--foreground)]"
                    >
                      <span>{item.label}</span>
                      <MoveRight className="size-4 text-[var(--muted-foreground)]" />
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCommandMenuOpen(true);
                    }}
                    className="flex w-full items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 text-sm lowercase text-[var(--foreground)]"
                  >
                    <span>quick menu</span>
                    <Command className="size-4 text-[var(--muted-foreground)]" />
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <HeroSection profile={content.profile} highlights={content.highlights} />
        <AboutSection profile={content.profile} timeline={content.timeline} />
        <StackSection technologies={content.technologies} projects={content.projects} />
        <ProjectsSection projects={content.projects} technologies={content.technologies} />
        <GithubSection github={github} />
        <ContactSection
          profile={content.profile}
          contact={content.contact}
          certifications={content.certifications}
        />
      </main>

      <footer className="px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[2rem] border border-black/8 bg-white/72 px-5 py-5 text-sm lowercase text-[var(--muted-foreground)] shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6 sm:flex-row sm:items-center sm:justify-between">
          <p>designed and engineered by Digvijay Kumar Singh</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={content.profile.github}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--foreground)]"
            >
              github
            </a>
            <a
              href={content.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--foreground)]"
            >
              linkedin
            </a>
            <a
              href={content.profile.resume}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--foreground)]"
            >
              resume
            </a>
          </div>
        </div>
      </footer>

      <ProjectDialog
        project={selectedProject}
        technologies={content.technologies}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProjectSlug(null);
          }
        }}
      />
      <CommandMenu content={content} />
    </div>
  );
}
