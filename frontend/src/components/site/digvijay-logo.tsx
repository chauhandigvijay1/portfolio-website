import { cn } from "@/lib/utils";

interface DigvijayLogoProps {
  className?: string;
  size?: number;
  variant?: "mark" | "full";
}

/** Luxury monogram mark — stylized D with inner accent, personalized for Digvijay. */
export function DigvijayLogo({ className, size = 40, variant = "mark" }: DigvijayLogoProps) {
  const gradId = variant === "full" ? "logo-grad-full" : "logo-grad-mark";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden={variant === "mark"}
      role={variant === "full" ? "img" : undefined}
      aria-label={variant === "full" ? "Digvijay monogram" : undefined}
    >
      <defs>
        <linearGradient id={gradId} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(220 15% 92%)" />
          <stop offset="0.45" stopColor="hsl(275 55% 72%)" />
          <stop offset="1" stopColor="hsl(275 60% 48%)" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke={`url(#${gradId})`} strokeWidth="0.75" opacity="0.35" />
      <path
        d="M14 12h11.5c7.2 0 11.5 4.2 11.5 11.8S32.7 36 25.5 36H14V12Z"
        stroke={`url(#${gradId})`}
        strokeWidth="1.35"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M20 12v24M20 12c5.8 0 9.2 3.4 9.2 9.2S25.8 30.4 20 30.4"
        stroke={`url(#${gradId})`}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="33" cy="15" r="1.25" fill="hsl(275 70% 65%)" opacity="0.9" />
    </svg>
  );
}
