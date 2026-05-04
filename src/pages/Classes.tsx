import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";
import { CLASSES } from "../data/classes";

export default function Classes() {
  const published = CLASSES.filter((c) => c.status === "publicada");
  const upcoming = CLASSES.filter((c) => c.status === "proximamente");

  return (
    <>
      <PageHeader
        eyebrow="Cursada"
        title="Clases"
        subtitle="Material de cada encuentro: link, resumen, conceptos clave y preguntas de repaso con respuesta."
      />

      {published.length === 0 ? (
        <Callout>Todavía no hay clases publicadas. Próximamente subimos el material.</Callout>
      ) : (
        <ul className="border-t border-neutral-200 divide-y divide-neutral-200">
          {published.map((c) => (
            <li key={c.id}>
              <Link to={`/clases/${c.id}`} className="block py-5 group">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-3">
                  <span className="font-serif text-lg text-neutral-900 group-hover:underline underline-offset-4">
                    {c.title}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                    Publicada
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mt-2 max-w-2xl">
                  {c.summary}
                </p>
                {c.keyConcepts.length > 0 && (
                  <div className="text-xs text-neutral-500 mt-3">
                    {c.keyConcepts.map((k) => k.label).join(" · ")}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {upcoming.length > 0 && (
        <section className="mt-12">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Próximas clases
          </h2>
          <p className="text-sm text-neutral-500">
            {upcoming.length === 1
              ? "Hay 1 clase en preparación."
              : `Hay ${upcoming.length} clases en preparación.`}{" "}
            Se irán publicando a medida que avance la cursada.
          </p>
        </section>
      )}
    </>
  );
}
