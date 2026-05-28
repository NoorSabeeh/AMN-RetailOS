import type { TeamMember } from "../types/portal";

export const teamMembers: TeamMember[] = [
  {
    slug: "noor",
    name: "Noor",
    accountRole: "admin",
    role: "Product & Backend Coordinator",
    currentPhaseRole: "Phase coordination and approval gate",
    summary: "Coordinates product scope, backend rule priorities, acceptance criteria, and phase readiness.",
    responsibilities: [
      "Maintain MVP scope discipline",
      "Confirm backend business rule priorities",
      "Coordinate documentation and next-phase readiness",
      "Review blockers from all roles",
      "Keep delayed features out of current planning"
    ],
    filesToRead: [
      "README.md",
      "AGENTS.md",
      "CODEX_STATUS.md",
      "TASKS.md",
      "docs/02_MVP_V0_1_SCOPE.md",
      "docs/05_BACKEND_ARCHITECTURE.md",
      "docs/14_API_SERVICE_CONTRACTS_DRAFT.md",
      "docs/19_ACCEPTANCE_CRITERIA.md"
    ],
    deliverables: [
      "MVP scope confirmation note",
      "Backend B1 readiness checklist",
      "Consolidated blocker list",
      "Next-phase recommendation"
    ],
    nextActions: [
      "Review portal task state",
      "Confirm next phase candidate",
      "Collect role updates"
    ],
    status: "active",
    checklist: [
      { id: "noor-read-scope", label: "Read scope docs", completed: true, weight: 1 },
      { id: "noor-review-blockers", label: "Review blockers", completed: true, weight: 1 },
      { id: "noor-confirm-phase", label: "Confirm next phase", completed: false, weight: 2 },
      { id: "noor-update-priorities", label: "Update task priorities", completed: false, weight: 1 }
    ],
    progress: 60
  },
  {
    slug: "mohammed",
    name: "Mohammed",
    accountRole: "member",
    role: "Frontend/UI Owner",
    currentPhaseRole: "Claude UI Planning Phase U1 preparation",
    summary: "Prepares Claude UI planning inputs, MVP screen inventory, UI states, and Arabic/RTL concerns.",
    responsibilities: [
      "Prepare for Claude UI Planning Phase U1",
      "Review cashier workflow and UI handoff requirements",
      "Identify MVP screens and UI states",
      "Prepare questions for backend service contracts",
      "Keep UI planning aligned with implemented backend capabilities"
    ],
    filesToRead: [
      "docs/12_UX_CASHIER_WORKFLOW.md",
      "docs/13_CLAUDE_UI_HANDOFF.md",
      "docs/14_API_SERVICE_CONTRACTS_DRAFT.md",
      "docs/19_ACCEPTANCE_CRITERIA.md",
      "docs/11_HARDWARE_DEPLOYMENT_REALITY.md"
    ],
    deliverables: [
      "MVP screen inventory",
      "UI states checklist",
      "Arabic/RTL UI and receipt concerns list",
      "Backend contract questions"
    ],
    nextActions: ["Prepare U1 questions", "Map MVP screens", "List unclear backend contract points"],
    status: "planned",
    checklist: [
      { id: "mohammed-read-handoff", label: "Read UI handoff", completed: true, weight: 1 },
      { id: "mohammed-screen-inventory", label: "Draft screen inventory", completed: false, weight: 1 },
      { id: "mohammed-ui-states", label: "Draft UI states", completed: false, weight: 1 },
      { id: "mohammed-rtl", label: "List RTL concerns", completed: false, weight: 1 }
    ],
    progress: 35
  },
  {
    slug: "ali",
    name: "Ali",
    accountRole: "member",
    role: "Backend/Data Owner",
    currentPhaseRole: "Backend B1 readiness and SDK blocker tracking",
    summary: "Prepares backend environment readiness, schema review, migration questions, and B1 risk notes.",
    responsibilities: [
      "Prepare backend environment",
      "Confirm .NET SDK readiness",
      "Review schema, migration, and service contract scope",
      "Identify blockers before Backend Foundation Phase B1 resumes",
      "Avoid implementation until validation tools are available"
    ],
    filesToRead: [
      "docs/05_BACKEND_ARCHITECTURE.md",
      "docs/06_DATABASE_CONCEPTUAL_SCHEMA.md",
      "docs/07_INVENTORY_RULES.md",
      "docs/08_INVOICE_SALES_RULES.md",
      "docs/10_BACKUP_RESTORE_RECOVERY.md",
      "docs/14_API_SERVICE_CONTRACTS_DRAFT.md"
    ],
    deliverables: [
      ".NET SDK readiness confirmation",
      "Backend environment setup notes",
      "Schema and migration questions",
      "B1 implementation risk list"
    ],
    nextActions: ["Install .NET SDK", "Run dotnet --info", "Prepare B1 validation checklist"],
    status: "blocked",
    checklist: [
      { id: "ali-confirm-sdk", label: "Confirm SDK", completed: false, weight: 3 },
      { id: "ali-review-schema", label: "Review schema", completed: true, weight: 1 },
      { id: "ali-migration-risks", label: "List migration risks", completed: false, weight: 1 },
      { id: "ali-build-path", label: "Confirm build path", completed: false, weight: 2 }
    ],
    progress: 20
  },
  {
    slug: "murtadha",
    name: "Murtadha",
    accountRole: "member",
    role: "UX/QA/Field Feedback Owner",
    currentPhaseRole: "QA and field feedback preparation",
    summary: "Prepares QA scenarios, field observation checklists, hardware checks, and Arabic/RTL validation notes.",
    responsibilities: [
      "Prepare QA and field feedback materials",
      "Translate acceptance criteria into test scenarios",
      "Prepare hardware and printer validation checklists",
      "Identify unclear workflows from a field-use perspective"
    ],
    filesToRead: [
      "docs/11_HARDWARE_DEPLOYMENT_REALITY.md",
      "docs/12_UX_CASHIER_WORKFLOW.md",
      "docs/16_FIELD_FEEDBACK_AND_QA_PLAN.md",
      "docs/17_RISK_MATRIX.md",
      "docs/19_ACCEPTANCE_CRITERIA.md"
    ],
    deliverables: [
      "QA scenario checklist",
      "Field observation checklist",
      "Hardware/printer test checklist",
      "Arabic/RTL receipt validation checklist"
    ],
    nextActions: ["Draft QA checklist", "Prepare field note template", "List printer validation risks"],
    status: "planned",
    checklist: [
      { id: "murtadha-read-qa", label: "Read QA plan", completed: true, weight: 1 },
      { id: "murtadha-field-checklist", label: "Draft field checklist", completed: false, weight: 1 },
      { id: "murtadha-printer-checklist", label: "Draft printer checklist", completed: false, weight: 1 },
      { id: "murtadha-unclear-workflows", label: "List unclear workflows", completed: false, weight: 1 }
    ],
    progress: 30
  }
];
