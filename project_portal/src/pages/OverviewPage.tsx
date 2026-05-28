import { Link } from "react-router-dom";
import { PhaseCard } from "../components/PhaseCard";
import { RiskCard } from "../components/RiskCard";
import { StatCard } from "../components/StatCard";
import { PhaseMemberProgressTable } from "../components/PhaseMemberProgressTable";
import { useWorkspace } from "../context/WorkspaceContext";
import { risks } from "../data/risks";
import { useI18n } from "../i18n/I18nProvider";
import { permissionSummary } from "../services/access";
import type { MemberState } from "../types/portal";

export function OverviewPage() {
  const { data, adapter, currentUser, exportSnapshot, conflictWarning } = useWorkspace();
  const { t } = useI18n();
  const { phases, tasks, blockers, updates, teamMembers } = data;
  const completedDocs = data.docsLinks.length + 7;
  const activeTasks = tasks.filter((task) => task.status === "active").length;
  const blockerCount = blockers.filter((blocker) => blocker.status === "open").length;
  const currentPhase = phases.find((phase) => phase.id === data.settings.currentPhaseId) ?? phases.find((phase) => phase.status === "active");
  const nextPhase = phases.find((phase) => phase.id === "phase-u1");
  const memberStates = Object.fromEntries(
    teamMembers.map((member) => [
      member.slug,
      {
        done: updates.find((update) => update.memberSlug === member.slug)?.done ?? "",
        blocked: updates.find((update) => update.memberSlug === member.slug)?.blocked ?? "",
        next: updates.find((update) => update.memberSlug === member.slug)?.next ?? "",
        notes: "",
        checklist: Object.fromEntries(member.checklist.map((item) => [item.id, Boolean(item.completed)])),
        lastUpdated: updates.find((update) => update.memberSlug === member.slug)?.updatedAt ?? ""
      } satisfies MemberState
    ])
  );

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amn-cyan">{t.overviewEyebrow}</p>
        <div className="mt-4 max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {t.overviewTitle}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            {t.overviewDescription}
          </p>
          <p className="mt-3 text-sm text-amber-100">
            Sync status: {adapter.mode === "supabase" ? "Supabase configured" : "local fallback only"}.
            {adapter.mode === "local" ? " Shared sync is not active until Supabase environment variables are configured." : null}
          </p>
          <p className="mt-2 text-sm text-slate-400">Permissions: {permissionSummary(currentUser)}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/phase-t1" className="focus-ring rounded-md bg-amn-cyan px-4 py-2 text-sm font-semibold text-ink-950">
            {t.reviewPhaseT1}
          </Link>
          <Link to="/backend-b1-blocker" className="focus-ring rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white">
            {t.viewB1Blocker}
          </Link>
          <Link to="/team-execution" className="focus-ring rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white">
            {t.teamExecutionDashboard}
          </Link>
          <button onClick={exportSnapshot} className="focus-ring rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white">
            {t.exportSnapshotJson}
          </button>
        </div>
        {conflictWarning ? <p className="mt-4 rounded-md border border-amber-300/30 bg-amber-300/10 p-3 text-sm text-amber-100">{conflictWarning}</p> : null}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <StatCard label={t.totalPhases} value={phases.length} detail="Tracked from foundation through pilot." />
        <StatCard label={t.currentPhase} value="T1" detail="Team alignment and work preparation." />
        <StatCard label={t.completedDocs} value={completedDocs} detail="Foundation docs available." />
        <StatCard label={t.activeTasks} value={activeTasks} detail="Editable on the Tasks page." />
        <StatCard label={t.blockers} value={blockerCount} detail=".NET SDK blocker is active." />
        <StatCard label={t.mvpStatus} value="Scoped" detail="Retail/Grocery + Basic Wholesale only." />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label={t.syncMode} value={adapter.mode === "supabase" ? "Supabase" : "Local"} detail="localStorage fallback is UI-only until Supabase is configured." />
        <StatCard label={t.currentRole} value={currentUser.roleLabel} detail={currentUser.authMode === "supabase" ? "Supabase Auth session" : "Local role simulator"} />
        <StatCard label={t.b1State} value="Blocked" detail="Do not mark Backend B1 complete." />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        {currentPhase ? <PhaseCard phase={currentPhase} /> : null}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">{t.topRisks}</h2>
          {risks.slice(0, 3).map((risk) => (
            <RiskCard key={risk.title} risk={risk} />
          ))}
        </div>
      </section>

      {currentPhase ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">{t.dynamicPhaseMemberProgress}</h2>
          <PhaseMemberProgressTable members={teamMembers} memberStates={memberStates} blockers={blockers} phaseId={currentPhase.id} />
        </section>
      ) : null}

      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h2 className="text-xl font-semibold text-white">{t.latestUpdates}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {updates.slice(0, 4).map((update) => (
            <article key={update.id} className="rounded-md bg-ink-950/60 p-4">
              <h3 className="font-semibold text-white">{update.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{update.role} - {update.date}</p>
              <p className="mt-2 text-sm text-slate-300">{update.next || update.notes}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h2 className="text-xl font-semibold text-white">{t.nextRecommendedPhase}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {nextPhase?.name}: {nextPhase?.objective}
        </p>
      </section>
    </div>
  );
}
