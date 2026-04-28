import { useState } from "react";
import type { Project } from "../types";
import type { ProjectEditInput } from "../hooks/useProjects";

interface Props {
  project: Project;
  onSubmit: (input: ProjectEditInput) => void;
  onCancel: () => void;
}

export function ProjectEditForm({ project, onSubmit, onCancel }: Props) {
  const [clientName, setClientName] = useState(project.clientName);
  const [siteAddress, setSiteAddress] = useState(project.siteAddress);
  const [contractValuePhp, setContractValuePhp] = useState(
    String(project.contractValuePhp)
  );
  const [startDate, setStartDate] = useState(project.startDate);
  const [targetEndDate, setTargetEndDate] = useState(project.targetEndDate);
  const [notes, setNotes] = useState(project.notes ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName.trim() || !siteAddress.trim()) {
      setError("Client name and site address are required.");
      return;
    }
    const value = Number(contractValuePhp.replace(/[, ]/g, ""));
    if (Number.isNaN(value) || value <= 0) {
      setError("Contract value must be greater than zero.");
      return;
    }
    if (new Date(targetEndDate) < new Date(startDate)) {
      setError("Target end date must be on or after start date.");
      return;
    }
    onSubmit({
      clientName: clientName.trim(),
      siteAddress: siteAddress.trim(),
      contractValuePhp: value,
      startDate,
      targetEndDate,
      notes: notes.trim() || undefined,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-800 bg-slate-950 p-5"
    >
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Edit Project
        </h3>
        <span className="font-mono text-xs text-slate-500">{project.id}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Client Name *">
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Contract Value (PHP) *">
          <input
            inputMode="numeric"
            value={contractValuePhp}
            onChange={(e) => setContractValuePhp(e.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Site Address *">
            <input
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Start Date">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Target End Date">
          <input
            type="date"
            value={targetEndDate}
            onChange={(e) => setTargetEndDate(e.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}

      <div className="mt-5 flex items-center justify-end gap-2">
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
          Save Changes
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}
