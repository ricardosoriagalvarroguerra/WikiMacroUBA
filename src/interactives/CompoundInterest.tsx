import { useMemo, useState } from "react";
import InteractiveShell from "./InteractiveShell";
import D3LineChart from "./D3LineChart";
import {
  Controls,
  Slider,
  Stats,
  FormulaStep,
  PresetBar,
  ScaleToggle,
} from "./Common";
import { fmt } from "./format";

const PRESETS = [
  { label: "Plazo fijo Argentina (~80% TNA)", capital: 100000, rate: 80, years: 1, hint: "Tasa típica de plazo fijo" },
  { label: "Renta fija EE.UU. (~5%)", capital: 10000, rate: 5, years: 30, hint: "Bonos de largo plazo" },
  { label: "Bolsa global (~7% real)", capital: 10000, rate: 7, years: 40, hint: "Retorno histórico aprox. DESPUÉS de descontar inflación" },
  { label: "Hipoteca (~6%)", capital: 50000, rate: 6, years: 25, hint: "Crédito hipotecario típico" },
  { label: "Tasa muy alta (30%)", capital: 1000, rate: 30, years: 20, hint: "Crédito personal" },
];

export default function CompoundInterest() {
  const [capital, setCapital] = useState(10000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(20);
  const [scale, setScale] = useState<"linear" | "log">("linear");

  const data = useMemo(() => {
    const simple: { x: number; y: number }[] = [];
    const compound: { x: number; y: number }[] = [];
    const r = rate / 100;
    for (let t = 0; t <= years; t++) {
      simple.push({ x: t, y: capital * (1 + r * t) });
      compound.push({ x: t, y: capital * Math.pow(1 + r, t) });
    }
    return { simple, compound };
  }, [capital, rate, years]);

  const final = capital * Math.pow(1 + rate / 100, years);
  const finalSimple = capital * (1 + (rate / 100) * years);
  const factor = Math.pow(1 + rate / 100, years);

  const applyPreset = (i: number) => {
    const p = PRESETS[i];
    setCapital(p.capital);
    setRate(p.rate);
    setYears(p.years);
  };

  return (
    <InteractiveShell
      title="Interés compuesto vs simple"
      goal="Visualizar el poder del interés compuesto: el efecto 'interés sobre intereses'."
      variables={["Capital inicial", "Tasa anual", "Cantidad de años"]}
      observe="El área entre las curvas crece cada vez más rápido. Probá la escala logarítmica: el compuesto se ve recto."
      interpretation="Pequeñas diferencias de tasa o de plazo generan brechas enormes."
    >
      <PresetBar
        presets={PRESETS.map((p) => ({ label: p.label, hint: p.hint }))}
        onPick={applyPreset}
      />

      <Controls cols={3}>
        <Slider
          label="Capital inicial"
          value={capital}
          min={1000}
          max={500000}
          step={1000}
          onChange={setCapital}
          format={(v) => `$${v.toLocaleString()}`}
        />
        <Slider
          label="Tasa anual"
          value={rate}
          min={0}
          max={100}
          step={0.5}
          onChange={setRate}
          format={(v) => `${v}%`}
        />
        <Slider
          label="Años"
          value={years}
          min={1}
          max={50}
          step={1}
          onChange={setYears}
          format={(v) => `${v}`}
        />
      </Controls>

      <ScaleToggle scale={scale} onChange={setScale} />

      <D3LineChart
        xLabel="Años"
        yLabel="Capital ($)"
        scale={scale}
        fillBetween
        series={[
          { name: "Simple", color: "#9ca3af", data: data.simple, dashed: true },
          { name: "Compuesto", color: "#111111", data: data.compound },
        ]}
        yFormat={(n) => "$" + fmt(n)}
      />

      <FormulaStep
        formula="C_n = C_0 · (1 + i)^n"
        steps={[
          `${fmt(capital)} · (1 + ${(rate / 100).toFixed(3)})^${years}`,
          `${fmt(capital)} · ${factor.toFixed(3)}`,
        ]}
        result={`$${fmt(final)}`}
      />

      <Stats
        items={[
          ["Final compuesto", `$${fmt(final)}`, `× ${factor.toFixed(2)} el capital inicial`],
          ["Final simple", `$${fmt(finalSimple)}`, "lineal en el tiempo"],
          [
            "Diferencia",
            `$${fmt(final - finalSimple)}`,
            "= efecto interés compuesto",
          ],
        ]}
      />
    </InteractiveShell>
  );
}
