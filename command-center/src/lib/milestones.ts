import type { Milestone, MilestoneStatus, Project } from "../types";
import { newId } from "./storage";

export const MILESTONE_STATUSES: MilestoneStatus[] = [
  "pending",
  "invoiced",
  "paid",
];

export const MILESTONE_STATUS_LABEL: Record<MilestoneStatus, string> = {
  pending: "Pending",
  invoiced: "Invoiced",
  paid: "Paid",
};

export const MILESTONE_STATUS_STYLE: Record<MilestoneStatus, string> = {
  pending: "bg-slate-700 text-slate-100",
  invoiced: "bg-amber-900 text-amber-100",
  paid: "bg-emerald-900 text-emerald-100",
};

interface MilestoneSeed {
  name: string;
  percent: number;
  offsetDays: number | "end" | "endPlus30";
}

const DEFAULT_TEMPLATE: MilestoneSeed[] = [
  { name: "Down Payment", percent: 30, offsetDays: 0 },
  { name: "Progress Billing 1", percent: 30, offsetDays: "end" },
  { name: "Progress Billing 2", percent: 30, offsetDays: "end" },
  { name: "Retention Release", percent: 10, offsetDays: "endPlus30" },
];

function addDaysIso(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function midpointIso(startIso: string, endIso: string, fraction: number): string {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  return new Date(start + (end - start) * fraction).toISOString().slice(0, 10);
}

export function buildDefaultMilestones(
  contractValuePhp: number,
  startDate: string,
  targetEndDate: string
): Milestone[] {
  const totalProgress = DEFAULT_TEMPLATE.filter(
    (m) => m.offsetDays === "end"
  ).length;
  let progressIndex = 0;

  return DEFAULT_TEMPLATE.map((seed) => {
    let dueDate: string;
    if (seed.offsetDays === "endPlus30") {
      dueDate = addDaysIso(targetEndDate, 30);
    } else if (seed.offsetDays === "end") {
      progressIndex += 1;
      const fraction = progressIndex / (totalProgress + 1);
      dueDate = midpointIso(startDate, targetEndDate, fraction);
    } else {
      dueDate = addDaysIso(startDate, seed.offsetDays);
    }
    return {
      id: newId("ms"),
      name: seed.name,
      percentOfContract: seed.percent,
      amountPhp: Math.round(contractValuePhp * (seed.percent / 100)),
      status: "pending",
      dueDate,
    };
  });
}

export interface ProjectMoneySummary {
  invoiced: number;
  paid: number;
  outstanding: number;
  remaining: number;
}

export function summarizeProjectMoney(project: Project): ProjectMoneySummary {
  let invoiced = 0;
  let paid = 0;
  for (const m of project.milestones) {
    if (m.status === "invoiced") invoiced += m.amountPhp;
    if (m.status === "paid") paid += m.amountPhp;
  }
  const outstanding = invoiced;
  const remaining = project.contractValuePhp - paid;
  return { invoiced, paid, outstanding, remaining };
}
