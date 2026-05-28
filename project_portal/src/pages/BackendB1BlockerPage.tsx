import { ProgressBar } from "../components/ProgressBar";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { calculateChecklistProgress } from "../services/progress";

const required = [
  "Install .NET SDK",
  "Run dotnet --info and confirm SDK is listed",
  "Run restore/build/test",
  "Validate migrations/tests",
  "Confirm B1 acceptance criteria before resuming"
];

export function BackendB1BlockerPage() {
  const { data } = useWorkspace();
  const { t } = useI18n();
  const task = data.tasks.find((item) => item.id === "t1-sdk-blocker");
  const progress = task ? calculateChecklistProgress(task.checklist) : { percent: 0, completed: 0, total: 0, completedWeight: 0, totalWeight: 0 };

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-rose-400/30 bg-rose-400/10 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-200">{t.blockedPhase}</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{t.b1BlockedTitle}</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-rose-50/80">
          {t.b1BlockedDescription}
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h3 className="text-lg font-semibold text-white">{t.requiredBeforeContinuing}</h3>
          <div className="mt-4">
            <ProgressBar value={progress.percent} label={`${progress.completed}/${progress.total} task checklist`} />
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {required.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h3 className="text-lg font-semibold text-white">{t.currentBlockers}</h3>
          <div className="mt-4 space-y-3">
            {data.blockers
              .filter((blocker) => blocker.phase === "phase-b1" && blocker.status === "open")
              .map((blocker) => (
                <div key={blocker.id} className="rounded-md bg-ink-950/60 p-3">
                  <h4 className="font-semibold text-white">{blocker.title}</h4>
                  <p className="mt-2 text-sm text-slate-300">{blocker.description}</p>
                </div>
              ))}
          </div>
        </article>
      </section>
    </div>
  );
}
