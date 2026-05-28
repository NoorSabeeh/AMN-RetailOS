import type { SupabaseClient } from "@supabase/supabase-js";
import { seedWorkspaceData } from "../data/seed";
import { createSupabaseBrowserClient } from "../lib/supabase";
import { safeGetItem, safeParseJson, safeRemoveItem, safeSetItem } from "../lib/safeStorage";
import { getSignedInPortalUser, signInWithAssignedAccount, signOutAssignedAccount } from "./authService";
import { deleteTableRecord, loadWorkspaceFromTables, saveWorkspaceToTables, subscribeToWorkspaceTables } from "./supabaseTableService";
import type { CurrentUser, SyncMode, WorkspaceData } from "../types/portal";

const workspaceKey = "amn.workspace.v2";

export interface WorkspaceAdapter {
  mode: SyncMode;
  isConfigured: boolean;
  loadWorkspace: () => Promise<WorkspaceData>;
  saveWorkspace: (data: WorkspaceData) => Promise<void>;
  deleteRecord: (table: string, id: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ user: CurrentUser | null; error?: string }>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<CurrentUser | null>;
  subscribe: (onChange: () => void) => (() => void) | undefined;
}

export function createWorkspaceAdapter(): WorkspaceAdapter {
  const client = createSupabaseBrowserClient();
  return client ? createSupabaseWorkspaceAdapter(client) : createLocalWorkspaceAdapter();
}

export function createLocalWorkspaceAdapter(): WorkspaceAdapter {
  return {
    mode: "local",
    isConfigured: false,
    async loadWorkspace() {
      const stored = safeGetItem(workspaceKey);
      if (!stored) {
        return seedWorkspaceData;
      }

      return mergeSeed(safeParseJson<Partial<WorkspaceData>>(stored, {}));
    },
    async saveWorkspace(data) {
      safeSetItem(workspaceKey, JSON.stringify(data));
    },
    async deleteRecord() {
      return;
    },
    async signIn() {
      return { user: null, error: "Supabase is not configured. Use the local role selector for fallback testing." };
    },
    async signOut() {
      safeRemoveItem("amn.local.currentUser");
    },
    async getCurrentUser() {
      const stored = safeGetItem("amn.local.currentUser");
      return stored ? safeParseJson<CurrentUser | null>(stored, null) : null;
    },
    subscribe() {
      return undefined;
    }
  };
}

function createSupabaseWorkspaceAdapter(client: SupabaseClient): WorkspaceAdapter {
  return {
    mode: "supabase",
    isConfigured: true,
    async loadWorkspace() {
      return loadWorkspaceFromTables(client);
    },
    async saveWorkspace(data) {
      const user = await getSignedInPortalUser(client);
      await saveWorkspaceToTables(client, data, user);
    },
    async deleteRecord(table, id) {
      await deleteTableRecord(client, table, id);
    },
    async signIn(email, password) {
      return signInWithAssignedAccount(client, email, password);
    },
    async signOut() {
      await signOutAssignedAccount(client);
    },
    async getCurrentUser() {
      return getSignedInPortalUser(client);
    },
    subscribe(onChange) {
      return subscribeToWorkspaceTables(client, onChange);
    }
  };
}

function mergeSeed(data: Partial<WorkspaceData>): WorkspaceData {
  return {
    settings: data.settings ?? seedWorkspaceData.settings,
    phases: data.phases ?? seedWorkspaceData.phases,
    teamMembers: data.teamMembers ?? seedWorkspaceData.teamMembers,
    tasks: data.tasks ?? seedWorkspaceData.tasks,
    docsLinks: data.docsLinks ?? seedWorkspaceData.docsLinks,
    blockers: data.blockers ?? seedWorkspaceData.blockers,
    updates: data.updates ?? seedWorkspaceData.updates,
    decisions: data.decisions ?? seedWorkspaceData.decisions,
    phaseTransitions: data.phaseTransitions ?? seedWorkspaceData.phaseTransitions,
    auditEvents: data.auditEvents ?? seedWorkspaceData.auditEvents,
    notifications: data.notifications ?? seedWorkspaceData.notifications
  };
}
