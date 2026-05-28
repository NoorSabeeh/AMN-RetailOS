import { Navigate, useParams } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { canEditMemberWorkspace } from "../services/access";
import { calculateChecklistProgress, getDerivedStatus, hasOpenBlocker } from "../services/progress";

export function MemberPage() {
  const { slug } = useParams();
  const { data, currentUser, updateMember, upsertUpdate } = useWorkspace();
  const { t } = useI18n();
  const member = data.teamMembers.find((item) => item.slug === slug);

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  const latestUpdate = data.updates.find((update) => update.memberSlug === member.slug);
  const openBlockers = data.blockers.filter((blocker) => blocker.ownerSlug === member.slug && blocker.status === "open");
  const progress = calculateChecklistProgress(member.checklist);
  const status = getDerivedStatus(progress.percent, hasOpenBlocker(data.blockers, member.slug));
  const editable = canEditMemberWorkspace(currentUser, member);

  const toggleChecklist = async (id: string) => {
    if (!editable) return;
    await updateMember({
      ...member,
      checklist: member.checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    });
  };

  const saveUpdate = async (field: "done" | "blocked" | "next" | "notes", value: string) => {
    if (!editable) return;
    const timestamp = new Date().toISOString();
    await upsertUpdate({
      id: latestUpdate?.id ?? crypto.randomUUID(),
      date: timestamp.slice(0, 10),
      title: `${member.name} workspace update`,
      role: member.role,
      memberSlug: member.slug,
      phase: data.settings.currentPhaseId,
      done: field === "done" ? value : latestUpdate?.done ?? "",
      blocked: field === "blocked" ? value : latestUpdate?.blocked ?? "",
      next: field === "next" ? value : latestUpdate?.next ?? "",
      notes: field === "notes" ? value : latestUpdate?.notes ?? "",
      tags: latestUpdate?.tags ?? ["member"],
      updatedAt: timestamp,
      updatedBy: currentUser.slug
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amn-cyan">{t.member} workspace</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{member.name}</h2>
            <p className="mt-2 text-slate-300">{member.role}</p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{member.summary}</p>
          </div>
          <StatusBadge status={status} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h3 className="text-lg font-semibold text-white">{t.dynamicProgress} {t.checklist}</h3>
          <div className="mt-4">
            <ProgressBar value={progress.percent} label={`${progress.completed}/${progress.total} complete`} />
          </div>
          <div className="mt-4 space-y-2">
            {member.checklist.map((item) => (
              <label key={item.id} className="flex items-start gap-3 rounded-md bg-ink-950/60 p-3 text-sm text-slate-300">
                <input type="checkbox" checked={Boolean(item.completed)} disabled={!editable} onChange={() => void toggleChecklist(item.id)} className="mt-1" />
                <span>
                  {item.label}
                  <span className="ml-2 text-xs text-slate-500">weight {item.weight ?? 1}</span>
                </span>
              </label>
            ))}
          </div>
          {!editable ? <p className="mt-3 text-xs text-slate-500">{t.viewerReadOnly}</p> : null}
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h3 className="text-lg font-semibold text-white">{t.done} / {t.blocked} / {t.next}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <EditableArea label={t.done} value={latestUpdate?.done ?? ""} disabled={!editable} onBlur={(value) => void saveUpdate("done", value)} />
            <EditableArea label={t.blocked} value={latestUpdate?.blocked ?? ""} disabled={!editable} onBlur={(value) => void saveUpdate("blocked", value)} />
            <EditableArea label={t.next} value={latestUpdate?.next ?? ""} disabled={!editable} onBlur={(value) => void saveUpdate("next", value)} />
            <EditableArea label={t.personalNotes} value={latestUpdate?.notes ?? ""} disabled={!editable} onBlur={(value) => void saveUpdate("notes", value)} />
          </div>
          <p className="mt-3 text-xs text-slate-500">Last updated: {latestUpdate?.updatedAt ? new Date(latestUpdate.updatedAt).toLocaleString() : "No update yet."}</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InfoCard title={t.assignedFiles} items={member.filesToRead} />
        <InfoCard title={t.deliverables} items={member.deliverables} />
        <InfoCard title={t.blockers} items={openBlockers.length ? openBlockers.map((blocker) => blocker.title) : [t.none]} />
      </section>
    </div>
  );
}

function EditableArea({
  label,
  value,
  disabled,
  onBlur
}: {
  label: string;
  value: string;
  disabled: boolean;
  onBlur: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">{label}</span>
      <textarea
        defaultValue={value}
        disabled={disabled}
        onBlur={(event) => onBlur(event.currentTarget.value)}
        className="focus-ring mt-2 min-h-28 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
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
