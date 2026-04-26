import { useState } from "react";
import type { Project } from "../types";
import type { NewMilestoneInput } from "../hooks/useProjects";

interface Props {
  project: Project;
  onSubmit: (input: NewMilestoneInput) => void;
  onCancel: () => void;
}

export function AddMilestoneForm({ project, onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");
  const [percent, setPercent] = useState("");
  const [dueDate, setDueDate] = useState(project.targetEndDate);
  const [error, setError] = useState<string | null>(null);

  const allocatedPercent = project.milestones.reduce(
    (s, m) => s + m.percentOfContract,
    0
  );
  const remainingPercent = Math.max(0, 100 - allocatedPercent);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    const pct = Number(percent);
    if (Number.isNaN(pct) || pct <= 0 || pct > 100) {
      setError("Percent must be between 0 and 100.");
      return;
    }
    onSubmit({
      name: name.trim(),
      percentOfContract: pct,
      amountPhp: Math.round(project.contractValuePhp * (pct / 100)),
      status: "pending",
      dueDate,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-800 bg-slate-950 p-4"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Add Milestone
        </h4>
        <span className="text-xs text-slate-500">
          {allocatedPercent}% allocated . {remainingPercent}% remaining
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block sm:col-span-1">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Final Payment"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Percent
          </span>
          <input
            inputMode="numeric"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            placeholder={String(remainingPercent)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Due Date
          </span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-slate-700 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-300 hover:bg-slate-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
        >
          Add
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none";
