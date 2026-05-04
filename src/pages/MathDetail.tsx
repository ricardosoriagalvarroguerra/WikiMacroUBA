import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";
import { MATH } from "../data/math";

export default function MathDetail() {
  const { slug } = useParams();
  const m = MATH.find((x) => x.slug === slug);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!m) {
    return (
      <div>
        <p>Tema no encontrado.</p>
        <Link to="/matematica" className="underline">
          Volver a Matemática
        </Link>
      </div>
    );
  }

  const idx = MATH.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? MATH[idx - 1] : null;
  const next = idx < MATH.length - 1 ? MATH[idx + 1] : null;

  return (
    <>
      <Link
        to="/matematica"
        className="text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← Matemática
      </Link>
      <div className="mt-4" />
      <PageHeader title={m.title} subtitle={m.short} />

      <div className="prose-wiki">
        <h2>Explicación</h2>
        <p>{m.explanation}</p>

        <h2>Fórmula</h2>
        <div className="bg-neutral-50 border border-neutral-200 rounded p-3 font-mono text-sm overflow-x-auto">
          {m.formula}
        </div>

        <h2>Ejemplo paso a paso</h2>
        <p>
          <strong className="text-neutral-900">{m.worked.problem}</strong>
        </p>
        <ol>
          {m.worked.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p className="text-neutral-900">Resultado: {m.worked.answer}</p>

        <h2>Ejercicio</h2>
        <Callout title="Practicá">{m.practice.problem}</Callout>
        <button
          className="btn-secondary mt-2"
          onClick={() => setShowAnswer((v) => !v)}
        >
          {showAnswer ? "Ocultar respuesta" : "Ver respuesta"}
        </button>
        {showAnswer && (
          <Callout title="Respuesta">{m.practice.answer}</Callout>
        )}

        <h2>Interpretación económica</h2>
        <p>{m.interpretation}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-12 pt-6 border-t border-neutral-200 text-sm max-w-3xl">
        {prev ? (
          <Link
            to={`/matematica/${prev.slug}`}
            className="text-neutral-500 hover:text-neutral-900"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/matematica/${next.slug}`}
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
