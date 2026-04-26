import type { ProjectStatus } from "../types";

export const PROJECT_STATUSES: ProjectStatus[] = [
  "planning",
  "in_progress",
  "on_hold",
  "completed",
  "cancelled",
];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  planning: "Planning",
  in_progress: "In Progress",
  on_hold: "On Hold",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const STATUS_STYLE: Record<ProjectStatus, string> = {
  planning: "bg-slate-700 text-slate-100",
  in_progress: "bg-sky-900 text-sky-100",
  on_hold: "bg-amber-900 text-amber-100",
  completed: "bg-emerald-900 text-emerald-100",
  cancelled: "bg-rose-900 text-rose-100",
};
