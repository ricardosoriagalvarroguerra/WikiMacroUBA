import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";
import { CONCEPTS } from "../data/concepts";
import { GLOSSARY } from "../data/glossary";
import { BlockMath } from "react-katex";

export default function ConceptDetail() {
  const { slug } = useParams();
  const c = CONCEPTS.find((x) => x.slug === slug);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!c) {
    return (
      <div>
        <p>Concepto no encontrado.</p>
        <Link to="/conceptos" className="underline">
          Volver a Conceptos
        </Link>
      </div>
    );
  }

  const idx = CONCEPTS.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? CONCEPTS[idx - 1] : null;
  const next = idx < CONCEPTS.length - 1 ? CONCEPTS[idx + 1] : null;

  const relatedDefinitions = (c.relatedTerms ?? [])
    .map((term) => GLOSSARY.find((g) => g.term.toLowerCase() === term.toLowerCase()))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <>
      <Link
        to="/conceptos"
        className="text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← Conceptos
      </Link>
      <div className="mt-4" />
      <PageHeader eyebrow={c.category} title={c.title} subtitle={c.short} />

      {c.level === "core" && (
        <div className="-mt-4 mb-8">
          <span className="inline-block text-[10px] uppercase tracking-[0.18em] px-2 py-1 bg-neutral-900 text-white rounded">
            Núcleo mínimo
          </span>
        </div>
      )}

      <div className="prose-wiki">
        {c.plainDefinition && (
          <>
            <h2>En palabras simples</h2>
            <p>{c.plainDefinition}</p>
          </>
        )}

        <h2>{c.plainDefinition ? "Definición técnica" : "Definición"}</h2>
        <p>{c.definition}</p>

        <h2>Ejemplo cotidiano</h2>
        <p>{c.everydayExample}</p>

        <h2>Ejemplo económico</h2>
        <p>{c.economicExample}</p>

        {c.formula && (
          <>
            <h2>Fórmula</h2>
            <div className="bg-neutral-50 border border-neutral-200 rounded p-3 my-2 overflow-x-auto">
              <BlockMath math={toLatex(c.formula)} />
            </div>
            {c.formulaLegend && c.formulaLegend.length > 0 && (
              <div className="mt-3 text-sm">
                <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-2">
                  Qué significa cada símbolo
                </div>
                <ul className="space-y-1">
                  {c.formulaLegend.map((s) => (
                    <li key={s.symbol} className="flex gap-3">
                      <code className="font-mono text-neutral-900 shrink-0 min-w-[5rem]">
                        {s.symbol}
                      </code>
                      <span className="text-neutral-700">{s.meaning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <h2>Interpretación intuitiva</h2>
        <p>{c.intuition}</p>

        <Callout title="Error frecuente">{c.commonMistake}</Callout>

        <Callout title="Pregunta de repaso">
          <p>{c.reviewQuestion}</p>
          {c.reviewAnswer && (
            <>
              <button
                onClick={() => setShowAnswer((v) => !v)}
                className="mt-3 text-xs uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-900 underline-offset-2 underline decoration-neutral-300"
              >
                {showAnswer ? "Ocultar respuesta" : "Ver respuesta"}
              </button>
              {showAnswer && (
                <p className="mt-3 pt-3 border-t border-neutral-200 text-neutral-800">
                  {c.reviewAnswer}
                </p>
              )}
            </>
          )}
        </Callout>

        {c.legalAngle && (
          <aside className="my-8 border border-neutral-300 rounded-md p-5 bg-neutral-50">
            <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-2">
              Mirada desde el derecho · {c.legalAngle.title}
            </div>
            <p className="text-sm text-neutral-800 leading-relaxed">
              {c.legalAngle.body}
            </p>
          </aside>
        )}

        {relatedDefinitions.length > 0 && (
          <section className="mt-10 pt-6 border-t border-neutral-200">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
              Términos del glosario que aparecen
            </h2>
            <ul className="space-y-3 text-sm">
              {relatedDefinitions.map((g) => (
                <li key={g.term} className="flex flex-col sm:flex-row sm:gap-3">
                  <span className="font-serif text-neutral-900 sm:min-w-[10rem] sm:shrink-0">
                    {g.term}
                  </span>
                  <span className="text-neutral-700">{g.definition}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-12 pt-6 border-t border-neutral-200 text-sm max-w-3xl">
        {prev ? (
          <Link
            to={`/conceptos/${prev.slug}`}
            className="text-neutral-500 hover:text-neutral-900"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/conceptos/${next.slug}`}
            className="text-neutral-500 hover:text-neutral-900 sm:text-right"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </>
  );
}

function toLatex(s: string) {
  return s
    .replace(/·/g, "\\cdot ")
    .replace(/Δ/g, "\\Delta ")
    .replace(/π/g, "\\pi ")
    .replace(/≥/g, "\\ge ")
    .replace(/≤/g, "\\le ")
    .replace(/∞/g, "\\infty ");
}
