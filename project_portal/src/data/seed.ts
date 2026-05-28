import { docsLinks } from "./docs";
import { phases } from "./phases";
import { tasks } from "./tasks";
import { teamMembers } from "./team";
import type { WorkspaceData } from "../types/portal";

const now = new Date().toISOString();

export const seedWorkspaceData: WorkspaceData = {
  settings: {
    id: "amn-retailos-command-center",
    mission:
      "Coordinate AMN RetailOS planning around a local-first Windows POS platform for Retail/Grocery and Basic Wholesale only.",
    currentPhaseId: "phase-t1",
    mvpScope: "Retail/Grocery Mode + Basic Wholesale/Grocery Mode",
    backendB1Blocked: true,
    notes: "Command Center v2 is internal-only. Backend B1 remains blocked until .NET SDK validation is possible.",
    updatedAt: now,
    updatedBy: "system-seed"
  },
  phases,
  teamMembers,
  tasks,
  docsLinks,
  blockers: [
    {
      id: "blocker-dotnet-sdk",
      title: ".NET SDK unavailable for Backend B1 validation",
      description:
        "Backend B1 cannot be completed until dotnet --info, restore, build, tests, and migration validation can run.",
      ownerSlug: "ali",
      severity: "critical",
      phase: "phase-b1",
      relatedTaskId: "t1-sdk-blocker",
      status: "open",
      createdAt: now,
      updatedAt: now,
      updatedBy: "system-seed"
    }
  ],
  updates: [
    {
      id: "update-initial-t1",
      date: now.slice(0, 10),
      title: "Phase T1 active",
      role: "Product & Backend Coordinator",
      memberSlug: "noor",
      phase: "phase-t1",
      done: "Foundation documentation and the internal Command Center are available.",
      blocked: "Backend B1 remains blocked until the .NET SDK is installed and validated.",
      next: "Use this portal for role updates, blockers, and phase readiness tracking.",
      notes: "No POS product UI is implemented here.",
      tags: ["T1", "internal"],
      updatedAt: now,
      updatedBy: "system-seed"
    }
  ],
  decisions: [
    {
      id: "decision-internal-portal",
      title: "Command Center is internal-only",
      description:
        "The project portal tracks team work and planning. It is separate from future AMN RetailOS product UI.",
      reason: "Avoid mixing project coordination UI with POS/cashier product implementation.",
      date: now.slice(0, 10),
      decidedBy: "Product & Backend Coordinator",
      impact: "Portal work may use Supabase for team sync, while the AMN RetailOS product remains local-first.",
      relatedPhase: "phase-t1",
      status: "active",
      updatedAt: now,
      updatedBy: "system-seed"
    }
  ],
  phaseTransitions: [],
  auditEvents: [
    {
      id: "audit-seed",
      actor: "system-seed",
      entityType: "workspace",
      entityId: "amn-retailos-command-center",
      action: "seeded",
      summary: "Initial internal portal workspace data loaded.",
      timestamp: now,
      phaseId: "phase-t1"
    }
  ],
  notifications: [
    {
      id: "notification-b1-blocked",
      kind: "blocker_added",
      title: "Backend B1 blocked",
      message: "Backend Foundation B1 remains blocked until .NET SDK validation is available.",
      createdAt: now,
      read: false,
      relatedEntityId: "blocker-dotnet-sdk"
    }
  ]
};
