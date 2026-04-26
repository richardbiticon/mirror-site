import type { Milestone, MilestoneStatus } from "../types";
import { formatDate, formatPhp } from "../lib/format";
import {
  MILESTONE_STATUSES,
  MILESTONE_STATUS_LABEL,
  MILESTONE_STATUS_STYLE,
} from "../lib/milestones";

interface Props {
  milestones: Milestone[];
  onStatusChange: (milestoneId: string, status: MilestoneStatus) => void;
  onDelete: (milestoneId: string) => void;
}

export function MilestoneList({ milestones, onStatusChange, onDelete }: Props) {
  if (milestones.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-800 bg-slate-950 px-4 py-10 text-center text-sm text-slate-500">
        No milestones yet. Add one to start tracking payments.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-900 text-left text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Milestone</th>
            <th className="px-4 py-3 font-medium text-right">%</th>
            <th className="px-4 py-3 font-medium text-right">Amount</th>
            <th className="px-4 py-3 font-medium">Due</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {milestones.map((m) => (
            <tr key={m.id} className="hover:bg-slate-900">
              <td className="px-4 py-3">
                <div className="font-medium text-slate-100">{m.name}</div>
                {m.paidDate && (
                  <div className="text-xs text-emerald-500">
                    Paid {formatDate(m.paidDate)}
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-right font-mono text-slate-300">
                {m.percentOfContract}%
              </td>
              <td className="px-4 py-3 text-right font-mono text-slate-100">
                {formatPhp(m.amountPhp)}
              </td>
              <td className="px-4 py-3 text-slate-300">
                {formatDate(m.dueDate)}
              </td>
              <td className="px-4 py-3">
                <select
                  value={m.status}
                  onChange={(e) =>
                    onStatusChange(m.id, e.target.value as MilestoneStatus)
                  }
                  className={`rounded px-2 py-1 text-xs font-medium uppercase tracking-wide focus:outline-none ${MILESTONE_STATUS_STYLE[m.status]}`}
                >
                  {MILESTONE_STATUSES.map((s) => (
                    <option key={s} value={s} className="bg-slate-900">
                      {MILESTONE_STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete milestone "${m.name}"?`))
                      onDelete(m.id);
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
