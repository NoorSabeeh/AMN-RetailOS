import { useMemo } from "react";

export function LocalStorageEditor({
  title,
  checklist,
  checked,
  onCheckedChange,
  progress,
  onProgressChange
}: {
  title: string;
  checklist: string[];
  checked: Record<string, boolean>;
  onCheckedChange: (next: Record<string, boolean>) => void;
  progress: number;
  onProgressChange: (next: number) => void;
}) {
  const completed = useMemo(() => checklist.filter((item) => checked[item]).length, [checked, checklist]);

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="text-sm text-slate-400">
          {completed}/{checklist.length} complete
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {checklist.map((item) => (
          <label key={item} className="flex items-start gap-3 rounded-md bg-ink-950/50 p-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={checked[item] ?? false}
              onChange={(event) => onCheckedChange({ ...checked, [item]: event.target.checked })}
              className="mt-1 h-4 w-4 accent-amn-cyan"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <label className="mt-5 block text-sm font-semibold text-white" htmlFor={`progress-${title}`}>
        Progress percentage
      </label>
      <input
        id={`progress-${title}`}
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(event) => onProgressChange(Number(event.target.value))}
        className="mt-3 w-full accent-amn-cyan"
      />
      <p className="mt-2 text-sm text-slate-400">{progress}%</p>
    </section>
  );
}
