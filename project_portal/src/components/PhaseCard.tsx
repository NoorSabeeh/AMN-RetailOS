import type { Phase } from "../types/portal";
import { useI18n } from "../i18n/I18nProvider";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

export function PhaseCard({ phase }: { phase: Phase }) {
  const { t } = useI18n();

  return (
    <article className="rounded-lg border border-white/10 bg-ink-900/80 p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{phase.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{phase.objective}</p>
        </div>
        <StatusBadge status={phase.status} />
      </div>

      <div className="mt-5">
        <ProgressBar value={phase.progress} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <ListBlock title={t.allowedScope} items={phase.allowedScope} />
        <ListBlock title={t.outOfScope} items={phase.outOfScope} />
      </div>

      <div className="mt-5">
        <ListBlock title={t.deliverables} items={phase.deliverables} />
      </div>

      <p className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-slate-300">{phase.notes}</p>
    </article>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</h4>
      <ul className="mt-2 space-y-2 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amn-cyan" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
