"use client";

import { ArrowUpRight, BadgeCheck, Mail, MapPin } from "lucide-react";
import type { Certification, ContactContent, Profile } from "@/types/portfolio";
import { ContactForm } from "@/components/site/contact-form";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionReveal } from "@/components/site/section-reveal";

interface ContactSectionProps {
  profile: Profile;
  contact: ContactContent;
  certifications: Certification[];
}

export function ContactSection({ profile, contact, certifications }: ContactSectionProps) {
  const locationLine = `${profile.education.institution}`;

  return (
    <section id="contact" className="section-pad">
      <div className="section-bridge" />
      <div className="section-ambient" />
      <div className="mx-auto max-w-6xl space-y-12">
        <SectionReveal>
          <SectionHeading
            align="center"
            eyebrow="Let's connect"
            title={contact.heading}
            description={contact.description}
          />
        </SectionReveal>

        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:items-start">
          <SectionReveal delay={0.06}>
            <div className="glass-card rounded-[1.65rem] p-7 sm:p-9">
              <div className="mb-8 flex items-center gap-3">
                <Mail className="size-4 text-[var(--page-accent)]" />
                <p className="type-section-eyebrow text-white/80">Send a message</p>
              </div>
              <ContactForm />
            </div>
          </SectionReveal>

          <div className="space-y-8">
            <SectionReveal delay={0.1}>
              <div className="glass-card rounded-[1.65rem] p-7 sm:p-8">
                <p className="type-section-eyebrow text-[var(--page-accent)]">Direct</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-4 inline-flex items-center gap-2 break-all text-xl font-medium tracking-tight text-white transition hover:text-[var(--page-accent)] sm:text-2xl"
                >
                  {contact.email}
                  <ArrowUpRight className="size-4 shrink-0" />
                </a>
                <div className="mt-6 flex items-start gap-3 text-sm text-[var(--muted-foreground)]">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--page-accent)]" aria-hidden />
                  <span>{locationLine}</span>
                </div>
                <p className="mt-6 text-sm leading-[1.8] text-[hsl(var(--foreground)/0.66)]">{profile.availability}</p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {contact.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-glass rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/80"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.14}>
              <div className="glass-card rounded-[1.65rem] p-7 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <BadgeCheck className="size-4 text-[var(--page-accent)]" />
                  <p className="type-section-eyebrow text-white/80">Credentials</p>
                </div>
                <div className="space-y-3">
                  {certifications.map((certification) => (
                    <a
                      key={certification.slug}
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <div>
                        <p className="font-medium tracking-tight text-white">{certification.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                          {certification.issuer}
                        </p>
                        <p className="mt-2 text-sm leading-[1.75] text-[hsl(var(--foreground)/0.66)]">
                          {certification.description}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-1 size-4 shrink-0 text-[var(--muted-foreground)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
