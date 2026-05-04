import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";
import { CLASSES } from "../data/classes";

export default function ClassDetail() {
  const { id } = useParams();
  const cls = CLASSES.find((c) => c.id === id);
  const [open, setOpen] = useState<Record<number, boolean>>({});

  if (!cls) {
    return (
      <div>
        <p>Clase no encontrada.</p>
        <Link to="/clases" className="underline">
          Volver a Clases
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link
        to="/clases"
        className="text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← Clases
      </Link>
      <div className="mt-4" />
      <PageHeader
        eyebrow={`Clase ${cls.number}`}
        title={cls.title.replace(/^Clase \d+ · /, "")}
        subtitle={
          cls.status === "publicada"
            ? "Material disponible"
            : "Material en preparación"
        }
      />

      {cls.status === "proximamente" ? (
        <Callout>Próximamente subimos el material y los recursos asociados a esta clase.</Callout>
      ) : (
        <>
          {cls.link && (
            <div className="max-w-4xl border border-neutral-200 rounded-md p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                  Material principal
                </div>
                <div className="text-sm text-neutral-700 break-all mt-1">
                  {cls.link}
                </div>
              </div>
              <a
                href={cls.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Abrir clase ↗
              </a>
            </div>
          )}

          <div className="prose-wiki mt-8">
            <h2>Resumen</h2>
            <p>{cls.summary}</p>

            <h2>Conceptos clave</h2>
            <ul>
              {cls.keyConcepts.map((k) => (
                <li key={k.slug}>
                  <Link to={`/conceptos/${k.slug}`}>{k.label}</Link>
                </li>
              ))}
            </ul>

            <h2>Preguntas de repaso</h2>
          </div>

          <ol className="mt-2 space-y-4 max-w-3xl">
            {cls.reviewQuestions.map((rq, i) => (
              <li key={i} className="border-l-2 border-neutral-200 pl-4">
                <p className="text-sm text-neutral-800">
                  <span className="font-mono text-xs text-neutral-400 mr-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {rq.q}
                </p>
                {rq.a && (
                  <>
                    <button
                      onClick={() =>
                        setOpen((o) => ({ ...o, [i]: !o[i] }))
                      }
                      className="mt-2 text-[10px] uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-900"
                    >
                      {open[i] ? "Ocultar respuesta" : "Ver respuesta"}
                    </button>
                    {open[i] && (
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                        {rq.a}
                      </p>
                    )}
                  </>
                )}
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
