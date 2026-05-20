export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(240_15%_2%)] px-6">
      <div className="flex flex-col items-center gap-6">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.35)] to-transparent" />
        <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(var(--muted-foreground))]">Loading</p>
      </div>
    </div>
  );
}
