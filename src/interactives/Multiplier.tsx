import { useMemo, useState } from "react";
import InteractiveShell from "./InteractiveShell";
import D3LineChart from "./D3LineChart";
import {
  Controls,
  Slider,
  Stats,
  FormulaStep,
  PresetBar,
} from "./Common";
import { fmt } from "./format";

const PRESETS = [
  { label: "PMC alta (0,9)", pmc: 0.9, shock: 100, hint: "Multiplicador grande" },
  { label: "PMC media (0,7)", pmc: 0.7, shock: 100, hint: "Multiplicador moderado" },
  { label: "PMC baja (0,5)", pmc: 0.5, shock: 100, hint: "Multiplicador chico" },
  { label: "Sin propagación (PMC = 0)", pmc: 0, shock: 100, hint: "Solo gasto inicial" },
];

export default function Multiplier() {
  const [pmc, setPmc] = useState(0.8);
  const [shock, setShock] = useState(100);

  const data = useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    let cumulative = 0;
    let round = shock;
    for (let r = 0; r <= 20; r++) {
      cumulative += round;
      arr.push({ x: r, y: cumulative });
      round *= pmc;
    }
    return arr;
  }, [pmc, shock]);

  const multiplier = pmc < 1 ? 1 / (1 - pmc) : Infinity;
  const totalEffect = isFinite(multiplier) ? shock * multiplier : Infinity;

  return (
    <InteractiveShell
      title="Multiplicador keynesiano del gasto"
      goal="Ver cómo un aumento inicial del gasto se 'multiplica' en la economía a través de rondas de consumo."
      variables={[
        "Propensión marginal a consumir (PMC)",
        "Shock inicial de gasto",
      ]}
      observe="Cada ronda agrega menos al efecto total. La curva tiende a una asíntota: el multiplicador final."
      interpretation="Multiplicador = 1/(1−PMC). PMC alta → multiplicador grande. PMC = 0,8 → multiplicador 5: cada $1 de gasto público genera $5 de demanda agregada."
    >
      <PresetBar
        presets={PRESETS.map((p) => ({ label: p.label, hint: p.hint }))}
        onPick={(i) => {
          setPmc(PRESETS[i].pmc);
          setShock(PRESETS[i].shock);
        }}
      />

      <Controls cols={2}>
        <Slider
          label="Propensión marginal al consumo"
          value={pmc}
          min={0}
          max={0.95}
          step={0.05}
          onChange={setPmc}
          format={(v) => v.toFixed(2)}
          hint="Fracción del ingreso adicional que se consume"
        />
        <Slider
          label="Shock inicial"
          value={shock}
          min={10}
          max={1000}
          step={10}
          onChange={setShock}
          format={(v) => `$${v}`}
          hint="Aumento del gasto público (ΔG)"
        />
      </Controls>

      <D3LineChart
        xLabel="Rondas de gasto"
        yLabel="Demanda total acumulada"
        referenceY={
          isFinite(totalEffect)
            ? { value: totalEffect, label: `Multiplicador → ${fmt(totalEffect)}` }
            : undefined
        }
        series={[{ name: "Demanda acumulada", color: "#111111", data }]}
        yFormat={(n) => "$" + fmt(n)}
      />

      <FormulaStep
        formula="Multiplicador = 1 / (1 − PMC)"
        steps={[
          `1 / (1 − ${pmc.toFixed(2)})`,
          `1 / ${(1 - pmc).toFixed(2)}`,
        ]}
        result={
          isFinite(multiplier)
            ? `× ${multiplier.toFixed(2)}  →  ΔY = ${fmt(totalEffect)}`
            : "∞ (no converge)"
        }
      />

      <Stats
        items={[
          ["Shock inicial", `$${fmt(shock)}`, "ΔG"],
          [
            "Multiplicador",
            isFinite(multiplier) ? `× ${multiplier.toFixed(2)}` : "∞",
            "= 1/(1−PMC)",
          ],
          [
            "Efecto total sobre Y",
            isFinite(totalEffect) ? `$${fmt(totalEffect)}` : "—",
            "demanda agregada",
          ],
        ]}
      />
    </InteractiveShell>
  );
}
