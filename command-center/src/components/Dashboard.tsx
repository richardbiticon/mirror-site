import type { Lead, Project } from "../types";
import { formatDate, formatPhp } from "../lib/format";
import {
  getOverdueMilestones,
  getUnconvertedWonLeads,
  getUpcomingMilestones,
  type MilestoneWithProject,
} from "../lib/dashboard";
import { summarizeProjectMoney } from "../lib/milestones";
import { projectMargin } from "../lib/expenses";
import { STAGES, STAGE_LABEL } from "../lib/stages";

interface Props {
  leads: Lead[];
  projects: Project[];
  onOpenProject: (id: string) => void;
  onOpenLead: (id: string) => void;
  onGoToLeads: () => void;
}

export function Dashboard({
  leads,
  projects,
  onOpenProject,
  onOpenLead,
  onGoToLeads,
}: Props) {
  const overdue = getOverdueMilestones(projects);
  const upcoming = getUpcomingMilestones(projects);
  const unconverted = getUnconvertedWonLeads(leads, projects);

  const totals = projects.reduce(
    (acc, p) => {
      const m = summarizeProjectMoney(p);
      const margin = projectMargin(p);
      const isLive = p.status !== "cancelled";
      acc.contract += isLive ? p.contractValuePhp : 0;
      acc.paid += m.paid;
      acc.outstanding += m.outstanding;
      acc.expenses += margin.expenses;
      acc.netMargin += isLive ? margin.projectedMargin : -margin.expenses;
      return acc;
    },
    { contract: 0, paid: 0, outstanding: 0, expenses: 0, netMargin: 0 }
  );

  const netMarginPercent =
    totals.contract === 0 ? 0 : (totals.netMargin / totals.contract) * 100;

  const overdueAmount = overdue.reduce(
    (s, x) => s + x.milestone.amountPhp,
    0
  );

  const stageCounts: Record<string, number> = {};
  for (const stage of STAGES) stageCounts[stage] = 0;
  for (const l of leads) stageCounts[l.stage] += 1;
  const maxCount = Math.max(1, ...Object.values(stageCounts));
  const pipelineValue = leads
    .filter((l) => l.stage !== "lost" && l.stage !== "won")
    .reduce((s, l) => s + l.estimatedValuePhp, 0);

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Pipeline" value={formatPhp(pipelineValue)} />
        <Stat
          label="Outstanding"
          value={formatPhp(totals.outstanding)}
          tone="amber"
        />
        <Stat
          label="Overdue"
          value={formatPhp(overdueAmount)}
          tone={overdueAmount > 0 ? "rose" : "muted"}
        />
        <Stat label="Total Paid" value={formatPhp(totals.paid)} tone="emerald" />
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Stat label="Project Expenses" value={formatPhp(totals.expenses)} />
        <Stat
          label={`Net Margin (${netMarginPercent.toFixed(0)}%)`}
          value={formatPhp(totals.netMargin)}
          tone={
            totals.netMargin < 0
              ? "rose"
              : netMarginPercent < 15
                ? "amber"
                : "emerald"
          }
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel
          title="Overdue Receivables"
          emptyText="Nothing overdue. Excellent."
          rows={overdue}
          renderRow={(row) => (
            <MilestoneRow
              key={row.milestone.id}
              row={row}
              onOpen={() => onOpenProject(row.project.id)}
              tone="rose"
            />
          )}
          accent="rose"
        />
        <Panel
          title="Due in Next 14 Days"
          emptyText="Calm seas ahead."
          rows={upcoming}
          renderRow={(row) => (
            <MilestoneRow
              key={row.milestone.id}
              row={row}
              onOpen={() => onOpenProject(row.project.id)}
              tone="amber"
            />
          )}
          accent="amber"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Lead Funnel
            </h3>
            <button
              type="button"
              onClick={onGoToLeads}
              className="text-xs uppercase tracking-wide text-sky-400 hover:text-sky-300"
            >
              View leads &rarr;
            </button>
          </div>
          <div className="space-y-2">
            {STAGES.map((stage) => {
              const count = stageCounts[stage] ?? 0;
              const pct = (count / maxCount) * 100;
              return (
                <div key={stage} className="flex items-center gap-3">
                  <div className="w-24 text-xs uppercase tracking-wide text-slate-400">
                    {STAGE_LABEL[stage]}
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded bg-slate-800">
                    <div
                      className="h-full bg-sky-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="w-8 text-right font-mono text-xs text-slate-300">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Won, Not Converted
            </h3>
            <button
              type="button"
              onClick={onGoToLeads}
              className="text-xs uppercase tracking-wide text-sky-400 hover:text-sky-300"
            >
              Convert &rarr;
            </button>
          </div>
          {unconverted.length === 0 ? (
            <p className="text-sm text-slate-500">
              All won leads have been converted.
            </p>
          ) : (
            <ul className="divide-y divide-slate-800">
              {unconverted.map((lead) => (
                <li key={lead.id}>
                  <button
                    type="button"
                    onClick={() => onOpenLead(lead.id)}
                    className="flex w-full items-center justify-between rounded px-1 py-2 text-left hover:bg-slate-900"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-100">
                        {lead.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {lead.source} . {lead.projectType.replace("_", " ")}
                      </div>
                    </div>
                    <div className="font-mono text-sm text-slate-300">
                      {formatPhp(lead.estimatedValuePhp)}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function Panel({
  title,
  emptyText,
  rows,
  renderRow,
  accent,
}: {
  title: string;
  emptyText: string;
  rows: MilestoneWithProject[];
  renderRow: (row: MilestoneWithProject) => React.ReactNode;
  accent: "rose" | "amber";
}) {
  const accentColor =
    accent === "rose" ? "text-rose-300" : "text-amber-300";
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          {title}
        </h3>
        <span className={`font-mono text-xs ${accentColor}`}>
          {rows.length}
        </span>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-500">{emptyText}</p>
      ) : (
        <ul className="divide-y divide-slate-800">{rows.map(renderRow)}</ul>
      )}
    </div>
  );
}

function MilestoneRow({
  row,
  onOpen,
  tone,
}: {
  row: MilestoneWithProject;
  onOpen: () => void;
  tone: "rose" | "amber";
}) {
  const days = row.daysFromToday;
  const dayLabel =
    days < 0
      ? `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} late`
      : days === 0
        ? "Due today"
        : `In ${days} day${days === 1 ? "" : "s"}`;
  const toneClass = tone === "rose" ? "text-rose-300" : "text-amber-300";

  return (
    <li className="py-2">
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center justify-between gap-3 rounded px-1 text-left hover:bg-slate-900"
      >
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-slate-100">
            {row.project.clientName} . {row.milestone.name}
          </div>
          <div className="text-xs text-slate-500">
            {formatDate(row.milestone.dueDate)} . {row.project.siteAddress}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-sm text-slate-100">
            {formatPhp(row.milestone.amountPhp)}
          </div>
          <div className={`text-xs uppercase tracking-wide ${toneClass}`}>
            {dayLabel}
          </div>
        </div>
      </button>
    </li>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "emerald" | "amber" | "rose" | "muted";
}) {
  const toneClass =
    tone === "emerald"
      ? "text-emerald-300"
      : tone === "amber"
        ? "text-amber-300"
        : tone === "rose"
          ? "text-rose-300"
          : tone === "muted"
            ? "text-slate-400"
            : "text-slate-100";
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className={`mt-1 font-mono text-xl ${toneClass}`}>{value}</div>
    </div>
  );
}
