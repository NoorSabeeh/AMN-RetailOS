import { PhaseCard } from "../components/PhaseCard";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { canEditProjectData } from "../services/access";
import type { Status } from "../types/portal";

const statuses: Status[] = ["completed", "active", "blocked", "planned", "deferred", "ready_for_approval"];

export function RoadmapPage() {
  const { data, currentUser, saveData } = useWorkspace();
  const { t } = useI18n();
  const canEdit = canEditProjectData(currentUser);

  const updatePhase = async (phaseId: string, patch: Partial<(typeof data.phases)[number]>) => {
    if (!canEdit) return;
    const phases = data.phases.map((phase) => (phase.id === phaseId ? { ...phase, ...patch, updatedAt: new Date().toISOString(), updatedBy: currentUser.slug } : phase));
    await saveData({ ...data, phases }, "phase_updated", "phase", phaseId, `Updated phase ${phaseId}`);
  };

  const setCurrentPhase = async (phaseId: string) => {
    if (!canEdit) return;
    await saveData({ ...data, settings: { ...data.settings, currentPhaseId: phaseId } }, "current_phase_updated", "project_settings", data.settings.id, `Current phase set to ${phaseId}`);
  };

  return (
    <div className="space-y-6">
      <Header title={t.roadmap} description={t.roadmapDescription} />
      <div className="grid gap-5 xl:grid-cols-2">
        {data.phases.map((phase) => (
          <div key={phase.id} className="space-y-3">
            <PhaseCard phase={phase} />
            {canEdit ? (
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <select value={phase.status} onChange={(event) => void updatePhase(phase.id, { status: event.target.value as Status })} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-2 text-sm text-slate-200">
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => void setCurrentPhase(phase.id)} className="focus-ring rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-white">
                    {t.setCurrentPhase}
                  </button>
                </div>
                <textarea
                  defaultValue={phase.notes}
                  onBlur={(event) => void updatePhase(phase.id, { notes: event.currentTarget.value })}
                  className="focus-ring mt-3 min-h-20 w-full rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200"
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ title, description }: { title: string; description: string }) {
  return (
    <section>
      <h2 className="text-3xl font-semibold text-white">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{description}</p>
    </section>
  );
}
