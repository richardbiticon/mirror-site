import type { Lead, Project } from "../types";
import {
  downloadCsv,
  expensesToCsv,
  leadsToCsv,
  milestonesToCsv,
  projectsToCsv,
} from "../lib/csv";

interface Props {
  leads: Lead[];
  projects: Project[];
  onClose: () => void;
}

function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ExportPanel({ leads, projects, onClose }: Props) {
  const milestoneCount = projects.reduce(
    (s, p) => s + p.milestones.length,
    0
  );
  const expenseCount = projects.reduce((s, p) => s + p.expenses.length, 0);

  const stamp = todayStamp();

  const items: { label: string; count: number; onClick: () => void }[] = [
    {
      label: "Leads",
      count: leads.length,
      onClick: () =>
        downloadCsv(`leads-${stamp}.csv`, leadsToCsv(leads)),
    },
    {
      label: "Projects",
      count: projects.length,
      onClick: () =>
        downloadCsv(`projects-${stamp}.csv`, projectsToCsv(projects)),
    },
    {
      label: "Milestones",
      count: milestoneCount,
      onClick: () =>
        downloadCsv(`milestones-${stamp}.csv`, milestonesToCsv(projects)),
    },
    {
      label: "Expenses",
      count: expenseCount,
      onClick: () =>
        downloadCsv(`expenses-${stamp}.csv`, expensesToCsv(projects)),
    },
  ];

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Export to CSV
          </h3>
          <p className="text-xs text-slate-500">
            Excel-compatible files. UTF-8 with BOM. Hand any of these to your
            accountant.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs uppercase tracking-wide text-slate-400 hover:text-slate-200"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            disabled={item.count === 0}
            className="flex items-center justify-between rounded border border-slate-800 bg-slate-900 px-4 py-3 text-left transition hover:border-sky-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-800"
          >
            <div>
              <div className="text-sm font-medium text-slate-100">
                {item.label}
              </div>
              <div className="text-xs text-slate-500">
                {item.count} {item.count === 1 ? "row" : "rows"}
              </div>
            </div>
            <span className="text-xs uppercase tracking-wide text-sky-400">
              Download &darr;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
