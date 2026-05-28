import type { SupabaseClient } from "@supabase/supabase-js";
import { seedWorkspaceData } from "../data/seed";
import type {
  AuditEvent,
  Blocker,
  CurrentUser,
  Decision,
  DocLink,
  Phase,
  PhaseTransition,
  PortalNotification,
  Priority,
  ProjectSettings,
  Status,
  TaskItem,
  TeamMember,
  TeamUpdate,
  WorkspaceData
} from "../types/portal";

type Row = Record<string, unknown>;

const taskStatusToUi: Record<string, Status> = {
  not_started: "planned",
  in_progress: "active",
  blocked: "blocked",
  done: "completed",
  deferred: "deferred"
};

const taskStatusToDb: Record<Status, string> = {
  planned: "not_started",
  active: "in_progress",
  blocked: "blocked",
  completed: "done",
  deferred: "deferred",
  ready_for_approval: "in_progress"
};

export async function loadWorkspaceFromTables(client: SupabaseClient): Promise<WorkspaceData> {
  const [
    settingsResult,
    phasesResult,
    phaseMembersResult,
    membersResult,
    tasksResult,
    checklistResult,
    blockersResult,
    updatesResult,
    docsResult,
    decisionsResult,
    transitionsResult,
    auditResult,
    notificationsResult
  ] = await Promise.all([
    client.from("project_settings").select("*").limit(1).maybeSingle(),
    client.from("phases").select("*").order("order_index", { ascending: true }),
    client.from("phase_members").select("*"),
    client.from("team_members").select("*").order("created_at", { ascending: true }),
    client.from("tasks").select("*").order("created_at", { ascending: true }),
    client.from("checklist_items").select("*").order("order_index", { ascending: true }),
    client.from("blockers").select("*").order("created_at", { ascending: false }),
    client.from("member_updates").select("*").order("updated_at", { ascending: false }),
    client.from("docs_links").select("*").order("category", { ascending: true }),
    client.from("decisions").select("*").order("decided_at", { ascending: false }),
    client.from("phase_transitions").select("*").order("approved_at", { ascending: false }),
    client.from("audit_events").select("*").order("created_at", { ascending: false }).limit(250),
    client.from("notifications").select("*").order("created_at", { ascending: false }).limit(100)
  ]);

  const firstError = [
    settingsResult,
    phasesResult,
    phaseMembersResult,
    membersResult,
    tasksResult,
    checklistResult,
    blockersResult,
    updatesResult,
    docsResult,
    decisionsResult,
    transitionsResult,
    auditResult,
    notificationsResult
  ].find((result) => result.error)?.error;

  if (firstError) {
    throw new Error(firstError.message);
  }

  const checklistRows = (checklistResult.data ?? []) as Row[];
  const phaseMemberRows = (phaseMembersResult.data ?? []) as Row[];
  const seedMembersBySlug = new Map(seedWorkspaceData.teamMembers.map((member) => [member.slug, member]));
  const currentPhaseId = stringOr(settingsResult.data?.current_phase_id, seedWorkspaceData.settings.currentPhaseId);

  const teamMembers: TeamMember[] =
    membersResult.data && membersResult.data.length
      ? (membersResult.data as Row[]).map((row) => {
          const slug = stringOr(row.slug, "");
          const seed = seedMembersBySlug.get(slug);
          const memberPhaseRows = phaseMemberRows.filter((phaseMember) => phaseMember.member_slug === slug);
          const memberChecklist = checklistRows
            .filter((item) => !item.task_id && item.owner_slug === slug)
            .map((item) => ({
              id: stringOr(item.id, crypto.randomUUID()),
              label: stringOr(item.title, ""),
              completed: Boolean(item.is_done),
              weight: numberOr(item.weight, 1)
            }));

          return {
            slug,
            name: stringOr(row.display_name, seed?.name ?? slug),
            accountRole: row.portal_role === "admin" || row.portal_role === "viewer" ? row.portal_role : "member",
            role: stringOr(row.role_label, seed?.role ?? ""),
            currentPhaseRole: stringOr(memberPhaseRows.find((item) => item.phase_id === currentPhaseId)?.role_in_phase, seed?.currentPhaseRole ?? ""),
            summary: seed?.summary ?? stringOr(row.role_label, ""),
            responsibilities: seed?.responsibilities ?? [],
            filesToRead: seed?.filesToRead ?? [],
            deliverables: seed?.deliverables ?? [],
            nextActions: seed?.nextActions ?? [],
            status: seed?.status ?? "active",
            checklist: memberChecklist.length ? memberChecklist : seed?.checklist ?? [],
            progress: seed?.progress ?? 0,
            assignedPhaseIds: memberPhaseRows.map((item) => stringOr(item.phase_id, "")).filter(Boolean),
            updatedAt: stringOr(row.updated_at, undefined),
            updatedBy: stringOr(row.updated_by, undefined)
          };
        })
      : seedWorkspaceData.teamMembers;

  const phases: Phase[] =
    phasesResult.data && phasesResult.data.length
      ? (phasesResult.data as Row[]).map((row) => {
          const seed = seedWorkspaceData.phases.find((phase) => phase.id === row.id);
          return {
            id: stringOr(row.id, ""),
            name: stringOr(row.title, seed?.name ?? ""),
            status: coerceStatus(row.status),
            objective: stringOr(row.objective, ""),
            allowedScope: stringArrayOr(row.allowed_scope, []),
            outOfScope: stringArrayOr(row.out_of_scope, []),
            deliverables: seed?.deliverables ?? [],
            notes: seed?.notes ?? "",
            progress: calculatePhaseProgress(stringOr(row.id, ""), checklistRows),
            nextPhaseId: stringOr(row.next_phase_id, undefined),
            updatedAt: stringOr(row.updated_at, undefined),
            updatedBy: stringOr(row.updated_by, undefined)
          };
        })
      : seedWorkspaceData.phases;

  const tasks: TaskItem[] =
    tasksResult.data && tasksResult.data.length
      ? (tasksResult.data as Row[]).map((row) => {
          const taskId = stringOr(row.id, "");
          const ownerSlug = stringOr(row.owner_slug, "");
          const owner = teamMembers.find((member) => member.slug === ownerSlug);
          return {
            id: taskId,
            title: stringOr(row.title, ""),
            ownerRole: owner?.role ?? ownerSlug,
            ownerSlug,
            status: taskStatusToUi[stringOr(row.status, "not_started")] ?? "planned",
            phase: stringOr(row.phase_id, ""),
            priority: coercePriority(row.priority),
            notes: stringOr(row.description, ""),
            checklist: checklistRows
              .filter((item) => item.task_id === taskId)
              .map((item) => ({
                id: stringOr(item.id, crypto.randomUUID()),
                label: stringOr(item.title, ""),
                completed: Boolean(item.is_done),
                weight: numberOr(item.weight, 1)
              })),
            dueDate: stringOr(row.due_date, undefined),
            dependencies: stringOr(row.dependency_notes, "") ? [stringOr(row.dependency_notes, "")] : undefined,
            updatedAt: stringOr(row.updated_at, undefined),
            updatedBy: stringOr(row.updated_by, undefined)
          };
        })
      : seedWorkspaceData.tasks;

  return {
    settings: mapSettings((settingsResult.data ?? {}) as Row),
    phases,
    teamMembers,
    tasks,
    docsLinks: docsResult.data?.length ? (docsResult.data as Row[]).map(mapDocLink) : seedWorkspaceData.docsLinks,
    blockers: blockersResult.data?.length ? (blockersResult.data as Row[]).map(mapBlocker) : seedWorkspaceData.blockers,
    updates: updatesResult.data?.length ? (updatesResult.data as Row[]).map(mapUpdate) : seedWorkspaceData.updates,
    decisions: decisionsResult.data?.length ? (decisionsResult.data as Row[]).map(mapDecision) : seedWorkspaceData.decisions,
    phaseTransitions: transitionsResult.data?.length ? (transitionsResult.data as Row[]).map(mapTransition) : seedWorkspaceData.phaseTransitions,
    auditEvents: auditResult.data?.length ? (auditResult.data as Row[]).map(mapAuditEvent) : seedWorkspaceData.auditEvents,
    notifications: notificationsResult.data?.length ? (notificationsResult.data as Row[]).map(mapNotification) : seedWorkspaceData.notifications
  };
}

export async function saveWorkspaceToTables(client: SupabaseClient, data: WorkspaceData, user: CurrentUser | null): Promise<void> {
  const role = user?.role ?? "viewer";
  if (role === "viewer") {
    throw new Error("Viewer cannot write shared workspace data.");
  }

  if (role === "admin") {
    await upsertAdminTables(client, data, user);
    return;
  }

  const memberSlug = user?.slug;
  await Promise.all([
    updateRows(client, "tasks", data.tasks.filter((task) => task.ownerSlug === memberSlug).map((task) => taskToRow(task, user))),
    updateRows(client, "checklist_items", checklistRows(data, user).filter((row) => row.owner_slug === memberSlug)),
    upsertRows(client, "member_updates", data.updates.filter((update) => update.memberSlug === memberSlug).map((update) => updateToRow(update, user))),
    upsertRows(client, "blockers", data.blockers.filter((blocker) => blocker.ownerSlug === memberSlug).map((blocker) => blockerToRow(blocker, user))),
    insertMissingAuditRows(client, data.auditEvents.filter((event) => event.memberSlug === memberSlug).map((event) => auditToRow(event, user)))
  ]);
}

export async function deleteTableRecord(client: SupabaseClient, table: string, id: string): Promise<void> {
  const { error } = await client.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export function subscribeToWorkspaceTables(client: SupabaseClient, onChange: () => void) {
  const tables = [
    "project_settings",
    "phases",
    "phase_members",
    "tasks",
    "checklist_items",
    "blockers",
    "member_updates",
    "docs_links",
    "decisions",
    "phase_transitions",
    "audit_events",
    "notifications"
  ];

  const channel = client.channel("command-center-tables");
  for (const table of tables) {
    channel.on("postgres_changes", { event: "*", schema: "public", table }, () => onChange());
  }
  channel.subscribe();
  return () => {
    void client.removeChannel(channel);
  };
}

async function upsertAdminTables(client: SupabaseClient, data: WorkspaceData, user: CurrentUser | null) {
  await upsertRows(client, "team_members", data.teamMembers.map(memberToRow));
  await upsertRows(client, "phases", data.phases.map((phase, index) => phaseToRow(phase, index, user)));
  await upsertRows(client, "project_settings", [settingsToRow(data.settings, user)]);
  await upsertRows(client, "tasks", data.tasks.map((task) => taskToRow(task, user)));
  await upsertRows(client, "checklist_items", checklistRows(data, user));
  await upsertRows(client, "blockers", data.blockers.map((blocker) => blockerToRow(blocker, user)));
  await upsertRows(client, "member_updates", data.updates.map((update) => updateToRow(update, user)));
  await upsertRows(client, "docs_links", data.docsLinks.map((doc, index) => docToRow(doc, index, user)));
  await upsertRows(client, "decisions", data.decisions.map((decision) => decisionToRow(decision)));
  await upsertRows(client, "phase_transitions", data.phaseTransitions.map(transitionToRow));
  await insertMissingAuditRows(client, data.auditEvents.map((event) => auditToRow(event, user)));
  await upsertRows(client, "notifications", data.notifications.map(notificationToRow));
}

async function upsertRows(client: SupabaseClient, table: string, rows: Row[]) {
  if (rows.length === 0) return;
  const { error } = await client.from(table).upsert(rows);
  if (error) throw new Error(`${table}: ${error.message}`);
}

async function updateRows(client: SupabaseClient, table: string, rows: Row[]) {
  for (const row of rows) {
    const id = stringOr(row.id, "");
    if (!id) continue;
    const { error } = await client.from(table).update(row).eq("id", id);
    if (error) throw new Error(`${table}: ${error.message}`);
  }
}

async function insertMissingAuditRows(client: SupabaseClient, rows: Row[]) {
  if (rows.length === 0) return;
  const ids = rows.map((row) => stringOr(row.id, "")).filter(Boolean);
  if (ids.length === 0) return;

  const { data, error } = await client.from("audit_events").select("id").in("id", ids);
  if (error) throw new Error(`audit_events: ${error.message}`);

  const existingIds = new Set((data ?? []).map((row) => stringOr((row as Row).id, "")));
  const newRows = rows.filter((row) => !existingIds.has(stringOr(row.id, "")));
  if (newRows.length === 0) return;

  const { error: insertError } = await client.from("audit_events").insert(newRows);
  if (insertError) throw new Error(`audit_events: ${insertError.message}`);
}

function mapSettings(row: Row): ProjectSettings {
  return {
    id: stringOr(row.id, seedWorkspaceData.settings.id),
    mission: stringOr(row.mission, seedWorkspaceData.settings.mission),
    currentPhaseId: stringOr(row.current_phase_id, seedWorkspaceData.settings.currentPhaseId),
    mvpScope: stringOr(row.mvp_focus, seedWorkspaceData.settings.mvpScope),
    backendB1Blocked: true,
    notes: stringOr(row.sync_mode_notes, seedWorkspaceData.settings.notes),
    updatedAt: stringOr(row.updated_at, seedWorkspaceData.settings.updatedAt),
    updatedBy: stringOr(row.updated_by, undefined)
  };
}

function mapDocLink(row: Row): DocLink {
  return {
    title: stringOr(row.title, ""),
    path: stringOr(row.repo_path, ""),
    category: stringOr(row.category, "General"),
    description: stringOr(row.github_url, "") || stringOr(row.raw_url, "") || "Repository document link."
  };
}

function mapBlocker(row: Row): Blocker {
  return {
    id: stringOr(row.id, ""),
    title: stringOr(row.title, ""),
    description: stringOr(row.description, ""),
    ownerSlug: stringOr(row.owner_slug, ""),
    severity: row.severity === "low" || row.severity === "medium" || row.severity === "critical" ? row.severity : "high",
    phase: stringOr(row.phase_id, ""),
    relatedTaskId: stringOr(row.task_id, undefined),
    status: row.status === "resolved" ? "resolved" : "open",
    createdAt: stringOr(row.created_at, new Date().toISOString()),
    resolvedAt: stringOr(row.resolved_at, undefined),
    resolutionNote: stringOr(row.resolution_note, undefined),
    updatedAt: stringOr(row.updated_at, new Date().toISOString()),
    updatedBy: stringOr(row.updated_by, undefined)
  };
}

function mapUpdate(row: Row): TeamUpdate {
  return {
    id: stringOr(row.id, ""),
    date: stringOr(row.created_at, new Date().toISOString()).slice(0, 10),
    title: stringOr(row.title, ""),
    role: stringOr(row.member_slug, ""),
    memberSlug: stringOr(row.member_slug, undefined),
    phase: stringOr(row.phase_id, ""),
    done: stringOr(row.done_text, ""),
    blocked: stringOr(row.blocked_text, ""),
    next: stringOr(row.next_text, ""),
    notes: stringOr(row.notes, ""),
    tags: stringArrayOr(row.tags, []),
    updatedAt: stringOr(row.updated_at, new Date().toISOString()),
    updatedBy: stringOr(row.updated_by, undefined)
  };
}

function mapDecision(row: Row): Decision {
  return {
    id: stringOr(row.id, ""),
    title: stringOr(row.title, ""),
    description: stringOr(row.description, ""),
    reason: stringOr(row.reason, ""),
    date: stringOr(row.decided_at, new Date().toISOString()).slice(0, 10),
    decidedBy: stringOr(row.decided_by, ""),
    impact: stringOr(row.impact, ""),
    relatedPhase: stringOr(row.phase_id, ""),
    status: row.status === "draft" || row.status === "superseded" ? row.status : "active",
    updatedAt: stringOr(row.updated_at, new Date().toISOString())
  };
}

function mapTransition(row: Row): PhaseTransition {
  return {
    id: stringOr(row.id, ""),
    fromPhaseId: stringOr(row.from_phase_id, ""),
    toPhaseId: stringOr(row.to_phase_id, ""),
    approvedBy: stringOr(row.approved_by, ""),
    approvedAt: stringOr(row.approved_at, ""),
    approvalNotes: stringOr(row.approval_notes, ""),
    blockersSnapshot: JSON.stringify(row.blockers_snapshot ?? []),
    completionSummary: JSON.stringify(row.completion_summary ?? {})
  };
}

function mapAuditEvent(row: Row): AuditEvent {
  return {
    id: stringOr(row.id, ""),
    actor: stringOr(row.actor_slug, "unknown"),
    entityType: stringOr(row.entity_type, ""),
    entityId: stringOr(row.entity_id, ""),
    action: stringOr(row.action, ""),
    summary: JSON.stringify(row.after_summary ?? row.before_summary ?? {}),
    timestamp: stringOr(row.created_at, new Date().toISOString()),
    phaseId: stringOr(row.phase_id, undefined),
    taskId: stringOr(row.task_id, undefined),
    memberSlug: stringOr(row.actor_slug, undefined)
  };
}

function mapNotification(row: Row): PortalNotification {
  return {
    id: stringOr(row.id, ""),
    kind: "task_assigned",
    title: stringOr(row.title, ""),
    message: stringOr(row.message, ""),
    createdAt: stringOr(row.created_at, new Date().toISOString()),
    read: Boolean(row.is_read),
    relatedEntityId: stringOr(row.related_entity_id, undefined)
  };
}

function memberToRow(member: TeamMember): Row {
  return {
    slug: member.slug,
    display_name: member.name,
    role_label: member.role,
    portal_role: member.accountRole,
    is_active: true,
    updated_at: member.updatedAt ?? new Date().toISOString()
  };
}

function phaseToRow(phase: Phase, index: number, user: CurrentUser | null): Row {
  return {
    id: phase.id,
    title: phase.name,
    status: phase.status,
    objective: phase.objective,
    allowed_scope: phase.allowedScope,
    out_of_scope: phase.outOfScope,
    order_index: index,
    next_phase_id: phase.nextPhaseId ?? null,
    updated_at: phase.updatedAt ?? new Date().toISOString(),
    updated_by: user?.slug ?? phase.updatedBy ?? null
  };
}

function settingsToRow(settings: ProjectSettings, user: CurrentUser | null): Row {
  return {
    id: settings.id,
    project_name: "AMN RetailOS Command Center v2.1",
    mission: settings.mission,
    current_phase_id: settings.currentPhaseId,
    mvp_focus: settings.mvpScope,
    sync_mode_notes: settings.notes,
    updated_at: settings.updatedAt,
    updated_by: user?.slug ?? settings.updatedBy ?? null
  };
}

function taskToRow(task: TaskItem, user: CurrentUser | null): Row {
  return {
    id: task.id,
    title: task.title,
    description: task.notes,
    phase_id: task.phase || "phase-t1",
    owner_slug: task.ownerSlug ?? "noor",
    priority: task.priority,
    status: taskStatusToDb[task.status],
    due_date: task.dueDate ?? null,
    dependency_notes: task.dependencies?.join("; ") ?? null,
    updated_at: task.updatedAt ?? new Date().toISOString(),
    updated_by: user?.slug ?? task.updatedBy ?? null
  };
}

function checklistRows(data: WorkspaceData, user: CurrentUser | null): Row[] {
  const taskRows = data.tasks.flatMap((task) =>
    task.checklist.map((item, index) => ({
      id: item.id,
      task_id: task.id,
      phase_id: task.phase || data.settings.currentPhaseId,
      owner_slug: task.ownerSlug ?? "noor",
      title: item.label,
      is_done: Boolean(item.completed),
      weight: item.weight ?? 1,
      order_index: index,
      updated_at: new Date().toISOString(),
      updated_by: user?.slug ?? null
    }))
  );

  const memberRows = data.teamMembers.flatMap((member) =>
    member.checklist.map((item, index) => ({
      id: item.id,
      task_id: null,
      phase_id: member.assignedPhaseIds?.[0] ?? data.settings.currentPhaseId,
      owner_slug: member.slug,
      title: item.label,
      is_done: Boolean(item.completed),
      weight: item.weight ?? 1,
      order_index: index,
      updated_at: new Date().toISOString(),
      updated_by: user?.slug ?? null
    }))
  );

  return [...taskRows, ...memberRows];
}

function blockerToRow(blocker: Blocker, user: CurrentUser | null): Row {
  return {
    id: blocker.id,
    title: blocker.title,
    description: blocker.description,
    owner_slug: blocker.ownerSlug,
    severity: blocker.severity,
    phase_id: blocker.phase || null,
    task_id: blocker.relatedTaskId ?? null,
    status: blocker.status,
    resolution_note: blocker.resolutionNote ?? null,
    created_at: blocker.createdAt,
    resolved_at: blocker.resolvedAt ?? null,
    updated_at: blocker.updatedAt,
    updated_by: user?.slug ?? blocker.updatedBy ?? null
  };
}

function updateToRow(update: TeamUpdate, user: CurrentUser | null): Row {
  return {
    id: update.id,
    member_slug: update.memberSlug ?? user?.slug ?? "noor",
    phase_id: update.phase || null,
    title: update.title,
    done_text: update.done,
    blocked_text: update.blocked,
    next_text: update.next,
    notes: update.notes,
    tags: update.tags,
    updated_at: update.updatedAt,
    updated_by: user?.slug ?? update.updatedBy ?? null
  };
}

function docToRow(doc: DocLink, index: number, user: CurrentUser | null): Row {
  return {
    id: `doc-${doc.path.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || index}`,
    title: doc.title,
    repo_path: doc.path,
    github_url: null,
    raw_url: null,
    category: doc.category,
    updated_by: user?.slug ?? null
  };
}

function decisionToRow(decision: Decision): Row {
  return {
    id: decision.id,
    title: decision.title,
    description: decision.description,
    reason: decision.reason,
    impact: decision.impact,
    status: decision.status,
    phase_id: decision.relatedPhase || null,
    decided_by: decision.decidedBy,
    decided_at: decision.date,
    updated_at: decision.updatedAt
  };
}

function transitionToRow(transition: PhaseTransition): Row {
  return {
    id: transition.id,
    from_phase_id: transition.fromPhaseId,
    to_phase_id: transition.toPhaseId,
    approved_by: transition.approvedBy,
    approved_at: transition.approvedAt,
    approval_notes: transition.approvalNotes,
    blockers_snapshot: safeJson(transition.blockersSnapshot, []),
    completion_summary: safeJson(transition.completionSummary, {})
  };
}

function auditToRow(event: AuditEvent, user: CurrentUser | null): Row {
  return {
    id: event.id,
    actor_id: null,
    actor_slug: event.memberSlug ?? user?.slug ?? null,
    action: event.action,
    entity_type: event.entityType,
    entity_id: event.entityId,
    before_summary: null,
    after_summary: { summary: event.summary },
    phase_id: event.phaseId ?? null,
    task_id: event.taskId ?? null,
    created_at: event.timestamp
  };
}

function notificationToRow(notification: PortalNotification): Row {
  return {
    id: notification.id,
    recipient_slug: null,
    title: notification.title,
    message: notification.message,
    type: notification.kind,
    is_read: notification.read,
    related_entity_type: null,
    related_entity_id: notification.relatedEntityId ?? null,
    created_at: notification.createdAt
  };
}

function stringOr(value: unknown, fallback: string): string;
function stringOr(value: unknown, fallback: undefined): string | undefined;
function stringOr(value: unknown, fallback: string | undefined) {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function numberOr(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function stringArrayOr(value: unknown, fallback: string[]) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : fallback;
}

function coerceStatus(value: unknown): Status {
  return value === "completed" || value === "active" || value === "blocked" || value === "planned" || value === "deferred" || value === "ready_for_approval"
    ? value
    : "planned";
}

function coercePriority(value: unknown): Priority {
  return value === "P0" || value === "P1" || value === "P2" || value === "Deferred" ? value : "P1";
}

function safeJson(value: string, fallback: unknown) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function calculatePhaseProgress(phaseId: string, checklistRows: Row[]) {
  const phaseItems = checklistRows.filter((item) => item.phase_id === phaseId);
  const totalWeight = phaseItems.reduce((total, item) => total + numberOr(item.weight, 1), 0);
  if (totalWeight === 0) return 0;

  const completedWeight = phaseItems.reduce((total, item) => {
    return Boolean(item.is_done) ? total + numberOr(item.weight, 1) : total;
  }, 0);

  return Math.round((completedWeight / totalWeight) * 100);
}
