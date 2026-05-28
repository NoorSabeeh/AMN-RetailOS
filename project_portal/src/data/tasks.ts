import type { TaskItem } from "../types/portal";

export const tasks: TaskItem[] = [
  {
    id: "t1-scope-confirm",
    title: "Confirm MVP scope remains Retail/Grocery + Basic Wholesale only",
    ownerRole: "Product & Backend Coordinator",
    ownerSlug: "noor",
    status: "active",
    phase: "Phase T1",
    priority: "P0",
    notes: "Use documentation foundation and current blockers as source of truth.",
    dueDate: "2026-05-28",
    checklist: [
      { id: "scope-review", label: "Review MVP docs", completed: true, weight: 1 },
      { id: "scope-delayed", label: "Confirm delayed scope", completed: true, weight: 1 },
      { id: "scope-note", label: "Share scope note", completed: false, weight: 1 }
    ]
  },
  {
    id: "t1-sdk-blocker",
    title: "Confirm .NET SDK readiness before Backend B1 resumes",
    ownerRole: "Backend/Data Owner",
    ownerSlug: "ali",
    status: "blocked",
    phase: "Phase T1",
    priority: "P0",
    notes: "Backend B1 cannot be marked complete without build/test/migration validation.",
    dueDate: "2026-05-29",
    checklist: [
      { id: "sdk-install", label: "Install SDK", completed: false, weight: 2 },
      { id: "sdk-info", label: "Run dotnet --info", completed: false, weight: 2 },
      { id: "sdk-build-path", label: "Confirm restore/build/test path", completed: false, weight: 1 }
    ]
  },
  {
    id: "t1-ui-questions",
    title: "Prepare Claude UI Planning Phase U1 questions",
    ownerRole: "Frontend/UI Owner",
    ownerSlug: "mohammed",
    status: "planned",
    phase: "Phase U1",
    priority: "P0",
    notes: "Questions must respect backend-owned business rules.",
    dueDate: "2026-05-28",
    dependencies: ["t1-scope-confirm"],
    checklist: [
      { id: "ui-read-handoff", label: "Read UI handoff", completed: true, weight: 1 },
      { id: "ui-screens", label: "List MVP screens", completed: false, weight: 1 },
      { id: "ui-contracts", label: "List backend contract dependencies", completed: false, weight: 1 }
    ]
  },
  {
    id: "t1-qa-checklist",
    title: "Prepare QA and field feedback checklist",
    ownerRole: "UX/QA/Field Feedback Owner",
    ownerSlug: "murtadha",
    status: "planned",
    phase: "Field Research/QA Preparation",
    priority: "P0",
    notes: "Focus on cashier workflow, printer issues, Arabic/RTL receipt output, backup, and offline operation.",
    dueDate: "2026-05-28",
    checklist: [
      { id: "qa-read-docs", label: "Read QA docs", completed: true, weight: 1 },
      { id: "qa-field", label: "Draft field checklist", completed: false, weight: 1 },
      { id: "qa-hardware", label: "Draft hardware checklist", completed: false, weight: 1 }
    ]
  },
  {
    id: "b1-schema-plan",
    title: "Review B1 schema and migration scope",
    ownerRole: "Backend/Data Owner",
    ownerSlug: "ali",
    status: "blocked",
    phase: "Phase B1",
    priority: "P0",
    notes: "Resume after .NET SDK is available.",
    dependencies: ["t1-sdk-blocker"],
    checklist: [
      { id: "b1-review-schema", label: "Review conceptual schema", completed: true, weight: 1 },
      { id: "b1-migration-rules", label: "Review migration rules", completed: false, weight: 1 },
      { id: "b1-first-tables", label: "Confirm first tables", completed: false, weight: 1 }
    ]
  },
  {
    id: "portal-review",
    title: "Review AMN RetailOS Command Center for daily team use",
    ownerRole: "Product & Backend Coordinator",
    ownerSlug: "noor",
    status: "active",
    phase: "Phase T1",
    priority: "P1",
    notes: "Internal portal only. It is not the AMN RetailOS product UI.",
    checklist: [
      { id: "portal-open", label: "Open portal", completed: true, weight: 1 },
      { id: "portal-check", label: "Check pages", completed: true, weight: 1 },
      { id: "portal-update", label: "Add first team update", completed: false, weight: 1 }
    ]
  },
  {
    id: "pilot-template",
    title: "Prepare pilot store observation template",
    ownerRole: "UX/QA/Field Feedback Owner",
    ownerSlug: "murtadha",
    status: "planned",
    phase: "Field Research/QA Preparation",
    priority: "P1",
    notes: "No pilot deployment until core backend and product UI are ready.",
    checklist: [
      { id: "pilot-questions", label: "Draft observation questions", completed: false, weight: 1 },
      { id: "pilot-hardware", label: "Add hardware fields", completed: false, weight: 1 },
      { id: "pilot-blocker", label: "Add blocker format", completed: false, weight: 1 }
    ]
  },
  {
    id: "future-batch",
    title: "Optional batch/expiry foundations",
    ownerRole: "Backend/Data Owner",
    ownerSlug: "ali",
    status: "deferred",
    phase: "Future",
    priority: "P2",
    notes: "Do not implement full Pharmacy mode.",
    checklist: [
      { id: "batch-defer", label: "Keep out of MVP", completed: true, weight: 1 },
      { id: "batch-revisit", label: "Revisit after core stability", completed: false, weight: 1 }
    ]
  },
  {
    id: "future-cloud",
    title: "Cloud SaaS and multi-branch planning",
    ownerRole: "Product & Backend Coordinator",
    ownerSlug: "noor",
    status: "deferred",
    phase: "Future",
    priority: "Deferred",
    notes: "Explicitly outside current MVP and portal scope.",
    checklist: [
      { id: "cloud-defer", label: "Keep deferred", completed: true, weight: 1 },
      { id: "cloud-claims", label: "Avoid product claims", completed: true, weight: 1 }
    ]
  }
];
