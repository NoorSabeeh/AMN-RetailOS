export type Status = "completed" | "active" | "blocked" | "planned" | "deferred" | "ready_for_approval";
export type Priority = "P0" | "P1" | "P2" | "Deferred";
export type PortalRole = "admin" | "member" | "viewer";
export type SyncMode = "supabase" | "local";
export type BlockerStatus = "open" | "resolved";
export type NotificationKind =
  | "task_assigned"
  | "checklist_completed"
  | "blocker_added"
  | "blocker_resolved"
  | "phase_ready"
  | "phase_transition"
  | "update_added"
  | "conflict_warning";

export interface Phase {
  id: string;
  name: string;
  status: Status;
  objective: string;
  allowedScope: string[];
  outOfScope: string[];
  deliverables: string[];
  notes: string;
  progress: number;
  nextPhaseId?: string;
  readinessNotes?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  accountRole: PortalRole;
  role: string;
  currentPhaseRole?: string;
  summary: string;
  responsibilities: string[];
  filesToRead: string[];
  deliverables: string[];
  nextActions: string[];
  status: Status;
  checklist: ChecklistItem[];
  progress: number;
  dueDate?: string;
  assignedPhaseIds?: string[];
  updatedAt?: string;
  updatedBy?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  ownerRole: string;
  ownerSlug?: string;
  status: Status;
  phase: string;
  priority: Priority;
  notes: string;
  checklist: ChecklistItem[];
  dueDate?: string;
  dependencies?: string[];
  updatedAt?: string;
  updatedBy?: string;
}

export interface DocLink {
  title: string;
  path: string;
  category: string;
  description: string;
}

export interface RiskItem {
  title: string;
  severity: "High" | "Medium" | "Low";
  status: Status;
  mitigation: string;
}

export interface MemberState {
  done: string;
  blocked: string;
  next: string;
  notes: string;
  checklist: Record<string, boolean>;
  checklistWeights?: Record<string, number>;
  lastUpdated: string;
  status?: Status;
  updatedAt?: string;
  updatedBy?: string;
}

export interface TaskState {
  status: Status;
  notes: string;
  done: boolean;
  checklist: Record<string, boolean>;
  checklistWeights?: Record<string, number>;
  updatedAt?: string;
  updatedBy?: string;
}

export interface TeamUpdate {
  id: string;
  date: string;
  title: string;
  role: string;
  memberSlug?: string;
  phase: string;
  done: string;
  blocked: string;
  next: string;
  notes: string;
  tags: string[];
  updatedAt: string;
  updatedBy?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed?: boolean;
  weight?: number;
}

export interface ProjectSettings {
  id: string;
  mission: string;
  currentPhaseId: string;
  mvpScope: string;
  backendB1Blocked: boolean;
  notes: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface Blocker {
  id: string;
  title: string;
  description: string;
  ownerSlug: string;
  severity: "low" | "medium" | "high" | "critical";
  phase: string;
  relatedTaskId?: string;
  status: BlockerStatus;
  createdAt: string;
  resolvedAt?: string;
  resolutionNote?: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  reason: string;
  date: string;
  decidedBy: string;
  impact: string;
  relatedPhase: string;
  status: "active" | "superseded" | "draft";
  updatedAt: string;
  updatedBy?: string;
}

export interface PhaseTransition {
  id: string;
  fromPhaseId: string;
  toPhaseId: string;
  approvedBy: string;
  approvedAt: string;
  approvalNotes: string;
  blockersSnapshot: string;
  completionSummary: string;
}

export interface AuditEvent {
  id: string;
  actor: string;
  entityType: string;
  entityId: string;
  action: string;
  summary: string;
  timestamp: string;
  phaseId?: string;
  taskId?: string;
  memberSlug?: string;
}

export interface PortalNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  relatedEntityId?: string;
}

export interface WorkspaceData {
  settings: ProjectSettings;
  phases: Phase[];
  teamMembers: TeamMember[];
  tasks: TaskItem[];
  docsLinks: DocLink[];
  blockers: Blocker[];
  updates: TeamUpdate[];
  decisions: Decision[];
  phaseTransitions: PhaseTransition[];
  auditEvents: AuditEvent[];
  notifications: PortalNotification[];
}

export interface CurrentUser {
  slug: string;
  name: string;
  role: PortalRole;
  roleLabel: string;
  authMode: "supabase" | "local-simulator";
}

export interface ProgressSummary {
  completed: number;
  total: number;
  percent: number;
  completedWeight: number;
  totalWeight: number;
}
