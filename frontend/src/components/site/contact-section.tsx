"use client";

import { ArrowUpRight, BadgeCheck, Mail, Sparkles } from "lucide-react";
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
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionReveal>
          <SectionHeading
            eyebrow="contact"
            title={contact.heading}
            description={contact.description}
          />
        </SectionReveal>

        <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-6">
            <SectionReveal delay={0.06}>
              <div className="rounded-[2rem] border border-black/8 bg-white/76 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6">
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-[var(--page-accent)]" />
                  <p className="text-sm font-medium lowercase text-[var(--foreground)]">direct contact</p>
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-4 inline-flex items-center gap-2 text-xl font-semibold tracking-[-0.05em] text-[var(--foreground)] transition hover:text-[var(--page-accent)] sm:text-2xl"
                >
                  {contact.email}
                  <ArrowUpRight className="size-4" />
                </a>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                  {profile.availability}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {contact.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-black/8 bg-[var(--page-background)] px-4 py-2 text-sm lowercase text-[var(--foreground)] transition hover:-translate-y-0.5 dark:border-white/10"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="rounded-[2rem] border border-black/8 bg-white/76 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/6">
                <div className="mb-5 flex items-center gap-3">
                  <BadgeCheck className="size-4 text-[var(--page-accent)]" />
                  <p className="text-sm font-medium lowercase text-[var(--foreground)]">selected credentials</p>
                </div>
                <div className="space-y-4">
                  {certifications.map((certification) => (
                    <a
                      key={certification.slug}
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start justify-between gap-4 rounded-[1.5rem] border border-black/8 bg-[var(--page-background)] px-4 py-4 transition hover:-translate-y-0.5 dark:border-white/10"
                    >
                      <div>
                        <p className="font-medium lowercase text-[var(--foreground)]">
                          {certification.title}
                        </p>
                        <p className="mt-1 text-sm lowercase tracking-[0.18em] text-[var(--muted-foreground)]">
                          {certification.issuer}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
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

          <SectionReveal delay={0.12}>
            <div className="rounded-[2.2rem] border border-black/8 bg-white/80 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/7 lg:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Sparkles className="size-4 text-[var(--page-accent)]" />
                <p className="text-sm font-medium lowercase text-[var(--foreground)]">
                  start the conversation
                </p>
              </div>
              <ContactForm />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
