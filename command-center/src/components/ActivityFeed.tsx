import type { Activity } from "../types";
import { formatDate } from "../lib/format";
import { ACTIVITY_LABEL, ACTIVITY_STYLE } from "../lib/activities";

interface Props {
  activities: Activity[];
  onDelete: (activityId: string) => void;
}

export function ActivityFeed({ activities, onDelete }: Props) {
  if (activities.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-800 bg-slate-950 px-4 py-10 text-center text-sm text-slate-500">
        No activity logged yet.
      </div>
    );
  }

  const sorted = [...activities].sort((a, b) =>
    a.occurredAt < b.occurredAt ? 1 : a.occurredAt > b.occurredAt ? -1 : 0
  );

  return (
    <ol className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
      {sorted.map((a, i) => (
        <li
          key={a.id}
          className={
            "flex gap-4 px-5 py-4 " +
            (i < sorted.length - 1 ? "border-b border-slate-800" : "")
          }
        >
          <div className="flex w-24 shrink-0 flex-col">
            <span className="font-mono text-sm text-slate-200">
              {formatDate(a.occurredAt)}
            </span>
            <span
              className={`mt-1 inline-flex w-fit items-center rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${ACTIVITY_STYLE[a.type]}`}
            >
              {ACTIVITY_LABEL[a.type]}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-slate-100">{a.summary}</div>
            {a.details && (
              <p className="mt-1 whitespace-pre-line text-xs text-slate-400">
                {a.details}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              if (confirm("Delete this activity entry?")) onDelete(a.id);
            }}
            className="self-start text-xs uppercase tracking-wide text-slate-500 hover:text-rose-400"
          >
            Delete
          </button>
        </li>
      ))}
    </ol>
  );
}
