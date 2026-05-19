export type ClassEntry = {
  id: string;
  number: number;
  title: string;
  date?: string;
  link?: string;
  status: "publicada" | "proximamente";
  summary: string;
  keyConcepts: { slug: string; label: string }[];
  reviewQuestions: { q: string; a?: string }[];
};

export const CLASSES: ClassEntry[] = [
  {
    id: "clase-01",
    number: 1,
    title: "Clase 1 · Introducción a la Macroeconomía",
    link: "https://clase01macrouba-production.up.railway.app",
    status: "publicada",
    summary:
      "Primera clase: presentación del curso, qué estudia la macroeconomía, diferencia con la microeconomía y panorama de las grandes variables que veremos a lo largo de la cursada (producción, precios, empleo, sector externo, política fiscal y monetaria).",
    keyConcepts: [
      { slug: "que-es-macroeconomia", label: "¿Qué es la macroeconomía?" },
      { slug: "micro-vs-macro", label: "Micro vs macro" },
      { slug: "pib", label: "PIB" },
      { slug: "pib-nominal-vs-real", label: "PIB nominal vs real" },
      { slug: "inflacion", label: "Inflación" },
      { slug: "desempleo", label: "Desempleo" },
    ],
    reviewQuestions: [
      {
        q: "¿Qué fenómenos económicos estudia la macroeconomía y cuáles quedan en el dominio de la microeconomía?",
        a: "La macro estudia agregados (PIB, inflación, desempleo, balanza de pagos) y políticas a nivel país. La micro estudia decisiones individuales (consumidores, empresas) y mercados específicos.",
      },
      {
        q: "¿Por qué el PIB se calcula sumando solo bienes y servicios finales?",
        a: "Para no contar dos veces. El valor de los insumos (harina) ya está incluido en el del producto final (pan). Si los sumáramos por separado, infláramos artificialmente la cifra.",
      },
      {
        q: "Si en un año el PIB nominal sube 100% pero los precios también suben 100%, ¿cuánto creció el PIB real?",
        a: "0%. Toda la suba nominal se explica por inflación. La cantidad real producida se mantuvo igual.",
      },
      {
        q: "Diferencia entre inflación 'bajando' y 'precios bajando'.",
        a: "Inflación bajando = los precios siguen subiendo, pero más despacio (desinflación). Precios bajando = los precios efectivamente caen (deflación). Son fenómenos muy distintos.",
      },
      {
        q: "¿Por qué un estudiante o un jubilado no se cuentan como 'desocupados'?",
        a: "Porque no forman parte de la población económicamente activa (PEA): no buscan trabajo activamente. La tasa de desempleo se calcula solo sobre la PEA.",
      },
    ],
  },
  {
    id: "clase-02",
    number: 2,
    title: "Clase 2 · Dinero, precios, inflación y poder adquisitivo",
    link: "https://clase02uba-production.up.railway.app",
    status: "publicada",
    summary:
      "Segunda clase: el dinero y su valor real. Qué funciones cumple el dinero en una economía, cómo se mide la inflación (IPC vs. deflactor del PIB y por qué pueden dar distinto), la distinción entre variables nominales y reales aplicada al salario y al poder adquisitivo, el rol de las expectativas como mecanismo que autorrealiza la inflación, y un recorrido por la inflación argentina entre 1980 y 2025.",
    keyConcepts: [
      { slug: "inflacion", label: "Inflación" },
      { slug: "pib-nominal-vs-real", label: "Nominal vs real" },
      { slug: "banco-central", label: "Banco central" },
      { slug: "politica-monetaria", label: "Política monetaria" },
      { slug: "indexacion-cer-uva", label: "Indexación (CER / UVA)" },
    ],
    reviewQuestions: [
      {
        q: "Si el salario nominal sube 40 % y los precios suben 60 %, ¿qué pasa con el salario real?",
        a: "Cae alrededor de 12,5 %. El salario real es el nominal deflactado por el IPC: 1,40 / 1,60 − 1 ≈ −0,125. Aunque el recibo muestra un 'aumento', el poder de compra disminuye porque los precios corrieron más rápido.",
      },
      {
        q: "¿Qué diferencia hay entre IPC y deflactor del PIB? ¿Por qué pueden dar distinto?",
        a: "El IPC mide el precio de una canasta fija representativa del consumo de los hogares e incluye productos importados. El deflactor del PIB mide los precios de todo lo que produce el país (consumo, inversión, gasto público, exportaciones) y no incluye importados. Captan universos distintos, así que casi siempre dan valores diferentes.",
      },
      {
        q: "Si un precio sube 30 % y después baja 30 %, ¿vuelve al valor original?",
        a: "No. 100 → 130 → 91. Las variaciones porcentuales no son simétricas porque cada vez se aplican sobre una base distinta. Es el mismo motivo por el que 'la inflación bajó' no significa que los precios bajen.",
      },
      {
        q: "¿Por qué se dice que las expectativas inflacionarias se 'autorrealizan'?",
        a: "Si todos firman paritarias, fijan precios de lista y arman contratos suponiendo una inflación X %, ese X % termina ocurriendo: los contratos y los aumentos reproducen la expectativa. Es un mecanismo que se sostiene a sí mismo aunque la causa original ya no esté.",
      },
      {
        q: "¿Por qué la inflación que mide el INDEC puede diferir de la inflación que 'siente' un jubilado o un estudiante?",
        a: "El IPC se calcula sobre una canasta promedio de los hogares. Cada grupo consume cosas distintas: el jubilado gasta más en alimentos, medicamentos y servicios; el estudiante en alquiler y transporte. Si los precios de esas canastas se mueven distinto, la inflación percibida también.",
      },
    ],
  },
  {
    id: "clase-03",
    number: 3,
    title: "Clase 3 · Inflación: las seis discusiones que la atraviesan",
    link: "https://clase03uba-production.up.railway.app",
    status: "publicada",
    summary:
      "Tercera clase: por qué la inflación es uno de los temas más debatidos de la macroeconomía moderna. Recorremos seis discusiones clave —causas monetarias vs. estructurales, inflación inercial, reglas vs. discrecionalidad del banco central, costo de la desinflación (sacrifice ratio), casos históricos de estabilización (Bolivia 1985, Plan Austral, Plano Real, Convertibilidad) y cómo se distribuye el costo de bajar la inflación— y cómo siguen vivas en la Argentina de hoy.",
    keyConcepts: [
      { slug: "inflacion", label: "Inflación" },
      { slug: "politica-monetaria", label: "Política monetaria" },
      { slug: "politica-fiscal", label: "Política fiscal" },
      { slug: "deficit-fiscal", label: "Déficit fiscal" },
      { slug: "banco-central", label: "Banco central" },
      { slug: "autonomia-bcra", label: "Autonomía del BCRA" },
      { slug: "regimen-cambiario", label: "Régimen cambiario" },
      { slug: "desempleo", label: "Desempleo" },
    ],
    reviewQuestions: [
      {
        q: "¿Por qué se dice que la inflación es 'el peor impuesto'?",
        a: "Porque cae con más fuerza sobre los que menos tienen. Los hogares con activos pueden cubrirse pasando a dólares, propiedades o instrumentos financieros; quienes solo viven del salario ven cómo su poder de compra se erosiona mes a mes sin alternativa. Es regresiva y nadie la legisló: la 'recauda' el Estado al emitir.",
      },
      {
        q: "¿Qué diferencia un plan de desinflación de shock de uno gradual? ¿Cuál tiene menor costo?",
        a: "El shock concentra el ajuste fiscal y monetario en poco tiempo (alto costo inmediato pero corto). El gradualismo lo dosifica (costo más bajo por año pero prolongado). La evidencia de Ball (1994) sobre 28 desinflaciones sugiere que el shock concentra más el dolor pero suele costar menos en total que el gradualismo. Bolivia 1985 es el caso shock paradigmático.",
      },
      {
        q: "¿Qué es la inflación inercial y por qué complica bajar la inflación?",
        a: "Es la inflación que se sostiene aunque desaparezca su causa original, porque los contratos, paritarias y alquileres se ajustan mirando la inflación pasada. Aunque el gobierno deje de emitir, los aumentos siguen viniendo por inercia. Romper ese mecanismo motivó los acuerdos explícitos del Plan Austral (Argentina 1985) y del Plano Real (Brasil 1994).",
      },
      {
        q: "¿Por qué tantos economistas insisten en la independencia del banco central?",
        a: "Por el problema de inconsistencia temporal (Kydland-Prescott, 1977): un gobierno tiene incentivos a prometer estabilidad hoy y emitir mañana. Si la gente lo sabe, ya no le cree, y la inflación no baja por más anuncios que haya. Atar las manos del Estado con un banco central independiente o metas de inflación es la forma de construir credibilidad.",
      },
      {
        q: "¿Qué fue la Convertibilidad argentina (1991-2001) y qué lección dejó?",
        a: "Una regla rígida: 1 peso = 1 dólar por ley. Bajó la inflación a cero y permitió crédito en dólares, pero al congelar el tipo de cambio el ajuste frente a shocks externos (México 1995, Rusia 1998, Brasil 1999) recayó sobre empleo (desocupación al 18–25 %) y deuda externa. Terminó en la crisis de 2001. La lección: reglas muy rígidas dan credibilidad pero quitan margen para reaccionar.",
      },
      {
        q: "Sin déficit fiscal ¿estaría garantizada una inflación baja? ¿O hay otras causas en juego?",
        a: "No alcanza. La línea monetarista (Friedman) dice que sí: ordená el fiscal y la inflación se va. La línea estructuralista (Olivera, Pazos) señala que en América Latina hay factores adicionales: oferta que no responde rápido (campo, energía), falta de dólares para importar, y conflicto distributivo entre sectores. Y la lectura inercial agrega que aunque la causa desaparezca, los contratos atados al pasado mantienen viva la inflación.",
      },
    ],
  },
];
