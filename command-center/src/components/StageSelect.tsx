import type { LeadStage } from "../types";
import { STAGES, STAGE_LABEL } from "../lib/stages";

interface Props {
  value: LeadStage;
  onChange: (stage: LeadStage) => void;
}

export function StageSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as LeadStage)}
      className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs uppercase tracking-wide text-slate-100 focus:border-sky-500 focus:outline-none"
    >
      {STAGES.map((s) => (
        <option key={s} value={s}>
          {STAGE_LABEL[s]}
        </option>
      ))}
    </select>
  );
}
