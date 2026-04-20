"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

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
        className="rounded-full border-white/15 bg-white/60 backdrop-blur-xl dark:bg-white/6"
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
      className="rounded-full border-white/15 bg-white/60 text-[var(--foreground)] shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl hover:bg-white/80 dark:bg-white/6 dark:hover:bg-white/10"
      aria-label="toggle theme"
    >
      {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
    </Button>
  );
}
