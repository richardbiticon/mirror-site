import { useCallback, useEffect, useState } from "react";
import type { Activity, Lead, LeadStage } from "../types";
import { loadJson, newId, saveJson } from "../lib/storage";
import seedLeads from "../data/leads.json";

const STORAGE_KEY = "leads.v1";

export type NewLeadInput = Omit<
  Lead,
  "id" | "createdAt" | "updatedAt" | "activities"
>;
export type NewLeadActivityInput = Omit<Activity, "id" | "createdAt">;

function normalizeLead(l: Lead): Lead {
  return {
    ...l,
    activities: Array.isArray(l.activities) ? l.activities : [],
  };
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(() => {
    const raw = loadJson<Lead[]>(STORAGE_KEY, seedLeads as Lead[]);
    return raw.map(normalizeLead);
  });

  useEffect(() => {
    saveJson(STORAGE_KEY, leads);
  }, [leads]);

  const addLead = useCallback((input: NewLeadInput) => {
    const now = new Date().toISOString();
    const lead: Lead = {
      ...input,
      id: newId("lead"),
      activities: [
        {
          id: newId("act"),
          type: "note",
          occurredAt: now.slice(0, 10),
          summary: `Lead created from ${input.source}.`,
          createdAt: now,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };
    setLeads((prev) => [lead, ...prev]);
    return lead;
  }, []);

  const updateStage = useCallback((id: string, stage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, stage, updatedAt: new Date().toISOString() }
          : l
      )
    );
  }, []);

  const updateLead = useCallback((id: string, input: NewLeadInput) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, ...input, updatedAt: new Date().toISOString() }
          : l
      )
    );
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const addActivity = useCallback(
    (leadId: string, input: NewLeadActivityInput) => {
      const activity: Activity = {
        ...input,
        id: newId("act"),
        createdAt: new Date().toISOString(),
      };
      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId
            ? {
                ...l,
                activities: [activity, ...l.activities],
                updatedAt: new Date().toISOString(),
              }
            : l
        )
      );
      return activity;
    },
    []
  );

  const deleteActivity = useCallback(
    (leadId: string, activityId: string) => {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId
            ? {
                ...l,
                activities: l.activities.filter((a) => a.id !== activityId),
                updatedAt: new Date().toISOString(),
              }
            : l
        )
      );
    },
    []
  );

  const resetToSeed = useCallback(() => {
    setLeads((seedLeads as Lead[]).map(normalizeLead));
  }, []);

  const replaceAll = useCallback((next: Lead[]) => {
    setLeads(next.map(normalizeLead));
  }, []);

  return {
    leads,
    addLead,
    updateStage,
    updateLead,
    deleteLead,
    addActivity,
    deleteActivity,
    resetToSeed,
    replaceAll,
  };
}
