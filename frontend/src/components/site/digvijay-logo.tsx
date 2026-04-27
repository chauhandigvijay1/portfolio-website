import { cn } from "@/lib/utils";

interface DigvijayLogoProps {
  className?: string;
  size?: number;
  variant?: "mark" | "full";
}

export function DigvijayLogo({ className, size = 40, variant = "mark" }: DigvijayLogoProps) {
  const gradId = variant === "full" ? "logo-grad-full" : "logo-grad-mark";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden={variant === "mark"}
      role={variant === "full" ? "img" : undefined}
      aria-label={variant === "full" ? "Digvijay monogram" : undefined}
    >
      <defs>
        <linearGradient id={gradId} x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(220 16% 94%)" />
          <stop offset="0.52" stopColor="hsl(273 54% 78%)" />
          <stop offset="1" stopColor="hsl(273 56% 58%)" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="17.6" stroke={`url(#${gradId})`} strokeWidth="0.8" opacity="0.22" />
      <path
        d="M12.7 10.8h7.2c6 0 9.6 3.3 9.6 9.1s-3.6 9.3-9.6 9.3h-7.2V10.8Z"
        stroke={`url(#${gradId})`}
        strokeWidth="1.15"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16.6 10.8V29.2"
        stroke={`url(#${gradId})`}
        strokeWidth="0.92"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
