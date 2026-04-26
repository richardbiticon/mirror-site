import type { LeadStage } from "../types";
import { STAGE_LABEL } from "../lib/stages";

const STAGE_STYLE: Record<LeadStage, string> = {
  new: "bg-slate-700 text-slate-100",
  contacted: "bg-sky-900 text-sky-100",
  site_visit: "bg-amber-900 text-amber-100",
  quoted: "bg-indigo-900 text-indigo-100",
  won: "bg-emerald-900 text-emerald-100",
  lost: "bg-rose-900 text-rose-100",
};

export function StageBadge({ stage }: { stage: LeadStage }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${STAGE_STYLE[stage]}`}
    >
      {STAGE_LABEL[stage]}
    </span>
  );
}
