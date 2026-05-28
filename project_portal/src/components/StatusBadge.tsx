import type { Status } from "../types/portal";

const styles: Record<Status, string> = {
  completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  active: "border-amn-cyan/40 bg-amn-cyan/10 text-amn-cyan",
  blocked: "border-rose-400/40 bg-rose-400/10 text-rose-200",
  planned: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  deferred: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  ready_for_approval: "border-amber-300/40 bg-amber-300/10 text-amber-100"
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${styles[status]}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}
