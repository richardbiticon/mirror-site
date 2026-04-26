interface Props {
  percent: number;
  onChange?: (percent: number) => void;
}

export function ProgressBar({ percent, onChange }: Props) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded bg-slate-800">
        <div
          className="h-full bg-sky-500 transition-[width]"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {onChange ? (
        <input
          type="number"
          min={0}
          max={100}
          value={clamped}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-14 rounded border border-slate-800 bg-slate-900 px-2 py-1 text-right font-mono text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
        />
      ) : (
        <span className="w-10 text-right font-mono text-xs text-slate-400">
          {clamped}%
        </span>
      )}
    </div>
  );
}
