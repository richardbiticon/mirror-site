import { useCallback, useEffect, useState } from "react";
import type {
  Expense,
  Lead,
  Milestone,
  MilestoneStatus,
  Project,
  ProjectStatus,
} from "../types";
import { loadJson, newId, saveJson } from "../lib/storage";
import { buildDefaultMilestones } from "../lib/milestones";
import seedProjects from "../data/projects.json";

const STORAGE_KEY = "projects.v1";

export interface ConvertLeadInput {
  siteAddress: string;
  contractValuePhp: number;
  startDate: string;
  targetEndDate: string;
  notes?: string;
}

export type NewMilestoneInput = Omit<Milestone, "id">;
export type NewExpenseInput = Omit<Expense, "id">;
export type ProjectEditInput = Pick<
  Project,
  | "clientName"
  | "siteAddress"
  | "contractValuePhp"
  | "startDate"
  | "targetEndDate"
  | "notes"
>;

function normalizeProject(p: Project): Project {
  return {
    ...p,
    milestones: Array.isArray(p.milestones) ? p.milestones : [],
    expenses: Array.isArray(p.expenses) ? p.expenses : [],
  };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const raw = loadJson<Project[]>(STORAGE_KEY, seedProjects as Project[]);
    return raw.map(normalizeProject);
  });

  useEffect(() => {
    saveJson(STORAGE_KEY, projects);
  }, [projects]);

  const convertLead = useCallback(
    (lead: Lead, input: ConvertLeadInput) => {
      const now = new Date().toISOString();
      const project: Project = {
        id: newId("proj"),
        leadId: lead.id,
        clientName: lead.name,
        siteAddress: input.siteAddress,
        contractValuePhp: input.contractValuePhp,
        status: "planning",
        startDate: input.startDate,
        targetEndDate: input.targetEndDate,
        progressPercent: 0,
        milestones: buildDefaultMilestones(
          input.contractValuePhp,
          input.startDate,
          input.targetEndDate
        ),
        expenses: [],
        notes: input.notes,
        createdAt: now,
        updatedAt: now,
      };
      setProjects((prev) => [project, ...prev]);
      return project;
    },
    []
  );

  const updateStatus = useCallback((id: string, status: ProjectStatus) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status, updatedAt: new Date().toISOString() }
          : p
      )
    );
  }, []);

  const updateProgress = useCallback((id: string, percent: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(percent)));
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              progressPercent: clamped,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  }, []);

  const addMilestone = useCallback(
    (projectId: string, input: NewMilestoneInput) => {
      const ms: Milestone = { ...input, id: newId("ms") };
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                milestones: [...p.milestones, ms],
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
      return ms;
    },
    []
  );

  const updateMilestoneStatus = useCallback(
    (projectId: string, milestoneId: string, status: MilestoneStatus) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          return {
            ...p,
            milestones: p.milestones.map((m) =>
              m.id === milestoneId
                ? {
                    ...m,
                    status,
                    paidDate:
                      status === "paid"
                        ? m.paidDate ?? new Date().toISOString().slice(0, 10)
                        : undefined,
                  }
                : m
            ),
            updatedAt: new Date().toISOString(),
          };
        })
      );
    },
    []
  );

  const deleteMilestone = useCallback(
    (projectId: string, milestoneId: string) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                milestones: p.milestones.filter((m) => m.id !== milestoneId),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    },
    []
  );

  const addExpense = useCallback(
    (projectId: string, input: NewExpenseInput) => {
      const expense: Expense = { ...input, id: newId("exp") };
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                expenses: [expense, ...p.expenses],
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
      return expense;
    },
    []
  );

  const deleteExpense = useCallback(
    (projectId: string, expenseId: string) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                expenses: p.expenses.filter((e) => e.id !== expenseId),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    },
    []
  );

  const updateProject = useCallback(
    (id: string, input: ProjectEditInput) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const contractChanged = p.contractValuePhp !== input.contractValuePhp;
          const milestones = contractChanged
            ? p.milestones.map((m) => ({
                ...m,
                amountPhp: Math.round(
                  input.contractValuePhp * (m.percentOfContract / 100)
                ),
              }))
            : p.milestones;
          return {
            ...p,
            ...input,
            milestones,
            updatedAt: new Date().toISOString(),
          };
        })
      );
    },
    []
  );

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetToSeed = useCallback(() => {
    setProjects((seedProjects as Project[]).map(normalizeProject));
  }, []);

  const replaceAll = useCallback((next: Project[]) => {
    setProjects(next.map(normalizeProject));
  }, []);

  return {
    projects,
    convertLead,
    updateProject,
    deleteProject,
    updateStatus,
    updateProgress,
    addMilestone,
    updateMilestoneStatus,
    deleteMilestone,
    addExpense,
    deleteExpense,
    resetToSeed,
    replaceAll,
  };
}
