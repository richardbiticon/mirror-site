import type {
  BusinessProfile,
  Milestone,
  Project,
} from "../types";
import { formatDate, formatPhp } from "../lib/format";

type Mode = "invoice" | "quotation";

interface Props {
  mode: Mode;
  profile: BusinessProfile;
  project: Project;
  milestone?: Milestone;
  documentNumber: string;
  onClose: () => void;
}

export function PrintableDoc({
  mode,
  profile,
  project,
  milestone,
  documentNumber,
  onClose,
}: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const isInvoice = mode === "invoice";
  const heading = isInvoice ? "INVOICE" : "QUOTATION";

  const lineItems = isInvoice && milestone
    ? [
        {
          label: milestone.name,
          detail: `${milestone.percentOfContract}% of contract . Due ${formatDate(milestone.dueDate)}`,
          amount: milestone.amountPhp,
        },
      ]
    : project.milestones.map((m) => ({
        label: m.name,
        detail: `${m.percentOfContract}% of contract . Due ${formatDate(m.dueDate)}`,
        amount: m.amountPhp,
      }));

  const total = lineItems.reduce((s, l) => s + l.amount, 0);

  return (
    <div className="fixed inset-0 z-40 overflow-auto bg-slate-950/95 print:static print:bg-white">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between gap-2 print:hidden">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            {heading} Preview
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded bg-sky-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
            >
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-slate-700 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-300 hover:bg-slate-900"
            >
              Close
            </button>
          </div>
        </div>

        <div className="printable rounded border border-slate-200 bg-white p-10 text-slate-900 shadow-lg print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="mb-8 flex items-start justify-between gap-6 border-b border-slate-300 pb-6">
            <div>
              <div className="text-xl font-bold tracking-tight">
                {profile.companyName}
              </div>
              {profile.tagline && (
                <div className="text-xs text-slate-600">{profile.tagline}</div>
              )}
              <div className="mt-2 whitespace-pre-line text-xs leading-relaxed text-slate-700">
                {profile.address}
                {"\n"}
                {profile.phone} . {profile.email}
                {profile.tin && (
                  <>
                    {"\n"}
                    TIN: {profile.tin}
                  </>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold tracking-widest text-slate-900">
                {heading}
              </div>
              <div className="mt-2 font-mono text-sm text-slate-700">
                {documentNumber}
              </div>
              <div className="text-xs text-slate-500">
                Date {formatDate(today)}
              </div>
              {isInvoice && milestone && (
                <div className="text-xs text-slate-500">
                  Due {formatDate(milestone.dueDate)}
                </div>
              )}
            </div>
          </header>

          <section className="mb-8 grid grid-cols-2 gap-6">
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {isInvoice ? "Bill To" : "Quotation For"}
              </div>
              <div className="font-semibold text-slate-900">
                {project.clientName}
              </div>
              <div className="text-xs text-slate-700">
                {project.siteAddress}
              </div>
            </div>
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Project
              </div>
              <div className="text-sm text-slate-900">
                Contract value {formatPhp(project.contractValuePhp)}
              </div>
              <div className="text-xs text-slate-700">
                Start {formatDate(project.startDate)} . Target{" "}
                {formatDate(project.targetEndDate)}
              </div>
            </div>
          </section>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300 text-left text-[10px] uppercase tracking-widest text-slate-500">
                <th className="py-2 font-semibold">Description</th>
                <th className="py-2 text-right font-semibold">Amount (PHP)</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, i) => (
                <tr key={i} className="border-b border-slate-200">
                  <td className="py-3">
                    <div className="font-medium text-slate-900">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-600">{item.detail}</div>
                  </td>
                  <td className="py-3 text-right font-mono">
                    {formatPhp(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-4 text-right text-xs uppercase tracking-widest text-slate-500">
                  Total Due
                </td>
                <td className="py-4 text-right font-mono text-lg font-bold text-slate-900">
                  {formatPhp(total)}
                </td>
              </tr>
            </tfoot>
          </table>

          {profile.paymentInstructions && (
            <section className="mt-8 border-t border-slate-200 pt-4">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Payment Instructions
              </div>
              <p className="whitespace-pre-line text-xs leading-relaxed text-slate-700">
                {profile.paymentInstructions}
              </p>
            </section>
          )}

          {!isInvoice && (
            <section className="mt-6 border-t border-slate-200 pt-4">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Acceptance
              </div>
              <div className="mt-6 grid grid-cols-2 gap-8 text-xs">
                <div>
                  <div className="border-b border-slate-400 pb-6" />
                  <div className="mt-1 text-slate-600">Client signature</div>
                </div>
                <div>
                  <div className="border-b border-slate-400 pb-6" />
                  <div className="mt-1 text-slate-600">
                    {profile.companyName}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
