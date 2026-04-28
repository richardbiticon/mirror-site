import type { ActivityType } from "../types";

export const ACTIVITY_TYPES: ActivityType[] = [
  "site_visit",
  "client_meeting",
  "call",
  "delivery",
  "inspection",
  "issue",
  "milestone",
  "note",
];

export const ACTIVITY_LABEL: Record<ActivityType, string> = {
  site_visit: "Site Visit",
  client_meeting: "Client Meeting",
  call: "Call",
  delivery: "Delivery",
  inspection: "Inspection",
  issue: "Issue",
  milestone: "Milestone",
  note: "Note",
};

export const ACTIVITY_STYLE: Record<ActivityType, string> = {
  site_visit: "bg-amber-900 text-amber-100",
  client_meeting: "bg-indigo-900 text-indigo-100",
  call: "bg-sky-900 text-sky-100",
  delivery: "bg-teal-900 text-teal-100",
  inspection: "bg-fuchsia-900 text-fuchsia-100",
  issue: "bg-rose-900 text-rose-100",
  milestone: "bg-emerald-900 text-emerald-100",
  note: "bg-slate-700 text-slate-100",
};
