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
  const [impact, setImpact] = useState("");
  const [message, setMessage] = useState("");

  const addDecision = async () => {
    if (!title.trim()) return;
    const now = new Date().toISOString();
    setMessage("");
    try {
      await upsertDecision({
        id: crypto.randomUUID(),
        title,
        description: title,
        reason,
        date: now.slice(0, 10),
        decidedBy: currentUser.name,
        impact: impact || "Internal project coordination impact only.",
        relatedPhase: data.settings.currentPhaseId,
        status: "active",
        updatedAt: now,
        updatedBy: currentUser.slug
      });
      setTitle("");
      setReason("");
      setImpact("");
      setMessage(t.saved);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t.saveFailed);
    }
  };

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <h2 className="text-3xl font-semibold text-white">{t.decisionLog}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{t.decisionDescription}</p>
      </section>

      <section className="panel p-5">
        <h3 className="font-semibold text-white">{t.addDecision}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <input value={title} onChange={(event) => setTitle(event.target.value)} disabled={!canEdit} placeholder={t.decisionTitle} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60" />
          <input value={reason} onChange={(event) => setReason(event.target.value)} disabled={!canEdit} placeholder={t.reason} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60" />
          <input value={impact} onChange={(event) => setImpact(event.target.value)} disabled={!canEdit} placeholder={t.impact} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60" />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button disabled={!canEdit} onClick={() => void addDecision()} className="focus-ring rounded-md bg-amn-cyan px-4 py-2 text-sm font-semibold text-ink-950 disabled:opacity-50">
            {t.addDecision}
          </button>
          {!canEdit ? <p className="text-xs text-slate-500">{t.adminOnlyDecisionEdit}</p> : null}
          {message ? <p className="text-sm text-slate-300">{message}</p> : null}
        </div>
      </section>

      {data.decisions.length === 0 ? (
        <section className="panel p-5 text-sm text-slate-400">{t.emptyDecisionsState}</section>
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {data.decisions.map((decision) => (
            <article key={decision.id} className="panel p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-semibold text-white">{decision.title}</h3>
                <span className="chip text-slate-300">{decision.status}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{decision.description}</p>
              <div className="mt-3 space-y-1 text-sm text-slate-300">
                <p>
                  <span className="text-slate-500">{t.reason}:</span> {decision.reason || t.none}
                </p>
                <p>
                  <span className="text-slate-500">{t.impact}:</span> {decision.impact || t.none}
                </p>
                <p>
                  <span className="text-slate-500">{t.phase}:</span> {decision.relatedPhase || t.none}
                </p>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                {decision.date} - {decision.decidedBy}
              </p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
