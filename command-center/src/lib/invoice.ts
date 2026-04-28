import type { Project, Milestone } from "../types";

function shortId(id: string): string {
  return id.replace(/[^a-z0-9]/gi, "").slice(-4).toUpperCase();
}

export function invoiceNumber(project: Project, milestone: Milestone): string {
  const idx =
    project.milestones.findIndex((m) => m.id === milestone.id) + 1;
  const seq = String(Math.max(1, idx)).padStart(2, "0");
  return `INV-${shortId(project.id)}-${seq}`;
}

export function quotationNumber(project: Project): string {
  return `QTN-${shortId(project.id)}`;
}
