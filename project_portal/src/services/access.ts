import type { CurrentUser, TaskItem, TeamMember } from "../types/portal";

export function canEditProjectData(user: CurrentUser) {
  return user.role === "admin";
}

export function canEditMemberWorkspace(user: CurrentUser, member: TeamMember) {
  return user.role === "admin" || (user.role === "member" && user.slug === member.slug);
}

export function canEditTask(user: CurrentUser, task: TaskItem) {
  return user.role === "admin" || (user.role === "member" && task.ownerSlug === user.slug);
}

export function permissionSummary(user: CurrentUser) {
  if (user.role === "admin") {
    return "Admin can edit project settings, phases, tasks, member assignments, blockers, decisions, audit views, and phase approvals.";
  }
  if (user.role === "member") {
    return "Member can update own workspace, own checklists, own notes, and tasks assigned to their role.";
  }
  return "Viewer can read approved overview, roadmap, docs, and progress data only.";
}
