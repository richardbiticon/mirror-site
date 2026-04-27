import { useCallback, useEffect, useState } from "react";
import type { Lead, LeadStage } from "../types";
import { loadJson, newId, saveJson } from "../lib/storage";
import seedLeads from "../data/leads.json";

const STORAGE_KEY = "leads.v1";

export type NewLeadInput = Omit<Lead, "id" | "createdAt" | "updatedAt">;

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(() =>
    loadJson<Lead[]>(STORAGE_KEY, seedLeads as Lead[])
  );

  useEffect(() => {
    saveJson(STORAGE_KEY, leads);
  }, [leads]);

  const addLead = useCallback((input: NewLeadInput) => {
    const now = new Date().toISOString();
    const lead: Lead = {
      ...input,
      id: newId("lead"),
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

  const resetToSeed = useCallback(() => {
    setLeads(seedLeads as Lead[]);
  }, []);

  const replaceAll = useCallback((next: Lead[]) => {
    setLeads(next);
  }, []);

  return { leads, addLead, updateStage, resetToSeed, replaceAll };
}
