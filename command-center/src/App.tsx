import { useMemo, useState } from "react";
import { LeadList } from "./components/LeadList";
import { LeadForm } from "./components/LeadForm";
import { StageFilter, type StageFilterValue } from "./components/StageFilter";
import { ConvertLeadForm } from "./components/ConvertLeadForm";
import { ProjectList } from "./components/ProjectList";
import { ProjectDetail } from "./components/ProjectDetail";
import { Dashboard } from "./components/Dashboard";
import { SyncStatusBadge } from "./components/SyncStatusBadge";
import { SyncSettingsForm } from "./components/SyncSettingsForm";
import { ExportPanel } from "./components/ExportPanel";
import { SearchInput } from "./components/SearchInput";
import { BusinessSettingsForm } from "./components/BusinessSettingsForm";
import { PrintableDoc } from "./components/PrintableDoc";
import { useBusinessProfile } from "./hooks/useBusinessProfile";
import { invoiceNumber, quotationNumber } from "./lib/invoice";
import type { Milestone } from "./types";
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
    updateLead,
    deleteLead,
    resetToSeed: resetLeads,
    replaceAll: replaceLeads,
  } = useLeads();
  const {
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
    resetToSeed: resetProjects,
    replaceAll: replaceProjects,
  } = useProjects();

  const sync = useJsonbinSync({
    leads,
    projects,
    replaceLeads,
    replaceProjects,
  });

  const { profile, updateProfile } = useBusinessProfile();

  const [tab, setTab] = useState<Tab>("dashboard");
  const [filter, setFilter] = useState<StageFilterValue>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [showSyncSettings, setShowSyncSettings] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showBusinessSettings, setShowBusinessSettings] = useState(false);
  const [leadSearch, setLeadSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  const [printDoc, setPrintDoc] = useState<
    | { mode: "invoice"; projectId: string; milestone: Milestone }
    | { mode: "quotation"; projectId: string }
    | null
  >(null);

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

  const visibleLeads = useMemo(() => {
    const stageFiltered =
      filter === "all" ? leads : leads.filter((l) => l.stage === filter);
    const q = leadSearch.trim().toLowerCase();
    if (!q) return stageFiltered;
    return stageFiltered.filter((l) => {
      const blob = [
        l.name,
        l.phone,
        l.email ?? "",
        l.source,
        l.notes ?? "",
        l.projectType,
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [leads, filter, leadSearch]);

  const visibleProjects = useMemo(() => {
    const q = projectSearch.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => {
      const blob = [
        p.clientName,
        p.siteAddress,
        p.notes ?? "",
        p.status,
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [projects, projectSearch]);

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
              onClick={() => {
                setShowSyncSettings((v) => !v);
                setShowExport(false);
              }}
            />
            <button
              type="button"
              onClick={() => {
                setShowExport((v) => !v);
                setShowSyncSettings(false);
                setShowBusinessSettings(false);
              }}
              className="rounded border border-slate-800 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-300 hover:bg-slate-900"
            >
              Export
            </button>
            <button
              type="button"
              onClick={() => {
                setShowBusinessSettings((v) => !v);
                setShowExport(false);
                setShowSyncSettings(false);
              }}
              className="rounded border border-slate-800 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-300 hover:bg-slate-900"
            >
              Business
            </button>
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

        {showExport && (
          <section className="mb-8">
            <ExportPanel
              leads={leads}
              projects={projects}
              onClose={() => setShowExport(false)}
            />
          </section>
        )}

        {showBusinessSettings && (
          <section className="mb-8">
            <BusinessSettingsForm
              profile={profile}
              onSave={updateProfile}
              onClose={() => setShowBusinessSettings(false)}
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
                  setEditingLead(null);
                }}
                className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
              >
                {showForm ? "Close" : "+ Add Lead"}
              </button>
            </section>

            {showForm && (
              <section className="mb-8">
                <LeadForm
                  mode="create"
                  onSubmit={(input) => {
                    addLead(input);
                    setShowForm(false);
                  }}
                  onCancel={() => setShowForm(false)}
                />
              </section>
            )}

            {editingLead && (
              <section className="mb-8">
                <LeadForm
                  mode="edit"
                  initial={editingLead}
                  onSubmit={(input) => {
                    updateLead(editingLead.id, input);
                    setEditingLead(null);
                  }}
                  onCancel={() => setEditingLead(null)}
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
              <SearchInput
                value={leadSearch}
                onChange={setLeadSearch}
                placeholder="Search by name, phone, email, source, notes..."
              />
            </div>

            <div className="mb-4">
              <StageFilter
                value={filter}
                onChange={setFilter}
                counts={counts}
              />
            </div>

            <div className="mb-3 text-xs text-slate-500">
              {visibleLeads.length} of {leads.length}
              {leadSearch && ` matching "${leadSearch}"`}
            </div>

            <LeadList
              leads={visibleLeads}
              convertedLeadIds={convertedLeadIds}
              onStageChange={(id, stage: LeadStage) => updateStage(id, stage)}
              onConvert={(lead) => {
                setConvertingLead(lead);
                setShowForm(false);
                setEditingLead(null);
              }}
              onEdit={(lead) => {
                setEditingLead(lead);
                setShowForm(false);
                setConvertingLead(null);
              }}
              onDelete={(lead) => deleteLead(lead.id)}
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
            onUpdateProject={updateProject}
            onDeleteProject={deleteProject}
            onInvoiceMilestone={(m) =>
              setPrintDoc({
                mode: "invoice",
                projectId: selectedProject.id,
                milestone: m,
              })
            }
            onQuotation={() =>
              setPrintDoc({
                mode: "quotation",
                projectId: selectedProject.id,
              })
            }
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
                {visibleProjects.length} of {projects.length}
                {projectSearch && ` matching "${projectSearch}"`}
              </span>
            </section>

            <div className="mb-4">
              <SearchInput
                value={projectSearch}
                onChange={setProjectSearch}
                placeholder="Search by client, site, status, notes..."
              />
            </div>

            <ProjectList
              projects={visibleProjects}
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

      {printDoc && (() => {
        const project = projects.find((p) => p.id === printDoc.projectId);
        if (!project) return null;
        if (printDoc.mode === "invoice") {
          return (
            <PrintableDoc
              mode="invoice"
              profile={profile}
              project={project}
              milestone={printDoc.milestone}
              documentNumber={invoiceNumber(project, printDoc.milestone)}
              onClose={() => setPrintDoc(null)}
            />
          );
        }
        return (
          <PrintableDoc
            mode="quotation"
            profile={profile}
            project={project}
            documentNumber={quotationNumber(project)}
            onClose={() => setPrintDoc(null)}
          />
        );
      })()}
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
