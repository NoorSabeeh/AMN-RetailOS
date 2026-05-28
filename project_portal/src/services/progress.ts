import type { Blocker, ChecklistItem, MemberState, ProgressSummary, TaskState } from "../types/portal";

export function calculateChecklistProgress(items: ChecklistItem[], state?: MemberState | TaskState): ProgressSummary {
  if (items.length === 0) {
    return { completed: 0, total: 0, percent: 0, completedWeight: 0, totalWeight: 0 };
  }

  let completed = 0;
  let completedWeight = 0;
  let totalWeight = 0;

  for (const item of items) {
    const weight = state?.checklistWeights?.[item.id] ?? item.weight ?? 1;
    const isCompleted = state?.checklist?.[item.id] ?? item.completed ?? false;
    totalWeight += weight;
    if (isCompleted) {
      completed += 1;
      completedWeight += weight;
    }
  }

  const percent = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
  return { completed, total: items.length, percent, completedWeight, totalWeight };
}

export function hasOpenBlocker(blockers: Blocker[], memberSlug?: string, phaseId?: string) {
  return blockers.some(
    (blocker) =>
      blocker.status === "open" &&
      (!memberSlug || blocker.ownerSlug === memberSlug) &&
      (!phaseId || blocker.phase === phaseId)
  );
}

export function getDerivedStatus(progress: number, blocked: boolean) {
  if (blocked) {
    return "blocked" as const;
  }
  if (progress >= 100) {
    return "completed" as const;
  }
  return "active" as const;
}
