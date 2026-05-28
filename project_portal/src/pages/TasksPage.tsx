import { useMemo, useState } from "react";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { useWorkspace } from "../context/WorkspaceContext";
import { useI18n } from "../i18n/I18nProvider";
import { canEditTask } from "../services/access";
import { calculateChecklistProgress } from "../services/progress";
import type { Priority, Status, TaskItem } from "../types/portal";

const priorities: Priority[] = ["P0", "P1", "P2", "Deferred"];
const statuses: Status[] = ["planned", "active", "blocked", "completed", "deferred", "ready_for_approval"];

export function TasksPage() {
  const { data, currentUser, updateTask } = useWorkspace();
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [actionError, setActionError] = useState("");
  const filtered = useMemo(
    () => data.tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase()) || task.ownerRole.toLowerCase().includes(query.toLowerCase())),
    [data.tasks, query]
  );

  const changeTask = async (task: TaskItem, patch: Partial<TaskItem>) => {
    if (!canEditTask(currentUser, task)) return;
    setActionError("");
    try {
      await updateTask({ ...task, ...patch });
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Unable to save task update.");
    }
  };

  const toggleChecklist = async (task: TaskItem, itemId: string) => {
    await changeTask(task, {
      checklist: task.checklist.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item))
    });
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold text-white">{t.tasks}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          Tasks sync to Supabase when configured. In local fallback mode, they stay in this browser only.
        </p>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tasks or roles"
          className="focus-ring mt-4 w-full max-w-md rounded-md border border-white/10 bg-ink-950 p-3 text-sm text-slate-200"
        />
        {actionError ? <p className="mt-3 text-sm text-rose-200">{actionError}</p> : null}
      </section>

      {priorities.map((priority) => {
        const group = filtered.filter((task) => task.priority === priority);
        return (
          <section key={priority} className="space-y-3">
            <h3 className="text-xl font-semibold text-white">{priority}</h3>
            {group.length === 0 ? (
              <p className="rounded-lg border border-white/10 bg-white/[0.045] p-4 text-sm text-slate-400">No tasks in this group.</p>
            ) : (
              <div className="overflow-hidden rounded-lg border border-white/10">
                <table className="w-full min-w-[1100px] text-left text-sm">
                  <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.14em] text-slate-500">
                    <tr>
                      <th className="px-4 py-3">{t.tasks}</th>
                      <th className="px-4 py-3">{t.role}</th>
                      <th className="px-4 py-3">{t.phase}</th>
                      <th className="px-4 py-3">{t.status}</th>
                      <th className="px-4 py-3">Due</th>
                      <th className="px-4 py-3">{t.checklist}</th>
                      <th className="px-4 py-3">{t.progress}</th>
                      <th className="px-4 py-3">{t.notes}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {group.map((task) => {
                      const progress = calculateChecklistProgress(task.checklist);
                      const editable = canEditTask(currentUser, task);
                      const overdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";
                      return (
                        <tr key={task.id} className="align-top">
                          <td className="px-4 py-4">
                            <p className="font-semibold text-white">{task.title}</p>
                            {task.dependencies?.length ? <p className="mt-1 text-xs text-slate-500">Depends on: {task.dependencies.join(", ")}</p> : null}
                          </td>
                          <td className="px-4 py-4 text-slate-300">{task.ownerRole}</td>
                          <td className="px-4 py-4 text-slate-300">{task.phase}</td>
                          <td className="px-4 py-4">
                            {editable ? (
                              <select value={task.status} onChange={(event) => void changeTask(task, { status: event.target.value as Status })} className="focus-ring rounded-md border border-white/10 bg-ink-950 p-2 text-slate-200">
                                {statuses.map((status) => (
                                  <option key={status} value={status}>
                                    {status.replaceAll("_", " ")}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <StatusBadge status={task.status} />
                            )}
                          </td>
                          <td className="px-4 py-4 text-slate-300">
                            {task.dueDate ?? "No due date"}
                            {overdue ? <span className="ml-2 rounded-full bg-rose-400/10 px-2 py-1 text-xs text-rose-200">Overdue</span> : null}
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-2">
                              {task.checklist.map((item) => (
                                <label key={item.id} className="flex items-center gap-2 text-xs text-slate-300">
                                  <input disabled={!editable} checked={Boolean(item.completed)} type="checkbox" onChange={() => void toggleChecklist(task, item.id)} />
                                  {item.label}
                                </label>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <ProgressBar value={progress.percent} label={`${progress.completed}/${progress.total}`} />
                          </td>
                          <td className="px-4 py-4">
                            <textarea
                              defaultValue={task.notes}
                              disabled={!editable}
                              onBlur={(event) => void changeTask(task, { notes: event.currentTarget.value })}
                              className="focus-ring min-h-20 w-64 rounded-md border border-white/10 bg-ink-950 p-2 text-xs text-slate-200 disabled:opacity-60"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
