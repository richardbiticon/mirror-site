interface Props {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder }: Props) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search..."}
        className="w-full rounded border border-slate-800 bg-slate-950 pl-9 pr-9 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wide text-slate-500">
        /
      </span>
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-0.5 text-xs uppercase tracking-wide text-slate-500 hover:text-slate-200"
        >
          Clear
        </button>
      )}
    </div>
  );
}
