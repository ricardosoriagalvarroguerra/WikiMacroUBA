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

const PRESETS: { label: string; pib0: number; g: number; years: number; hint: string }[] = [
  { label: "Argentina 1990s (~2%)", pib0: 100, g: 2, years: 30, hint: "Crecimiento moderado" },
  { label: "Brasil 2000s (~3,5%)", pib0: 100, g: 3.5, years: 30, hint: "Tasa típica de país en desarrollo" },
  { label: "Corea 1980s (~8%)", pib0: 100, g: 8, years: 30, hint: "Milagro asiático" },
  { label: "China 2000s (~10%)", pib0: 100, g: 10, years: 30, hint: "Crecimiento explosivo" },
  { label: "Recesión sostenida (−1%)", pib0: 100, g: -1, years: 30, hint: "Caída persistente" },
];

export default function PIBGrowth() {
  const [pib0, setPib0] = useState(100);
  const [g, setG] = useState(3);
  const [years, setYears] = useState(30);
  const [scale, setScale] = useState<"linear" | "log">("linear");

  const data = useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    for (let t = 0; t <= years; t++) {
      arr.push({ x: t, y: pib0 * Math.pow(1 + g / 100, t) });
    }
    return arr;
  }, [pib0, g, years]);

  const doubleYears = g > 0 ? Math.log(2) / Math.log(1 + g / 100) : Infinity;
  const final = pib0 * Math.pow(1 + g / 100, years);
  const totalGrowth = ((final / pib0) - 1) * 100;

  // doubling markers
  const doublingMarkers = useMemo(() => {
    if (!isFinite(doubleYears) || doubleYears <= 0) return [];
    const markers: { x: number; y: number }[] = [];
    let t = doubleYears;
    while (t <= years) {
      markers.push({ x: t, y: pib0 * Math.pow(1 + g / 100, t) });
      t += doubleYears;
    }
    return markers;
  }, [doubleYears, years, pib0, g]);

  const applyPreset = (i: number) => {
    const p = PRESETS[i];
    setPib0(p.pib0);
    setG(p.g);
    setYears(p.years);
  };

  return (
    <InteractiveShell
      title="Crecimiento del PIB"
      goal="Entender cómo pequeñas tasas sostenidas se acumulan en grandes diferencias."
      variables={["PIB inicial", "Tasa de crecimiento anual", "Horizonte"]}
      observe="Cuántas veces se duplica el PIB con la tasa elegida en el horizonte. Probá la escala logarítmica."
      interpretation="En logarítmica, una tasa constante se ve como línea recta — esa es la 'huella' del crecimiento exponencial."
    >
      <PresetBar
        presets={PRESETS.map((p) => ({ label: p.label, hint: p.hint }))}
        onPick={applyPreset}
      />

      <Controls cols={3}>
        <Slider
          label="PIB inicial"
          value={pib0}
          min={50}
          max={500}
          step={10}
          onChange={setPib0}
          format={(v) => v.toString()}
        />
        <Slider
          label="Tasa anual"
          value={g}
          min={-3}
          max={15}
          step={0.5}
          onChange={setG}
          format={(v) => `${v}%`}
        />
        <Slider
          label="Horizonte"
          value={years}
          min={5}
          max={60}
          step={1}
          onChange={setYears}
          format={(v) => `${v} años`}
        />
      </Controls>

      <ScaleToggle scale={scale} onChange={setScale} />

      <D3LineChart
        xLabel="Años"
        yLabel="PIB (índice)"
        scale={scale}
        referenceYs={
          doublingMarkers.length > 0
            ? doublingMarkers.map((_, i) => ({
                value: pib0 * Math.pow(2, i + 1),
                label: `${Math.pow(2, i + 1)}×`,
              }))
            : [{ value: pib0 * 2, label: `2× = ${fmt(pib0 * 2)}` }]
        }
        series={[{ name: "PIB", color: "#111111", data }]}
        yFormat={(n) => fmt(n, n < 10 ? 1 : 0)}
      />

      {doublingMarkers.length > 0 && (
        <p className="text-xs text-neutral-500 mt-2">
          Las líneas punteadas marcan los niveles 2×, 4×, 8×… del PIB inicial.
          En {years} años el PIB se duplica{" "}
          <strong className="text-neutral-900">{doublingMarkers.length}×</strong>
          {doublingMarkers.length > 1
            ? " (cada duplicación tarda lo mismo: la magia del crecimiento exponencial)."
            : "."}
        </p>
      )}

      <FormulaStep
        formula="PIB_t = PIB_0 · (1 + g)^t"
        steps={[
          `${pib0} · (1 + ${(g / 100).toFixed(3)})^${years}`,
          `${pib0} · ${Math.pow(1 + g / 100, years).toFixed(3)}`,
        ]}
        result={fmt(final, 1)}
      />

      <Stats
        items={[
          [`PIB en año ${years}`, fmt(final, 1), `desde ${pib0}`],
          [
            "Crecimiento total",
            `${totalGrowth >= 0 ? "+" : ""}${totalGrowth.toFixed(0)}%`,
            "acumulado",
          ],
          [
            "Tiempo de duplicación",
            isFinite(doubleYears) && doubleYears > 0
              ? `${doubleYears.toFixed(1)} años`
              : "—",
            "regla del 72: ≈72/g",
          ],
        ]}
      />
    </InteractiveShell>
  );
}
