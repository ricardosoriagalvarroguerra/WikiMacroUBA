import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";
import { CONCEPTS } from "../data/concepts";

type Filter = "todos" | "core";

export default function Concepts() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("todos");

  const grouped = useMemo(() => {
    const filtered = CONCEPTS.filter((c) => {
      const matchesQuery =
        c.title.toLowerCase().includes(q.toLowerCase()) ||
        c.short.toLowerCase().includes(q.toLowerCase()) ||
        c.category.toLowerCase().includes(q.toLowerCase());
      const matchesFilter = filter === "todos" || c.level === "core";
      return matchesQuery && matchesFilter;
    });
    return filtered.reduce<Record<string, typeof CONCEPTS>>((acc, c) => {
      (acc[c.category] ||= []).push(c);
      return acc;
    }, {});
  }, [q, filter]);

  return (
    <>
      <PageHeader
        eyebrow="Macro desde cero"
        title="Conceptos básicos"
        subtitle="Definiciones simples, ejemplos cotidianos, fórmulas y errores comunes."
      />

      <Callout title="Cómo leer esta lista">
        Los conceptos marcados como <strong>núcleo mínimo</strong> son los
        imprescindibles para arrancar. El resto sirve para profundizar y se puede
        ir leyendo en cualquier orden, una vez sólido el núcleo.
      </Callout>

      <div className="mt-8 mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar concepto…"
          className="flex-1 border-b border-neutral-300 focus:border-neutral-900 outline-none px-1 py-2 text-sm bg-transparent"
        />
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setFilter("todos")}
            className={`px-3 py-1.5 rounded border transition ${
              filter === "todos"
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white border-neutral-300 text-neutral-700 hover:border-neutral-500"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("core")}
            className={`px-3 py-1.5 rounded border transition ${
              filter === "core"
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white border-neutral-300 text-neutral-700 hover:border-neutral-500"
            }`}
          >
            Solo núcleo mínimo
          </button>
        </div>
      </div>

      {Object.entries(grouped).map(([cat, list]) => (
        <section key={cat} className="mb-10">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
            {cat}
          </h2>
          <ul className="border-t border-neutral-200 divide-y divide-neutral-200">
            {list.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/conceptos/${c.slug}`}
                  className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1.5 md:gap-6 py-3 group"
                >
                  <span className="flex items-baseline gap-2">
                    <span className="font-serif text-base text-neutral-900 group-hover:underline underline-offset-4">
                      {c.title}
                    </span>
                    {c.level === "core" && (
                      <span className="text-[9px] uppercase tracking-[0.18em] text-neutral-500 border border-neutral-300 rounded px-1.5 py-0.5">
                        núcleo
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-neutral-500 md:text-right max-w-2xl md:max-w-md">
                    {c.short}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
