"use client";

import type { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast:
                "border border-white/10 bg-[var(--page-panel)] text-[var(--foreground)] shadow-[0_24px_80px_rgba(17,24,39,0.18)] backdrop-blur-xl",
            },
          }}
        />
      </TooltipProvider>
    </ThemeProvider>
  );
}
