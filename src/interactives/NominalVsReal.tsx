import { useState } from "react";
import InteractiveShell from "./InteractiveShell";
import { Slider, Controls, FormulaStep, PresetBar, MiniBar } from "./Common";
import { fmt, fmtPct } from "./format";

const PRESETS = [
  { label: "Crecimiento real puro", pibNom: 110, defl: 100, hint: "Sin inflación" },
  { label: "Argentina típica", pibNom: 200, defl: 195, hint: "Mucho nominal, poco real" },
  { label: "Estanflación", pibNom: 105, defl: 110, hint: "Cae el real con inflación" },
  { label: "Recesión sin inflación", pibNom: 95, defl: 100, hint: "PIB nominal y real caen" },
];

export default function NominalVsReal() {
  const [pibNominal, setPibNominal] = useState(150);
  const [deflactor, setDeflactor] = useState(120);

  const pibReal = (pibNominal / deflactor) * 100;
  const inflPrice = deflactor - 100;
  const nomGrowth = pibNominal - 100;
  const realGrowth = pibReal - 100;

  const message =
    pibReal > 100
      ? "La economía creció en términos reales."
      : pibReal === 100
        ? "Sin crecimiento real: solo cambiaron los precios."
        : "La economía cayó en términos reales pese al PIB nominal más alto.";

  return (
    <InteractiveShell
      title="PIB nominal vs PIB real"
      goal="Descomponer cuánto del crecimiento nominal es 'real' y cuánto es solo precios."
      variables={["PIB nominal (índice año t, base 100 año t−1)", "Deflactor del PIB"]}
      observe="Las barras muestran las tres tasas de variación. Comparalas: idealmente querés un crecimiento real positivo, no solo nominal."
      interpretation="PIB real = PIB nominal / Deflactor · 100. La relación entre las tres tasas es multiplicativa: (1 + nominal) = (1 + real) · (1 + π). Para variaciones chicas, aproximadamente nominal ≈ real + π; con cifras altas hay que usar la fórmula exacta."
    >
      <PresetBar
        presets={PRESETS.map((p) => ({ label: p.label, hint: p.hint }))}
        onPick={(i) => {
          const p = PRESETS[i];
          setPibNominal(p.pibNom);
          setDeflactor(p.defl);
        }}
      />

      <Controls cols={2}>
        <Slider
          label="PIB nominal"
          value={pibNominal}
          min={80}
          max={300}
          step={1}
          onChange={setPibNominal}
          format={(v) => v.toString()}
          hint="100 = PIB del año pasado"
        />
        <Slider
          label="Deflactor"
          value={deflactor}
          min={80}
          max={300}
          step={1}
          onChange={setDeflactor}
          format={(v) => v.toString()}
          hint="Índice de precios general"
        />
      </Controls>

      <div className="border border-neutral-200 rounded p-4 mb-4">
        <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-3">
          Tasas de variación (vs año pasado)
        </div>
        <MiniBar
          values={[nomGrowth, inflPrice, realGrowth]}
          colors={["#111111", "#9ca3af", "#16a34a"]}
          labels={["PIB nominal", "Precios (deflactor)", "PIB real"]}
          format={(v) => fmtPct(v)}
          signed
        />
        <p className="text-[11px] text-neutral-500 mt-3">
          Las barras a la derecha del centro son subas; a la izquierda, caídas.
          La relación es multiplicativa, no aditiva: (1 + nominal) = (1 + real)
          · (1 + precios).
        </p>
      </div>

      <FormulaStep
        formula="PIB_real = PIB_nominal / Deflactor · 100"
        steps={[`${pibNominal} / ${deflactor} · 100`]}
        result={fmt(pibReal, 1)}
      />

      <p className="text-sm text-neutral-700 mt-4">{message}</p>
    </InteractiveShell>
  );
}
