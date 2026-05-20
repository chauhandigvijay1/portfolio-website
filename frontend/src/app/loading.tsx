export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050208] px-6">
      <div className="flex flex-col items-center gap-6">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/40">Loading</p>
      </div>
    </div>
  );
}
