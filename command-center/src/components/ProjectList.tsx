import type { Project, ProjectStatus } from "../types";
import { formatDate, formatPhp } from "../lib/format";
import { StatusSelect } from "./StatusSelect";
import { ProgressBar } from "./ProgressBar";

interface Props {
  projects: Project[];
  onStatusChange: (id: string, status: ProjectStatus) => void;
  onProgressChange: (id: string, percent: number) => void;
}

export function ProjectList({
  projects,
  onStatusChange,
  onProgressChange,
}: Props) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-800 bg-slate-950 px-4 py-10 text-center text-sm text-slate-500">
        No projects yet. Convert a won lead to create your first project.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-900 text-left text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Client / Site</th>
            <th className="px-4 py-3 font-medium text-right">Contract</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium w-64">Progress</th>
            <th className="px-4 py-3 font-medium">Timeline</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-slate-900">
              <td className="px-4 py-3">
                <div className="font-medium text-slate-100">{p.clientName}</div>
                <div className="text-xs text-slate-500">{p.siteAddress}</div>
              </td>
              <td className="px-4 py-3 text-right font-mono text-slate-200">
                {formatPhp(p.contractValuePhp)}
              </td>
              <td className="px-4 py-3">
                <StatusSelect
                  value={p.status}
                  onChange={(s) => onStatusChange(p.id, s)}
                />
              </td>
              <td className="px-4 py-3">
                <ProgressBar
                  percent={p.progressPercent}
                  onChange={(v) => onProgressChange(p.id, v)}
                />
              </td>
              <td className="px-4 py-3 text-xs text-slate-400">
                <div>Start {formatDate(p.startDate)}</div>
                <div>Target {formatDate(p.targetEndDate)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
