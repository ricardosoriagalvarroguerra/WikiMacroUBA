export function fmt(n: number, digits = 0) {
  return new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: digits,
  }).format(n);
}

export function fmtPct(n: number, digits = 1) {
  return `${n >= 0 ? "" : "−"}${Math.abs(n).toFixed(digits)}%`;
}
