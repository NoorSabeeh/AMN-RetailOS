import { useState } from "react";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { canEditProjectData } from "../services/access";

export function DecisionsPage() {
  const { data, currentUser, upsertDecision } = useWorkspace();
  const { t } = useI18n();
  const canEdit = canEditProjectData(currentUser);
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");

  const addDecision = async () => {
    if (!title.trim()) return;
    const now = new Date().toISOString();
    await upsertDecision({
      id: crypto.randomUUID(),
      title,
      description: title,
      reason,
      date: now.slice(0, 10),
      decidedBy: currentUser.name,
      impact: "Internal project coordination impact only.",
      relatedPhase: data.settings.currentPhaseId,
      status: "active",
      updatedAt: now,
      updatedBy: currentUser.slug
    });
    setTitle("");
    setReason("");
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold text-white">{t.decisionLog}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          {t.decisionDescription}
        </p>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h3 className="font-semibold text-white">{t.addDecision}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <input value={title} onChange={(event) => setTitle(event.target.value)} disabled={!canEdit} placeholder={t.decisionTitle} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60" />
          <input value={reason} onChange={(event) => setReason(event.target.value)} disabled={!canEdit} placeholder={t.reason} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60" />
          <button disabled={!canEdit} onClick={() => void addDecision()} className="focus-ring rounded-md bg-amn-cyan px-4 py-2 text-sm font-semibold text-ink-950 disabled:opacity-50">
            {t.addDecision}
          </button>
        </div>
        {!canEdit ? <p className="mt-3 text-xs text-slate-500">Only Admin can add project decisions.</p> : null}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {data.decisions.map((decision) => (
          <article key={decision.id} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-semibold text-white">{decision.title}</h3>
              <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-400">{decision.status}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{decision.description}</p>
            <p className="mt-3 text-sm text-slate-400">{t.reason}: {decision.reason}</p>
            <p className="mt-2 text-sm text-slate-400">{t.impact}: {decision.impact}</p>
            <p className="mt-2 text-xs text-slate-500">{decision.date} - {decision.decidedBy}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
