import { useState } from "react";
import type { Lead, LeadStage } from "../types";
import { formatDate, formatPhp } from "../lib/format";
import { StageSelect } from "./StageSelect";
import { PhoneActions } from "./PhoneActions";
import { ActivityFeed } from "./ActivityFeed";
import { AddActivityForm } from "./AddActivityForm";
import type { NewLeadActivityInput } from "../hooks/useLeads";

interface Props {
  lead: Lead;
  isConverted: boolean;
  onBack: () => void;
  onStageChange: (id: string, stage: LeadStage) => void;
  onEdit: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onAddActivity: (leadId: string, input: NewLeadActivityInput) => void;
  onActivityDelete: (leadId: string, activityId: string) => void;
}

export function LeadDetail({
  lead,
  isConverted,
  onBack,
  onStageChange,
  onEdit,
  onConvert,
  onDelete,
  onAddActivity,
  onActivityDelete,
}: Props) {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const canConvert = lead.stage === "won" && !isConverted;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs uppercase tracking-wide text-slate-400 hover:text-slate-200"
        >
          &larr; Back to leads
        </button>
        <div className="flex items-center gap-2">
          {canConvert && (
            <button
              type="button"
              onClick={() => onConvert(lead)}
              className="rounded bg-emerald-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-emerald-500"
            >
              Convert
            </button>
          )}
          {isConverted && (
            <span className="text-xs uppercase tracking-wide text-emerald-500">
              Already a project
            </span>
          )}
          <button
            type="button"
            onClick={() => onEdit(lead)}
            className="rounded border border-slate-700 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-300 hover:bg-slate-900"
          >
            Edit
          </button>
          {!isConverted && (
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    `Delete lead "${lead.name}"? This cannot be undone.`
                  )
                ) {
                  onDelete(lead);
                  onBack();
                }
              }}
              className="rounded border border-rose-900 px-3 py-1.5 text-xs uppercase tracking-wide text-rose-300 hover:bg-rose-950"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <header className="mb-6 rounded-lg border border-slate-800 bg-slate-950 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-100">
              {lead.name}
            </h2>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {lead.source} . {lead.projectType.replace("_", " ")}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Estimated Value
            </div>
            <div className="font-mono text-2xl text-slate-100">
              {formatPhp(lead.estimatedValuePhp)}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <div className="mb-1 text-xs uppercase tracking-wide text-slate-500">
              Stage
            </div>
            <StageSelect
              value={lead.stage}
              onChange={(s) => onStageChange(lead.id, s)}
            />
          </div>
          <div>
            <div className="mb-1 text-xs uppercase tracking-wide text-slate-500">
              Phone
            </div>
            <PhoneActions
              phone={lead.phone}
              prefilledMessage={`Hi ${lead.name}, this is regarding your construction project inquiry.`}
            />
          </div>
          <div>
            <div className="mb-1 text-xs uppercase tracking-wide text-slate-500">
              Email
            </div>
            {lead.email ? (
              <a
                href={`mailto:${lead.email}`}
                className="text-sm text-slate-200 hover:text-sky-300"
              >
                {lead.email}
              </a>
            ) : (
              <span className="text-sm text-slate-600">.</span>
            )}
          </div>
        </div>

        {lead.notes && (
          <div className="mt-5 border-t border-slate-800 pt-4">
            <div className="mb-1 text-xs uppercase tracking-wide text-slate-500">
              Notes
            </div>
            <p className="whitespace-pre-line text-sm text-slate-300">
              {lead.notes}
            </p>
          </div>
        )}

        <div className="mt-5 flex justify-between border-t border-slate-800 pt-3 text-xs text-slate-500">
          <span>Created {formatDate(lead.createdAt)}</span>
          <span>Updated {formatDate(lead.updatedAt)}</span>
        </div>
      </header>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Activity Log
            </h3>
            <p className="text-xs text-slate-500">
              {lead.activities.length} entries
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddActivity((v) => !v)}
            className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            {showAddActivity ? "Close" : "+ Log Activity"}
          </button>
        </div>

        {showAddActivity && (
          <div className="mb-4">
            <AddActivityForm
              onSubmit={(input) => {
                onAddActivity(lead.id, input);
                setShowAddActivity(false);
              }}
              onCancel={() => setShowAddActivity(false)}
            />
          </div>
        )}

        <ActivityFeed
          activities={lead.activities}
          onDelete={(aid) => onActivityDelete(lead.id, aid)}
        />
      </section>
    </div>
  );
}
