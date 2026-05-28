import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedWorkspaceData } from "../data/seed";
import { safeSetItem } from "../lib/safeStorage";
import { createWorkspaceAdapter, type WorkspaceAdapter } from "../services/workspaceAdapter";
import type {
  AuditEvent,
  Blocker,
  CurrentUser,
  Decision,
  PhaseTransition,
  PortalNotification,
  TaskItem,
  TeamMember,
  TeamUpdate,
  WorkspaceData
} from "../types/portal";

interface WorkspaceContextValue {
  adapter: WorkspaceAdapter;
  data: WorkspaceData;
  currentUser: CurrentUser;
  loading: boolean;
  error: string;
  lastSave: string;
  conflictWarning: string;
  realtimeStatus: "configured" | "fallback" | "error";
  setLocalUser: (slug: string) => void;
  signIn: (email: string, password: string) => Promise<string | undefined>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  saveData: (data: WorkspaceData, action: string, entityType: string, entityId: string, summary: string) => Promise<void>;
  updateMember: (member: TeamMember) => Promise<void>;
  updateTask: (task: TaskItem) => Promise<void>;
  upsertUpdate: (update: TeamUpdate) => Promise<void>;
  deleteUpdate: (id: string) => Promise<void>;
  upsertBlocker: (blocker: Blocker) => Promise<void>;
  upsertDecision: (decision: Decision) => Promise<void>;
  approvePhaseTransition: (transition: Omit<PhaseTransition, "id" | "approvedAt" | "approvedBy">, toPhaseId: string) => Promise<void>;
  exportSnapshot: () => void;
  importSnapshot: (data: unknown) => Promise<string>;
}

const localUsers: CurrentUser[] = [
  { slug: "noor", name: "Noor", role: "admin", roleLabel: "Admin / Product & Backend Coordinator", authMode: "local-simulator" },
  { slug: "mohammed", name: "Mohammed", role: "member", roleLabel: "Frontend/UI Owner", authMode: "local-simulator" },
  { slug: "ali", name: "Ali", role: "member", roleLabel: "Backend/Data Owner", authMode: "local-simulator" },
  { slug: "murtadha", name: "Murtadha", role: "member", roleLabel: "UX/QA/Field Feedback Owner", authMode: "local-simulator" },
  { slug: "viewer", name: "Viewer", role: "viewer", roleLabel: "Read-only External Viewer", authMode: "local-simulator" }
];

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);
const signedOutSupabaseUser = localUsers.find((user) => user.slug === "viewer") ?? localUsers[4];
const publicWorkspaceData: WorkspaceData = {
  ...seedWorkspaceData,
  phases: [],
  teamMembers: [],
  tasks: [],
  docsLinks: [],
  blockers: [],
  updates: [],
  decisions: [],
  phaseTransitions: [],
  auditEvents: [],
  notifications: []
};

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [adapter] = useState(() => createWorkspaceAdapter());
  const [data, setData] = useState<WorkspaceData>(seedWorkspaceData);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => (adapter.isConfigured ? signedOutSupabaseUser : localUsers[0]));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastSave, setLastSave] = useState("");
  const [conflictWarning, setConflictWarning] = useState("");
  const [realtimeStatus, setRealtimeStatus] = useState<"configured" | "fallback" | "error">(adapter.isConfigured ? "configured" : "fallback");

  const refresh = async () => {
    try {
      setLoading(true);
      if (adapter.isConfigured) {
        const user = await adapter.getCurrentUser();
        if (!user) {
          setData(publicWorkspaceData);
          setCurrentUser(signedOutSupabaseUser);
          setError("");
          return;
        }
        const workspace = await adapter.loadWorkspace();
        setData(workspace);
        setCurrentUser(user);
      } else {
        const workspace = await adapter.loadWorkspace();
        setData(workspace);
      }
      setError("");
    } catch (refreshError) {
      if (adapter.isConfigured) {
        setData(publicWorkspaceData);
        setCurrentUser(signedOutSupabaseUser);
      }
      setError(refreshError instanceof Error ? refreshError.message : "Unable to load workspace data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
    const unsubscribe = adapter.subscribe(() => {
      setRealtimeStatus("configured");
      void refresh();
    });

    return () => {
      unsubscribe?.();
    };
  }, [adapter]);

  const setLocalUser = (slug: string) => {
    const next = localUsers.find((user) => user.slug === slug) ?? localUsers[0];
    safeSetItem("amn.local.currentUser", JSON.stringify(next));
    setCurrentUser(next);
  };

  const saveData = async (nextData: WorkspaceData, action: string, entityType: string, entityId: string, summary: string) => {
    if (data.settings.updatedAt && nextData.settings.updatedAt < data.settings.updatedAt) {
      setConflictWarning("This workspace changed in another session. Refresh before saving to avoid overwriting newer data.");
      return;
    }

    const timestamp = new Date().toISOString();
    const auditEvent: AuditEvent = {
      id: crypto.randomUUID(),
      actor: currentUser.name,
      entityType,
      entityId,
      action,
      summary,
      timestamp,
      memberSlug: currentUser.slug
    };
    const notification: PortalNotification = {
      id: crypto.randomUUID(),
      kind: action.includes("blocker") ? "blocker_added" : action.includes("phase") ? "phase_transition" : action.includes("update") ? "update_added" : "task_assigned",
      title: summary,
      message: `${currentUser.name} changed ${entityType}.`,
      createdAt: timestamp,
      read: false,
      relatedEntityId: entityId
    };

    const withMeta: WorkspaceData = {
      ...nextData,
      settings: { ...nextData.settings, updatedAt: timestamp, updatedBy: currentUser.slug },
      auditEvents: [auditEvent, ...nextData.auditEvents].slice(0, 250),
      notifications: [notification, ...nextData.notifications].slice(0, 100)
    };

    await adapter.saveWorkspace(withMeta);
    setData(withMeta);
    setLastSave(timestamp);
    setConflictWarning("");
  };

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      adapter,
      data,
      currentUser,
      loading,
      error,
      lastSave,
      conflictWarning,
      realtimeStatus,
      setLocalUser,
      signIn: async (email, password) => {
        const result = await adapter.signIn(email, password);
        if (result.user) {
          setCurrentUser(result.user);
          await refresh();
        }
        return result.error;
      },
      signOut: async () => {
        await adapter.signOut();
        if (adapter.isConfigured) {
          setData(publicWorkspaceData);
          setCurrentUser(signedOutSupabaseUser);
        } else {
          setCurrentUser(localUsers[0]);
        }
        setConflictWarning("");
      },
      refresh,
      saveData,
      updateMember: async (member) => {
        const next = data.teamMembers.map((item) => (item.slug === member.slug ? { ...member, updatedAt: new Date().toISOString(), updatedBy: currentUser.slug } : item));
        await saveData({ ...data, teamMembers: next }, "member_updated", "team_member", member.slug, `Updated ${member.name} workspace`);
      },
      updateTask: async (task) => {
        const next = data.tasks.map((item) => (item.id === task.id ? { ...task, updatedAt: new Date().toISOString(), updatedBy: currentUser.slug } : item));
        await saveData({ ...data, tasks: next }, "task_updated", "task", task.id, `Updated task: ${task.title}`);
      },
      upsertUpdate: async (update) => {
        const exists = data.updates.some((item) => item.id === update.id);
        const next = exists ? data.updates.map((item) => (item.id === update.id ? update : item)) : [update, ...data.updates];
        await saveData({ ...data, updates: next }, exists ? "update_edited" : "update_added", "member_update", update.id, `Saved update: ${update.title}`);
      },
      deleteUpdate: async (id) => {
        if (adapter.mode === "supabase") {
          await adapter.deleteRecord("member_updates", id);
        }
        await saveData({ ...data, updates: data.updates.filter((item) => item.id !== id) }, "update_deleted", "member_update", id, "Deleted team update");
      },
      upsertBlocker: async (blocker) => {
        const exists = data.blockers.some((item) => item.id === blocker.id);
        const next = exists ? data.blockers.map((item) => (item.id === blocker.id ? blocker : item)) : [blocker, ...data.blockers];
        await saveData({ ...data, blockers: next }, blocker.status === "resolved" ? "blocker_resolved" : "blocker_added", "blocker", blocker.id, `Saved blocker: ${blocker.title}`);
      },
      upsertDecision: async (decision) => {
        const exists = data.decisions.some((item) => item.id === decision.id);
        const next = exists ? data.decisions.map((item) => (item.id === decision.id ? decision : item)) : [decision, ...data.decisions];
        await saveData({ ...data, decisions: next }, "decision_saved", "decision", decision.id, `Saved decision: ${decision.title}`);
      },
      approvePhaseTransition: async (transition, toPhaseId) => {
        const timestamp = new Date().toISOString();
        const record: PhaseTransition = {
          ...transition,
          id: crypto.randomUUID(),
          approvedAt: timestamp,
          approvedBy: currentUser.name
        };
        const phases = data.phases.map((phase) => {
          if (phase.id === transition.fromPhaseId) return { ...phase, status: "completed" as const, progress: 100 };
          if (phase.id === toPhaseId) return { ...phase, status: "active" as const };
          return phase;
        });
        await saveData(
          { ...data, phases, settings: { ...data.settings, currentPhaseId: toPhaseId }, phaseTransitions: [record, ...data.phaseTransitions] },
          "phase_transition_approved",
          "phase_transition",
          record.id,
          `Approved transition to ${toPhaseId}`
        );
      },
      exportSnapshot: () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `amn-command-center-snapshot-${new Date().toISOString().slice(0, 10)}.json`;
        anchor.click();
        URL.revokeObjectURL(url);
      },
      importSnapshot: async (payload) => {
        if (!isWorkspaceData(payload)) {
          return "Import failed: snapshot is missing required workspace arrays.";
        }
        await saveData(payload, "snapshot_imported", "workspace", payload.settings.id, "Imported project snapshot JSON");
        return "Snapshot imported.";
      }
    }),
    [adapter, data, currentUser, loading, error, lastSave, conflictWarning, realtimeStatus]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }
  return context;
}

export { localUsers };

function isWorkspaceData(value: unknown): value is WorkspaceData {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.settings === "object" &&
    Array.isArray(candidate.phases) &&
    Array.isArray(candidate.teamMembers) &&
    Array.isArray(candidate.tasks) &&
    Array.isArray(candidate.docsLinks) &&
    Array.isArray(candidate.blockers) &&
    Array.isArray(candidate.updates) &&
    Array.isArray(candidate.decisions)
  );
}
