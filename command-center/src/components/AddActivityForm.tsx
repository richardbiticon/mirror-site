import { useState } from "react";
import type { ActivityType } from "../types";
import type { NewActivityInput } from "../hooks/useProjects";
import { ACTIVITY_LABEL, ACTIVITY_TYPES } from "../lib/activities";

interface Props {
  onSubmit: (input: NewActivityInput) => void;
  onCancel: () => void;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function AddActivityForm({ onSubmit, onCancel }: Props) {
  const [type, setType] = useState<ActivityType>("site_visit");
  const [occurredAt, setOccurredAt] = useState(todayIso());
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!summary.trim()) {
      setError("Summary is required.");
      return;
    }
    onSubmit({
      type,
      occurredAt,
      summary: summary.trim(),
      details: details.trim() || undefined,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-800 bg-slate-950 p-4"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Log Activity
        </h4>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Type
          </span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ActivityType)}
            className={inputClass}
          >
            {ACTIVITY_TYPES.map((t) => (
              <option key={t} value={t}>
                {ACTIVITY_LABEL[t]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Date
          </span>
          <input
            type="date"
            value={occurredAt}
            onChange={(e) => setOccurredAt(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Summary
          </span>
          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Foundation poured"
            className={inputClass}
          />
        </label>
        <div className="sm:col-span-3">
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
              Details
            </span>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={2}
              placeholder="Optional"
              className={inputClass}
            />
          </label>
        </div>
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
          Save
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none";
