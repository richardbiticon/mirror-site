import type { Lead, Milestone, Project } from "../types";

export interface MilestoneWithProject {
  milestone: Milestone;
  project: Project;
  daysFromToday: number;
}

function startOfTodayMs(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function dayDiff(targetIso: string): number {
  const target = new Date(targetIso);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - startOfTodayMs()) / 86_400_000);
}

export function getOverdueMilestones(
  projects: Project[]
): MilestoneWithProject[] {
  const out: MilestoneWithProject[] = [];
  for (const project of projects) {
    if (project.status === "cancelled" || project.status === "completed") {
      continue;
    }
    for (const milestone of project.milestones) {
      if (milestone.status === "paid") continue;
      const days = dayDiff(milestone.dueDate);
      if (days < 0) {
        out.push({ milestone, project, daysFromToday: days });
      }
    }
  }
  return out.sort((a, b) => a.daysFromToday - b.daysFromToday);
}

export function getUpcomingMilestones(
  projects: Project[],
  windowDays = 14
): MilestoneWithProject[] {
  const out: MilestoneWithProject[] = [];
  for (const project of projects) {
    if (project.status === "cancelled" || project.status === "completed") {
      continue;
    }
    for (const milestone of project.milestones) {
      if (milestone.status === "paid") continue;
      const days = dayDiff(milestone.dueDate);
      if (days >= 0 && days <= windowDays) {
        out.push({ milestone, project, daysFromToday: days });
      }
    }
  }
  return out.sort((a, b) => a.daysFromToday - b.daysFromToday);
}

export function getUnconvertedWonLeads(
  leads: Lead[],
  projects: Project[]
): Lead[] {
  const linked = new Set(
    projects.map((p) => p.leadId).filter((id): id is string => Boolean(id))
  );
  return leads.filter((l) => l.stage === "won" && !linked.has(l.id));
}
