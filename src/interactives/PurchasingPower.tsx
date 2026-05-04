import { useMemo, useState } from "react";
import InteractiveShell from "./InteractiveShell";
import {
  Slider,
  Controls,
  PresetBar,
  FormulaStep,
} from "./Common";
import { fmt, fmtPct } from "./format";

const PRESETS = [
  { label: "Argentina 2023 (~211%)", money: 100000, breadPrice: 800, inflation: 211, hint: "Hiperinflación moderna" },
  { label: "Argentina típica (~50%)", money: 100000, breadPrice: 1000, inflation: 50, hint: "Inflación alta crónica" },
  { label: "Brasil 1990 (~2900%)", money: 100, breadPrice: 1, inflation: 2900, hint: "Hiperinflación clásica" },
  { label: "Estabilidad (~3%)", money: 100, breadPrice: 1, inflation: 3, hint: "Inflación baja" },
];

export default function PurchasingPower() {
  const [money, setMoney] = useState(100000);
  const [breadPrice, setBreadPrice] = useState(2000);
  const [inflation, setInflation] = useState(150);

  const breadsToday = Math.floor(money / breadPrice);
  const breadsNext = Math.floor(money / (breadPrice * (1 + inflation / 100)));
  const lossPct =
    breadsToday > 0 ? (1 - breadsNext / breadsToday) * 100 : 0;

  // For visual grid, cap at 100 to avoid blowing up
  const displayToday = useMemo(
    () => Math.min(breadsToday, 100),
    [breadsToday],
  );
  const displayNext = useMemo(() => Math.min(breadsNext, 100), [breadsNext]);

  return (
    <InteractiveShell
      title="Poder adquisitivo bajo inflación"
      goal="Mostrar de forma tangible cuánto se erosiona el poder de compra con inflación."
      variables={["Cantidad de dinero", "Precio inicial del pan", "Inflación anual"]}
      observe="Cuántos panes podías comprar antes y cuántos en un año. La grilla se actualiza al mover los sliders."
      interpretation="Tener 'la misma cantidad de plata' no significa tener el mismo poder de compra."
    >
      <PresetBar
        presets={PRESETS.map((p) => ({ label: p.label, hint: p.hint }))}
        onPick={(i) => {
          const p = PRESETS[i];
          setMoney(p.money);
          setBreadPrice(p.breadPrice);
          setInflation(p.inflation);
        }}
      />

      <Controls cols={3}>
        <Slider
          label="Plata"
          value={money}
          min={10000}
          max={1000000}
          step={5000}
          onChange={setMoney}
          format={(v) => `$${v.toLocaleString()}`}
        />
        <Slider
          label="Precio del pan"
          value={breadPrice}
          min={500}
          max={10000}
          step={100}
          onChange={setBreadPrice}
          format={(v) => `$${v}`}
        />
        <Slider
          label="Inflación anual"
          value={inflation}
          min={0}
          max={3000}
          step={5}
          onChange={setInflation}
          format={(v) => `${v}%`}
        />
      </Controls>

      <div className="grid lg:grid-cols-2 gap-6 my-6">
        <BreadGrid title="Hoy" count={breadsToday} display={displayToday} />
        <BreadGrid
          title="En 1 año"
          count={breadsNext}
          display={displayNext}
          dimmed={breadsNext < breadsToday}
        />
      </div>

      <FormulaStep
        formula="Panes = Plata / Precio_futuro = Plata / [Precio_hoy · (1 + π)]"
        steps={[
          `${fmt(money)} / [${breadPrice} · (1 + ${(inflation / 100).toFixed(2)})]`,
          `${fmt(money)} / ${fmt(breadPrice * (1 + inflation / 100))}`,
        ]}
        result={`${breadsNext} panes (vs ${breadsToday} hoy)`}
      />

      <p className="text-sm text-neutral-700 mt-4">
        {breadsToday - breadsNext > 0 ? (
          <>
            Perdés{" "}
            <strong className="text-neutral-900">
              {breadsToday - breadsNext} panes
            </strong>{" "}
            ({fmtPct(lossPct)} de poder adquisitivo) si tu plata se queda
            quieta.
          </>
        ) : (
          <>Tu poder adquisitivo se mantiene o crece (no hay inflación o es baja).</>
        )}
      </p>
    </InteractiveShell>
  );
}

function BreadGrid({
  title,
  count,
  display,
  dimmed,
}: {
  title: string;
  count: number;
  display: number;
  dimmed?: boolean;
}) {
  const items = Array.from({ length: display });
  return (
    <div className="border border-neutral-200 rounded p-4">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
        <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
          {title}
        </div>
        <div className="font-mono text-base text-neutral-900">{count} panes</div>
      </div>
      <div className="flex flex-wrap gap-1">
        {items.map((_, i) => (
          <span
            key={i}
            className={`text-base leading-none transition-opacity ${
              dimmed ? "opacity-50" : "opacity-100"
            }`}
            aria-hidden="true"
          >
            🍞
          </span>
        ))}
        {count > display && (
          <span className="text-xs text-neutral-500 self-end ml-1">
            +{count - display}
          </span>
        )}
        {count === 0 && (
          <span className="text-xs text-neutral-400">(no alcanza)</span>
        )}
      </div>
    </div>
  );
}
