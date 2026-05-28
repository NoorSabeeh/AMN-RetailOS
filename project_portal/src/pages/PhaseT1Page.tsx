import { PhaseMemberProgressTable } from "../components/PhaseMemberProgressTable";
import { StatusBadge } from "../components/StatusBadge";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { canEditProjectData } from "../services/access";
import { calculateChecklistProgress, hasOpenBlocker } from "../services/progress";
import type { MemberState } from "../types/portal";

export function PhaseT1Page() {
  const { data, currentUser, approvePhaseTransition } = useWorkspace();
  const { t } = useI18n();
  const phase = data.phases.find((item) => item.id === "phase-t1");
  const currentMembers = data.teamMembers;
  const memberStates = Object.fromEntries(
    currentMembers.map((member) => [
      member.slug,
      {
        done: data.updates.find((update) => update.memberSlug === member.slug)?.done ?? "",
        blocked: data.updates.find((update) => update.memberSlug === member.slug)?.blocked ?? "",
        next: data.updates.find((update) => update.memberSlug === member.slug)?.next ?? "",
        notes: "",
        checklist: Object.fromEntries(member.checklist.map((item) => [item.id, Boolean(item.completed)])),
        lastUpdated: data.updates.find((update) => update.memberSlug === member.slug)?.updatedAt ?? ""
      } satisfies MemberState
    ])
  );
  const allComplete = currentMembers.every((member) => calculateChecklistProgress(member.checklist).percent === 100);
  const openBlockers = data.blockers.filter((blocker) => blocker.status === "open" && blocker.phase === "phase-t1");
  const readyForApproval = allComplete && openBlockers.length === 0;
  const canApprove = canEditProjectData(currentUser);

  if (!phase) return null;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amn-cyan">{t.currentCoordinationPhase}</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{phase.name}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{phase.objective}</p>
          </div>
          <StatusBadge status={readyForApproval ? "ready_for_approval" : phase.status} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ListCard title={t.scope} items={phase.allowedScope} />
        <ListCard title={t.outOfScope} items={phase.outOfScope} />
        <ListCard title={t.acceptanceCriteria} items={[
          "Each role has submitted Done / Blocked / Next",
          "Backend SDK readiness status is explicit",
          "UI planning questions are prepared",
          "QA and field feedback checklists are prepared",
          "Backend B1 is not marked complete"
        ]} />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-white">{t.dynamicPhaseMemberProgress}</h3>
        <PhaseMemberProgressTable members={currentMembers} memberStates={memberStates} blockers={data.blockers} phaseId="phase-t1" />
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h3 className="text-xl font-semibold text-white">{t.approvalGate}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {t.approvalGateDescription}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <StatusBadge status={readyForApproval ? "ready_for_approval" : hasOpenBlocker(data.blockers, undefined, "phase-t1") ? "blocked" : "active"} />
          <span className="text-sm text-slate-400">{t.openT1Blockers}: {openBlockers.length}</span>
          <button
            disabled={!readyForApproval || !canApprove}
            onClick={() =>
              void approvePhaseTransition(
                {
                  fromPhaseId: "phase-t1",
                  toPhaseId: "phase-u1",
                  approvalNotes: "Approved from Command Center after checklist and blocker validation.",
                  blockersSnapshot: JSON.stringify(openBlockers),
                  completionSummary: "All assigned T1 checklist items completed and no open T1 blockers."
                },
                "phase-u1"
              )
            }
            className="focus-ring rounded-md bg-amn-cyan px-4 py-2 text-sm font-semibold text-ink-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.approveTransitionToU1}
          </button>
        </div>
      </section>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
