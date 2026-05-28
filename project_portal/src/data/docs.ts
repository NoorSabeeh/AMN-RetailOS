import type { DocLink } from "../types/portal";

export const docsLinks: DocLink[] = [
  { title: "README", path: "README.md", category: "Root", description: "Project overview and documentation map." },
  { title: "TASKS", path: "TASKS.md", category: "Root", description: "Prioritized backlog." },
  { title: "CODEX STATUS", path: "CODEX_STATUS.md", category: "Root", description: "Current phase and blockers." },
  { title: "MVP v0.1 Scope", path: "docs/02_MVP_V0_1_SCOPE.md", category: "Scope", description: "Retail/Grocery and basic Wholesale boundaries." },
  { title: "Backend Architecture", path: "docs/05_BACKEND_ARCHITECTURE.md", category: "Backend", description: "Local-first backend correctness principles." },
  { title: "Database Conceptual Schema", path: "docs/06_DATABASE_CONCEPTUAL_SCHEMA.md", category: "Backend", description: "Conceptual tables for the core system." },
  { title: "Inventory Rules", path: "docs/07_INVENTORY_RULES.md", category: "Rules", description: "Inventory movement ledger rules." },
  { title: "Invoice and Sales Rules", path: "docs/08_INVOICE_SALES_RULES.md", category: "Rules", description: "Transactional sales and invoice lifecycle." },
  { title: "Cashier Workflow", path: "docs/12_UX_CASHIER_WORKFLOW.md", category: "UX", description: "Cashier flow and Arabic/RTL concerns." },
  { title: "Claude UI Handoff", path: "docs/13_CLAUDE_UI_HANDOFF.md", category: "UX", description: "Future product UI planning handoff." },
  { title: "Team Workflow", path: "docs/15_TEAM_WORKFLOW.md", category: "Team", description: "Role workflow and review process." },
  { title: "Field Feedback and QA", path: "docs/16_FIELD_FEEDBACK_AND_QA_PLAN.md", category: "QA", description: "QA and field research preparation." },
  { title: "Acceptance Criteria", path: "docs/19_ACCEPTANCE_CRITERIA.md", category: "QA", description: "MVP acceptance criteria." },
  { title: "Phase T1 Alignment", path: "docs/21_PHASE_T1_TEAM_ALIGNMENT.md", category: "Phase", description: "Current coordination phase." }
];
