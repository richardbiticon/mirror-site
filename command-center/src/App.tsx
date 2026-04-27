import { useMemo, useState } from "react";
import { LeadList } from "./components/LeadList";
import { AddLeadForm } from "./components/AddLeadForm";
import { StageFilter, type StageFilterValue } from "./components/StageFilter";
import { ConvertLeadForm } from "./components/ConvertLeadForm";
import { ProjectList } from "./components/ProjectList";
import { ProjectDetail } from "./components/ProjectDetail";
import { Dashboard } from "./components/Dashboard";
import { SyncStatusBadge } from "./components/SyncStatusBadge";
import { SyncSettingsForm } from "./components/SyncSettingsForm";
import { useLeads } from "./hooks/useLeads";
import { useProjects } from "./hooks/useProjects";
import { useJsonbinSync } from "./hooks/useJsonbinSync";
import { formatPhp } from "./lib/format";
import { summarizeProjectMoney } from "./lib/milestones";
import type { Lead, LeadStage } from "./types";

type Tab = "dashboard" | "leads" | "projects";

export default function App() {
  const {
    leads,
    addLead,
    updateStage,
    resetToSeed: resetLeads,
    replaceAll: replaceLeads,
  } = useLeads();
  const {
    projects,
    convertLead,
    updateStatus,
    updateProgress,
    addMilestone,
    updateMilestoneStatus,
    deleteMilestone,
    addExpense,
    deleteExpense,
    resetToSeed: resetProjects,
    replaceAll: replaceProjects,
  } = useProjects();

  const sync = useJsonbinSync({
    leads,
    projects,
    replaceLeads,
    replaceProjects,
  });

  const [tab, setTab] = useState<Tab>("dashboard");
  const [filter, setFilter] = useState<StageFilterValue>("all");
  const [showForm, setShowForm] = useState(false);
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [showSyncSettings, setShowSyncSettings] = useState(false);

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  );

  const convertedLeadIds = useMemo(
    () =>
      new Set(
        projects.map((p) => p.leadId).filter((id): id is string => Boolean(id))
      ),
    [projects]
  );

  const counts = useMemo(() => {
    const base: Record<StageFilterValue, number> = {
      all: leads.length,
      new: 0,
      contacted: 0,
      site_visit: 0,
      quoted: 0,
      won: 0,
      lost: 0,
    };
    for (const l of leads) base[l.stage] += 1;
    return base;
  }, [leads]);

  const visibleLeads = useMemo(
    () => (filter === "all" ? leads : leads.filter((l) => l.stage === filter)),
    [leads, filter]
  );

  const totalPipeline = leads
    .filter((l) => l.stage !== "lost")
    .reduce((sum, l) => sum + l.estimatedValuePhp, 0);

  const activeLeadCount = leads.filter(
    (l) => l.stage !== "won" && l.stage !== "lost"
  ).length;

  const activeProjectsValue = projects
    .filter((p) => p.status !== "cancelled")
    .reduce((sum, p) => sum + p.contractValuePhp, 0);

  const activeProjectsCount = projects.filter(
    (p) => p.status === "planning" || p.status === "in_progress"
  ).length;

  const totalPaid = projects.reduce(
    (sum, p) => sum + summarizeProjectMoney(p).paid,
    0
  );

  return (
    <div className="min-h-full">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
              Command Center
            </h1>
            <p className="text-xs text-slate-500">
              Lead-to-Project, Philippine construction
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SyncStatusBadge
              status={sync.status}
              lastSyncedAt={sync.lastSyncedAt}
              onClick={() => setShowSyncSettings((v) => !v)}
            />
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    "Reset all leads and projects to sample data? This cannot be undone."
                  )
                ) {
                  resetLeads();
                  resetProjects();
                }
              }}
              className="rounded border border-slate-800 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-400 hover:bg-slate-900"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl gap-1 px-6">
          <TabButton
            active={tab === "dashboard"}
            onClick={() => setTab("dashboard")}
            label="Dashboard"
          />
          <TabButton
            active={tab === "leads"}
            onClick={() => setTab("leads")}
            label="Leads"
            count={leads.length}
          />
          <TabButton
            active={tab === "projects"}
            onClick={() => {
              setTab("projects");
              setSelectedProjectId(null);
            }}
            label="Projects"
            count={projects.length}
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {showSyncSettings && (
          <section className="mb-8">
            <SyncSettingsForm
              config={sync.config}
              isReady={sync.isReady}
              status={sync.status}
              error={sync.error}
              onInitialize={(apiKey) => sync.initializeBins(apiKey)}
              onSaveExisting={(next) => sync.setConfig(next)}
              onPull={sync.pull}
              onPush={sync.push}
              onDisable={sync.disable}
              onClose={() => setShowSyncSettings(false)}
            />
          </section>
        )}

        {tab === "dashboard" ? (
          <Dashboard
            leads={leads}
            projects={projects}
            onOpenProject={(id) => {
              setSelectedProjectId(id);
              setTab("projects");
            }}
            onGoToLeads={() => setTab("leads")}
          />
        ) : tab === "leads" ? (
          <>
            <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Stat label="Active Leads" value={String(activeLeadCount)} />
              <Stat label="Won" value={String(counts.won)} />
              <Stat label="Pipeline Value" value={formatPhp(totalPipeline)} />
            </section>

            <section className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Leads
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm((v) => !v);
                  setConvertingLead(null);
                }}
                className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
              >
                {showForm ? "Close" : "+ Add Lead"}
              </button>
            </section>

            {showForm && (
              <section className="mb-8">
                <AddLeadForm
                  onSubmit={(input) => {
                    addLead(input);
                    setShowForm(false);
                  }}
                  onCancel={() => setShowForm(false)}
                />
              </section>
            )}

            {convertingLead && (
              <section className="mb-8">
                <ConvertLeadForm
                  lead={convertingLead}
                  onSubmit={(input) => {
                    convertLead(convertingLead, input);
                    setConvertingLead(null);
                    setTab("projects");
                  }}
                  onCancel={() => setConvertingLead(null)}
                />
              </section>
            )}

            <div className="mb-4">
              <StageFilter
                value={filter}
                onChange={setFilter}
                counts={counts}
              />
            </div>

            <div className="mb-3 text-xs text-slate-500">
              {visibleLeads.length} of {leads.length}
            </div>

            <LeadList
              leads={visibleLeads}
              convertedLeadIds={convertedLeadIds}
              onStageChange={(id, stage: LeadStage) => updateStage(id, stage)}
              onConvert={(lead) => {
                setConvertingLead(lead);
                setShowForm(false);
              }}
            />
          </>
        ) : selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onBack={() => setSelectedProjectId(null)}
            onStatusChange={updateStatus}
            onProgressChange={updateProgress}
            onAddMilestone={addMilestone}
            onMilestoneStatus={updateMilestoneStatus}
            onMilestoneDelete={deleteMilestone}
            onAddExpense={addExpense}
            onExpenseDelete={deleteExpense}
          />
        ) : (
          <>
            <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Stat
                label="Active Projects"
                value={String(activeProjectsCount)}
              />
              <Stat
                label="Contract Value"
                value={formatPhp(activeProjectsValue)}
              />
              <Stat label="Total Paid" value={formatPhp(totalPaid)} />
            </section>

            <section className="mb-3 flex items-baseline justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Projects
              </h2>
              <span className="text-xs text-slate-500">
                {projects.length} total
              </span>
            </section>

            <ProjectList
              projects={projects}
              onStatusChange={updateStatus}
              onProgressChange={updateProgress}
              onOpen={(id) => setSelectedProjectId(id)}
            />
          </>
        )}

        <footer className="mt-12 text-center text-xs text-slate-600">
          Stored locally in your browser.
        </footer>
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "border-b-2 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition " +
        (active
          ? "border-sky-500 text-sky-300"
          : "border-transparent text-slate-500 hover:text-slate-300")
      }
    >
      {label}
      {count !== undefined && (
        <span className="ml-2 font-mono text-slate-500">{count}</span>
      )}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 font-mono text-xl text-slate-100">{value}</div>
    </div>
  );
}
