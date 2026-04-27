import type { Expense } from "../types";
import { formatDate, formatPhp } from "../lib/format";
import {
  EXPENSE_CATEGORY_LABEL,
  EXPENSE_CATEGORY_STYLE,
} from "../lib/expenses";

interface Props {
  expenses: Expense[];
  onDelete: (expenseId: string) => void;
}

export function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-800 bg-slate-950 px-4 py-10 text-center text-sm text-slate-500">
        No expenses logged yet.
      </div>
    );
  }

  const sorted = [...expenses].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  );

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-900 text-left text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Description</th>
            <th className="px-4 py-3 font-medium">Vendor</th>
            <th className="px-4 py-3 font-medium text-right">Amount</th>
            <th className="px-4 py-3 font-medium" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {sorted.map((e) => (
            <tr key={e.id} className="hover:bg-slate-900">
              <td className="px-4 py-3 text-slate-300">
                {formatDate(e.date)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${EXPENSE_CATEGORY_STYLE[e.category]}`}
                >
                  {EXPENSE_CATEGORY_LABEL[e.category]}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-100">{e.description}</td>
              <td className="px-4 py-3 text-slate-400">{e.vendor ?? "."}</td>
              <td className="px-4 py-3 text-right font-mono text-slate-100">
                {formatPhp(e.amountPhp)}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete expense "${e.description}"?`))
                      onDelete(e.id);
                  }}
                  className="text-xs uppercase tracking-wide text-slate-500 hover:text-rose-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
