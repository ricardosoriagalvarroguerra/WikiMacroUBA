import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import InteractiveShell from "./InteractiveShell";
import { Controls, Slider } from "./Common";

export default function BusinessCycle() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [trendG, setTrendG] = useState(0.5); // points per quarter
  const [amplitude, setAmplitude] = useState(7);
  const [period, setPeriod] = useState(20); // quarters per cycle

  const data = useMemo(() => {
    const trend: { x: number; y: number }[] = [];
    const cycle: { x: number; y: number }[] = [];
    for (let t = 0; t <= 40; t++) {
      const tr = 100 + t * trendG;
      trend.push({ x: t, y: tr });
      cycle.push({
        x: t,
        y: tr + amplitude * Math.sin((t / period) * Math.PI * 2),
      });
    }
    return { trend, cycle };
  }, [trendG, amplitude, period]);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 640,
      height = 320,
      margin = { top: 16, right: 20, bottom: 38, left: 56 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([0, 40]).range([0, innerW]);
    const allY = [...data.cycle, ...data.trend].map((d) => d.y);
    const yMin = Math.min(...allY) - 5;
    const yMax = Math.max(...allY) + 5;
    const y = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // gridlines
    g.append("g")
      .selectAll("line")
      .data(y.ticks(5))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", "#f1f1f1");

    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(8))
      .call((sel) =>
        sel.selectAll("text").attr("font-size", 10).attr("fill", "#666"),
      )
      .call((sel) => sel.selectAll("line, path").attr("stroke", "#d4d4d4"));

    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .call((sel) =>
        sel.selectAll("text").attr("font-size", 10).attr("fill", "#666"),
      )
      .call((sel) => sel.selectAll("line, path").attr("stroke", "#d4d4d4"));

    g.append("text")
      .attr("x", innerW / 2)
      .attr("y", innerH + 30)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", "#888")
      .text("Trimestres");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerH / 2)
      .attr("y", -42)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", "#888")
      .text("PIB (índice)");

    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(d3.curveMonotoneX);

    // shaded area between cycle and trend (recession highlights)
    const recessionAreas = d3.range(0, 40).filter((t) => {
      const c = data.cycle[t]?.y;
      const tr = data.trend[t]?.y;
      return c !== undefined && tr !== undefined && c < tr;
    });
    if (recessionAreas.length) {
      const area = d3
        .area<number>()
        .x((i) => x(i))
        .y0((i) => y(data.trend[i].y))
        .y1((i) => y(data.cycle[i].y));
      g.append("path")
        .datum(recessionAreas)
        .attr("fill", "#dc2626")
        .attr("fill-opacity", 0.08)
        .attr("d", area);
    }

    g.append("path")
      .datum(data.trend)
      .attr("fill", "none")
      .attr("stroke", "#9ca3af")
      .attr("stroke-dasharray", "4 3")
      .attr("stroke-width", 1.4)
      .attr("d", line);

    g.append("path")
      .datum(data.cycle)
      .attr("fill", "none")
      .attr("stroke", "#111111")
      .attr("stroke-width", 1.8)
      .attr("d", line);

    // mark phases at peaks/troughs of latest visible cycle
    const peaks: { x: number; label: string }[] = [];
    for (let t = 1; t < 39; t++) {
      const prev = data.cycle[t - 1].y - data.trend[t - 1].y;
      const cur = data.cycle[t].y - data.trend[t].y;
      const next = data.cycle[t + 1].y - data.trend[t + 1].y;
      if (cur > prev && cur > next) peaks.push({ x: t, label: "Pico" });
      if (cur < prev && cur < next) peaks.push({ x: t, label: "Valle" });
    }
    peaks.slice(0, 4).forEach((p) => {
      const c = data.cycle[p.x];
      g.append("circle")
        .attr("cx", x(c.x))
        .attr("cy", y(c.y))
        .attr("r", 3)
        .attr("fill", "#111111");
      g.append("text")
        .attr("x", x(c.x))
        .attr("y", y(c.y) - 8)
        .attr("text-anchor", "middle")
        .attr("font-size", 10)
        .attr("fill", "#444")
        .text(p.label);
    });

    // Legend (top-left, inside chart area)
    const legend = g.append("g").attr("transform", "translate(8, 8)");
    const legendItems: {
      type: "line" | "dashed" | "swatch";
      color: string;
      label: string;
    }[] = [
      { type: "line", color: "#111111", label: "PIB efectivo" },
      { type: "dashed", color: "#9ca3af", label: "Tendencia" },
      { type: "swatch", color: "#dc2626", label: "Recesión" },
    ];
    legendItems.forEach((item, i) => {
      const row = legend.append("g").attr("transform", `translate(0, ${i * 14})`);
      if (item.type === "swatch") {
        row
          .append("rect")
          .attr("x", 0)
          .attr("y", -7)
          .attr("width", 14)
          .attr("height", 8)
          .attr("fill", item.color)
          .attr("fill-opacity", 0.18);
      } else {
        row
          .append("line")
          .attr("x1", 0)
          .attr("x2", 14)
          .attr("y1", -3)
          .attr("y2", -3)
          .attr("stroke", item.color)
          .attr("stroke-width", item.type === "dashed" ? 1.4 : 1.8)
          .attr("stroke-dasharray", item.type === "dashed" ? "4 3" : "0");
      }
      row
        .append("text")
        .attr("x", 20)
        .attr("y", 0)
        .attr("font-size", 10)
        .attr("fill", "#444")
        .text(item.label);
    });
  }, [data]);

  return (
    <InteractiveShell
      title="Ciclo económico: tendencia vs ciclo"
      goal="Visualizar la diferencia entre crecimiento de tendencia y fluctuaciones cíclicas."
      variables={["Pendiente de la tendencia", "Amplitud del ciclo", "Período (duración)"]}
      observe="El área roja sombreada marca recesiones (PIB por debajo de la tendencia)."
      interpretation="La macro estudia tanto el crecimiento (tendencia, líneas largas) como el ciclo (oscilaciones, corto plazo)."
    >
      <Controls cols={3}>
        <Slider
          label="Tendencia"
          value={trendG}
          min={-0.5}
          max={1.5}
          step={0.1}
          onChange={setTrendG}
          format={(v) => `${v.toFixed(1)}/q`}
          hint="puntos índice por trimestre"
        />
        <Slider
          label="Amplitud del ciclo"
          value={amplitude}
          min={0}
          max={20}
          step={0.5}
          onChange={setAmplitude}
          format={(v) => `±${v.toFixed(1)}`}
        />
        <Slider
          label="Período"
          value={period}
          min={5}
          max={40}
          step={1}
          onChange={setPeriod}
          format={(v) => `${v} q`}
          hint="trimestres por ciclo"
        />
      </Controls>
      <svg ref={ref} className="w-full h-auto" />
    </InteractiveShell>
  );
}
