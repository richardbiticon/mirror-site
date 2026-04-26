import { Check } from "lucide-react";
import { COMPARISON_ROWS } from "./pricing-data";

/**
 * Pricing comparison table per brief §6.4.
 * Locked 12-row content. 1px Ash 30% borders between rows. Header row
 * caps. Body rows Body S Geist. Lucide check (Signal, 16px) for yes,
 * 16px Ash 60% horizontal line for no. Hover row highlight is Smoke.
 *
 * The table is rendered as a real <table> for screen-reader semantics.
 */
export function ComparisonTable() {
  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="border-b border-ash/30">
            <th
              scope="col"
              className="text-left text-eyebrow text-ash py-4 pr-4"
            >
              FEATURE
            </th>
            <th
              scope="col"
              className="text-eyebrow text-ash py-4 px-4 w-[120px]"
            >
              RECON
            </th>
            <th
              scope="col"
              className="text-eyebrow text-ash py-4 px-4 w-[120px]"
            >
              INSTALL
            </th>
            <th
              scope="col"
              className="text-eyebrow text-ash py-4 px-4 w-[120px]"
            >
              OPERATE
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row) => (
            <tr
              key={row.feature}
              className="border-b border-ash/30 transition-colors duration-200 hover:bg-smoke"
            >
              <td className="text-body-s text-bone py-4 pr-4">
                {row.feature}
              </td>
              <Cell on={row.recon} />
              <Cell on={row.install} />
              <Cell on={row.operate} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cell({ on }: { on: boolean }) {
  return (
    <td className="py-4 px-4 text-center">
      {on ? (
        <Check
          className="size-4 inline-block text-signal"
          strokeWidth={1.5}
          aria-label="Included"
        />
      ) : (
        <span
          className="inline-block w-4 h-px bg-ash/60 align-middle"
          aria-label="Not included"
        />
      )}
    </td>
  );
}
