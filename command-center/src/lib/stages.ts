import type { LeadStage } from "../types";

export const STAGES: LeadStage[] = [
  "new",
  "contacted",
  "site_visit",
  "quoted",
  "won",
  "lost",
];

export const STAGE_LABEL: Record<LeadStage, string> = {
  new: "Bago",
  contacted: "Contacted",
  site_visit: "Site Visit",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};
