"use client";

import { useEffect } from "react";
import { ArrowUpRight, BriefcaseBusiness, CalendarRange, FileText, Home, Layers3, UserRound } from "lucide-react";
import { SiGithub } from "react-icons/si";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { usePortfolioStore } from "@/store/portfolio-store";
import type { PortfolioContent, Project } from "@/types/portfolio";

interface CommandMenuProps {
  content: PortfolioContent;
}

const sectionCommands = [
  { label: "hero", href: "#top", icon: Home, shortcut: "h" },
  { label: "about", href: "#about", icon: UserRound, shortcut: "a" },
  { label: "skills", href: "#skills", icon: Layers3, shortcut: "s" },
  { label: "experience", href: "#experience", icon: CalendarRange, shortcut: "e" },
  { label: "projects", href: "#projects", icon: BriefcaseBusiness, shortcut: "p" },
  { label: "github", href: "#github", icon: SiGithub, shortcut: "g" },
  { label: "contact", href: "#contact", icon: FileText, shortcut: "c" },
];

function scrollToTarget(href: string) {
  const selector = href === "#top" ? "body" : href;
  const target = document.querySelector(selector);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function ProjectCommandItem({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (href: string) => void;
}) {
  return (
    <CommandItem
      value={project.name}
      onSelect={() => onSelect(`#project-${project.slug}`)}
      className="rounded-2xl px-3 py-3"
    >
      <BriefcaseBusiness className="size-4" />
      <div className="space-y-0.5">
        <p className="font-medium lowercase">{project.name}</p>
        <p className="text-xs text-muted-foreground">{project.summary}</p>
      </div>
    </CommandItem>
  );
}

export function CommandMenu({ content }: CommandMenuProps) {
  const commandMenuOpen = usePortfolioStore((state) => state.commandMenuOpen);
  const setCommandMenuOpen = usePortfolioStore((state) => state.setCommandMenuOpen);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandMenuOpen(!commandMenuOpen);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commandMenuOpen, setCommandMenuOpen]);

  const handleSelect = (href: string, external = false) => {
    setCommandMenuOpen(false);

    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    scrollToTarget(href);
  };

  return (
    <CommandDialog
      open={commandMenuOpen}
      onOpenChange={setCommandMenuOpen}
      className="max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--page-panel)] p-0 text-[var(--foreground)] shadow-[0_24px_100px_rgba(15,23,42,0.24)] backdrop-blur-2xl"
    >
      <Command className="rounded-[2rem] border-0 bg-transparent p-3">
        <CommandInput
          placeholder="jump to a section, project, or link"
          className="placeholder:text-[var(--muted-foreground)]"
        />
        <CommandList className="max-h-[66vh] px-2 pb-2">
          <CommandEmpty className="py-8 text-[var(--muted-foreground)]">
            nothing matched that command.
          </CommandEmpty>

          <CommandGroup heading="sections">
            {sectionCommands.map((section) => {
              const Icon = section.icon;

              return (
                <CommandItem
                  key={section.label}
                  value={section.label}
                  onSelect={() => handleSelect(section.href)}
                  className="rounded-2xl px-3 py-3"
                >
                  <Icon className="size-4" />
                  <span className="lowercase">{section.label}</span>
                  <CommandShortcut>{section.shortcut}</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="projects">
            {content.projects.map((project) => (
              <ProjectCommandItem key={project.slug} project={project} onSelect={handleSelect} />
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="links">
            <CommandItem
              value="resume"
              onSelect={() => handleSelect(content.profile.resume, true)}
              className="rounded-2xl px-3 py-3"
            >
              <FileText className="size-4" />
              <span className="lowercase">resume</span>
              <ArrowUpRight className="ml-auto size-4 text-muted-foreground" />
            </CommandItem>
            <CommandItem
              value="github"
              onSelect={() => handleSelect(content.profile.github, true)}
              className="rounded-2xl px-3 py-3"
            >
              <ArrowUpRight className="size-4" />
              <span className="lowercase">github</span>
            </CommandItem>
            <CommandItem
              value="linkedin"
              onSelect={() => handleSelect(content.profile.linkedin, true)}
              className="rounded-2xl px-3 py-3"
            >
              <ArrowUpRight className="size-4" />
              <span className="lowercase">linkedin</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
