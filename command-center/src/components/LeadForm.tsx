import { useState } from "react";
import type { Lead, ProjectType } from "../types";
import type { NewLeadInput } from "../hooks/useLeads";

type Mode = "create" | "edit";

interface Props {
  mode?: Mode;
  initial?: Lead;
  onSubmit: (lead: NewLeadInput) => void;
  onCancel: () => void;
}

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "renovation", label: "Renovation" },
  { value: "fit_out", label: "Fit-out" },
  { value: "other", label: "Other" },
];

const SOURCES = [
  "Facebook Ad",
  "Referral",
  "Walk-in",
  "Website",
  "Instagram",
  "Other",
];

export function LeadForm({
  mode = "create",
  initial,
  onSubmit,
  onCancel,
}: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [source, setSource] = useState(initial?.source ?? SOURCES[0]);
  const [projectType, setProjectType] = useState<ProjectType>(
    initial?.projectType ?? "residential"
  );
  const [estimatedValuePhp, setEstimatedValuePhp] = useState(
    initial ? String(initial.estimatedValuePhp) : ""
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Name and phone are required.");
      return;
    }
    const value = Number(estimatedValuePhp.replace(/[, ]/g, ""));
    if (Number.isNaN(value) || value < 0) {
      setError("Estimated value must be a non-negative number.");
      return;
    }
    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      source,
      projectType,
      estimatedValuePhp: value,
      stage: initial?.stage ?? "new",
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
          {mode === "edit" ? "Edit Lead" : "New Lead"}
        </h3>
        {initial && (
          <span className="font-mono text-xs text-slate-500">
            {initial.id}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name *">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Reyes Family"
            className={inputClass}
          />
        </Field>
        <Field label="Phone *">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+63 917 555 0000"
            className={inputClass}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="optional"
            className={inputClass}
          />
        </Field>
        <Field label="Source">
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={inputClass}
          >
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Project Type">
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as ProjectType)}
            className={inputClass}
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estimated Value (PHP)">
          <input
            inputMode="numeric"
            value={estimatedValuePhp}
            onChange={(e) => setEstimatedValuePhp(e.target.value)}
            placeholder="1500000"
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
          {mode === "edit" ? "Save Changes" : "Save Lead"}
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
