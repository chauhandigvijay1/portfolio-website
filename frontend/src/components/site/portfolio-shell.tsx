"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Command, Menu } from "lucide-react";
import { motion } from "framer-motion";
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
import { AtmosphericBackground } from "@/components/site/atmospheric-background";
import { IntroLoader } from "@/components/site/intro-loader";
import { DigvijayLogo } from "@/components/site/digvijay-logo";
import { usePortfolioStore } from "@/store/portfolio-store";
import { nameFont } from "@/app/fonts";
import { easePremium } from "@/lib/motion";
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
  const [introComplete, setIntroComplete] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const selectedProject = useMemo(
    () => content.projects.find((project) => project.slug === selectedProjectSlug) || null,
    [content.projects, selectedProjectSlug],
  );

  useEffect(() => {
    if (!introComplete) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100 && !navScrolled) {
        setNavScrolled(true);
      } else if (currentScrollY <= 100 && navScrolled) {
        setNavScrolled(false);
      }

      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setNavVisible(false);
        setMobileMenuOpen(false);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navScrolled, introComplete]);

  if (!introComplete) {
    return <IntroLoader profile={content.profile} onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <motion.div
      className="relative min-h-screen overflow-x-hidden text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: easePremium }}
    >
      <AtmosphericBackground />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,opacity,background,backdrop-filter,border-color] duration-500",
          navVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10",
            navScrolled ? "py-3" : "py-5",
          )}
        >
          <a href="#top" className="group flex items-center gap-3">
            <DigvijayLogo size={36} className="transition-transform duration-500 group-hover:scale-105" />
            <span
              className={cn(
                nameFont.className,
                "hidden text-lg tracking-wide text-[hsl(var(--primary))] sm:inline sm:text-xl",
              )}
            >
              {content.profile.preferredName}
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm tracking-wide text-[hsl(var(--foreground)/0.65)] transition-colors duration-300 hover:text-[hsl(var(--primary))]"
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
              className="btn-glass h-9 rounded-full px-4 text-xs tracking-wide"
            >
              <Command className="mr-2 size-3.5 opacity-70" />
              Menu
            </Button>
            <a
              href={content.profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-glass inline-flex h-9 items-center justify-center rounded-full px-5 text-xs font-medium tracking-wide"
            >
              Resume
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={content.profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-glass inline-flex h-9 items-center justify-center rounded-full px-4 text-xs tracking-wide"
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
                    className="btn-glass rounded-full text-foreground"
                  />
                }
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="right" className="glass-panel border-[hsl(var(--glass-border))] text-foreground">
                <SheetHeader className="px-2 pb-2 pt-2">
                  <SheetTitle className="flex items-center gap-3">
                    <DigvijayLogo size={28} />
                    <span className={cn(nameFont.className, "text-2xl tracking-wide")}>Navigate</span>
                  </SheetTitle>
                  <SheetDescription className="text-sm text-[hsl(var(--muted-foreground))]">
                    Jump to a section or open the command palette.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-2 px-2">
                  {navigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="glass-card block rounded-2xl px-4 py-4 text-sm tracking-wide"
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
                    className="glass-card w-full rounded-2xl px-4 py-4 text-left text-sm tracking-wide"
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
        <HeroSection profile={content.profile} />
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

      <footer className="relative z-10 border-t border-[hsl(var(--border))] px-5 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="flex items-center gap-3">
            <DigvijayLogo size={32} />
            <span className={cn(nameFont.className, "text-2xl tracking-wide text-[hsl(var(--primary))]")}>
              {content.profile.preferredName}
            </span>
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
                    className="tech-badge rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]"
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
                  className="glass-card flex size-11 items-center justify-center rounded-full text-[hsl(var(--foreground)/0.8)]"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
            <ThemeToggle />
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-center text-xs tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
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
    </motion.div>
  );
}
