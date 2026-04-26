import type { Lead, LeadStage } from "../types";
import { formatPhp, formatDate } from "../lib/format";
import { StageSelect } from "./StageSelect";

interface Props {
  leads: Lead[];
  onStageChange: (id: string, stage: LeadStage) => void;
}

export function LeadList({ leads, onStageChange }: Props) {
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
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {leads.map((lead) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
