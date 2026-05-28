import type { Phase } from "../types/portal";

export const phases: Phase[] = [
  {
    id: "phase-0",
    name: "Phase 0: Project Foundation Documentation",
    status: "completed",
    objective: "Create the planning foundation, product scope, architecture notes, workflow docs, and acceptance criteria.",
    allowedScope: ["Documentation", "Scope definition", "Roadmap", "Decision log"],
    outOfScope: ["Runtime code", "Product UI", "Cloud services"],
    deliverables: ["docs/00-20", "README.md", "TASKS.md", "CODEX_STATUS.md"],
    notes: "Foundation documentation is complete and remains the source for current planning.",
    progress: 100
  },
  {
    id: "phase-t1",
    name: "Phase T1: Team Alignment & Work Preparation",
    status: "active",
    objective: "Align roles, reading assignments, deliverables, blockers, and environment preparation.",
    allowedScope: ["Task distribution", "Reading assignments", "Status updates", "Environment readiness"],
    outOfScope: ["Backend implementation", "Database migrations", "Final UI screens"],
    deliverables: ["TEAM_ASSIGNMENTS.md", "docs/21_PHASE_T1_TEAM_ALIGNMENT.md", "Done/Blocked/Next updates"],
    notes: "Current active coordination phase.",
    progress: 58
  },
  {
    id: "phase-b1",
    name: "Phase B1: Backend Foundation",
    status: "blocked",
    objective: "Create schema, migrations, backend skeleton, and core business rule foundations after tooling is ready.",
    allowedScope: ["Local backend skeleton", "SQLite schema", "Migrations", "Tests"],
    outOfScope: ["Frontend UI", "Final license activation", "Cloud services", "Full POS workflow"],
    deliverables: ["Buildable .NET solution", "Migration validation", "Core tests"],
    notes: "Blocked until .NET SDK is installed. Partial skeleton exists but is not validated.",
    progress: 8
  },
  {
    id: "phase-u1",
    name: "Phase U1: Claude UI Planning",
    status: "planned",
    objective: "Prepare frontend planning assets for the future AMN RetailOS product UI without implementing product screens here.",
    allowedScope: ["Screen inventory", "UX questions", "Design handoff planning"],
    outOfScope: ["Production product UI", "Backend rules", "Delayed modes"],
    deliverables: ["MVP screen plan", "UI state checklist", "Backend contract questions"],
    notes: "Can run in parallel with field preparation when needed.",
    progress: 0
  },
  {
    id: "phase-b2",
    name: "Phase B2: Core Catalog & Inventory",
    status: "planned",
    objective: "Implement products, categories, barcodes, units, unit conversion, and inventory movement foundation.",
    allowedScope: ["Catalog", "Inventory movements", "Unit conversion"],
    outOfScope: ["Batch/expiry production workflow", "Serial/warranty workflow"],
    deliverables: ["Catalog services", "Inventory movement tests", "Stock reports foundation"],
    notes: "Depends on B1 validation.",
    progress: 0
  },
  {
    id: "phase-b3",
    name: "Phase B3: Sales & Invoice Foundation",
    status: "planned",
    objective: "Implement transactional sales, invoices, payments, idempotency, and cashier-safe backend behavior.",
    allowedScope: ["Sales services", "Invoice lifecycle", "Payment rules", "Idempotency"],
    outOfScope: ["Online payments", "Full UI", "Complex accounting"],
    deliverables: ["Sale commit tests", "Invoice sequence tests", "Payment tests"],
    notes: "Backend correctness remains the priority.",
    progress: 0
  },
  {
    id: "phase-b4",
    name: "Phase B4: Business Safety",
    status: "planned",
    objective: "Add returns, debt, suppliers, shifts, reports, audit, and backup flows.",
    allowedScope: ["Returns", "Debt", "Suppliers", "Cash sessions", "Audit logs", "Backup"],
    outOfScope: ["Enterprise accounting", "Cloud backup", "Advanced modes"],
    deliverables: ["Business safety tests", "Backup verification", "Audit reports"],
    notes: "Prepares the system for internal testing.",
    progress: 0
  },
  {
    id: "phase-h1",
    name: "Phase H1: Hardening",
    status: "planned",
    objective: "Harden licensing, diagnostics, installer process, Arabic/RTL receipt validation, and update safety.",
    allowedScope: ["Diagnostics", "License status", "Installer planning", "Update/rollback"],
    outOfScope: ["Final AMN Control Center", "Cloud SaaS"],
    deliverables: ["Hardening checklist", "Pilot readiness gate", "Support diagnostics"],
    notes: "Should happen before pilot deployment.",
    progress: 0
  },
  {
    id: "phase-p1",
    name: "Phase P1: Pilot Store Testing",
    status: "planned",
    objective: "Validate core workflows in real Retail/Grocery and basic Wholesale conditions.",
    allowedScope: ["Pilot testing", "Bug reports", "Field feedback", "Training notes"],
    outOfScope: ["Scope expansion", "Delayed product modes"],
    deliverables: ["Pilot report", "Bug fix backlog", "Release readiness decision"],
    notes: "Requires stable backend and validated UI flows.",
    progress: 0
  }
];
