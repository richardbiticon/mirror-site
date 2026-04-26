import leadsData from "./data/leads.json";
import type { Lead } from "./types";
import { LeadList } from "./components/LeadList";
import { formatPhp } from "./lib/format";

const leads = leadsData as Lead[];

export default function App() {
  const totalPipeline = leads
    .filter((l) => l.stage !== "lost")
    .reduce((sum, l) => sum + l.estimatedValuePhp, 0);

  const activeCount = leads.filter(
    (l) => l.stage !== "won" && l.stage !== "lost"
  ).length;

  const wonCount = leads.filter((l) => l.stage === "won").length;

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
          <div className="font-mono text-xs text-slate-500">v0.0.1</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Active Leads" value={String(activeCount)} />
          <Stat label="Won" value={String(wonCount)} />
          <Stat label="Pipeline Value" value={formatPhp(totalPipeline)} />
        </section>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Leads
            </h2>
            <span className="text-xs text-slate-500">{leads.length} total</span>
          </div>
          <LeadList leads={leads} />
        </section>
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
