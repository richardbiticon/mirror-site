import { useState } from "react";
import type {
  MilestoneStatus,
  Project,
  ProjectStatus,
} from "../types";
import { formatDate, formatPhp } from "../lib/format";
import { summarizeProjectMoney } from "../lib/milestones";
import { projectMargin } from "../lib/expenses";
import { StatusSelect } from "./StatusSelect";
import { ProgressBar } from "./ProgressBar";
import { MilestoneList } from "./MilestoneList";
import { AddMilestoneForm } from "./AddMilestoneForm";
import { ExpenseList } from "./ExpenseList";
import { AddExpenseForm } from "./AddExpenseForm";
import { ProjectEditForm } from "./ProjectEditForm";
import type {
  NewExpenseInput,
  NewMilestoneInput,
  ProjectEditInput,
} from "../hooks/useProjects";

import type { Milestone } from "../types";

interface Props {
  project: Project;
  onBack: () => void;
  onStatusChange: (id: string, status: ProjectStatus) => void;
  onProgressChange: (id: string, percent: number) => void;
  onAddMilestone: (projectId: string, input: NewMilestoneInput) => void;
  onMilestoneStatus: (
    projectId: string,
    milestoneId: string,
    status: MilestoneStatus
  ) => void;
  onMilestoneDelete: (projectId: string, milestoneId: string) => void;
  onAddExpense: (projectId: string, input: NewExpenseInput) => void;
  onExpenseDelete: (projectId: string, expenseId: string) => void;
  onUpdateProject: (id: string, input: ProjectEditInput) => void;
  onDeleteProject: (id: string) => void;
  onInvoiceMilestone: (milestone: Milestone) => void;
  onQuotation: () => void;
}

export function ProjectDetail({
  project,
  onBack,
  onStatusChange,
  onProgressChange,
  onAddMilestone,
  onMilestoneStatus,
  onMilestoneDelete,
  onAddExpense,
  onExpenseDelete,
  onUpdateProject,
  onDeleteProject,
  onInvoiceMilestone,
  onQuotation,
}: Props) {
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const money = summarizeProjectMoney(project);
  const margin = projectMargin(project);
  const allocatedPercent = project.milestones.reduce(
    (s, m) => s + m.percentOfContract,
    0
  );

  const marginTone =
    margin.projectedMarginPercent < 0
      ? "rose"
      : margin.projectedMarginPercent < 15
        ? "amber"
        : "emerald";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs uppercase tracking-wide text-slate-400 hover:text-slate-200"
        >
          &larr; Back to projects
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onQuotation}
            className="rounded border border-slate-700 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-300 hover:bg-slate-900"
          >
            Quotation
          </button>
          <button
            type="button"
            onClick={() => {
              setShowEdit((v) => !v);
              setShowAddMilestone(false);
              setShowAddExpense(false);
            }}
            className="rounded border border-slate-700 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-300 hover:bg-slate-900"
          >
            {showEdit ? "Close Edit" : "Edit"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  `Delete project "${project.clientName}"? Milestones and expenses are deleted with it. The originating lead is preserved.`
                )
              ) {
                onDeleteProject(project.id);
                onBack();
              }
            }}
            className="rounded border border-rose-900 px-3 py-1.5 text-xs uppercase tracking-wide text-rose-300 hover:bg-rose-950"
          >
            Delete
          </button>
        </div>
      </div>

      {showEdit && (
        <div className="mb-6">
          <ProjectEditForm
            project={project}
            onSubmit={(input) => {
              onUpdateProject(project.id, input);
              setShowEdit(false);
            }}
            onCancel={() => setShowEdit(false)}
          />
        </div>
      )}

      <header className="mb-6 rounded-lg border border-slate-800 bg-slate-950 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-100">
              {project.clientName}
            </h2>
            <p className="text-sm text-slate-400">{project.siteAddress}</p>
            <p className="mt-1 text-xs text-slate-500">
              Start {formatDate(project.startDate)} . Target{" "}
              {formatDate(project.targetEndDate)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Contract
            </div>
            <div className="font-mono text-2xl text-slate-100">
              {formatPhp(project.contractValuePhp)}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 text-xs uppercase tracking-wide text-slate-500">
              Status
            </div>
            <StatusSelect
              value={project.status}
              onChange={(s) => onStatusChange(project.id, s)}
            />
          </div>
          <div>
            <div className="mb-1 text-xs uppercase tracking-wide text-slate-500">
              Progress
            </div>
            <ProgressBar
              percent={project.progressPercent}
              onChange={(v) => onProgressChange(project.id, v)}
            />
          </div>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Paid" value={formatPhp(money.paid)} tone="emerald" />
        <Stat
          label="Outstanding"
          value={formatPhp(money.outstanding)}
          tone="amber"
        />
        <Stat label="Expenses" value={formatPhp(margin.expenses)} />
        <Stat
          label={`Margin (${margin.projectedMarginPercent.toFixed(0)}%)`}
          value={formatPhp(margin.projectedMargin)}
          tone={marginTone}
        />
      </section>

      <section className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Milestones
            </h3>
            <p className="text-xs text-slate-500">
              {project.milestones.length} milestones . {allocatedPercent}%
              allocated of contract
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowAddMilestone((v) => !v);
              setShowAddExpense(false);
            }}
            className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            {showAddMilestone ? "Close" : "+ Add Milestone"}
          </button>
        </div>

        {showAddMilestone && (
          <div className="mb-4">
            <AddMilestoneForm
              project={project}
              onSubmit={(input) => {
                onAddMilestone(project.id, input);
                setShowAddMilestone(false);
              }}
              onCancel={() => setShowAddMilestone(false)}
            />
          </div>
        )}

        <MilestoneList
          milestones={project.milestones}
          onStatusChange={(mid, status) =>
            onMilestoneStatus(project.id, mid, status)
          }
          onDelete={(mid) => onMilestoneDelete(project.id, mid)}
          onInvoice={onInvoiceMilestone}
        />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Expenses
            </h3>
            <p className="text-xs text-slate-500">
              {project.expenses.length} entries . {formatPhp(margin.expenses)}{" "}
              total
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowAddExpense((v) => !v);
              setShowAddMilestone(false);
            }}
            className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            {showAddExpense ? "Close" : "+ Add Expense"}
          </button>
        </div>

        {showAddExpense && (
          <div className="mb-4">
            <AddExpenseForm
              onSubmit={(input) => {
                onAddExpense(project.id, input);
                setShowAddExpense(false);
              }}
              onCancel={() => setShowAddExpense(false)}
            />
          </div>
        )}

        <ExpenseList
          expenses={project.expenses}
          onDelete={(eid) => onExpenseDelete(project.id, eid)}
        />
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "emerald" | "amber" | "rose";
}) {
  const toneClass =
    tone === "emerald"
      ? "text-emerald-300"
      : tone === "amber"
        ? "text-amber-300"
        : tone === "rose"
          ? "text-rose-300"
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
