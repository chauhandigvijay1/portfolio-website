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
        "space-y-4",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl text-left",
        className,
      )}
    >
      <p className="text-xs font-medium lowercase tracking-[0.32em] text-[var(--muted-foreground)]">
        {eyebrow}
      </p>
      <div className="space-y-3">
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-[var(--foreground)] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="text-pretty text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
