"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        className="rounded-full border-[var(--border)] bg-[var(--page-panel)] text-[var(--foreground)] backdrop-blur-xl"
        aria-label="toggle theme"
      >
        <SunMedium className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "rounded-full border-[var(--border)] bg-[var(--page-panel)] text-[var(--foreground)] backdrop-blur-xl",
        "hover:border-[var(--foreground)]/15 hover:bg-[var(--muted)]",
      )}
      aria-label="toggle theme"
    >
      {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
    </Button>
  );
}
