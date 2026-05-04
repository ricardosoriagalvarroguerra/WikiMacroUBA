import { useEffect, useRef } from "react";
import * as d3 from "d3";

export type SeriesPoint = { x: number; y: number };
export type Series = {
  name: string;
  color: string;
  data: SeriesPoint[];
  dashed?: boolean;
};

type Props = {
  series: Series[];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  yFormat?: (n: number) => string;
  xFormat?: (n: number) => string;
  scale?: "linear" | "log";
  referenceY?: { value: number; label?: string };
  referenceYs?: { value: number; label?: string }[];
  fillBetween?: boolean;
  yMinForce?: number;
};

export default function D3LineChart({
  series,
  width = 640,
  height = 320,
  xLabel,
  yLabel,
  yFormat,
  xFormat,
  scale = "linear",
  referenceY,
  referenceYs,
  fillBetween = false,
  yMinForce,
}: Props) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 16, right: 20, bottom: 38, left: 60 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const all = series.flatMap((s) => s.data);
    if (all.length === 0) return;

    const xExt = d3.extent(all, (d) => d.x) as [number, number];
    const x = d3.scaleLinear().domain(xExt).range([0, innerW]);

    const yMaxRaw = d3.max(all, (d) => d.y) ?? 1;
    const yMinRaw = d3.min(all, (d) => d.y) ?? 0;

    let y: d3.ScaleContinuousNumeric<number, number>;
    if (scale === "log") {
      const yMin = Math.max(yMinRaw, 0.0001);
      y = d3.scaleLog().domain([yMin, yMaxRaw * 1.1]).range([innerH, 0]);
    } else {
      const yMin = yMinForce ?? Math.min(0, yMinRaw);
      y = d3.scaleLinear().domain([yMin, yMaxRaw * 1.05]).nice().range([innerH, 0]);
    }

    const root = svg.attr("viewBox", `0 0 ${width} ${height}`);
    const g = root
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Gridlines
    const yTicks = (y as d3.ScaleLinear<number, number>).ticks
      ? (y as d3.ScaleLinear<number, number>).ticks(5)
      : (y as d3.ScaleLogarithmic<number, number>).ticks(5);

    g.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(yTicks)
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", "#f1f1f1")
      .attr("stroke-width", 1);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(6)
          .tickFormat((d) => (xFormat ? xFormat(+d) : d3.format("d")(+d))),
      )
      .call((sel) =>
        sel.selectAll("text").attr("font-size", 10).attr("fill", "#666"),
      )
      .call((sel) => sel.selectAll("line, path").attr("stroke", "#d4d4d4"));

    g.append("g")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => (yFormat ? yFormat(+d) : d3.format(",.0f")(+d))),
      )
      .call((sel) =>
        sel.selectAll("text").attr("font-size", 10).attr("fill", "#666"),
      )
      .call((sel) => sel.selectAll("line, path").attr("stroke", "#d4d4d4"));

    if (xLabel) {
      g.append("text")
        .attr("x", innerW / 2)
        .attr("y", innerH + 30)
        .attr("text-anchor", "middle")
        .attr("font-size", 10)
        .attr("fill", "#888")
        .text(xLabel);
    }
    if (yLabel) {
      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerH / 2)
        .attr("y", -46)
        .attr("text-anchor", "middle")
        .attr("font-size", 10)
        .attr("fill", "#888")
        .text(yLabel);
    }

    // Reference line(s)
    const refs: { value: number; label?: string }[] = [];
    if (referenceY) refs.push(referenceY);
    if (referenceYs) refs.push(...referenceYs);
    refs.forEach((ref) => {
      g.append("line")
        .attr("x1", 0)
        .attr("x2", innerW)
        .attr("y1", y(ref.value))
        .attr("y2", y(ref.value))
        .attr("stroke", "#9ca3af")
        .attr("stroke-dasharray", "3 3")
        .attr("stroke-width", 1);
      if (ref.label) {
        g.append("text")
          .attr("x", innerW - 4)
          .attr("y", y(ref.value) - 4)
          .attr("text-anchor", "end")
          .attr("font-size", 10)
          .attr("fill", "#6b7280")
          .text(ref.label);
      }
    });

    const line = d3
      .line<SeriesPoint>()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(d3.curveMonotoneX);

    // Fill between (assumes 2 series)
    if (fillBetween && series.length === 2) {
      const a = series[0].data;
      const b = series[1].data;
      const n = Math.min(a.length, b.length);
      const area = d3
        .area<number>()
        .x((i) => x(a[i].x))
        .y0((i) => y(a[i].y))
        .y1((i) => y(b[i].y))
        .curve(d3.curveMonotoneX);
      g.append("path")
        .datum(d3.range(n))
        .attr("fill", "#111111")
        .attr("fill-opacity", 0.05)
        .attr("d", area);
    }

    series.forEach((s) => {
      g.append("path")
        .datum(s.data)
        .attr("fill", "none")
        .attr("stroke", s.color)
        .attr("stroke-width", 1.8)
        .attr("stroke-dasharray", s.dashed ? "5 4" : "0")
        .attr("d", line);
    });

    // Legend
    if (series.length > 1) {
      const legend = g
        .append("g")
        .attr("transform", `translate(${innerW - 160}, 4)`);
      series.forEach((s, i) => {
        const row = legend
          .append("g")
          .attr("transform", `translate(0, ${i * 16})`);
        row
          .append("line")
          .attr("x1", 0)
          .attr("x2", 14)
          .attr("y1", 6)
          .attr("y2", 6)
          .attr("stroke", s.color)
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", s.dashed ? "4 3" : "0");
        row
          .append("text")
          .attr("x", 18)
          .attr("y", 9)
          .attr("font-size", 10)
          .attr("fill", "#444")
          .text(s.name);
      });
    }

    // Tooltip overlay
    const tooltip = g.append("g").style("display", "none");
    const vline = tooltip
      .append("line")
      .attr("y1", 0)
      .attr("y2", innerH)
      .attr("stroke", "#9ca3af")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2 2");
    const dots: d3.Selection<SVGCircleElement, unknown, null, undefined>[] =
      series.map((s) =>
        tooltip
          .append("circle")
          .attr("r", 4)
          .attr("fill", "#fff")
          .attr("stroke", s.color)
          .attr("stroke-width", 2),
      );
    const box = tooltip
      .append("g")
      .attr("transform", "translate(8, 8)");
    const boxBg = box
      .append("rect")
      .attr("rx", 3)
      .attr("fill", "#111111")
      .attr("fill-opacity", 0.9);
    const xLabelText = box
      .append("text")
      .attr("x", 8)
      .attr("y", 14)
      .attr("font-size", 10)
      .attr("fill", "#fff")
      .attr("font-weight", 600);
    const yTexts = series.map((s, i) =>
      box
        .append("text")
        .attr("x", 8)
        .attr("y", 28 + i * 12)
        .attr("font-size", 10)
        .attr("fill", s.color === "#111111" ? "#fff" : s.color),
    );

    g.append("rect")
      .attr("width", innerW)
      .attr("height", innerH)
      .attr("fill", "transparent")
      .style("cursor", "crosshair")
      .on("mouseenter", () => tooltip.style("display", null))
      .on("mouseleave", () => tooltip.style("display", "none"))
      .on("mousemove", (event) => {
        const [mx] = d3.pointer(event);
        const xv = x.invert(mx);
        // find nearest x for first series
        const ref = series[0].data;
        const i = d3.bisector<SeriesPoint, number>((d) => d.x).left(ref, xv);
        const i0 = Math.max(0, Math.min(ref.length - 1, i));
        const i1 = Math.max(0, Math.min(ref.length - 1, i - 1));
        const idx =
          Math.abs((ref[i0]?.x ?? 0) - xv) < Math.abs((ref[i1]?.x ?? 0) - xv)
            ? i0
            : i1;

        const xVal = ref[idx].x;
        vline.attr("x1", x(xVal)).attr("x2", x(xVal));
        xLabelText.text(xFormat ? xFormat(xVal) : `x = ${xVal}`);

        series.forEach((s, j) => {
          const pt = s.data[Math.min(idx, s.data.length - 1)];
          if (!pt) return;
          dots[j].attr("cx", x(pt.x)).attr("cy", y(pt.y));
          yTexts[j].text(
            `${s.name}: ${yFormat ? yFormat(pt.y) : d3.format(",.0f")(pt.y)}`,
          );
        });

        // size bg
        const labels = [xLabelText.node()!, ...yTexts.map((t) => t.node()!)];
        const maxW = Math.max(
          ...labels.map((n) => (n as SVGTextElement).getComputedTextLength()),
        );
        const h = 22 + series.length * 12;
        boxBg.attr("width", maxW + 16).attr("height", h);

        // flip if too far right
        const flip = mx > innerW - (maxW + 32);
        box.attr(
          "transform",
          `translate(${flip ? mx - (maxW + 24) : mx + 12}, 8)`,
        );
      });
  }, [series, width, height, xLabel, yLabel, yFormat, xFormat, scale, referenceY, referenceYs, fillBetween, yMinForce]);

  return <svg ref={ref} className="block w-full h-auto" />;
}
