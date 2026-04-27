import { display } from "@/app/fonts";
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
      <p className={cn(display.className, "type-section-eyebrow text-[hsl(var(--secondary))]")}>
        {eyebrow}
      </p>
      <div className="space-y-4">
        <h2 className="type-section-title text-balance text-2xl leading-tight text-[hsl(var(--primary))] sm:text-3xl lg:text-[2.15rem]">
          {title}
        </h2>
        <p className="text-pretty text-base leading-[1.8] text-[hsl(var(--foreground)/0.72)] sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
