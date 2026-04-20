export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--page-background)] px-6">
      <div className="flex items-center gap-4 rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm lowercase tracking-[0.24em] text-zinc-700 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:text-zinc-200">
        <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--page-accent)]" />
        loading portfolio
      </div>
    </div>
  );
}
