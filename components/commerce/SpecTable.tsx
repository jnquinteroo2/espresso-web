import type { ReactNode } from "react";

export type SpecRow = { label: string; value: ReactNode };

export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <dl className="flex flex-col border-t border-zone-rule">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between py-3 gap-4 border-b border-zone-rule"
        >
          <dt className="font-source-sans text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-zone-fg shrink-0">
            {row.label}
          </dt>
          <dd className="font-source-sans text-[length:var(--text-body)] tabular-nums text-right">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
