import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";

type Question = {
  id: string;
  q: string;
  author: string;
  createdAt: string;
};

const AUTHOR_KEY = "wiki-macro:author";

const FAQs: { q: string; a: React.ReactNode }[] = [
  {
    q: "¿Cuál es la diferencia entre nominal y real?",
    a: (
      <p>
        Nominal está expresado en pesos del momento (incluye precios). Real
        descuenta el efecto de la inflación para mostrar la magnitud "física"
        o de poder de compra. Más en{" "}
        <Link to="/conceptos/pib-nominal-vs-real">PIB nominal vs real</Link>.
      </p>
    ),
  },
  {
    q: "¿Por qué ahorrar puede ser malo para la economía agregada?",
    a: (
      <p>
        Es la <em>paradoja del ahorro</em>: si todos ahorran a la vez, cae el
        consumo, las empresas venden menos y bajan los ingresos del conjunto.
      </p>
    ),
  },
  {
    q: "Si el Banco Central 'imprime', ¿siempre hay inflación?",
    a: (
      <p>
        No siempre, pero el riesgo crece cuando la emisión supera a la demanda
        de dinero o cuando ya hay expectativas inflacionarias.
      </p>
    ),
  },
  {
    q: "¿Qué es la tasa real y cómo la calculo?",
    a: (
      <p>
        Es la tasa nominal descontada por la inflación. Aproximada:
        <code> r ≈ i − π</code>. Precisa: <code>1 + r = (1 + i) / (1 + π)</code>.
      </p>
    ),
  },
  {
    q: "¿Por qué en Argentina hablan de varios dólares?",
    a: (
      <p>
        Por los controles cambiarios coexisten distintas paridades: oficial,
        MEP, CCL, blue. La diferencia entre ellos se llama brecha cambiaria.
        Más en <Link to="/conceptos/tipo-de-cambio">Tipo de cambio</Link>.
      </p>
    ),
  },
  {
    q: "¿Qué diferencia hay entre déficit fiscal y deuda pública?",
    a: (
      <p>
        El déficit es un <em>flujo</em> (cuánto le falta al Estado en un
        período). La deuda es un <em>stock</em> (cuánto debe acumulado).
      </p>
    ),
  },
  {
    q: "¿Por qué medimos la deuda como % del PIB y no en USD?",
    a: (
      <p>
        Porque el PIB es la capacidad de generar ingresos del país: una misma
        deuda pesa muy distinto en economías de distinto tamaño.
      </p>
    ),
  },
  {
    q: "¿Por qué la suba salarial nominal no siempre mejora la vida real?",
    a: (
      <p>
        Lo que importa es el salario <strong>real</strong>: tu sueldo en
        relación con los precios. Probá el{" "}
        <Link to="/interactivos">simulador de inflación</Link>.
      </p>
    ),
  },
];

export default function FAQ() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [draft, setDraft] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(AUTHOR_KEY);
    if (stored) setAuthor(stored);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/faq");
        if (!r.ok) throw new Error();
        const data: Question[] = await r.json();
        if (!cancelled) setQuestions(data);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: draft.trim(), author: author.trim() }),
      });
      if (!r.ok) throw new Error();
      const created: Question = await r.json();
      setQuestions((prev) => [created, ...prev]);
      if (author.trim()) localStorage.setItem(AUTHOR_KEY, author.trim());
      setDraft("");
    } catch {
      setError("No se pudo guardar la pregunta.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Espacio de consulta"
        title="Dudas y preguntas frecuentes"
        subtitle="Anotá tus dudas y revisá las preguntas que más se repiten. Las preguntas se comparten con toda la cátedra."
      />

      <Callout>
        Las preguntas se guardan en el servidor y son visibles para todos.
        Más abajo hay un compendio de FAQs con respuestas breves.
      </Callout>

      <form onSubmit={submit} className="my-10 grid gap-4 max-w-3xl">
        <label className="block text-sm">
          <span className="block text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-1">
            Tu nombre (opcional)
          </span>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Nombre Apellido"
            className="w-full border-b border-neutral-300 focus:border-neutral-900 outline-none px-1 py-1.5 bg-transparent"
          />
        </label>
        <label className="block text-sm">
          <span className="block text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-1">
            Tu pregunta
          </span>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder="¿Qué no entendiste? ¿Qué querés profundizar?"
            className="w-full border border-neutral-200 rounded px-3 py-2 focus:border-neutral-900 outline-none text-sm"
          />
        </label>
        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}
        <div>
          <button
            type="submit"
            className="btn"
            disabled={!draft.trim() || submitting}
          >
            {submitting ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </form>

      {questions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Preguntas de la cátedra
          </h2>
          <ul className="border-t border-neutral-200 divide-y divide-neutral-200">
            {questions.map((q) => (
              <li key={q.id} className="py-4">
                <div className="text-xs text-neutral-400 flex gap-3">
                  <span>{q.createdAt}</span>
                  {q.author && (
                    <span className="text-neutral-700">{q.author}</span>
                  )}
                </div>
                <div className="text-sm text-neutral-800 mt-1">{q.q}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
        Preguntas frecuentes
      </h2>
      <div className="border-t border-neutral-200 divide-y divide-neutral-200">
        {FAQs.map((f, i) => (
          <details key={i} className="py-4 group">
            <summary className="font-serif text-base cursor-pointer text-neutral-900 list-none flex justify-between items-start gap-4">
              <span>{f.q}</span>
              <span className="text-neutral-400 text-sm shrink-0 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <div className="prose-wiki mt-3 text-sm">{f.a}</div>
          </details>
        ))}
      </div>
    </>
  );
}
