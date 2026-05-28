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
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [blockerFilter, setBlockerFilter] = useState("all");

  const phaseOptions = useMemo(() => {
    const set = new Set(data.tasks.map((task) => task.phase));
    return Array.from(set).filter(Boolean);
  }, [data.tasks]);

  const rows = useMemo(() => {
    return data.teamMembers.map((member) => {
      const assignedTasks = data.tasks.filter((task) => task.ownerSlug === member.slug);
      const checklist = calculateChecklistProgress(member.checklist);
      const openBlockers = data.blockers.filter((blocker) => blocker.ownerSlug === member.slug && blocker.status === "open");
      const latestUpdate = data.updates.find((update) => update.memberSlug === member.slug);
      const overdueTasks = assignedTasks.filter((task) => task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed");
      const memberPhases = new Set(assignedTasks.map((task) => task.phase));
      return {
        member,
        assignedTasks,
        checklist,
        openBlockers,
        latestUpdate,
        overdueTasks,
        phases: Array.from(memberPhases).filter(Boolean),
        derivedStatus: getDerivedStatus(checklist.percent, hasOpenBlocker(data.blockers, member.slug))
      };
    });
  }, [data]);

  const filtered = rows.filter((row) => {
    const matchesMember = memberFilter === "all" || row.member.slug === memberFilter;
    const matchesPhase = phaseFilter === "all" || row.phases.includes(phaseFilter);
    const matchesStatus = statusFilter === "all" || row.derivedStatus === statusFilter;
    const matchesBlocker =
      blockerFilter === "all" || (blockerFilter === "open" ? row.openBlockers.length > 0 : row.openBlockers.length === 0);
    return matchesMember && matchesPhase && matchesStatus && matchesBlocker;
  });

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amn-cyan">P0 Dashboard</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">{t.teamExecutionTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{t.teamExecutionDescription}</p>
      </section>

      <section className="panel p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Filter label={t.filterMember} value={memberFilter} onChange={setMemberFilter} options={[["all", t.allMembers], ...data.teamMembers.map((member) => [member.slug, member.name] as [string, string])]} />
          <Filter label={t.phase} value={phaseFilter} onChange={setPhaseFilter} options={[["all", t.allPhases], ...phaseOptions.map((phase) => [phase, phase] as [string, string])]} />
          <Filter label={t.filterStatus} value={statusFilter} onChange={setStatusFilter} options={[["all", t.allStatuses], ["active", t.active], ["blocked", t.blocked], ["completed", t.complete]]} />
          <Filter label={t.blockers} value={blockerFilter} onChange={setBlockerFilter} options={[["all", t.allBlockers], ["open", t.openOnly], ["clear", t.withoutBlockers]]} />
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="panel p-6 text-sm text-slate-400">{t.emptyTeamExecutionState}</section>
      ) : (
        <>
          <section className="hidden overflow-hidden rounded-lg border border-white/10 xl:block">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">{t.member}</th>
                  <th className="px-4 py-3">{t.role}</th>
                  <th className="px-4 py-3">{t.phase}</th>
                  <th className="px-4 py-3">{t.assignedTasks}</th>
                  <th className="px-4 py-3">{t.checklist}</th>
                  <th className="px-4 py-3">{t.progress}</th>
                  <th className="px-4 py-3">{t.blockers}</th>
                  <th className="px-4 py-3">{t.done}</th>
                  <th className="px-4 py-3">{t.next}</th>
                  <th className="px-4 py-3">{t.latestUpdate}</th>
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
                    <td className="px-4 py-4 text-slate-300">{row.phases.join(", ") || t.none}</td>
                    <td className="px-4 py-4 text-slate-300">{row.assignedTasks.length}</td>
                    <td className="px-4 py-4 text-slate-300">
                      {row.checklist.completed}/{row.checklist.total}
                    </td>
                    <td className="px-4 py-4">
                      <ProgressBar value={row.checklist.percent} />
                    </td>
                    <td className="px-4 py-4 text-slate-300">{row.openBlockers.length}</td>
                    <td className="px-4 py-4 text-slate-300">{row.latestUpdate?.done || t.noUpdate}</td>
                    <td className="px-4 py-4 text-slate-300">{row.latestUpdate?.next || t.noUpdate}</td>
                    <td className="px-4 py-4 text-slate-300">
                      {row.latestUpdate?.updatedAt ? new Date(row.latestUpdate.updatedAt).toLocaleString() : t.noUpdate}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={row.derivedStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="grid gap-4 xl:hidden">
            {filtered.map((row) => (
              <article key={row.member.slug} className="panel p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link className="text-base font-semibold text-white hover:text-amn-cyan" to={`/team/${row.member.slug}`}>
                      {row.member.name}
                    </Link>
                    <p className="text-xs text-slate-500">{row.member.role}</p>
                  </div>
                  <StatusBadge status={row.derivedStatus} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <p>{t.assignedTasks}: {row.assignedTasks.length}</p>
                  <p>{t.blockers}: {row.openBlockers.length}</p>
                  <p>{t.checklist}: {row.checklist.completed}/{row.checklist.total}</p>
                  <p>{t.overdue}: {row.overdueTasks.length}</p>
                </div>
                <div className="mt-3">
                  <ProgressBar value={row.checklist.percent} />
                </div>
                <div className="mt-3 space-y-1 text-sm text-slate-300">
                  <p>
                    <span className="text-slate-500">{t.done}:</span> {row.latestUpdate?.done || t.noUpdate}
                  </p>
                  <p>
                    <span className="text-slate-500">{t.next}:</span> {row.latestUpdate?.next || t.noUpdate}
                  </p>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
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
