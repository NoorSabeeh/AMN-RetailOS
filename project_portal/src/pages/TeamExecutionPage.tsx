import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { calculateChecklistProgress, getDerivedStatus, hasOpenBlocker } from "../services/progress";

export function TeamExecutionPage() {
  const { data } = useWorkspace();
  const { t } = useI18n();
  const [memberFilter, setMemberFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const rows = useMemo(() => {
    return data.teamMembers.map((member) => {
      const assignedTasks = data.tasks.filter((task) => task.ownerSlug === member.slug);
      const checklist = calculateChecklistProgress(member.checklist);
      const openBlockers = data.blockers.filter((blocker) => blocker.ownerSlug === member.slug && blocker.status === "open");
      const latestUpdate = data.updates.find((update) => update.memberSlug === member.slug);
      const overdueTasks = assignedTasks.filter((task) => task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed");
      return {
        member,
        assignedTasks,
        checklist,
        openBlockers,
        latestUpdate,
        overdueTasks,
        derivedStatus: getDerivedStatus(checklist.percent, hasOpenBlocker(data.blockers, member.slug))
      };
    });
  }, [data]);

  const filtered = rows.filter((row) => {
    const matchesMember = memberFilter === "all" || row.member.slug === memberFilter;
    const matchesStatus = statusFilter === "all" || row.derivedStatus === statusFilter;
    const matchesPriority = priorityFilter === "all" || row.assignedTasks.some((task) => task.priority === priorityFilter);
    return matchesMember && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amn-cyan">P0 Dashboard</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">{t.teamExecutionTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          {t.teamExecutionDescription}
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <Filter label={t.filterMember} value={memberFilter} onChange={setMemberFilter} options={[["all", "All members"], ...data.teamMembers.map((member) => [member.slug, member.name] as [string, string])]} />
        <Filter label={t.filterStatus} value={statusFilter} onChange={setStatusFilter} options={[["all", "All statuses"], ["active", "Active"], ["blocked", "Blocked"], ["completed", "Complete"]]} />
        <Filter label={t.filterPriority} value={priorityFilter} onChange={setPriorityFilter} options={[["all", "All priorities"], ["P0", "P0"], ["P1", "P1"], ["P2", "P2"], ["Deferred", "Deferred"]]} />
      </section>

      <section className="overflow-hidden rounded-lg border border-white/10">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-3">{t.member}</th>
              <th className="px-4 py-3">{t.role}</th>
              <th className="px-4 py-3">{t.assignedTasks}</th>
              <th className="px-4 py-3">{t.checklist}</th>
              <th className="px-4 py-3">{t.progress}</th>
              <th className="px-4 py-3">{t.blockers}</th>
              <th className="px-4 py-3">{t.latestUpdate}</th>
              <th className="px-4 py-3">{t.overdue}</th>
              <th className="px-4 py-3">{t.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.map((row) => (
              <tr key={row.member.slug} className="align-top">
                <td className="px-4 py-4">
                  <Link className="font-semibold text-white hover:text-amn-cyan" to={`/team/${row.member.slug}`}>
                    {row.member.name}
                  </Link>
                </td>
                <td className="px-4 py-4 text-slate-300">{row.member.role}</td>
                <td className="px-4 py-4 text-slate-300">{row.assignedTasks.length}</td>
                <td className="px-4 py-4 text-slate-300">
                  {row.checklist.completed}/{row.checklist.total}
                </td>
                <td className="px-4 py-4">
                  <ProgressBar value={row.checklist.percent} />
                </td>
                <td className="px-4 py-4 text-slate-300">{row.openBlockers.length ? row.openBlockers.map((item) => item.title).join("; ") : t.none}</td>
                <td className="px-4 py-4 text-slate-300">{row.latestUpdate?.next || row.latestUpdate?.done || t.noUpdate}</td>
                <td className="px-4 py-4 text-slate-300">{row.overdueTasks.length}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={row.derivedStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Filter({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200">
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
