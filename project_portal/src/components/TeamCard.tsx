import { Link } from "react-router-dom";
import type { TeamMember } from "../types/portal";
import { useI18n } from "../i18n/I18nProvider";
import { calculateChecklistProgress } from "../services/progress";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

export function TeamCard({ member }: { member: TeamMember }) {
  const progress = calculateChecklistProgress(member.checklist);
  const { t } = useI18n();

  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{member.name}</h3>
          <p className="mt-1 text-sm font-medium text-amn-cyan">{member.role}</p>
        </div>
        <StatusBadge status={member.status} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-400">{member.summary}</p>
      <div className="mt-5">
        <ProgressBar value={progress.percent} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {member.deliverables.slice(0, 3).map((item) => (
          <span key={item} className="rounded-md bg-ink-800 px-2.5 py-1 text-xs text-slate-300">
            {item}
          </span>
        ))}
      </div>
      <Link
        to={`/team/${member.slug}`}
        className="focus-ring mt-5 inline-flex rounded-md bg-amn-cyan px-3 py-2 text-sm font-semibold text-ink-950 hover:bg-amn-blue"
      >
        {t.openMemberPage}
      </Link>
    </article>
  );
}
