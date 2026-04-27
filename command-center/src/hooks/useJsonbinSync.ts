import { useCallback, useEffect, useRef, useState } from "react";
import type { Lead, Project } from "../types";
import { loadJson, saveJson } from "../lib/storage";
import { createBin, readBin, updateBin } from "../lib/jsonbin";

const CONFIG_KEY = "sync.v1";
const PUSH_DEBOUNCE_MS = 3000;

export type SyncStatus = "idle" | "pulling" | "pushing" | "error" | "off";

export interface SyncConfig {
  enabled: boolean;
  apiKey: string;
  leadsBinId: string;
  projectsBinId: string;
}

const EMPTY_CONFIG: SyncConfig = {
  enabled: false,
  apiKey: "",
  leadsBinId: "",
  projectsBinId: "",
};

interface Args {
  leads: Lead[];
  projects: Project[];
  replaceLeads: (next: Lead[]) => void;
  replaceProjects: (next: Project[]) => void;
}

function isReady(c: SyncConfig): boolean {
  return Boolean(c.enabled && c.apiKey && c.leadsBinId && c.projectsBinId);
}

export function useJsonbinSync({
  leads,
  projects,
  replaceLeads,
  replaceProjects,
}: Args) {
  const [config, setConfig] = useState<SyncConfig>(() =>
    loadJson<SyncConfig>(CONFIG_KEY, EMPTY_CONFIG)
  );
  const [status, setStatus] = useState<SyncStatus>(() =>
    loadJson<SyncConfig>(CONFIG_KEY, EMPTY_CONFIG).enabled ? "idle" : "off"
  );
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lastSyncedRef = useRef<{ leads: string; projects: string } | null>(
    null
  );
  const initialPullDoneRef = useRef(false);

  useEffect(() => {
    saveJson(CONFIG_KEY, config);
    if (!isReady(config)) {
      setStatus(config.enabled ? "idle" : "off");
    }
  }, [config]);

  const pull = useCallback(async () => {
    if (!isReady(config)) return;
    setStatus("pulling");
    setError(null);
    try {
      const [pulledLeads, pulledProjects] = await Promise.all([
        readBin<Lead[]>(config.apiKey, config.leadsBinId),
        readBin<Project[]>(config.apiKey, config.projectsBinId),
      ]);
      replaceLeads(pulledLeads);
      replaceProjects(pulledProjects);
      lastSyncedRef.current = {
        leads: JSON.stringify(pulledLeads),
        projects: JSON.stringify(pulledProjects),
      };
      setLastSyncedAt(new Date().toISOString());
      setStatus("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Pull failed");
      setStatus("error");
    }
  }, [config, replaceLeads, replaceProjects]);

  const push = useCallback(async () => {
    if (!isReady(config)) return;
    const leadsJson = JSON.stringify(leads);
    const projectsJson = JSON.stringify(projects);
    if (
      lastSyncedRef.current &&
      lastSyncedRef.current.leads === leadsJson &&
      lastSyncedRef.current.projects === projectsJson
    ) {
      return;
    }
    setStatus("pushing");
    setError(null);
    try {
      await Promise.all([
        updateBin(config.apiKey, config.leadsBinId, leads),
        updateBin(config.apiKey, config.projectsBinId, projects),
      ]);
      lastSyncedRef.current = { leads: leadsJson, projects: projectsJson };
      setLastSyncedAt(new Date().toISOString());
      setStatus("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Push failed");
      setStatus("error");
    }
  }, [config, leads, projects]);

  // Initial pull once configured.
  useEffect(() => {
    if (!isReady(config) || initialPullDoneRef.current) return;
    initialPullDoneRef.current = true;
    void pull();
  }, [config, pull]);

  // Debounced push on state changes.
  useEffect(() => {
    if (!isReady(config)) return;
    const leadsJson = JSON.stringify(leads);
    const projectsJson = JSON.stringify(projects);
    if (
      lastSyncedRef.current &&
      lastSyncedRef.current.leads === leadsJson &&
      lastSyncedRef.current.projects === projectsJson
    ) {
      return;
    }
    const t = setTimeout(() => {
      void push();
    }, PUSH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [leads, projects, config, push]);

  const initializeBins = useCallback(
    async (apiKey: string) => {
      setStatus("pushing");
      setError(null);
      try {
        const [leadsBinId, projectsBinId] = await Promise.all([
          createBin({ apiKey, name: "command-center-leads", data: leads }),
          createBin({
            apiKey,
            name: "command-center-projects",
            data: projects,
          }),
        ]);
        const next: SyncConfig = {
          enabled: true,
          apiKey,
          leadsBinId,
          projectsBinId,
        };
        lastSyncedRef.current = {
          leads: JSON.stringify(leads),
          projects: JSON.stringify(projects),
        };
        setConfig(next);
        setLastSyncedAt(new Date().toISOString());
        setStatus("idle");
        initialPullDoneRef.current = true;
        return next;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Initialize failed");
        setStatus("error");
        throw e;
      }
    },
    [leads, projects]
  );

  const disable = useCallback(() => {
    setConfig({ ...EMPTY_CONFIG });
    lastSyncedRef.current = null;
    initialPullDoneRef.current = false;
    setLastSyncedAt(null);
    setError(null);
    setStatus("off");
  }, []);

  return {
    config,
    setConfig,
    status,
    lastSyncedAt,
    error,
    pull,
    push,
    initializeBins,
    disable,
    isReady: isReady(config),
  };
}
