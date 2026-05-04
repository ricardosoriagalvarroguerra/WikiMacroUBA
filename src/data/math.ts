export type MathTopic = {
  slug: string;
  title: string;
  short: string;
  explanation: string;
  formula: string;
  worked: { problem: string; steps: string[]; answer: string };
  practice: { problem: string; answer: string };
  interpretation: string;
};

export const MATH: MathTopic[] = [
  {
    slug: "porcentajes",
    title: "Porcentajes",
    short: "Una parte de cada 100.",
    explanation:
      "Un porcentaje es una fracción con denominador 100. '20%' significa 20 partes de cada 100, o sea 0,20. Se calcula como (parte / total) × 100.",
    formula: "% = (parte / total) · 100",
    worked: {
      problem:
        "En una clase de 40 alumnos, 12 reprobaron. ¿Qué porcentaje reprobó?",
      steps: ["Total = 40", "Parte = 12", "12 / 40 = 0,3", "0,3 · 100 = 30%"],
      answer: "30%",
    },
    practice: {
      problem: "Si 18 personas de 60 leen el diario, ¿qué porcentaje lo lee?",
      answer: "30%",
    },
    interpretation:
      "En macro lo verás todo el tiempo: 'la inflación fue 8%', 'el desempleo es 7%'. Son porcentajes de un total de referencia.",
  },
  {
    slug: "variaciones-porcentuales",
    title: "Variaciones porcentuales",
    short: "Cuánto cambió algo en términos relativos.",
    explanation:
      "La variación porcentual mide el cambio entre dos valores en relación al valor inicial. Es la base para tasas de inflación, crecimiento, devaluación, etc.",
    formula: "Δ% = (Valor_final − Valor_inicial) / Valor_inicial · 100",
    worked: {
      problem: "Un kilo de pan pasó de $1.000 a $1.250. ¿Cuánto subió en %?",
      steps: [
        "Diferencia = 1.250 − 1.000 = 250",
        "250 / 1.000 = 0,25",
        "0,25 · 100 = 25%",
      ],
      answer: "25%",
    },
    practice: {
      problem: "El dólar pasó de $800 a $1.040. ¿Variación %?",
      answer: "30%",
    },
    interpretation:
      "Cuidado con la asimetría: si algo sube 50% y luego baja 50%, NO vuelve al valor inicial. (100 → 150 → 75).",
  },
  {
    slug: "promedio-simple",
    title: "Promedios simples",
    short: "La media aritmética.",
    explanation:
      "Suma de los valores dividida por la cantidad de valores. Útil cuando todos los datos pesan lo mismo.",
    formula: "Promedio = (x₁ + x₂ + ... + xₙ) / n",
    worked: {
      problem:
        "Inflación mensual: 3%, 4%, 5%, 4%. ¿Promedio mensual?",
      steps: ["Suma = 3 + 4 + 5 + 4 = 16", "n = 4", "16 / 4 = 4%"],
      answer: "4%",
    },
    practice: {
      problem: "Tasas: 10%, 12%, 8%. Promedio?",
      answer: "10%",
    },
    interpretation:
      "Sirve como referencia rápida, pero no captura la magnitud de los datos: el dato 'pesa' lo mismo aunque su importancia económica sea distinta.",
  },
  {
    slug: "promedio-ponderado",
    title: "Promedios ponderados",
    short: "Cada dato pesa según su importancia.",
    explanation:
      "Se multiplica cada valor por su peso (importancia) y se divide por la suma de los pesos. Es como se calcula la inflación general en el IPC.",
    formula: "x̄ = Σ (xᵢ · wᵢ) / Σ wᵢ",
    worked: {
      problem:
        "Una canasta tiene 70% alimentos (subieron 10%) y 30% transporte (subió 4%). ¿Inflación de la canasta?",
      steps: [
        "0,7 · 10% = 7%",
        "0,3 · 4% = 1,2%",
        "Suma = 7 + 1,2 = 8,2%",
      ],
      answer: "8,2%",
    },
    practice: {
      problem:
        "60% bienes (subieron 5%), 40% servicios (subieron 10%). Inflación?",
      answer: "7%",
    },
    interpretation:
      "Así se construye el IPC real: cada rubro pesa según cuánto representa del consumo promedio de los hogares.",
  },
  {
    slug: "tasas-de-crecimiento",
    title: "Tasas de crecimiento",
    short: "Velocidad a la que algo cambia en el tiempo.",
    explanation:
      "Una tasa de crecimiento es una variación porcentual entre períodos. Puede ser anual, mensual, trimestral.",
    formula: "g = (Y_t / Y_{t−1} − 1) · 100",
    worked: {
      problem: "PIB pasa de 100 a 103. Tasa de crecimiento?",
      steps: ["103 / 100 = 1,03", "1,03 − 1 = 0,03", "0,03 · 100 = 3%"],
      answer: "3%",
    },
    practice: {
      problem: "Una variable pasa de 200 a 220. g?",
      answer: "10%",
    },
    interpretation:
      "Tasa positiva = expansión. Tasa negativa = contracción. Cuidado con encadenar tasas: NO se suman, se multiplican (1+g₁)·(1+g₂)−1.",
  },
  {
    slug: "interes-simple",
    title: "Interés simple",
    short: "Los intereses se calculan siempre sobre el capital inicial.",
    explanation:
      "El interés se aplica solo sobre el capital original; los intereses ganados no generan más intereses.",
    formula: "I = C · i · t   (capital final = C · (1 + i · t))",
    worked: {
      problem: "Capital $10.000, tasa 5% anual, 3 años. ¿Capital final?",
      steps: [
        "I = 10.000 · 0,05 · 3 = 1.500",
        "Total = 10.000 + 1.500 = 11.500",
      ],
      answer: "$11.500",
    },
    practice: {
      problem: "Capital $20.000, 4% anual, 2 años. Capital final?",
      answer: "$21.600",
    },
    interpretation:
      "Es el interés más simple: lineal con el tiempo. Casi no se usa en finanzas reales, pero conviene entenderlo como punto de partida.",
  },
  {
    slug: "interes-compuesto",
    title: "Interés compuesto",
    short: "Los intereses generan más intereses.",
    explanation:
      "El interés se aplica sobre el capital + intereses acumulados de períodos anteriores. Es la base de plazos fijos y muchos instrumentos financieros.",
    formula: "C_n = C₀ · (1 + i)^n",
    worked: {
      problem: "Capital $10.000, tasa 5% anual, 3 años. Capital final?",
      steps: [
        "(1 + 0,05)^3 = 1,157625",
        "10.000 · 1,157625 = 11.576,25",
      ],
      answer: "$11.576,25",
    },
    practice: {
      problem: "$1.000 al 10% anual durante 5 años. Final?",
      answer: "≈ $1.610,51",
    },
    interpretation:
      "Pequeñas diferencias de tasa o tiempo generan brechas enormes (Einstein lo llamaba 'la octava maravilla del mundo').",
  },
  {
    slug: "valor-presente",
    title: "Valor presente",
    short: "¿Cuánto vale hoy un peso del futuro?",
    explanation:
      "Es el valor actual de un monto futuro, descontado por una tasa. Sirve para comparar flujos en distintos momentos del tiempo.",
    formula: "VP = VF / (1 + i)^n",
    worked: {
      problem:
        "¿Cuánto vale hoy recibir $10.000 dentro de 2 años, si la tasa es 8% anual?",
      steps: [
        "(1 + 0,08)^2 = 1,1664",
        "10.000 / 1,1664 ≈ 8.573,39",
      ],
      answer: "≈ $8.573,39",
    },
    practice: {
      problem: "VP de $5.000 a 3 años, tasa 10%?",
      answer: "≈ $3.756,57",
    },
    interpretation:
      "Recibir plata hoy SIEMPRE vale más que recibirla mañana. La tasa cuantifica esa preferencia temporal.",
  },
  {
    slug: "valor-futuro",
    title: "Valor futuro",
    short: "¿En cuánto se transforma un peso hoy?",
    explanation:
      "Es el monto que tendrás en el futuro si invertís hoy a una tasa dada (interés compuesto).",
    formula: "VF = VP · (1 + i)^n",
    worked: {
      problem:
        "Invertís $5.000 hoy al 12% anual durante 4 años.",
      steps: [
        "(1 + 0,12)^4 = 1,5735",
        "5.000 · 1,5735 = 7.867,5",
      ],
      answer: "≈ $7.867,50",
    },
    practice: {
      problem: "VF de $2.000 al 6% durante 5 años?",
      answer: "≈ $2.676,45",
    },
    interpretation:
      "VP y VF son la misma fórmula desde dos lados. Son la base de cualquier valuación financiera.",
  },
  {
    slug: "lectura-graficos",
    title: "Lectura básica de gráficos",
    short: "Qué mirar en un gráfico económico.",
    explanation:
      "Antes de interpretar, identificá: (1) qué hay en el eje X (tiempo, variable), (2) qué hay en el eje Y, (3) la unidad (¿% o nivel?), (4) la escala (¿lineal o logarítmica?), (5) la fuente y el período.",
    formula: "—",
    worked: {
      problem:
        "Un gráfico muestra inflación mensual entre enero y diciembre. La curva sube y luego baja.",
      steps: [
        "Identificá ejes: X=meses, Y=inflación %",
        "Si va de 4% a 8% y luego baja a 5%",
        "La inflación se aceleró y luego desaceleró",
        "Pero los precios SIGUIERON subiendo todo el año (la inflación nunca fue negativa)",
      ],
      answer: "Aceleración seguida de desaceleración; precios siempre crecientes.",
    },
    practice: {
      problem:
        "Si un gráfico muestra el PIB nominal en escala logarítmica creciendo en línea recta, ¿qué te dice?",
      answer: "Que crece a una tasa porcentual constante.",
    },
    interpretation:
      "Un gráfico bien leído puede contradecir un titular sensacionalista. Siempre revisá ejes y escala.",
  },
  {
    slug: "interpretacion-tablas",
    title: "Interpretación de tablas económicas",
    short: "Cómo leer una tabla del INDEC, BCRA o FMI.",
    explanation:
      "Mirá: (1) el título, (2) las unidades de cada columna, (3) si los datos están en niveles o variaciones, (4) el período de referencia y (5) las notas al pie (suelen avisar sobre cambios metodológicos).",
    formula: "—",
    worked: {
      problem:
        "Una tabla muestra IPC: 'Variación mensual: 8%; variación interanual: 211%'. ¿Qué significa?",
      steps: [
        "Variación mensual: precios subieron 8% respecto al mes anterior",
        "Interanual: subieron 211% respecto al mismo mes del año anterior",
        "Son magnitudes distintas; no las sumes ni promedies sin pensar",
      ],
      answer:
        "El nivel de precios es ~3,11 veces el de hace 12 meses; el último mes acumuló 8% adicional.",
    },
    practice: {
      problem:
        "Si una tabla dice 'PIB real (var. % i.a.) -2,5', ¿qué dice del crecimiento?",
      answer:
        "Cayó 2,5% respecto al mismo período del año anterior: hay contracción.",
    },
    interpretation:
      "Las tablas son lenguaje formal. Aprender a leerlas es 50% del trabajo de un analista económico.",
  },
];
