import type { ProjectStatus } from "../types";
import { PROJECT_STATUSES, STATUS_LABEL } from "../lib/projectStatus";

interface Props {
  value: ProjectStatus;
  onChange: (status: ProjectStatus) => void;
}

export function StatusSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ProjectStatus)}
      className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs uppercase tracking-wide text-slate-100 focus:border-sky-500 focus:outline-none"
    >
      {PROJECT_STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  );
}
