import { useState } from "react";
import { StatusBadge } from "../components/StatusBadge";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { canEditProjectData } from "../services/access";

export function BlockersPage() {
  const { data, currentUser, upsertBlocker } = useWorkspace();
  const { t } = useI18n();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ownerSlug, setOwnerSlug] = useState(currentUser.role === "member" ? currentUser.slug : "ali");
  const canEdit = canEditProjectData(currentUser) || currentUser.role === "member";
  const canChooseOwner = canEditProjectData(currentUser);

  const addBlocker = async () => {
    if (!title.trim()) return;
    const now = new Date().toISOString();
    await upsertBlocker({
      id: crypto.randomUUID(),
      title,
      description,
      ownerSlug,
      severity: "high",
      phase: data.settings.currentPhaseId,
      status: "open",
      createdAt: now,
      updatedAt: now,
      updatedBy: currentUser.slug
    });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold text-white">{t.blockerManagement}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          {t.blockerDescription}
        </p>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h3 className="font-semibold text-white">{t.addBlocker}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t.title} disabled={!canEdit} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60" />
          <select value={ownerSlug} onChange={(event) => setOwnerSlug(event.target.value)} disabled={!canEdit || !canChooseOwner} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60">
            {data.teamMembers.map((member) => (
              <option key={member.slug} value={member.slug}>
                {member.name} - {member.role}
              </option>
            ))}
          </select>
          <button disabled={!canEdit} onClick={() => void addBlocker()} className="focus-ring rounded-md bg-amn-cyan px-4 py-2 text-sm font-semibold text-ink-950 disabled:opacity-50">
            {t.addBlocker}
          </button>
        </div>
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder={t.description} disabled={!canEdit} className="focus-ring mt-4 min-h-24 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {data.blockers.map((blocker) => {
          const owner = data.teamMembers.find((member) => member.slug === blocker.ownerSlug);
          return (
            <article key={blocker.id} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{blocker.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{owner?.role ?? blocker.ownerSlug} - {blocker.severity}</p>
                </div>
                <StatusBadge status={blocker.status === "open" ? "blocked" : "completed"} />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{blocker.description}</p>
              {blocker.status === "open" && (canEditProjectData(currentUser) || blocker.ownerSlug === currentUser.slug) ? (
                <button
                  onClick={() =>
                    void upsertBlocker({
                      ...blocker,
                      status: "resolved",
                      resolvedAt: new Date().toISOString(),
                      resolutionNote: "Resolved in Command Center.",
                      updatedAt: new Date().toISOString(),
                      updatedBy: currentUser.slug
                    })
                  }
                  className="focus-ring mt-4 rounded-md border border-emerald-300/30 px-3 py-1.5 text-xs font-semibold text-emerald-100"
                >
                  {t.markResolved}
                </button>
              ) : null}
            </article>
          );
        })}
      </section>
    </div>
  );
}
