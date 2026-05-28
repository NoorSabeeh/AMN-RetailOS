import type { Priority, Status, TaskItem, TaskState } from "../types/portal";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

const statuses: Status[] = ["planned", "active", "blocked", "completed", "deferred", "ready_for_approval"];

export function TaskTable({
  priority,
  tasks,
  state,
  onStateChange
}: {
  priority: Priority;
  tasks: TaskItem[];
  state: Record<string, TaskState>;
  onStateChange: (taskId: string, next: TaskState) => void;
}) {
  const grouped = tasks.filter((task) => task.priority === priority);

  if (grouped.length === 0) {
    return <p className="rounded-lg border border-white/10 p-5 text-sm text-slate-400">No {priority} tasks yet.</p>;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white">{priority}</h2>
      <div className="overflow-hidden rounded-lg border border-white/10">
        <div className="hidden grid-cols-[1.3fr_1fr_0.7fr_0.9fr_1.2fr] gap-4 bg-ink-800 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:grid">
          <span>Task</span>
          <span>Owner</span>
          <span>Status</span>
          <span>Progress</span>
          <span>Notes</span>
        </div>
        <div className="divide-y divide-white/10">
          {grouped.map((task) => {
            const current =
              state[task.id] ??
              ({
                status: task.status,
                notes: task.notes,
                done: task.status === "completed",
                checklist: Object.fromEntries(task.checklist.map((item) => [item.id, Boolean(item.completed)]))
              } satisfies TaskState);
            const completed = task.checklist.filter((item) => current.checklist[item.id] ?? item.completed).length;
            const progress = task.checklist.length ? Math.round((completed / task.checklist.length) * 100) : 0;

            return (
              <article key={task.id} className="grid gap-4 bg-white/[0.035] p-4 lg:grid-cols-[1.3fr_1fr_0.7fr_0.9fr_1.2fr]">
                <div>
                  <label className="flex items-start gap-3 text-sm font-semibold text-white">
                    <input
                      type="checkbox"
                      checked={current.done}
                      onChange={(event) =>
                        onStateChange(task.id, {
                          ...current,
                          done: event.target.checked,
                          status: event.target.checked ? "completed" : current.status
                        })
                      }
                      className="mt-1 h-4 w-4 accent-amn-cyan"
                    />
                    <span>{task.title}</span>
                  </label>
                  <p className="mt-2 text-xs text-slate-500">{task.phase}</p>
                  <div className="mt-3 space-y-2">
                    {task.checklist.map((item) => (
                      <label key={item.id} className="flex items-start gap-2 text-xs text-slate-400">
                        <input
                          type="checkbox"
                          checked={current.checklist[item.id] ?? false}
                          onChange={(event) =>
                            onStateChange(task.id, {
                              ...current,
                              checklist: { ...current.checklist, [item.id]: event.target.checked }
                            })
                          }
                          className="mt-0.5 h-3.5 w-3.5 accent-amn-cyan"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-300">{task.ownerRole}</p>
                <div className="space-y-2">
                  <StatusBadge status={current.status} />
                  <select
                    value={current.status}
                    onChange={(event) => onStateChange(task.id, { ...current, status: event.target.value as Status })}
                    className="focus-ring w-full rounded-md border border-white/10 bg-ink-950 p-2 text-sm text-slate-200"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <ProgressBar value={progress} />
                </div>
                <textarea
                  value={current.notes}
                  onChange={(event) => onStateChange(task.id, { ...current, notes: event.target.value })}
                  className="focus-ring min-h-24 rounded-md border border-white/10 bg-ink-950/80 p-3 text-sm text-slate-200"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
