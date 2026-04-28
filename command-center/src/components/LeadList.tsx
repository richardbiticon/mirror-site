import type { Lead, LeadStage } from "../types";
import { formatPhp, formatDate } from "../lib/format";
import { StageSelect } from "./StageSelect";

interface Props {
  leads: Lead[];
  convertedLeadIds: Set<string>;
  onStageChange: (id: string, stage: LeadStage) => void;
  onConvert: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export function LeadList({
  leads,
  convertedLeadIds,
  onStageChange,
  onConvert,
  onEdit,
  onDelete,
}: Props) {
  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-800 bg-slate-950 px-4 py-10 text-center text-sm text-slate-500">
        No leads in this view.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-900 text-left text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Lead</th>
            <th className="px-4 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium text-right">Est. Value</th>
            <th className="px-4 py-3 font-medium">Stage</th>
            <th className="px-4 py-3 font-medium">Updated</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {leads.map((lead) => {
            const converted = convertedLeadIds.has(lead.id);
            const canConvert = lead.stage === "won" && !converted;
            return (
              <tr key={lead.id} className="hover:bg-slate-900">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-100">{lead.name}</div>
                  <div className="text-xs text-slate-500">{lead.source}</div>
                </td>
                <td className="px-4 py-3 font-mono text-slate-300">
                  {lead.phone}
                </td>
                <td className="px-4 py-3 capitalize text-slate-300">
                  {lead.projectType.replace("_", " ")}
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-200">
                  {formatPhp(lead.estimatedValuePhp)}
                </td>
                <td className="px-4 py-3">
                  <StageSelect
                    value={lead.stage}
                    onChange={(s) => onStageChange(lead.id, s)}
                  />
                </td>
                <td className="px-4 py-3 text-slate-400">
                  {formatDate(lead.updatedAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {canConvert && (
                      <button
                        type="button"
                        onClick={() => onConvert(lead)}
                        className="rounded bg-emerald-600 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white hover:bg-emerald-500"
                      >
                        Convert
                      </button>
                    )}
                    {converted && (
                      <span className="text-xs uppercase tracking-wide text-emerald-500">
                        Project
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onEdit(lead)}
                      className="text-xs uppercase tracking-wide text-slate-400 hover:text-slate-100"
                    >
                      Edit
                    </button>
                    {!converted && (
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            confirm(
                              `Delete lead "${lead.name}"? This cannot be undone.`
                            )
                          )
                            onDelete(lead);
                        }}
                        className="text-xs uppercase tracking-wide text-slate-500 hover:text-rose-400"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
