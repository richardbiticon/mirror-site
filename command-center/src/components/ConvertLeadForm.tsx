import { useState } from "react";
import type { Lead } from "../types";
import type { ConvertLeadInput } from "../hooks/useProjects";
import { formatPhp } from "../lib/format";

interface Props {
  lead: Lead;
  onSubmit: (input: ConvertLeadInput) => void;
  onCancel: () => void;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function plusDaysIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function ConvertLeadForm({ lead, onSubmit, onCancel }: Props) {
  const [siteAddress, setSiteAddress] = useState("");
  const [contractValuePhp, setContractValuePhp] = useState(
    String(lead.estimatedValuePhp)
  );
  const [startDate, setStartDate] = useState(todayIso());
  const [targetEndDate, setTargetEndDate] = useState(plusDaysIso(120));
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!siteAddress.trim()) {
      setError("Site address is required.");
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
      className="rounded-lg border border-emerald-900/60 bg-slate-950 p-5"
    >
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
          Convert to Project
        </h3>
        <span className="text-xs text-slate-500">
          {lead.name} . est. {formatPhp(lead.estimatedValuePhp)}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Site Address *">
            <input
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
              placeholder="123 Sampaguita St, Antipolo, Rizal"
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Contract Value (PHP) *">
          <input
            inputMode="numeric"
            value={contractValuePhp}
            onChange={(e) => setContractValuePhp(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Start Date">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Target End Date">
            <input
              type="date"
              value={targetEndDate}
              onChange={(e) => setTargetEndDate(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
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
          className="rounded bg-emerald-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-emerald-500"
        >
          Create Project
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
