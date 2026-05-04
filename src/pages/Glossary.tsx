import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { GLOSSARY } from "../data/glossary";

export default function Glossary() {
  const [q, setQ] = useState("");

  const grouped = useMemo(() => {
    const filtered = GLOSSARY.filter(
      (g) =>
        g.term.toLowerCase().includes(q.toLowerCase()) ||
        g.definition.toLowerCase().includes(q.toLowerCase()),
    );
    return filtered.reduce<Record<string, typeof GLOSSARY>>((acc, g) => {
      const letter = g.term[0].toUpperCase();
      (acc[letter] ||= []).push(g);
      return acc;
    }, {});
  }, [q]);

  return (
    <>
      <PageHeader
        eyebrow="Términos clave"
        title="Glosario"
        subtitle="Términos macroeconómicos básicos en lenguaje simple."
      />

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar término…"
        className="w-full border-b border-neutral-300 focus:border-neutral-900 outline-none px-1 py-2 mb-8 text-sm bg-transparent"
      />

      {Object.keys(grouped)
        .sort()
        .map((letter) => (
          <section key={letter} className="mb-8">
            <h2 className="font-serif text-2xl text-neutral-300 mb-2">
              {letter}
            </h2>
            <ul className="border-t border-neutral-200 divide-y divide-neutral-200">
              {grouped[letter].map((g) => (
                <li key={g.term} className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-3">
                    <div className="flex-1">
                      <div className="font-serif text-base text-neutral-900">
                        {g.term}
                      </div>
                      <div className="text-sm text-neutral-700 mt-1">
                        {g.definition}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1 italic">
                        Ejemplo: {g.example}
                      </div>
                    </div>
                    {g.link && (
                      <Link
                        to={g.link}
                        className="text-xs text-neutral-500 hover:text-neutral-900 sm:whitespace-nowrap"
                      >
                        ver más →
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </>
  );
}
