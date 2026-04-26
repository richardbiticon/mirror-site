import { useState } from "react";
import type {
  MilestoneStatus,
  Project,
  ProjectStatus,
} from "../types";
import { formatDate, formatPhp } from "../lib/format";
import { summarizeProjectMoney } from "../lib/milestones";
import { StatusSelect } from "./StatusSelect";
import { ProgressBar } from "./ProgressBar";
import { MilestoneList } from "./MilestoneList";
import { AddMilestoneForm } from "./AddMilestoneForm";
import type { NewMilestoneInput } from "../hooks/useProjects";

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
}

export function ProjectDetail({
  project,
  onBack,
  onStatusChange,
  onProgressChange,
  onAddMilestone,
  onMilestoneStatus,
  onMilestoneDelete,
}: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const money = summarizeProjectMoney(project);
  const allocatedPercent = project.milestones.reduce(
    (s, m) => s + m.percentOfContract,
    0
  );

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-xs uppercase tracking-wide text-slate-400 hover:text-slate-200"
      >
        &larr; Back to projects
      </button>

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

      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Paid" value={formatPhp(money.paid)} tone="emerald" />
        <Stat
          label="Outstanding"
          value={formatPhp(money.outstanding)}
          tone="amber"
        />
        <Stat label="Remaining" value={formatPhp(money.remaining)} />
      </section>

      <section>
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
            onClick={() => setShowAddForm((v) => !v)}
            className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            {showAddForm ? "Close" : "+ Add Milestone"}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-4">
            <AddMilestoneForm
              project={project}
              onSubmit={(input) => {
                onAddMilestone(project.id, input);
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <MilestoneList
          milestones={project.milestones}
          onStatusChange={(mid, status) =>
            onMilestoneStatus(project.id, mid, status)
          }
          onDelete={(mid) => onMilestoneDelete(project.id, mid)}
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
  tone?: "emerald" | "amber";
}) {
  const toneClass =
    tone === "emerald"
      ? "text-emerald-300"
      : tone === "amber"
        ? "text-amber-300"
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
