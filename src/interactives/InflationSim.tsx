import { useMemo, useState } from "react";
import InteractiveShell from "./InteractiveShell";
import D3LineChart from "./D3LineChart";
import {
  Slider,
  Stats,
  FormulaStep,
  PresetBar,
} from "./Common";
import { fmt, fmtPct } from "./format";

const PRESETS = [
  { label: "Argentina 2023 (Inf 9%/m)", inflation: 9, salaryRise: 6, months: 12, hint: "Inflación galopante" },
  { label: "USA 2022 (Inf ~0,7%/m)", inflation: 0.7, salaryRise: 0.4, months: 12, hint: "Inflación elevada para USA" },
  { label: "Estabilidad (2%/año ≈ 0,17%/m)", inflation: 0.17, salaryRise: 0.25, months: 24, hint: "Salario real sube" },
  { label: "Hiperinflación (25%/m)", inflation: 25, salaryRise: 15, months: 12, hint: "Crisis monetaria" },
];

export default function InflationSim() {
  const [salary, setSalary] = useState(500000);
  const [inflation, setInflation] = useState(8);
  const [salaryRise, setSalaryRise] = useState(5);
  const [months, setMonths] = useState(12);

  const data = useMemo(() => {
    const real: { x: number; y: number }[] = [];
    const nominalIdx: { x: number; y: number }[] = [];
    let s = salary;
    let p = 100;
    const s0 = salary;
    for (let m = 0; m <= months; m++) {
      nominalIdx.push({ x: m, y: (s / s0) * 100 });
      real.push({ x: m, y: (s / p) * (100 / s0) * 100 });
      s *= 1 + salaryRise / 100;
      p *= 1 + inflation / 100;
    }
    return { real, nominalIdx };
  }, [salary, inflation, salaryRise, months]);

  const realStart = data.real[0].y;
  const realEnd = data.real[months].y;
  const lossPct = ((realEnd / realStart) - 1) * 100;
  const cumInfl = (Math.pow(1 + inflation / 100, months) - 1) * 100;
  const cumWage = (Math.pow(1 + salaryRise / 100, months) - 1) * 100;

  const applyPreset = (i: number) => {
    const p = PRESETS[i];
    setInflation(p.inflation);
    setSalaryRise(p.salaryRise);
    setMonths(p.months);
  };

  return (
    <InteractiveShell
      title="Salario nominal vs real con inflación"
      goal="Ver cómo cambia el poder adquisitivo cuando el salario sube menos (o más) que los precios."
      variables={[
        "Salario inicial",
        "Inflación mensual",
        "Suba salarial mensual",
        "Meses",
      ]}
      observe="El área sombreada entre las dos líneas es la pérdida (o ganancia) de poder adquisitivo. Pasá el mouse para ver valores mes a mes."
      interpretation="Lo que importa para el bienestar es el salario real (línea negra), no el nominal."
    >
      <PresetBar
        presets={PRESETS.map((p) => ({ label: p.label, hint: p.hint }))}
        onPick={applyPreset}
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-4 mb-6">
        <Slider
          label="Salario inicial"
          value={salary}
          min={100000}
          max={2000000}
          step={50000}
          onChange={setSalary}
          format={(v) => `$${v.toLocaleString()}`}
        />
        <Slider
          label="Inflación mensual"
          value={inflation}
          min={0}
          max={25}
          step={0.1}
          onChange={setInflation}
          format={(v) => `${v.toFixed(1)}%`}
        />
        <Slider
          label="Suba salarial"
          value={salaryRise}
          min={0}
          max={25}
          step={0.1}
          onChange={setSalaryRise}
          format={(v) => `${v.toFixed(1)}%`}
        />
        <Slider
          label="Meses"
          value={months}
          min={3}
          max={36}
          step={1}
          onChange={setMonths}
          format={(v) => `${v}`}
        />
      </div>

      <D3LineChart
        xLabel="Meses"
        yLabel="Índice (mes 0 = 100)"
        referenceY={{ value: 100, label: "base 100" }}
        fillBetween
        series={[
          { name: "Salario nominal", color: "#9ca3af", data: data.nominalIdx, dashed: true },
          { name: "Salario real", color: "#111111", data: data.real },
        ]}
        yFormat={(n) => fmt(n, 0)}
      />

      <FormulaStep
        formula="Salario_real = Salario_nominal / Nivel_precios · 100"
        steps={[
          `Inflación acumulada: (1 + ${(inflation / 100).toFixed(3)})^${months} − 1 = ${cumInfl.toFixed(1)}%`,
          `Salario nominal acum.: (1 + ${(salaryRise / 100).toFixed(3)})^${months} − 1 = ${cumWage.toFixed(1)}%`,
          `Real = (1 + ${(cumWage / 100).toFixed(2)}) / (1 + ${(cumInfl / 100).toFixed(2)}) − 1`,
        ]}
        result={`${fmtPct(lossPct)} de poder adquisitivo`}
      />

      <Stats
        items={[
          [
            `Nominal mes ${months}`,
            `$${fmt(salary * Math.pow(1 + salaryRise / 100, months))}`,
            `desde $${fmt(salary)}`,
          ],
          [
            "Inflación acumulada",
            fmtPct(cumInfl),
            `${months} meses al ${inflation}%`,
          ],
          [
            "Variación poder adquisitivo",
            fmtPct(lossPct),
            lossPct >= 0 ? "ganaste poder de compra" : "perdiste poder de compra",
          ],
        ]}
      />
    </InteractiveShell>
  );
}
