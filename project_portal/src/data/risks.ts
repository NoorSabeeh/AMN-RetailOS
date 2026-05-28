import type { RiskItem } from "../types/portal";

export const risks: RiskItem[] = [
  {
    title: "Backend B1 validation blocked",
    severity: "High",
    status: "blocked",
    mitigation: "Install .NET SDK before resuming B1; do not mark B1 complete until build/test/migration validation passes."
  },
  {
    title: "Scope creep into delayed modes",
    severity: "High",
    status: "active",
    mitigation: "Keep Restaurant, Pharmacy, Clinic, AI, cloud, mobile, online payments, and multi-branch out of active work."
  },
  {
    title: "Inventory correctness not validated",
    severity: "High",
    status: "planned",
    mitigation: "Use movement-ledger tests during backend phases before pilot."
  },
  {
    title: "Arabic/RTL receipt rendering risk",
    severity: "Medium",
    status: "planned",
    mitigation: "Prepare test checklist and validate on real receipt printers before pilot."
  },
  {
    title: "Unshared team status",
    severity: "Medium",
    status: "active",
    mitigation: "Use Done/Blocked/Next updates and export JSON from the portal for manual sharing."
  }
];
