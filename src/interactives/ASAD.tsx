import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import InteractiveShell from "./InteractiveShell";
import { fmtPct } from "./format";

type Shock = "ninguno" | "demanda+" | "demanda-" | "oferta+" | "oferta-";

type Segment = [[number, number], [number, number]];

const DA_BASE: Segment = [
  [15, 90],
  [85, 10],
];
const OA_BASE: Segment = [
  [15, 15],
  [85, 85],
];

const SHOCK_INFO: Record<
  Shock,
  { label: string; desc: string; da: Segment; oa: Segment }
> = {
  ninguno: {
    label: "Equilibrio",
    desc: "Sin shock: PIB y precios constantes.",
    da: DA_BASE,
    oa: OA_BASE,
  },
  "demanda+": {
    label: "Demanda +",
    desc: "Sube el gasto público / consumo. La DA se desplaza a la derecha → suben PIB y precios.",
    da: [
      [25, 90],
      [95, 10],
    ],
    oa: OA_BASE,
  },
  "demanda-": {
    label: "Demanda −",
    desc: "Cae el consumo o las exportaciones. La DA se desplaza a la izquierda → caen PIB y precios.",
    da: [
      [5, 90],
      [75, 10],
    ],
    oa: OA_BASE,
  },
  "oferta+": {
    label: "Oferta +",
    desc: "Mejora de productividad o caída de costos. La OA se desplaza a la derecha → sube PIB, bajan precios.",
    da: DA_BASE,
    oa: [
      [25, 15],
      [95, 85],
    ],
  },
  "oferta-": {
    label: "Oferta −",
    desc: "Suba del petróleo, sequía. La OA se desplaza a la izquierda → cae PIB, suben precios (estanflación).",
    da: DA_BASE,
    oa: [
      [5, 15],
      [75, 85],
    ],
  },
};

function intersect(a: Segment, b: Segment): [number, number] | null {
  const [[x1, y1], [x2, y2]] = a;
  const [[x3, y3], [x4, y4]] = b;
  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denom) < 1e-9) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
  return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
}

function midpoint(seg: Segment): [number, number] {
  return [(seg[0][0] + seg[1][0]) / 2, (seg[0][1] + seg[1][1]) / 2];
}

export default function ASAD() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [shock, setShock] = useState<Shock>("ninguno");

  const E0 = intersect(DA_BASE, OA_BASE)!;
  const info = SHOCK_INFO[shock];
  const E1 = intersect(info.da, info.oa)!;
  const deltaY = E1[0] - E0[0];
  const deltaP = E1[1] - E0[1];
  const deltaYPct = (deltaY / E0[0]) * 100;
  const deltaPPct = (deltaP / E0[1]) * 100;

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 640,
      height = 360,
      margin = { top: 16, right: 28, bottom: 40, left: 56 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([0, 100]).range([0, innerW]);
    const y = d3.scaleLinear().domain([0, 100]).range([innerH, 0]);

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img")
      .attr(
        "aria-label",
        "Diagrama de oferta y demanda agregada con equilibrio en E0 y, si hay un shock, un nuevo equilibrio E1.",
      );

    // arrowhead marker for shift indicator
    const defs = svg.append("defs");
    defs
      .append("marker")
      .attr("id", "asad-arrow")
      .attr("viewBox", "0 -4 10 8")
      .attr("refX", 8)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-3L8,0L0,3")
      .attr("fill", "#9ca3af");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // axes
    g.append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", innerH)
      .attr("stroke", "#d4d4d4");
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", innerH)
      .attr("y2", innerH)
      .attr("stroke", "#d4d4d4");

    // origin label
    g.append("text")
      .attr("x", -10)
      .attr("y", innerH + 12)
      .attr("font-size", 10)
      .attr("fill", "#9ca3af")
      .text("0");

    g.append("text")
      .attr("x", innerW / 2)
      .attr("y", innerH + 30)
      .attr("text-anchor", "middle")
      .attr("font-size", 11)
      .attr("fill", "#666")
      .text("PIB real (Y) →");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerH / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .attr("font-size", 11)
      .attr("fill", "#666")
      .text("Nivel de precios (P) ↑");

    const drawSegment = (
      seg: Segment,
      color: string,
      label: string,
      dashed = false,
      labelOffset: [number, number] = [4, 4],
    ) => {
      g.append("line")
        .attr("x1", x(seg[0][0]))
        .attr("y1", y(seg[0][1]))
        .attr("x2", x(seg[1][0]))
        .attr("y2", y(seg[1][1]))
        .attr("stroke", color)
        .attr("stroke-width", 1.8)
        .attr("stroke-dasharray", dashed ? "4 3" : "0");
      g.append("text")
        .attr("x", x(seg[1][0]) + labelOffset[0])
        .attr("y", y(seg[1][1]) + labelOffset[1])
        .attr("font-size", 11)
        .attr("font-weight", 600)
        .attr("fill", color)
        .text(label);
    };

    const projectToAxes = (
      px: number,
      py: number,
      color: string,
      xLabel: string,
      yLabel: string,
    ) => {
      g.append("line")
        .attr("x1", 0)
        .attr("x2", x(px))
        .attr("y1", y(py))
        .attr("y2", y(py))
        .attr("stroke", color)
        .attr("stroke-dasharray", "2 3")
        .attr("stroke-opacity", 0.7);
      g.append("line")
        .attr("x1", x(px))
        .attr("x2", x(px))
        .attr("y1", innerH)
        .attr("y2", y(py))
        .attr("stroke", color)
        .attr("stroke-dasharray", "2 3")
        .attr("stroke-opacity", 0.7);
      // axis labels for projections
      g.append("text")
        .attr("x", -8)
        .attr("y", y(py) + 4)
        .attr("text-anchor", "end")
        .attr("font-size", 10)
        .attr("fill", color)
        .text(yLabel);
      g.append("text")
        .attr("x", x(px))
        .attr("y", innerH + 14)
        .attr("text-anchor", "middle")
        .attr("font-size", 10)
        .attr("fill", color)
        .text(xLabel);
    };

    const drawDot = (
      px: number,
      py: number,
      label: string,
      color: string,
      radius = 4,
      labelOffset: [number, number] = [-18, 4],
    ) => {
      g.append("circle")
        .attr("cx", x(px))
        .attr("cy", y(py))
        .attr("r", radius)
        .attr("fill", color);
      g.append("text")
        .attr("x", x(px) + labelOffset[0])
        .attr("y", y(py) + labelOffset[1])
        .attr("font-size", 11)
        .attr("font-weight", 600)
        .attr("fill", color)
        .text(label);
    };

    // base curves (always shown)
    drawSegment(DA_BASE, "#111111", "DA");
    drawSegment(OA_BASE, "#6b7280", "OA");

    // E0 with axis projections
    projectToAxes(E0[0], E0[1], "#9ca3af", "Y₀", "P₀");
    drawDot(E0[0], E0[1], "E₀", "#111111");

    // shifted curve + E1 + shift arrow
    if (shock !== "ninguno") {
      const isDemand = shock.startsWith("demanda");
      const baseCurve = isDemand ? DA_BASE : OA_BASE;
      const newCurve = isDemand ? info.da : info.oa;
      const newColor = isDemand ? "#111111" : "#6b7280";
      const newLabel = isDemand ? "DA'" : "OA'";

      drawSegment(newCurve, newColor, newLabel, true);

      // shift arrow from midpoint of base curve to midpoint of new curve
      const m0 = midpoint(baseCurve);
      const m1 = midpoint(newCurve);
      g.append("line")
        .attr("x1", x(m0[0]))
        .attr("y1", y(m0[1]))
        .attr("x2", x(m1[0]))
        .attr("y2", y(m1[1]))
        .attr("stroke", "#9ca3af")
        .attr("stroke-width", 1.2)
        .attr("marker-end", "url(#asad-arrow)");

      projectToAxes(E1[0], E1[1], "#dc2626", "Y₁", "P₁");
      drawDot(E1[0], E1[1], "E₁", "#dc2626", 4.5);
    }
  }, [shock, E0, E1, info.da, info.oa]);

  return (
    <InteractiveShell
      title="Oferta y demanda agregada"
      goal="Ver cómo distintos shocks mueven el equilibrio entre PIB y precios."
      variables={["Tipo de shock"]}
      observe="Mirá cómo cambian PIB y precios en E₁ vs E₀, según el origen del shock. Las flechas grises indican hacia dónde se desplaza la curva."
      interpretation="Demanda: PIB y precios se mueven en la MISMA dirección. Oferta: en direcciones OPUESTAS (estanflación si la oferta cae). La OA mostrada es de corto plazo; la de largo plazo es vertical."
    >
      <div className="flex flex-wrap gap-2 mb-5">
        {(Object.keys(SHOCK_INFO) as Shock[]).map((k) => (
          <button
            key={k}
            onClick={() => setShock(k)}
            className={`px-3 py-1.5 rounded text-xs border transition ${
              shock === k
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white border-neutral-300 text-neutral-700 hover:border-neutral-500"
            }`}
          >
            {SHOCK_INFO[k].label}
          </button>
        ))}
      </div>

      <p className="text-sm text-neutral-700 mb-3">{info.desc}</p>

      <svg ref={ref} className="w-full h-auto" />

      <div className="grid sm:grid-cols-2 gap-6 mt-6 pt-6 border-t border-neutral-200">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
            Cambio en PIB (Y)
          </div>
          <div
            className={`font-mono text-base mt-1 ${
              deltaY > 0.01
                ? "text-emerald-700"
                : deltaY < -0.01
                  ? "text-red-700"
                  : "text-neutral-900"
            }`}
          >
            {Math.abs(deltaY) < 0.01 ? "—" : fmtPct(deltaYPct)}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
            Cambio en precios (P)
          </div>
          <div
            className={`font-mono text-base mt-1 ${
              deltaP > 0.01
                ? "text-red-700"
                : deltaP < -0.01
                  ? "text-emerald-700"
                  : "text-neutral-900"
            }`}
          >
            {Math.abs(deltaP) < 0.01 ? "—" : fmtPct(deltaPPct)}
          </div>
        </div>
      </div>
    </InteractiveShell>
  );
}
