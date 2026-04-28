import { useState } from "react";
import type { BusinessProfile } from "../types";

interface Props {
  profile: BusinessProfile;
  onSave: (next: BusinessProfile) => void;
  onClose: () => void;
}

export function BusinessSettingsForm({ profile, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<BusinessProfile>(profile);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.companyName.trim()) {
      setError("Company name is required.");
      return;
    }
    onSave({
      companyName: draft.companyName.trim(),
      tagline: draft.tagline?.trim() || undefined,
      address: draft.address.trim(),
      phone: draft.phone.trim(),
      email: draft.email.trim(),
      tin: draft.tin?.trim() || undefined,
      paymentInstructions: draft.paymentInstructions?.trim() || undefined,
    });
    onClose();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-800 bg-slate-950 p-5"
    >
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Business Profile
          </h3>
          <p className="text-xs text-slate-500">
            Shown on invoices and quotations.
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Company Name *">
          <input
            value={draft.companyName}
            onChange={(e) =>
              setDraft({ ...draft, companyName: e.target.value })
            }
            className={inputClass}
          />
        </Field>
        <Field label="Tagline">
          <input
            value={draft.tagline ?? ""}
            onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
            className={inputClass}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Address">
            <input
              value={draft.address}
              onChange={(e) => setDraft({ ...draft, address: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Phone">
          <input
            value={draft.phone}
            onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={draft.email}
            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="TIN (BIR)">
          <input
            value={draft.tin ?? ""}
            onChange={(e) => setDraft({ ...draft, tin: e.target.value })}
            placeholder="000-000-000-000"
            className={inputClass}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Payment Instructions">
            <textarea
              value={draft.paymentInstructions ?? ""}
              onChange={(e) =>
                setDraft({ ...draft, paymentInstructions: e.target.value })
              }
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
          onClick={onClose}
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
