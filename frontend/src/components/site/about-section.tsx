"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Profile } from "@/types/portfolio";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionReveal } from "@/components/site/section-reveal";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const locationLine = `${profile.education.institution} · ${profile.education.duration}`;

  return (
    <section id="about" className="section-pad">
      <div className="section-bridge" />
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:items-start lg:gap-20">
        <SectionReveal className="order-2 lg:order-1">
          <SectionHeading
            eyebrow="About me"
            title="Engineering with patience, clarity, and a bias toward shipped work."
            description={profile.tagline}
          />

          <div className="mt-12 space-y-6">
            {profile.journey.map((paragraph) => (
              <p
                key={paragraph}
                className="text-pretty text-base leading-[1.85] text-[var(--muted-foreground)] sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-3 text-sm text-[var(--muted-foreground)]">
            <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--page-accent)]" aria-hidden />
            <span>{locationLine}</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),transparent_65%)] opacity-80 blur-2xl"
            />
            <div className="glass-panel relative overflow-hidden rounded-[1.75rem] p-2 sm:rounded-[2rem] sm:p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] sm:rounded-[1.65rem]">
                <Image
                  src={profile.headshot}
                  alt={`${profile.preferredName} portrait`}
                  fill
                  className="object-cover object-top grayscale contrast-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                />
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
