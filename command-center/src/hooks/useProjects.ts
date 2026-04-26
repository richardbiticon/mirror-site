import { useCallback, useEffect, useState } from "react";
import type { Lead, Project, ProjectStatus } from "../types";
import { loadJson, newId, saveJson } from "../lib/storage";
import seedProjects from "../data/projects.json";

const STORAGE_KEY = "projects.v1";

export interface ConvertLeadInput {
  siteAddress: string;
  contractValuePhp: number;
  startDate: string;
  targetEndDate: string;
  notes?: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() =>
    loadJson<Project[]>(STORAGE_KEY, seedProjects as Project[])
  );

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

  const resetToSeed = useCallback(() => {
    setProjects(seedProjects as Project[]);
  }, []);

  return { projects, convertLead, updateStatus, updateProgress, resetToSeed };
}
