import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";

const SECTIONS = [
  { to: "/empezar", title: "Empezá por acá", desc: "Antes de arrancar: cómo leer fórmulas, símbolos y tres ideas que ahorran tiempo." },
  { to: "/ruta", title: "Ruta de aprendizaje", desc: "El orden recomendado si arrancás de cero." },
  { to: "/clases", title: "Clases", desc: "Material de cada clase: link, resumen, conceptos clave y preguntas de repaso." },
  { to: "/conceptos", title: "Conceptos", desc: "Macro desde cero. Filtrá por núcleo mínimo si tenés poco tiempo." },
  { to: "/matematica", title: "Matemática", desc: "Porcentajes, tasas de crecimiento, interés compuesto, valor presente. Paso a paso, con ejercicios." },
  { to: "/interactivos", title: "Interactivos", desc: "Calculadoras y simuladores para experimentar con valores y entender los conceptos." },
  { to: "/noticias", title: "Noticias", desc: "Plantilla para registrar noticias y vincularlas con los conceptos de la materia." },
  { to: "/dudas", title: "Dudas", desc: "Espacio para preguntas frecuentes y dudas que surjan a lo largo de la cursada." },
  { to: "/glosario", title: "Glosario", desc: "Términos macroeconómicos básicos en lenguaje accesible." },
];

export default function Home() {
  return (
    <>
      <PageHeader
        eyebrow="Maestría en Economía y Derecho · UBA"
        title="Wiki de Macroeconomía"
        subtitle="Repositorio didáctico para acompañar la cátedra. Pensado para alumnos de derecho sin formación previa en macroeconomía ni en matemática financiera."
      />

      <div className="prose-wiki">
        <h2>Cómo usar esta wiki</h2>
        <ul>
          <li>
            Si nunca viste macro ni matemática financiera, abrí primero{" "}
            <Link to="/empezar">Empezá por acá</Link>: símbolos, cómo leer una
            fórmula y tres ideas clave.
          </li>
          <li>
            Después seguí la <Link to="/ruta">ruta de aprendizaje</Link> en
            orden.
          </li>
          <li>
            Para repasar un tema puntual, usá{" "}
            <Link to="/conceptos">Conceptos</Link> (filtro <em>núcleo mínimo</em>) o el{" "}
            <Link to="/glosario">Glosario</Link>.
          </li>
          <li>
            Si te trabás con matemática,{" "}
            <Link to="/matematica">Matemática básica</Link> está pensada para
            eso.
          </li>
          <li>
            Para practicar, jugá con los{" "}
            <Link to="/interactivos">ejemplos interactivos</Link>.
          </li>
        </ul>

        <Callout tone="tip" title="Recomendación">
          No la leas como un libro. Andá rebotando entre conceptos: leé una
          definición, mirá su ejemplo cotidiano, abrí un interactivo, volvé al
          concepto. En cada concepto vas a encontrar un recuadro{" "}
          <em>"Mirada desde el derecho"</em> cuando hay normativa o
          jurisprudencia que conecta con el tema.
        </Callout>

        <h2>Qué encontrás</h2>
      </div>

      <ul className="mt-2 divide-y divide-neutral-200 border-t border-b border-neutral-200">
        {SECTIONS.map((s) => (
          <li key={s.to}>
            <Link
              to={s.to}
              className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1.5 md:gap-6 py-4 group"
            >
              <span className="font-serif text-lg text-neutral-900 group-hover:underline underline-offset-4">
                {s.title}
              </span>
              <span className="text-sm text-neutral-500 md:text-right max-w-2xl md:max-w-md">
                {s.desc}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
