import { Link } from "react-router-dom";
import { PhaseCard } from "../components/PhaseCard";
import { RiskCard } from "../components/RiskCard";
import { StatCard } from "../components/StatCard";
import { useWorkspace } from "../context/WorkspaceContext";
import { risks } from "../data/risks";
import { useI18n } from "../i18n/I18nProvider";
import { permissionSummary } from "../services/access";
import { calculateChecklistProgress } from "../services/progress";

export function OverviewPage() {
  const { data, adapter, currentUser, conflictWarning } = useWorkspace();
  const { t } = useI18n();
  const { phases, tasks, blockers, updates, teamMembers } = data;
  const currentPhase = phases.find((phase) => phase.id === data.settings.currentPhaseId) ?? phases.find((phase) => phase.status === "active");
  const viewerMode = currentUser.role === "viewer";
  const openBlockers = blockers.filter((blocker) => blocker.status === "open");
  const activeTasks = tasks.filter((task) => task.status === "active").length;
  const overallProgress =
    tasks.length === 0 ? 0 : Math.round(tasks.reduce((total, task) => total + calculateChecklistProgress(task.checklist).percent, 0) / tasks.length);
  const memberProgressRows = teamMembers.map((member) => ({
    slug: member.slug,
    name: member.name,
    role: member.role,
    progress: calculateChecklistProgress(member.checklist).percent,
    openBlockers: blockers.filter((blocker) => blocker.ownerSlug === member.slug && blocker.status === "open").length
  }));
  const latestUpdates = updates.slice(0, 4);
  const nextActions = tasks
    .filter((task) => task.status !== "completed")
    .slice(0, 4)
    .map((task) => ({ id: task.id, title: task.title, owner: task.ownerRole, phase: task.phase }));
  const quickLinks = [
    { to: "/team-execution", label: t.execution },
    { to: "/tasks", label: t.tasks },
    { to: "/docs", label: t.docs },
    { to: "/blockers", label: t.blockers },
    { to: "/updates", label: t.updates }
  ];

  return (
    <div className="space-y-6">
      <section className="panel p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amn-cyan">{t.overviewEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{t.overviewTitle}</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">{t.overviewDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="chip border-amn-cyan/30 bg-amn-cyan/10 text-amn-cyan">
            {t.sync}: {adapter.mode === "supabase" ? t.supabase : t.localFallback}
          </span>
          <span className={`chip ${data.settings.backendB1Blocked ? "border-amber-300/30 bg-amber-300/10 text-amber-100" : "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"}`}>
            {t.b1State}: {data.settings.backendB1Blocked ? t.blocked : t.done}
          </span>
          <span className="chip border-white/10 text-slate-300">{currentUser.roleLabel}</span>
        </div>
        <p className="mt-3 text-xs text-slate-500">{permissionSummary(currentUser)}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <StatCard label={t.currentPhase} value={currentPhase?.name ?? t.none} detail={currentPhase?.objective ?? ""} />
        <StatCard label={t.progress} value={`${overallProgress}%`} detail={t.overallPhaseProgress} />
        <StatCard label={t.activeTasks} value={activeTasks} detail={t.tasks} />
        <StatCard label={t.blockers} value={openBlockers.length} detail={t.openBlockersCount} />
        <StatCard label={t.team} value={teamMembers.length} detail={t.teamProgressSummary} />
        <StatCard label={t.latestUpdates} value={latestUpdates.length} detail={t.latestUpdates} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        {currentPhase ? <PhaseCard phase={currentPhase} /> : <div className="panel p-5 text-sm text-slate-400">{t.noCurrentPhase}</div>}
        <article className="panel p-5">
          <h3 className="text-lg font-semibold text-white">{t.quickLinks}</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {quickLinks.map((item) => (
              <Link key={item.to} to={item.to} className="focus-ring rounded-md border border-white/10 bg-ink-950/60 px-3 py-2 text-sm text-slate-200 hover:border-amn-cyan/60">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">{t.roleActionHint}</p>
        </article>
      </section>

      {viewerMode ? (
        <section className="panel p-5">
          <h3 className="text-lg font-semibold text-white">{t.viewerSummaryTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.viewerSummaryMessage}</p>
        </section>
      ) : (
        <>
          <section className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
            <article className="panel overflow-hidden p-5">
              <h3 className="text-lg font-semibold text-white">{t.teamProgressSummary}</h3>
              {memberProgressRows.length === 0 ? (
                <p className="mt-3 text-sm text-slate-400">{t.emptyTeamState}</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {memberProgressRows.map((row) => (
                    <div key={row.slug} className="rounded-md border border-white/10 bg-ink-950/60 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-white">{row.name}</p>
                          <p className="text-xs text-slate-500">{row.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">{row.progress}%</p>
                          <p className="text-xs text-slate-500">{t.blockers}: {row.openBlockers}</p>
                        </div>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-amn-cyan" style={{ width: `${row.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>

            <article className="panel p-5">
              <h3 className="text-lg font-semibold text-white">{t.topRisks}</h3>
              <div className="mt-4 space-y-3">
                {risks.slice(0, 3).map((risk) => (
                  <RiskCard key={risk.title} risk={risk} />
                ))}
              </div>
            </article>
          </section>

          <section className="grid gap-4 xl:grid-cols-2">
            <article className="panel p-5">
              <h3 className="text-lg font-semibold text-white">{t.latestUpdates}</h3>
              {latestUpdates.length === 0 ? (
                <p className="mt-3 text-sm text-slate-400">{t.emptyUpdatesState}</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {latestUpdates.map((update) => (
                    <article key={update.id} className="rounded-md border border-white/10 bg-ink-950/60 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-semibold text-white">{update.title}</h4>
                          <p className="text-xs text-slate-500">{update.role}</p>
                        </div>
                        <span className="text-xs text-slate-500">{update.date}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">{update.next || update.done || update.notes || t.noUpdate}</p>
                    </article>
                  ))}
                </div>
              )}
            </article>

            <article className="panel p-5">
              <h3 className="text-lg font-semibold text-white">{t.criticalNextActions}</h3>
              {nextActions.length === 0 ? (
                <p className="mt-3 text-sm text-slate-400">{t.emptyTasksState}</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {nextActions.map((action) => (
                    <li key={action.id} className="rounded-md border border-white/10 bg-ink-950/60 p-3">
                      <p className="text-sm font-semibold text-white">{action.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {action.owner} - {action.phase}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </section>
        </>
      )}

      {conflictWarning ? <p className="rounded-md border border-amber-300/30 bg-amber-300/10 p-3 text-sm text-amber-100">{conflictWarning}</p> : null}
    </div>
  );
}
