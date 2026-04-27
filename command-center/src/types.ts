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

export type MilestoneStatus = "pending" | "invoiced" | "paid";

export interface Milestone {
  id: string;
  name: string;
  percentOfContract: number;
  amountPhp: number;
  status: MilestoneStatus;
  dueDate: string;
  paidDate?: string;
  notes?: string;
}

export type ExpenseCategory =
  | "materials"
  | "labor"
  | "permits"
  | "equipment"
  | "subcontractor"
  | "transportation"
  | "other";

export interface Expense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amountPhp: number;
  vendor?: string;
  date: string;
  notes?: string;
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
  milestones: Milestone[];
  expenses: Expense[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
