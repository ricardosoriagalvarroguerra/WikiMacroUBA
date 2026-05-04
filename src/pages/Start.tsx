import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";

const MATH_SYMBOLS: { sym: string; meaning: string; example: string }[] = [
  {
    sym: "%",
    meaning: "Porcentaje (parte de cada 100).",
    example: "8% = 8 de cada 100 = 0,08.",
  },
  {
    sym: "Δ",
    meaning: "Letra griega 'delta'. Significa 'cambio' o 'variación'.",
    example: "ΔPIB = cuánto cambió el PIB.",
  },
  {
    sym: "π",
    meaning: "Letra griega 'pi'. En macro, casi siempre = inflación.",
    example: "π = 8% significa 'inflación de 8%'.",
  },
  {
    sym: "Σ",
    meaning: "Letra griega 'sigma' mayúscula. Significa 'suma todo lo que sigue'.",
    example: "Σ xᵢ = x₁ + x₂ + … + xₙ.",
  },
  {
    sym: "X_t",
    meaning: "Subíndice. Indica el período al que se refiere la variable.",
    example: "PIB_t = PIB del año t. PIB_{t−1} = del año anterior.",
  },
  {
    sym: "X^n",
    meaning: "Exponente. Multiplicar la base por sí misma n veces.",
    example: "(1,1)^3 = 1,1 · 1,1 · 1,1 = 1,331.",
  },
  {
    sym: "≈",
    meaning: "Aproximadamente igual.",
    example: "1/3 ≈ 0,33.",
  },
];

const ECON_SYMBOLS: { sym: string; meaning: string }[] = [
  { sym: "PIB / Y", meaning: "Producto interno bruto. Lo que el país produjo en un período." },
  { sym: "C", meaning: "Consumo de las familias." },
  { sym: "I", meaning: "Inversión (no acciones: maquinaria, construcción, stocks)." },
  { sym: "G", meaning: "Gasto público en bienes y servicios." },
  { sym: "X", meaning: "Exportaciones (lo que el país le vende al mundo)." },
  { sym: "M", meaning: "Importaciones (lo que el país le compra al mundo)." },
  { sym: "T", meaning: "Recaudación tributaria del Estado." },
  { sym: "Yd", meaning: "Ingreso disponible (ingreso − impuestos)." },
  { sym: "i", meaning: "Tasa de interés nominal." },
  { sym: "r", meaning: "Tasa de interés real (descontada la inflación)." },
  { sym: "π", meaning: "Tasa de inflación." },
  { sym: "u", meaning: "Tasa de desempleo." },
  { sym: "e / TC", meaning: "Tipo de cambio (pesos por dólar, por convención local)." },
];

export default function Start() {
  return (
    <>
      <PageHeader
        eyebrow="Antes de arrancar"
        title="Empezá por acá"
        subtitle="Si nunca viste macroeconomía ni matemática financiera, esta página te da las herramientas mínimas para no marearte con la wiki."
      />

      <div className="prose-wiki">
        <h2>Cómo está organizada la wiki</h2>
        <ul>
          <li>
            <Link to="/ruta">Ruta de aprendizaje</Link>: el orden recomendado si
            arrancás de cero.
          </li>
          <li>
            <Link to="/conceptos">Conceptos</Link>: el diccionario macro.
            Filtrá por <strong>núcleo mínimo</strong> si tenés poco tiempo.
          </li>
          <li>
            <Link to="/matematica">Matemática</Link>: la gimnasia mínima
            (porcentajes, tasas, interés compuesto, valor presente).
          </li>
          <li>
            <Link to="/interactivos">Interactivos</Link>: simuladores para
            jugar con valores y entender los conceptos sin fórmulas.
          </li>
          <li>
            <Link to="/glosario">Glosario</Link>: términos sueltos en
            lenguaje accesible.
          </li>
        </ul>

        <Callout tone="tip" title="Sugerencia">
          No la leas como un libro. Andá rebotando: leé una definición, mirá su
          ejemplo cotidiano, abrí un interactivo, volvé al concepto. Los temas
          marcados como <strong>núcleo mínimo</strong> son los imprescindibles.
        </Callout>

        <h2>Cómo leer una fórmula sin asustarse</h2>
        <p>
          Una fórmula es solo una receta abreviada. Tres ideas que conviene
          fijar antes de avanzar:
        </p>
        <ol>
          <li>
            <strong>Las letras son etiquetas.</strong> "C" no es la letra C,
            es "lo que las familias gastan en un año". Cada letra que veas tiene
            un significado fijo en macro (mirá la tabla de abajo).
          </li>
          <li>
            <strong>Los subíndices marcan el tiempo.</strong> PIB_t es el PIB
            del año actual. PIB_{`{t−1}`} es el del año anterior. PIB_{`{t+1}`}, el siguiente.
          </li>
          <li>
            <strong>Las tasas se manejan en decimales.</strong> "5%" se escribe
            0,05 dentro de una cuenta. Una suba del 100% es ×2 (no ×100).
          </li>
        </ol>

        <h2>Símbolos matemáticos que vas a ver</h2>
      </div>

      <div className="mt-4 border-t border-neutral-200 divide-y divide-neutral-200 max-w-4xl">
        {MATH_SYMBOLS.map((s) => (
          <div
            key={s.sym}
            className="grid grid-cols-1 sm:grid-cols-[6rem_1fr_1fr] gap-2 sm:gap-6 py-3 text-sm"
          >
            <code className="font-mono text-neutral-900">{s.sym}</code>
            <span className="text-neutral-700">{s.meaning}</span>
            <span className="text-neutral-500 text-xs sm:text-sm">
              {s.example}
            </span>
          </div>
        ))}
      </div>

      <div className="prose-wiki">
        <h2>Letras económicas más frecuentes</h2>
        <p>
          Cuando veas una fórmula como <code>DA = C + I + G + (X − M)</code>,
          esto es lo que está representando cada letra:
        </p>
      </div>

      <div className="mt-4 border-t border-neutral-200 divide-y divide-neutral-200 max-w-4xl">
        {ECON_SYMBOLS.map((s) => (
          <div
            key={s.sym}
            className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-2 sm:gap-6 py-3 text-sm"
          >
            <code className="font-mono text-neutral-900">{s.sym}</code>
            <span className="text-neutral-700">{s.meaning}</span>
          </div>
        ))}
      </div>

      <div className="prose-wiki mt-10">
        <h2>Tres ideas que te van a hacer ahorrar tiempo</h2>
        <ol>
          <li>
            <strong>Stock vs flujo.</strong> Stock = lo que hay acumulado en un
            momento (deuda al 31/12). Flujo = lo que entra o sale por unidad de
            tiempo (déficit del año). Confundirlos es el error más común.{" "}
            <Link to="/conceptos/stock-vs-flujo">Ver concepto →</Link>
          </li>
          <li>
            <strong>Nominal vs real.</strong> Nominal incluye el efecto de la
            inflación; real lo descuenta. En Argentina, mirar nominal sin
            descontar inflación es engañarse.{" "}
            <Link to="/conceptos/pib-nominal-vs-real">Ver concepto →</Link>
          </li>
          <li>
            <strong>Variaciones porcentuales no se suman.</strong> Si algo sube
            10% y después baja 10%, NO vuelve al valor original. Se usan
            multiplicaciones: 1,10 · 0,90 = 0,99.{" "}
            <Link to="/matematica/variaciones-porcentuales">Ver tema →</Link>
          </li>
        </ol>

        <h2>Listo para arrancar</h2>
        <p>
          Si esto te resultó claro, seguí por la{" "}
          <Link to="/ruta">ruta de aprendizaje</Link>. Si todavía hay algo
          confuso, abrí <Link to="/glosario">Glosario</Link> y buscá los
          términos sueltos antes de seguir.
        </p>
      </div>
    </>
  );
}
