import type { SyncStatus } from "../hooks/useJsonbinSync";

interface Props {
  status: SyncStatus;
  lastSyncedAt: string | null;
  onClick: () => void;
}

function relativeFromNow(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const sec = Math.round(diffMs / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return new Date(iso).toLocaleDateString();
}

const STATUS_LABEL: Record<SyncStatus, string> = {
  off: "Sync off",
  idle: "Synced",
  pulling: "Pulling...",
  pushing: "Pushing...",
  error: "Sync error",
};

const STATUS_DOT: Record<SyncStatus, string> = {
  off: "bg-slate-600",
  idle: "bg-emerald-500",
  pulling: "bg-sky-500 animate-pulse",
  pushing: "bg-sky-500 animate-pulse",
  error: "bg-rose-500",
};

export function SyncStatusBadge({ status, lastSyncedAt, onClick }: Props) {
  const detail =
    status === "idle" && lastSyncedAt
      ? relativeFromNow(lastSyncedAt)
      : status === "off"
        ? "Local only"
        : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded border border-slate-800 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-300 hover:bg-slate-900"
    >
      <span className={`inline-block h-2 w-2 rounded-full ${STATUS_DOT[status]}`} />
      <span>{STATUS_LABEL[status]}</span>
      {detail && <span className="text-slate-500">. {detail}</span>}
    </button>
  );
}
