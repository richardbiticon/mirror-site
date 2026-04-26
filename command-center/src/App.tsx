import { useMemo, useState } from "react";
import { LeadList } from "./components/LeadList";
import { AddLeadForm } from "./components/AddLeadForm";
import { StageFilter, type StageFilterValue } from "./components/StageFilter";
import { useLeads } from "./hooks/useLeads";
import { formatPhp } from "./lib/format";
import { STAGES } from "./lib/stages";
import type { LeadStage } from "./types";

export default function App() {
  const { leads, addLead, updateStage, resetToSeed } = useLeads();
  const [filter, setFilter] = useState<StageFilterValue>("all");
  const [showForm, setShowForm] = useState(false);

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

  const activeCount = leads.filter(
    (l) => l.stage !== "won" && l.stage !== "lost"
  ).length;
  const wonCount = counts.won;

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
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset all leads to sample data?")) resetToSeed();
              }}
              className="rounded border border-slate-800 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-400 hover:bg-slate-900"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
            >
              {showForm ? "Close" : "+ Add Lead"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Active Leads" value={String(activeCount)} />
          <Stat label="Won" value={String(wonCount)} />
          <Stat label="Pipeline Value" value={formatPhp(totalPipeline)} />
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

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Leads
            </h2>
            <span className="text-xs text-slate-500">
              {visibleLeads.length} of {leads.length}
            </span>
          </div>

          <div className="mb-4">
            <StageFilter value={filter} onChange={setFilter} counts={counts} />
          </div>

          <LeadList
            leads={visibleLeads}
            onStageChange={(id, stage: LeadStage) => updateStage(id, stage)}
          />
        </section>

        <footer className="mt-12 text-center text-xs text-slate-600">
          Stages: {STAGES.length}. Stored locally in your browser.
        </footer>
      </main>
    </div>
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
