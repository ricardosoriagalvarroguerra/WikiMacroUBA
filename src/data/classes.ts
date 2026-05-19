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
    keyConcepts: [],
    reviewQuestions: [],
  },
  {
    id: "clase-03",
    number: 3,
    title: "Clase 3 · Inflación: las seis discusiones que la atraviesan",
    link: "https://clase03uba-production.up.railway.app",
    status: "publicada",
    summary:
      "Tercera clase: por qué la inflación es uno de los temas más debatidos de la macroeconomía moderna. Recorremos seis discusiones clave —causas monetarias vs. estructurales, inflación inercial, reglas vs. discrecionalidad del banco central, costo de la desinflación (sacrifice ratio), casos históricos de estabilización (Bolivia 1985, Plan Austral, Plano Real, Convertibilidad) y cómo se distribuye el costo de bajar la inflación— y cómo siguen vivas en la Argentina de hoy.",
    keyConcepts: [],
    reviewQuestions: [],
  },
];
