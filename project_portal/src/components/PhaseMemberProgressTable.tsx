import { Link } from "react-router-dom";
import { calculateChecklistProgress, getDerivedStatus, hasOpenBlocker } from "../services/progress";
import type { Blocker, MemberState, TeamMember } from "../types/portal";
import { useI18n } from "../i18n/I18nProvider";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

export function PhaseMemberProgressTable({
  members,
  memberStates,
  blockers,
  phaseId
}: {
  members: TeamMember[];
  memberStates: Record<string, MemberState>;
  blockers: Blocker[];
  phaseId: string;
}) {
  const { t } = useI18n();

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <table className="w-full min-w-[980px] text-left text-sm">
        <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.14em] text-slate-500">
          <tr>
            <th className="px-4 py-3">{t.member}</th>
            <th className="px-4 py-3">{t.roleInCurrentPhase}</th>
            <th className="px-4 py-3">{t.checklist}</th>
            <th className="px-4 py-3">{t.dynamicProgress}</th>
            <th className="px-4 py-3">{t.assignedFiles}</th>
            <th className="px-4 py-3">{t.blockers}</th>
            <th className="px-4 py-3">{t.done}</th>
            <th className="px-4 py-3">{t.next}</th>
            <th className="px-4 py-3">{t.status}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {members.map((member) => {
            const state = memberStates[member.slug];
            const progress = calculateChecklistProgress(member.checklist, state);
            const blocked = hasOpenBlocker(blockers, member.slug, phaseId);
            const status = getDerivedStatus(progress.percent, blocked);
            const memberBlockers = blockers.filter((blocker) => blocker.ownerSlug === member.slug && blocker.status === "open");

            return (
              <tr key={member.slug} className="align-top">
                <td className="px-4 py-4">
                  <Link className="font-semibold text-white hover:text-amn-cyan" to={`/team/${member.slug}`}>
                    {member.name}
                  </Link>
                  <p className="mt-1 text-xs text-slate-500">{member.role}</p>
                </td>
                <td className="px-4 py-4 text-slate-300">{member.currentPhaseRole ?? member.role}</td>
                <td className="px-4 py-4 text-slate-300">
                  {progress.completed}/{progress.total}
                </td>
                <td className="px-4 py-4">
                  <ProgressBar value={progress.percent} />
                </td>
                <td className="px-4 py-4 text-xs text-slate-400">{member.filesToRead.slice(0, 3).join(", ")}</td>
                <td className="px-4 py-4 text-slate-300">{memberBlockers.length ? memberBlockers.map((item) => item.title).join("; ") : t.none}</td>
                <td className="px-4 py-4 text-slate-300">{state?.done || t.noUpdate}</td>
                <td className="px-4 py-4 text-slate-300">{state?.next || t.noUpdate}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
