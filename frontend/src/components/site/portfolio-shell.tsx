"use client";

import { useEffect, useMemo, useState } from "react";
import { Command, Menu } from "lucide-react";
import {
  SocialGithubIcon,
  SocialInstagramIcon,
  SocialLinkedinIcon,
  SocialXIcon,
} from "@/components/site/social-icons";
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
import { ExperienceSection } from "@/components/site/experience-section";
import { ProjectsSection } from "@/components/site/projects-section";
import { GithubSection } from "@/components/site/github-section";
import { ContactSection } from "@/components/site/contact-section";
import { ProjectDialog } from "@/components/site/project-dialog";
import { CommandMenu } from "@/components/site/command-menu";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { CursorGlow } from "@/components/site/cursor-glow";
import { CinematicBackground } from "@/components/site/cinematic-background";
import { IntroLoader } from "@/components/site/intro-loader";
import { usePortfolioStore } from "@/store/portfolio-store";
import type { GithubSummary, PortfolioContent } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface PortfolioShellProps {
  content: PortfolioContent;
  github: GithubSummary;
}

const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

const socialIconMap = {
  github: SocialGithubIcon,
  linkedin: SocialLinkedinIcon,
  x: SocialXIcon,
  instagram: SocialInstagramIcon,
} as const;

export function PortfolioShell({ content, github }: PortfolioShellProps) {
  const selectedProjectSlug = usePortfolioStore((state) => state.selectedProjectSlug);
  const setSelectedProjectSlug = usePortfolioStore((state) => state.setSelectedProjectSlug);
  const setCommandMenuOpen = usePortfolioStore((state) => state.setCommandMenuOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const selectedProject = useMemo(
    () => content.projects.find((project) => project.slug === selectedProjectSlug) || null,
    [content.projects, selectedProjectSlug],
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--page-background)] text-[var(--foreground)]">
      <CinematicBackground />
      <div className="noise-overlay" />
      <CursorGlow />

      {!introDismissed ? (
        <IntroLoader profile={content.profile} onComplete={() => setIntroDismissed(true)} />
      ) : null}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color,box-shadow,padding] duration-[520ms]",
          scrolled
            ? "border-b border-white/[0.05] bg-[#010103]/55 shadow-[0_12px_40px_rgba(0,0,0,0.38)] backdrop-blur-2xl backdrop-saturate-125"
            : "border-b border-transparent bg-transparent",
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10",
            scrolled ? "py-3.5" : "py-5",
          )}
        >
          <a href="#top" className="font-display text-xl tracking-tight text-white sm:text-2xl">
            {content.profile.preferredName}
          </a>

          <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.22em] text-white/50 md:flex">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative py-1 transition-colors duration-300 hover:text-white/95 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-white/40 after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setCommandMenuOpen(true)}
              className="h-9 rounded-full border border-white/10 bg-white/[0.04] px-3 text-[11px] uppercase tracking-[0.2em] text-white/80 hover:bg-white/[0.08]"
            >
              <Command className="mr-2 size-3.5 opacity-70" />
              Menu
            </Button>
            <a
              href={content.profile.resume}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#0a0612] transition hover:bg-white/90",
              )}
            >
              Resume
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={content.profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[#0a0612] transition hover:bg-white/90"
            >
              Resume
            </a>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full border border-white/10 bg-white/[0.04] text-white"
                  />
                }
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-white/10 bg-[#0b0714]/95 text-white backdrop-blur-2xl"
              >
                <SheetHeader className="px-2 pb-2 pt-2">
                  <SheetTitle className="font-display text-2xl tracking-tight">Navigate</SheetTitle>
                  <SheetDescription className="text-sm text-white/55">
                    Jump to a section or open the command palette.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-2 px-2">
                  {navigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm uppercase tracking-[0.18em]"
                    >
                      {item.label}
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCommandMenuOpen(true);
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left text-sm uppercase tracking-[0.18em]"
                  >
                    Quick menu
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <HeroSection profile={content.profile} highlights={content.highlights} />
        <AboutSection profile={content.profile} />
        <StackSection technologies={content.technologies} />
        <ExperienceSection timeline={content.timeline} />
        <ProjectsSection projects={content.projects} technologies={content.technologies} />
        <GithubSection github={github} />
        <ContactSection
          profile={content.profile}
          contact={content.contact}
          certifications={content.certifications}
        />
      </main>

      <footer className="relative z-10 border-t border-[var(--border)] px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="font-display text-2xl tracking-tight text-[var(--foreground)]">
            {content.profile.preferredName}
          </a>
          <div className="flex flex-wrap items-center gap-3">
            {content.contact.socials.map((social) => {
              const key = social.label.toLowerCase() as keyof typeof socialIconMap;
              const Icon = socialIconMap[key];
              if (!Icon) {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] transition hover:border-[var(--foreground)]/20 hover:text-[var(--foreground)]"
                  >
                    {social.label}
                  </a>
                );
              }
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted-foreground)] transition hover:border-[var(--foreground)]/20 hover:text-[var(--foreground)]"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
            <ThemeToggle />
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-center text-[11px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
          © {new Date().getFullYear()} {content.profile.name}. Crafted with intention.
        </p>
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
