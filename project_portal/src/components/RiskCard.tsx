import type { RiskItem } from "../types/portal";
import { StatusBadge } from "./StatusBadge";

export function RiskCard({ risk }: { risk: RiskItem }) {
  const severityClass =
    risk.severity === "High"
      ? "text-rose-200"
      : risk.severity === "Medium"
        ? "text-amn-gold"
        : "text-slate-300";

  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-white">{risk.title}</h3>
        <StatusBadge status={risk.status} />
      </div>
      <p className={`mt-2 text-sm font-semibold ${severityClass}`}>{risk.severity} risk</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{risk.mitigation}</p>
    </article>
  );
}
