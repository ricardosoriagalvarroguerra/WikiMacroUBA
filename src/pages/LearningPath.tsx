import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";

type Step = { to: string; title: string; why: string };

const CORE: Step[] = [
  { to: "/empezar", title: "Empezá por acá", why: "Símbolos, cómo leer una fórmula y tres ideas clave antes de arrancar." },
  { to: "/conceptos/que-es-macroeconomia", title: "¿Qué es la macroeconomía?", why: "Antes de meternos con fórmulas, entender qué estudia la macro y cómo se diferencia de la micro." },
  { to: "/conceptos/stock-vs-flujo", title: "Stock vs flujo", why: "La distinción más útil para no confundir deuda con déficit, o reservas con exportaciones." },
  { to: "/matematica/porcentajes", title: "Porcentajes y variaciones", why: "La gimnasia mínima para leer cualquier dato económico." },
  { to: "/conceptos/pib", title: "PIB", why: "La medida más usada de la actividad económica de un país." },
  { to: "/conceptos/pib-nominal-vs-real", title: "PIB nominal vs PIB real", why: "Para no caer en la trampa de creer que la economía 'creció' cuando solo subieron los precios." },
  { to: "/conceptos/inflacion", title: "Inflación", why: "Tema central en Argentina; clave para entender salario real, tasas y tipo de cambio." },
  { to: "/conceptos/desempleo", title: "Desempleo", why: "Variable social y económica clave; con definiciones que conviene precisar." },
  { to: "/conceptos/tipo-de-cambio", title: "Tipo de cambio", why: "Cómo se conecta nuestra economía con el resto del mundo." },
  { to: "/matematica/interes-compuesto", title: "Interés compuesto", why: "Base de todo lo financiero: plazos fijos, deuda, valor del dinero en el tiempo." },
  { to: "/conceptos/tasa-de-interes", title: "Tasa de interés", why: "Qué es la tasa, cómo distinguir nominal de real, y por qué afecta consumo e inversión." },
  { to: "/conceptos/deficit-fiscal", title: "Déficit fiscal", why: "Cómo el Estado se financia cuando gasta más de lo que recauda y por qué eso suele empujar inflación." },
];

const DEEP: Step[] = [
  { to: "/conceptos/politica-fiscal", title: "Política fiscal", why: "Cómo el Estado interviene vía gasto e impuestos." },
  { to: "/conceptos/politica-monetaria", title: "Política monetaria", why: "Cómo el Banco Central administra el dinero y la tasa para influir en la economía." },
  { to: "/conceptos/crecimiento-economico", title: "Crecimiento económico", why: "El gran tema de largo plazo: por qué unos países crecen y otros no." },
  { to: "/conceptos/oferta-y-demanda-agregada", title: "Oferta y demanda agregada", why: "Marco básico para pensar shocks: ¿de demanda o de oferta?" },
];

const LEGAL: Step[] = [
  { to: "/conceptos/presupuesto-nacional", title: "Presupuesto nacional", why: "El gasto público es ley anual del Congreso." },
  { to: "/conceptos/regimen-cambiario", title: "Régimen cambiario y BCRA", why: "Quién regula el dólar y bajo qué normas (incluido el RPC)." },
  { to: "/conceptos/emergencia-economica", title: "Emergencia económica", why: "El régimen jurídico que habilita medidas extraordinarias en crisis." },
  { to: "/conceptos/deuda-soberana-fmi", title: "Deuda soberana y FMI", why: "Quién decide endeudarse y bajo qué jurisdicción." },
  { to: "/conceptos/indexacion-cer-uva", title: "Indexación: CER, UVA", why: "Por qué actualizar contratos por inflación es un problema legal, no solo técnico." },
  { to: "/conceptos/autonomia-bcra", title: "Autonomía del BCRA", why: "Por qué importa que el BCRA no dependa del gobierno de turno." },
];

const APPLIED: Step[] = [
  { to: "/noticias", title: "Aplicación: noticias económicas", why: "Aterrizar la teoría en la actualidad usando la plantilla de noticias." },
];

export default function LearningPath() {
  return (
    <>
      <PageHeader
        eyebrow="Para principiantes"
        title="Ruta de aprendizaje"
        subtitle="Si arrancás de cero, este es el orden recomendado para recorrer la wiki."
      />

      <Callout tone="tip">
        Andá un paso por vez. En cada página leé la definición, mirá los
        ejemplos y respondé la pregunta de repaso antes de pasar al siguiente
        tema. Si te alcanza el tiempo solo para el bloque de núcleo mínimo, ya
        tenés lo esencial.
      </Callout>

      <Section title="Núcleo mínimo" subtitle="Lo imprescindible. Si solo leés esto, ya entendés lo central." steps={CORE} startIndex={1} />
      <Section title="Para profundizar" subtitle="Una vez sólido el núcleo, sumá estos temas." steps={DEEP} startIndex={CORE.length + 1} />
      <Section title="Macro y derecho" subtitle="Puente entre los conceptos macro y la normativa argentina (presupuesto, BCRA, FMI, indexación, emergencia, cambios)." steps={LEGAL} startIndex={CORE.length + DEEP.length + 1} />
      <Section title="Aplicación" subtitle="Llevar la teoría a la actualidad." steps={APPLIED} startIndex={CORE.length + DEEP.length + LEGAL.length + 1} />
    </>
  );
}

function Section({
  title,
  subtitle,
  steps,
  startIndex,
}: {
  title: string;
  subtitle: string;
  steps: Step[];
  startIndex: number;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">
        {title}
      </h2>
      <p className="text-sm text-neutral-500 mb-3 max-w-2xl">{subtitle}</p>
      <ol className="border-t border-neutral-200 divide-y divide-neutral-200">
        {steps.map((s, i) => (
          <li key={s.to}>
            <Link to={s.to} className="flex gap-4 py-4 group items-start">
              <span className="font-mono text-xs text-neutral-400 mt-1 w-6">
                {String(startIndex + i).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block font-serif text-lg text-neutral-900 group-hover:underline underline-offset-4">
                  {s.title}
                </span>
                <span className="block text-sm text-neutral-500 mt-0.5">
                  {s.why}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
