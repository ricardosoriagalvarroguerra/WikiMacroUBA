import type { ReactNode } from "react";

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  hint?: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs text-neutral-600">{label}</span>
        <span className="font-mono text-sm text-neutral-900">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full accent-neutral-900 mt-1"
      />
      {hint && <div className="text-[10px] text-neutral-400 mt-0.5">{hint}</div>}
    </label>
  );
}

export function Controls({
  cols = 3,
  children,
}: {
  cols?: 2 | 3 | 4;
  children: ReactNode;
}) {
  const cls =
    cols === 4
      ? "sm:grid-cols-2 xl:grid-cols-4"
      : cols === 3
        ? "sm:grid-cols-2 xl:grid-cols-3"
        : "sm:grid-cols-2";
  return <div className={`grid ${cls} gap-x-6 gap-y-4 mb-6`}>{children}</div>;
}

export function Stats({ items }: { items: [string, string, string?][] }) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 mt-6 pt-6 border-t border-neutral-200">
      {items.map(([label, value, hint]) => (
        <div key={label}>
          <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
            {label}
          </div>
          <div className="font-mono text-base text-neutral-900 mt-1">
            {value}
          </div>
          {hint && (
            <div className="text-[11px] text-neutral-500 mt-0.5">{hint}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export function FormulaStep({
  formula,
  steps,
  result,
}: {
  formula: string;
  steps: string[];
  result: string;
}) {
  return (
    <div className="border border-neutral-200 rounded p-4 my-4 font-mono text-sm bg-neutral-50 overflow-x-auto">
      <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-2 font-sans">
        Cálculo paso a paso
      </div>
      <div className="text-neutral-700">{formula}</div>
      {steps.map((s, i) => (
        <div key={i} className="text-neutral-700 mt-1">
          = {s}
        </div>
      ))}
      <div className="text-neutral-900 font-semibold mt-2 border-t border-neutral-200 pt-2">
        = {result}
      </div>
    </div>
  );
}

export function PresetBar({
  presets,
  onPick,
}: {
  presets: { label: string; hint?: string }[];
  onPick: (i: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 self-center mr-1">
        Escenarios
      </span>
      {presets.map((p, i) => (
        <button
          key={p.label}
          onClick={() => onPick(i)}
          title={p.hint}
          className="text-xs px-2.5 py-1 rounded border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

export function ScaleToggle({
  scale,
  onChange,
}: {
  scale: "linear" | "log";
  onChange: (s: "linear" | "log") => void;
}) {
  return (
    <div className="inline-flex border border-neutral-300 rounded overflow-hidden text-xs mb-2">
      {(["linear", "log"] as const).map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-2.5 py-1 transition ${
            scale === s
              ? "bg-neutral-900 text-white"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          {s === "linear" ? "Lineal" : "Logarítmica"}
        </button>
      ))}
    </div>
  );
}

export function MiniBar({
  values,
  colors,
  labels,
  format,
  signed = false,
}: {
  values: number[];
  colors: string[];
  labels: string[];
  format?: (n: number) => string;
  signed?: boolean;
}) {
  const max = Math.max(...values.map(Math.abs), 1);
  return (
    <div className="space-y-2">
      {values.map((v, i) => {
        const negative = v < 0;
        const fill = signed && negative ? "#dc2626" : colors[i];
        const widthPct = (Math.abs(v) / max) * 50;
        return (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <div className="text-xs text-neutral-600 sm:w-32 shrink-0">
              {labels[i]}
            </div>
            {signed ? (
              <div className="flex-1 h-5 bg-neutral-100 rounded overflow-hidden relative">
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-neutral-300" />
                <div
                  className="absolute top-0 bottom-0 transition-all duration-300"
                  style={{
                    width: `${widthPct}%`,
                    background: fill,
                    left: negative ? `${50 - widthPct}%` : "50%",
                  }}
                />
              </div>
            ) : (
              <div className="flex-1 h-5 bg-neutral-100 rounded overflow-hidden relative">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${(Math.abs(v) / max) * 100}%`,
                    background: fill,
                  }}
                />
              </div>
            )}
            <div
              className={`text-xs font-mono sm:w-24 sm:text-right shrink-0 ${
                signed && negative ? "text-red-700" : "text-neutral-900"
              }`}
            >
              {format ? format(v) : v.toFixed(1)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
