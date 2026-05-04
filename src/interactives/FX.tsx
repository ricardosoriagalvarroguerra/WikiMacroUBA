import { useState } from "react";
import InteractiveShell from "./InteractiveShell";
import {
  Slider,
  Stats,
  FormulaStep,
  PresetBar,
  MiniBar,
} from "./Common";
import { fmt, fmtPct } from "./format";

const PRESETS = [
  { label: "Devaluación 2023", usd: 365, usdNew: 800, hint: "Diciembre 2023" },
  { label: "Devaluación 2018", usd: 20, usdNew: 38, hint: "Crisis 2018" },
  { label: "Apreciación", usd: 1500, usdNew: 1200, hint: "Peso se fortalece" },
  { label: "Sin cambios", usd: 1000, usdNew: 1000, hint: "Tipo de cambio fijo" },
];

export default function FX() {
  const [usd, setUsd] = useState(1000);
  const [usdNew, setUsdNew] = useState(1300);
  const [importPriceUsd, setImportPriceUsd] = useState(50);
  const [exportPriceUsd, setExportPriceUsd] = useState(20);

  const importOld = importPriceUsd * usd;
  const importNew = importPriceUsd * usdNew;
  const exportOld = exportPriceUsd * usd;
  const exportNew = exportPriceUsd * usdNew;
  const variation = ((usdNew - usd) / usd) * 100;
  // The TC change applies equally to importers and exporters.
  const tcChangePct = variation;
  // Devaluación (variation > 0): importer worse off, exporter better off. Apreciación: opposite.
  const importerLoses = variation > 0;
  const exporterGains = variation > 0;
  const importerNewColor = importerLoses ? "#dc2626" : "#16a34a";
  const exporterNewColor = exporterGains ? "#16a34a" : "#dc2626";

  return (
    <InteractiveShell
      title="Tipo de cambio: efectos sobre importadores y exportadores"
      goal="Ver cómo cambios del dólar (devaluación o apreciación) redistribuyen precios entre importadores y exportadores."
      variables={[
        "Tipo de cambio inicial",
        "Tipo de cambio nuevo",
        "Precio en USD del importado",
        "Precio en USD del exportado",
      ]}
      observe="Las barras comparan el precio en pesos antes y después para un mismo bien."
      interpretation="Suba del dólar (devaluación): importados más caros (presión inflacionaria) y exportadores cobran más pesos (mejora competitividad nominal). Baja del dólar (apreciación): efecto inverso — importados más baratos, exportadores reciben menos pesos."
    >
      <PresetBar
        presets={PRESETS.map((p) => ({ label: p.label, hint: p.hint }))}
        onPick={(i) => {
          const p = PRESETS[i];
          setUsd(p.usd);
          setUsdNew(p.usdNew);
        }}
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-4 mb-6">
        <Slider
          label="USD inicial"
          value={usd}
          min={50}
          max={3000}
          step={50}
          onChange={setUsd}
          format={(v) => `$${v}`}
        />
        <Slider
          label="USD nuevo"
          value={usdNew}
          min={50}
          max={5000}
          step={50}
          onChange={setUsdNew}
          format={(v) => `$${v}`}
        />
        <Slider
          label="Importado USD"
          value={importPriceUsd}
          min={1}
          max={500}
          step={1}
          onChange={setImportPriceUsd}
          format={(v) => `USD ${v}`}
        />
        <Slider
          label="Exportado USD"
          value={exportPriceUsd}
          min={1}
          max={500}
          step={1}
          onChange={setExportPriceUsd}
          format={(v) => `USD ${v}`}
        />
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="border border-neutral-200 rounded p-4">
          <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-3">
            Importador (paga en pesos)
          </div>
          <MiniBar
            values={[importOld, importNew]}
            colors={["#9ca3af", importerNewColor]}
            labels={["Antes", "Después"]}
            format={(v) => `$${fmt(v)}`}
          />
          <p className="text-xs text-neutral-500 mt-3">
            {importerLoses
              ? `${fmtPct(tcChangePct)} de aumento en pesos para el mismo bien (paga más).`
              : `${fmtPct(tcChangePct)} de variación: paga menos pesos por el mismo bien.`}
          </p>
        </div>

        <div className="border border-neutral-200 rounded p-4">
          <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-3">
            Exportador (recibe en pesos)
          </div>
          <MiniBar
            values={[exportOld, exportNew]}
            colors={["#9ca3af", exporterNewColor]}
            labels={["Antes", "Después"]}
            format={(v) => `$${fmt(v)}`}
          />
          <p className="text-xs text-neutral-500 mt-3">
            {exporterGains
              ? `${fmtPct(tcChangePct)} de mejora nominal en pesos por unidad exportada.`
              : `${fmtPct(tcChangePct)} de variación: recibe menos pesos por unidad exportada.`}
          </p>
        </div>
      </div>

      <FormulaStep
        formula="Precio_pesos = Precio_USD · TC"
        steps={[
          `Importado: ${importPriceUsd} · ${usd} = $${fmt(importOld)} → ${importPriceUsd} · ${usdNew} = $${fmt(importNew)}`,
          `Variación TC: (${usdNew} − ${usd}) / ${usd} = ${fmtPct(variation, 1)}`,
        ]}
        result={`${fmtPct(variation, 1)} de devaluación nominal`}
      />

      <Stats
        items={[
          ["Variación del dólar", fmtPct(variation), "nominal"],
          [
            "Impacto en importados",
            fmtPct(tcChangePct),
            importerLoses ? "presión inflacionaria" : "alivio de precios",
          ],
          [
            exporterGains ? "Mejora nominal exportador" : "Pérdida nominal exportador",
            fmtPct(tcChangePct),
            exporterGains ? "competitividad" : "menos pesos por exportar",
          ],
        ]}
      />
    </InteractiveShell>
  );
}
