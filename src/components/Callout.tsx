import type { ReactNode } from "react";

type Tone = "info" | "warn" | "ok" | "tip";

const labels: Record<Tone, string> = {
  info: "Nota",
  warn: "Atención",
  ok: "Tip",
  tip: "Sugerencia",
};

export default function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-5 max-w-3xl border-l-2 border-neutral-300 pl-4 py-1">
      <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-1">
        {title ?? labels[tone]}
      </div>
      <div className="text-sm text-neutral-700 leading-relaxed">{children}</div>
    </aside>
  );
}
