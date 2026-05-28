import { useMemo, useState } from "react";
import { StatusBadge } from "../components/StatusBadge";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { canEditProjectData } from "../services/access";

const severities = ["low", "medium", "high", "critical"] as const;

export function BlockersPage() {
  const { data, currentUser, upsertBlocker } = useWorkspace();
  const { t } = useI18n();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ownerSlug, setOwnerSlug] = useState(currentUser.role === "member" ? currentUser.slug : "ali");
  const [severity, setSeverity] = useState<(typeof severities)[number]>("high");
  const [resolutionNote, setResolutionNote] = useState("");
  const [message, setMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [phaseFilter, setPhaseFilter] = useState("all");

  const canEdit = canEditProjectData(currentUser) || currentUser.role === "member";
  const canChooseOwner = canEditProjectData(currentUser);

  const phaseOptions = useMemo(() => {
    return Array.from(new Set(data.blockers.map((blocker) => blocker.phase))).filter(Boolean);
  }, [data.blockers]);

  const visibleBlockers = useMemo(() => {
    return data.blockers.filter((blocker) => {
      const byStatus = statusFilter === "all" || blocker.status === statusFilter;
      const byOwner = ownerFilter === "all" || blocker.ownerSlug === ownerFilter;
      const byPhase = phaseFilter === "all" || blocker.phase === phaseFilter;
      return byStatus && byOwner && byPhase;
    });
  }, [data.blockers, statusFilter, ownerFilter, phaseFilter]);

  const addBlocker = async () => {
    if (!title.trim()) return;
    const now = new Date().toISOString();
    setMessage("");
    try {
      await upsertBlocker({
        id: crypto.randomUUID(),
        title,
        description,
        ownerSlug,
        severity,
        phase: data.settings.currentPhaseId,
        status: "open",
        createdAt: now,
        updatedAt: now,
        updatedBy: currentUser.slug
      });
      setTitle("");
      setDescription("");
      setSeverity("high");
      setMessage(t.saved);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t.saveFailed);
    }
  };

  const resolveBlocker = async (id: string) => {
    const blocker = data.blockers.find((item) => item.id === id);
    if (!blocker) return;
    setMessage("");
    try {
      await upsertBlocker({
        ...blocker,
        status: "resolved",
        resolvedAt: new Date().toISOString(),
        resolutionNote: resolutionNote || t.defaultResolutionNote,
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser.slug
      });
      setResolutionNote("");
      setMessage(t.saved);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t.saveFailed);
    }
  };

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <h2 className="text-3xl font-semibold text-white">{t.blockerManagement}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{t.blockerDescription}</p>
      </section>

      <section className="panel p-5">
        <h3 className="font-semibold text-white">{t.addBlocker}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t.title} disabled={!canEdit} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60" />
          <select value={ownerSlug} onChange={(event) => setOwnerSlug(event.target.value)} disabled={!canEdit || !canChooseOwner} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60">
            {data.teamMembers.map((member) => (
              <option key={member.slug} value={member.slug}>
                {member.name} - {member.role}
              </option>
            ))}
          </select>
          <select value={severity} onChange={(event) => setSeverity(event.target.value as (typeof severities)[number])} disabled={!canEdit} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60">
            {severities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button disabled={!canEdit} onClick={() => void addBlocker()} className="focus-ring rounded-md bg-amn-cyan px-4 py-2 text-sm font-semibold text-ink-950 disabled:opacity-50">
            {t.addBlocker}
          </button>
        </div>
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder={t.description} disabled={!canEdit} className="focus-ring mt-4 min-h-24 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200 disabled:opacity-60" />
        {message ? <p className="mt-3 text-sm text-slate-300">{message}</p> : null}
      </section>

      <section className="panel p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <Filter label={t.status} value={statusFilter} onChange={setStatusFilter} options={[["all", t.allStatuses], ["open", t.openOnly], ["resolved", t.resolvedOnly]]} />
          <Filter label={t.filterMember} value={ownerFilter} onChange={setOwnerFilter} options={[["all", t.allMembers], ...data.teamMembers.map((member) => [member.slug, member.name] as [string, string])]} />
          <Filter label={t.phase} value={phaseFilter} onChange={setPhaseFilter} options={[["all", t.allPhases], ...phaseOptions.map((phase) => [phase, phase] as [string, string])]} />
        </div>
      </section>

      {visibleBlockers.length === 0 ? (
        <section className="panel p-5 text-sm text-slate-400">{t.emptyBlockersState}</section>
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {visibleBlockers.map((blocker) => {
            const owner = data.teamMembers.find((member) => member.slug === blocker.ownerSlug);
            const canResolve = blocker.status === "open" && (canEditProjectData(currentUser) || blocker.ownerSlug === currentUser.slug);
            return (
              <article key={blocker.id} className="panel p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{blocker.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {owner?.name ?? blocker.ownerSlug} - {blocker.phase}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={blocker.severity} />
                    <StatusBadge status={blocker.status === "open" ? "blocked" : "completed"} />
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{blocker.description}</p>
                {blocker.resolutionNote ? <p className="mt-2 text-xs text-slate-500">{t.resolutionNote}: {blocker.resolutionNote}</p> : null}
                {canResolve ? (
                  <div className="mt-4 space-y-2">
                    <textarea
                      value={resolutionNote}
                      onChange={(event) => setResolutionNote(event.target.value)}
                      placeholder={t.resolutionNote}
                      className="focus-ring min-h-20 w-full rounded-md border border-white/10 bg-ink-950 p-2 text-sm text-slate-200"
                    />
                    <button onClick={() => void resolveBlocker(blocker.id)} className="focus-ring rounded-md border border-emerald-300/30 px-3 py-1.5 text-xs font-semibold text-emerald-100">
                      {t.markResolved}
                    </button>
                  </div>
                ) : null}
              </article>
            );
          })}
        </section>
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

function SeverityBadge({ severity }: { severity: "low" | "medium" | "high" | "critical" }) {
  const tone =
    severity === "critical"
      ? "border-rose-300/30 bg-rose-300/10 text-rose-100"
      : severity === "high"
        ? "border-amber-300/30 bg-amber-300/10 text-amber-100"
        : severity === "medium"
          ? "border-sky-300/30 bg-sky-300/10 text-sky-100"
          : "border-emerald-300/30 bg-emerald-300/10 text-emerald-100";

  return <span className={`chip ${tone}`}>{severity}</span>;
}
