import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-5",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left",
        className,
      )}
    >
      <p className="type-section-eyebrow text-[var(--muted-foreground)]">{eyebrow}</p>
      <div className="space-y-4">
        <h2 className="type-section-title text-balance text-2xl leading-tight text-[var(--foreground)] sm:text-3xl lg:text-[2.15rem]">
          {title}
        </h2>
        <p className="text-pretty text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
