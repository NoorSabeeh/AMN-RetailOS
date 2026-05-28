export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 text-xs text-slate-400">
        <span>{label ?? "Progress"}</span>
        <span>{safeValue}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amn-cyan to-amn-blue transition-all"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
