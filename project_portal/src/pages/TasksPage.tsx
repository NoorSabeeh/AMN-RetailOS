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
  const [pendingTaskIds, setPendingTaskIds] = useState<string[]>([]);
  const filtered = useMemo(
    () => data.tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase()) || task.ownerRole.toLowerCase().includes(query.toLowerCase())),
    [data.tasks, query]
  );

  const setPending = (taskId: string, active: boolean) => {
    setPendingTaskIds((current) => (active ? Array.from(new Set([...current, taskId])) : current.filter((id) => id !== taskId)));
  };

  const changeTask = async (task: TaskItem, patch: Partial<TaskItem>) => {
    if (!canEditTask(currentUser, task)) return;
    if (pendingTaskIds.includes(task.id)) return;
    setActionError("");
    setPending(task.id, true);
    try {
      await updateTask({ ...task, ...patch });
    } catch (error) {
      setActionError(error instanceof Error ? error.message : t.saveFailed);
    } finally {
      setPending(task.id, false);
    }
  };

  const toggleChecklist = async (task: TaskItem, itemId: string) => {
    await changeTask(task, {
      checklist: task.checklist.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item))
    });
  };

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <h2 className="text-3xl font-semibold text-white">{t.tasks}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{t.tasksPageDescription}</p>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.searchTasks}
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
              <p className="panel p-4 text-sm text-slate-400">{t.emptyTasksState}</p>
            ) : (
              <>
                <div className="hidden overflow-hidden rounded-lg border border-white/10 xl:block">
                  <table className="w-full min-w-[1100px] text-left text-sm">
                    <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.14em] text-slate-500">
                      <tr>
                        <th className="px-4 py-3">{t.tasks}</th>
                        <th className="px-4 py-3">{t.role}</th>
                        <th className="px-4 py-3">{t.phase}</th>
                        <th className="px-4 py-3">{t.status}</th>
                        <th className="px-4 py-3">{t.dueDate}</th>
                        <th className="px-4 py-3">{t.checklist}</th>
                        <th className="px-4 py-3">{t.progress}</th>
                        <th className="px-4 py-3">{t.notes}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {group.map((task) => (
                        <TaskRow
                          key={task.id}
                          task={task}
                          canEdit={canEditTask(currentUser, task)}
                          pending={pendingTaskIds.includes(task.id)}
                          onChangeTask={changeTask}
                          onToggleChecklist={toggleChecklist}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-4 xl:hidden">
                  {group.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      canEdit={canEditTask(currentUser, task)}
                      pending={pendingTaskIds.includes(task.id)}
                      onChangeTask={changeTask}
                      onToggleChecklist={toggleChecklist}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}

function TaskRow({
  task,
  canEdit,
  pending,
  onChangeTask,
  onToggleChecklist
}: {
  task: TaskItem;
  canEdit: boolean;
  pending: boolean;
  onChangeTask: (task: TaskItem, patch: Partial<TaskItem>) => Promise<void>;
  onToggleChecklist: (task: TaskItem, itemId: string) => Promise<void>;
}) {
  const { t } = useI18n();
  const progress = calculateChecklistProgress(task.checklist);
  const overdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";
  const disabledHint = canEdit ? "" : t.readOnlyTaskHint;

  return (
    <tr className="align-top">
      <td className="px-4 py-4">
        <p className="font-semibold text-white">{task.title}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="chip text-slate-300">{task.priority}</span>
          <span className="chip text-slate-300">{task.ownerRole}</span>
          {pending ? <span className="chip border-amn-cyan/30 bg-amn-cyan/10 text-amn-cyan">{t.saving}</span> : null}
        </div>
        {task.dependencies?.length ? <p className="mt-2 text-xs text-slate-500">{t.dependencies}: {task.dependencies.join(", ")}</p> : null}
      </td>
      <td className="px-4 py-4 text-slate-300">{task.ownerRole}</td>
      <td className="px-4 py-4 text-slate-300">{task.phase}</td>
      <td className="px-4 py-4">
        {canEdit ? (
          <select
            value={task.status}
            disabled={pending}
            onChange={(event) => void onChangeTask(task, { status: event.target.value as Status })}
            className="focus-ring w-full rounded-md border border-white/10 bg-ink-950 p-2 text-slate-200 disabled:opacity-60"
          >
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
        {task.dueDate ?? t.noDueDate}
        {overdue ? <span className="ml-2 rounded-full bg-rose-400/10 px-2 py-1 text-xs text-rose-200">{t.overdue}</span> : null}
      </td>
      <td className="px-4 py-4">
        <div className="space-y-2">
          {task.checklist.map((item) => (
            <label key={item.id} className="flex items-center gap-2 text-xs text-slate-300">
              <input
                disabled={!canEdit || pending}
                title={disabledHint}
                checked={Boolean(item.completed)}
                type="checkbox"
                onChange={() => void onToggleChecklist(task, item.id)}
              />
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
          disabled={!canEdit || pending}
          title={disabledHint}
          onBlur={(event) => void onChangeTask(task, { notes: event.currentTarget.value })}
          className="focus-ring min-h-20 w-64 rounded-md border border-white/10 bg-ink-950 p-2 text-xs text-slate-200 disabled:opacity-60"
        />
      </td>
    </tr>
  );
}

function TaskCard({
  task,
  canEdit,
  pending,
  onChangeTask,
  onToggleChecklist
}: {
  task: TaskItem;
  canEdit: boolean;
  pending: boolean;
  onChangeTask: (task: TaskItem, patch: Partial<TaskItem>) => Promise<void>;
  onToggleChecklist: (task: TaskItem, itemId: string) => Promise<void>;
}) {
  const { t } = useI18n();
  const progress = calculateChecklistProgress(task.checklist);
  const disabledHint = canEdit ? "" : t.readOnlyTaskHint;

  return (
    <article className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-base font-semibold text-white">{task.title}</h4>
          <p className="mt-1 text-xs text-slate-500">
            {task.ownerRole} - {task.phase}
          </p>
        </div>
        <StatusBadge status={task.status} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="chip text-slate-300">{task.priority}</span>
        {pending ? <span className="chip border-amn-cyan/30 bg-amn-cyan/10 text-amn-cyan">{t.saving}</span> : null}
      </div>
      <div className="mt-3">
        <ProgressBar value={progress.percent} label={`${progress.completed}/${progress.total}`} />
      </div>
      <div className="mt-3 space-y-2">
        {task.checklist.map((item) => (
          <label key={item.id} className="flex items-center gap-2 text-xs text-slate-300">
            <input
              disabled={!canEdit || pending}
              title={disabledHint}
              checked={Boolean(item.completed)}
              type="checkbox"
              onChange={() => void onToggleChecklist(task, item.id)}
            />
            {item.label}
          </label>
        ))}
      </div>
      <textarea
        defaultValue={task.notes}
        disabled={!canEdit || pending}
        title={disabledHint}
        onBlur={(event) => void onChangeTask(task, { notes: event.currentTarget.value })}
        className="focus-ring mt-3 min-h-20 w-full rounded-md border border-white/10 bg-ink-950 p-2 text-xs text-slate-200 disabled:opacity-60"
      />
    </article>
  );
}
