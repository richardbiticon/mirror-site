import type { LeadStage } from "../types";
import { STAGES, STAGE_LABEL } from "../lib/stages";

export type StageFilterValue = LeadStage | "all";

interface Props {
  value: StageFilterValue;
  onChange: (next: StageFilterValue) => void;
  counts: Record<StageFilterValue, number>;
}

export function StageFilter({ value, onChange, counts }: Props) {
  const options: { key: StageFilterValue; label: string }[] = [
    { key: "all", label: "All" },
    ...STAGES.map((s) => ({ key: s, label: STAGE_LABEL[s] })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={
              "rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition " +
              (active
                ? "border-sky-500 bg-sky-500/10 text-sky-300"
                : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600 hover:text-slate-200")
            }
          >
            {opt.label}
            <span className="ml-2 font-mono text-slate-500">
              {counts[opt.key] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
