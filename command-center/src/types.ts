export type LeadStage =
  | "new"
  | "contacted"
  | "site_visit"
  | "quoted"
  | "won"
  | "lost";

export type ProjectStatus =
  | "planning"
  | "in_progress"
  | "on_hold"
  | "completed"
  | "cancelled";

export type ProjectType =
  | "residential"
  | "commercial"
  | "renovation"
  | "fit_out"
  | "other";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  projectType: ProjectType;
  estimatedValuePhp: number;
  stage: LeadStage;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  leadId?: string;
  clientName: string;
  siteAddress: string;
  contractValuePhp: number;
  status: ProjectStatus;
  startDate: string;
  targetEndDate: string;
  progressPercent: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
