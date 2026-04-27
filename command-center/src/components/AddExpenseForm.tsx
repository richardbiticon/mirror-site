import { useState } from "react";
import type { ExpenseCategory } from "../types";
import {
  EXPENSE_CATEGORIES,
  EXPENSE_CATEGORY_LABEL,
} from "../lib/expenses";
import type { NewExpenseInput } from "../hooks/useProjects";

interface Props {
  onSubmit: (input: NewExpenseInput) => void;
  onCancel: () => void;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function AddExpenseForm({ onSubmit, onCancel }: Props) {
  const [category, setCategory] = useState<ExpenseCategory>("materials");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [vendor, setVendor] = useState("");
  const [date, setDate] = useState(todayIso());
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }
    const value = Number(amount.replace(/[, ]/g, ""));
    if (Number.isNaN(value) || value <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }
    onSubmit({
      category,
      description: description.trim(),
      amountPhp: value,
      vendor: vendor.trim() || undefined,
      date,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-800 bg-slate-950 p-4"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Add Expense
        </h4>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Category
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className={inputClass}
          >
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {EXPENSE_CATEGORY_LABEL[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Description
          </span>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="50 bags Holcim cement"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Amount (PHP)
          </span>
          <input
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="15000"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Vendor
          </span>
          <input
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            placeholder="optional"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Date
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          Save Expense
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none";
