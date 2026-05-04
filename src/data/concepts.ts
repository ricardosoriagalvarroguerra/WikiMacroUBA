export type FormulaSymbol = { symbol: string; meaning: string };

export type LegalAngle = {
  title: string;
  body: string;
};

export type Concept = {
  slug: string;
  title: string;
  short: string;
  category: string;
  level?: "core" | "deep";
  plainDefinition?: string;
  definition: string;
  everydayExample: string;
  economicExample: string;
  formula?: string;
  formulaLegend?: FormulaSymbol[];
  intuition: string;
  commonMistake: string;
  reviewQuestion: string;
  reviewAnswer?: string;
  legalAngle?: LegalAngle;
  relatedTerms?: string[];
};

export const CONCEPTS: Concept[] = [
  {
    slug: "que-es-macroeconomia",
    title: "¿Qué es la macroeconomía?",
    short: "Mira la economía completa, no a un solo agente.",
    category: "Fundamentos",
    level: "core",
    plainDefinition:
      "La economía de un país entera, vista desde lejos. En vez de mirar a una persona o una empresa, la macro mira los números que resumen qué pasa con todos a la vez: cuánto se produce, cuántos tienen trabajo, cuánto suben los precios, cuántos dólares entran y salen.",
    definition:
      "Rama de la economía que estudia el comportamiento agregado de un país: producción total, empleo, inflación, tasas de interés y comercio con el resto del mundo.",
    everydayExample:
      "En vez de mirar el precio de tu kilo de pan, mirás cuánto subieron en promedio TODOS los precios de la economía durante el año.",
    economicExample:
      "Cuando el INDEC publica que la economía argentina creció 2,5% en un trimestre, eso es macroeconomía: una sola cifra resume la actividad de millones de empresas y personas.",
    intuition:
      "Si la microeconomía es mirar un árbol, la macro es mirar el bosque entero.",
    commonMistake:
      "Pensar que la macro 'suma' todas las microdecisiones. En realidad estudia patrones agregados: la suma de partes puede comportarse distinto que cada parte aislada (es lo que se llama 'falacia de composición': lo que es bueno para uno puede ser malo para todos juntos).",
    reviewQuestion:
      "¿La decisión de una sola empresa de subir su precio es un fenómeno micro o macro?",
    reviewAnswer:
      "Micro: es una decisión individual de una empresa. Sería macro si miramos el promedio de subas de TODAS las empresas durante un período (eso es inflación).",
    relatedTerms: ["Agregado", "PEA", "PIB"],
  },
  {
    slug: "micro-vs-macro",
    title: "Diferencia entre microeconomía y macroeconomía",
    short: "Una mira agentes individuales, la otra mira agregados.",
    category: "Fundamentos",
    level: "core",
    plainDefinition:
      "Microeconomía = decisiones individuales (qué compra una persona, cómo fija precios una empresa). Macroeconomía = el resultado de millones de esas decisiones juntas (cuánto crece el país, cuánta inflación hay, cuántos están desempleados).",
    definition:
      "Microeconomía estudia decisiones individuales (consumidores, empresas) y mercados específicos. Macroeconomía estudia agregados (PIB, inflación, desempleo) y cómo interactúan los grandes sectores.",
    everydayExample:
      "Decidir entre tomar Uber o colectivo: micro. Que el gobierno suba la nafta y eso afecte el costo de vida promedio del país: macro.",
    economicExample:
      "Por qué cierra una panadería de barrio: micro. Por qué hay recesión: macro.",
    intuition:
      "Misma economía, distinto zoom. La micro mira con lupa; la macro con vista satelital.",
    commonMistake:
      "Asumir que lo que es bueno para un agente es bueno para el agregado (falacia de composición). Ej: ahorrar más cada uno puede reducir la demanda agregada.",
    reviewQuestion:
      "¿Estudiar la elasticidad-precio del azúcar es micro o macro?",
    reviewAnswer:
      "Micro: estudia un mercado específico (el del azúcar) y cómo reacciona la cantidad demandada ante cambios en su precio.",
  },
  {
    slug: "stock-vs-flujo",
    title: "Stock vs flujo",
    short: "Lo acumulado en un momento (stock) vs lo que pasa por unidad de tiempo (flujo).",
    category: "Fundamentos",
    level: "core",
    plainDefinition:
      "Stock = lo que hay acumulado en un momento puntual (el saldo de tu tarjeta hoy, el agua que hay en una bañera ahora). Flujo = lo que entra o sale por unidad de tiempo (el gasto que hiciste este mes, los litros por minuto que salen de la canilla). Confundirlos es uno de los errores más comunes en macro.",
    definition:
      "Un stock es una cantidad medida en un instante dado (cuánto hay). Un flujo es una cantidad medida por unidad de tiempo (cuánto entra o sale por período).",
    everydayExample:
      "El agua que hay en una bañera ahora es un stock. El caudal de la canilla (litros por minuto) y el del desagüe son flujos. El stock cambia por la diferencia entre flujos.",
    economicExample:
      "PIB es un flujo (producción por año). Deuda pública es un stock (lo acumulado). Déficit fiscal es un flujo (lo que se suma a la deuda este año). Reservas internacionales son un stock; las exportaciones netas son un flujo que las alimenta.",
    intuition:
      "Si una variable se mide 'al 31 de diciembre de 2024' es stock. Si se mide 'durante 2024' es flujo. Confundirlos lleva a errores constantes en macro (por ejemplo, comparar deuda con PIB sin notar que uno es stock y el otro flujo).",
    commonMistake:
      "Sumar stocks y flujos como si fueran la misma cosa, o comparar magnitudes sin acordarse de la unidad temporal (USD 400.000 millones de deuda vs USD 600.000 millones de PIB anual son cosas distintas).",
    reviewQuestion:
      "¿El desempleo medido en una encuesta puntual es stock o flujo? ¿Y la cantidad de personas que se quedaron sin trabajo durante el último mes?",
    reviewAnswer:
      "El desempleo medido en una encuesta puntual es STOCK (cuántos había en ese momento). Los que se quedaron sin trabajo durante el mes es FLUJO (entradas a la condición de desempleados).",
  },
  {
    slug: "costo-de-oportunidad",
    title: "Costo de oportunidad",
    short: "Lo que resignás cuando elegís una opción y no otra.",
    category: "Fundamentos",
    level: "core",
    plainDefinition:
      "Lo que dejás de hacer cuando elegís una opción. Si usás $100 en A, ya no los podés usar en B. Si usás 2 horas en estudiar, ya no las usás en otra cosa. El recurso (plata, tiempo, dólares, espacio fiscal) es escaso: elegir SIEMPRE implica resignar algo.",
    definition:
      "Valor de la mejor alternativa a la que renunciás al tomar una decisión. No siempre es monetario: también es tiempo, esfuerzo, otros usos posibles del recurso.",
    everydayExample:
      "Estudiar dos horas tiene como costo de oportunidad lo que harías en esas dos horas si no estudiaras (trabajar, dormir, ver una serie).",
    economicExample:
      "Si el Estado destina $1.000 millones a subsidiar la energía, el costo de oportunidad es lo que podría haber hecho con esos mismos pesos: salud, educación, bajar impuestos, pagar deuda.",
    intuition:
      "Toda decisión económica tiene un costo de oportunidad, aunque no aparezca en una factura. La 'plata' no es el único recurso escaso: el tiempo, el espacio fiscal y los dólares también lo son.",
    commonMistake:
      "Pensar solo en el costo monetario explícito y olvidar la mejor alternativa resignada. Un curso 'gratis' tiene costo de oportunidad: las horas que dedicás.",
    reviewQuestion:
      "El BCRA usa USD 2.000 millones de reservas para sostener el tipo de cambio. ¿Cuál podría ser el costo de oportunidad de esa decisión?",
    reviewAnswer:
      "Esos USD 2.000 millones podrían haberse usado para pagar deuda externa, importar insumos productivos, o reservarse para una emergencia futura. El costo de oportunidad es la mejor de esas alternativas resignadas.",
  },
  {
    slug: "pib",
    title: "Producto Interno Bruto (PIB)",
    short: "Valor de mercado de todos los bienes y servicios finales producidos en un país en un período.",
    category: "Producción",
    level: "core",
    plainDefinition:
      "Es la suma del valor de TODO lo que un país produjo en un año (o trimestre): bienes y servicios, contados solo una vez (el final, no los insumos). Es la medida más usada para decir 'el tamaño de la economía'. Si crece, hay más actividad; si cae, hay recesión.",
    definition:
      "El PIB es la suma del valor monetario de todos los bienes y servicios FINALES producidos dentro de un país en un período (normalmente un año o un trimestre).",
    everydayExample:
      "Si en un país solo se producen 100 panes a $200 y 50 cortes de pelo a $5.000, el PIB del año es 100·$200 + 50·$5.000 = $270.000.",
    economicExample:
      "El PIB argentino en 2024 fue de aproximadamente USD 632.000 millones (a tipo de cambio de mercado).",
    formula: "PIB = C + I + G + (X − M)",
    formulaLegend: [
      { symbol: "C", meaning: "Consumo de las familias" },
      { symbol: "I", meaning: "Inversión (maquinaria, construcción, stocks)" },
      { symbol: "G", meaning: "Gasto público en bienes y servicios" },
      { symbol: "X", meaning: "Exportaciones (lo que el país le vende al mundo)" },
      { symbol: "M", meaning: "Importaciones (lo que el país le compra al mundo)" },
    ],
    intuition:
      "Es el 'tamaño' de la economía: cuánto produce. Crece → economía expandiéndose. Cae → recesión.",
    commonMistake:
      "Sumar bienes intermedios. El PIB cuenta solo bienes finales para no contar dos veces (la harina del pan ya está adentro del precio del pan).",
    reviewQuestion:
      "¿Por qué no se incluye en el PIB la harina vendida a una panadería que la usa para hacer pan?",
    reviewAnswer:
      "Porque su valor ya queda reflejado en el precio del pan (que sí se cuenta). Si sumáramos los dos, contaríamos la harina dos veces. Por eso solo se cuentan los bienes finales.",
    legalAngle: {
      title: "El INDEC y las cuentas nacionales",
      body: "El cálculo del PIB y el resto de las estadísticas oficiales lo hace el INDEC (Ley 17.622). La intervención política del organismo entre 2007 y 2015 derivó en causas penales y mostró por qué importa la autonomía técnica de quien produce los datos: la deuda indexada por CER y los contratos atados al IPC dependen de esos números.",
    },
    relatedTerms: ["Demanda agregada", "PIB nominal", "PIB real"],
  },
  {
    slug: "pib-nominal-vs-real",
    title: "PIB nominal vs PIB real",
    short: "Nominal mide a precios corrientes; real saca el efecto de la inflación.",
    category: "Producción",
    level: "core",
    plainDefinition:
      "Las mismas cosas producidas pueden parecer 'más' si suben los precios. El PIB nominal mezcla los dos efectos (más cantidad y más precios). El PIB real saca el efecto precios y muestra solo la cantidad. En países con inflación alta, el nominal engaña: hay que mirar el real.",
    definition:
      "PIB nominal valúa la producción a los precios del año en curso. PIB real la valúa a precios de un año base, eliminando el efecto de la inflación.",
    everydayExample:
      "Un país produjo las mismas 100 manzanas en 2023 y 2024, pero el precio pasó de $100 a $200. PIB nominal sube de $10.000 a $20.000 (¡pareciera que creció!), pero PIB real está igual: 100 manzanas.",
    economicExample:
      "Si el PIB nominal sube 50% pero la inflación fue 45%, el PIB real apenas creció ~3,4%.",
    formula: "PIB real = PIB nominal / Deflactor del PIB · 100",
    formulaLegend: [
      { symbol: "PIB nominal", meaning: "Producción valuada a precios actuales" },
      { symbol: "Deflactor", meaning: "Índice de precios del PIB (base = 100)" },
    ],
    intuition:
      "El PIB real responde: '¿estamos produciendo más cosas, o solo hay más plata circulando?'",
    commonMistake:
      "Comparar PIB nominal entre años con alta inflación: parece que la economía explotó cuando en realidad solo subieron precios.",
    reviewQuestion:
      "Si el PIB nominal crece 30% y los precios suben 30%, ¿cuánto creció el PIB real?",
    reviewAnswer:
      "Aproximadamente 0%. Toda la suba del nominal se explica por inflación: la cantidad real producida es la misma. (La fórmula exacta da (1,30 / 1,30) − 1 = 0%.)",
  },
  {
    slug: "inflacion",
    title: "Inflación",
    short: "Aumento sostenido y generalizado del nivel de precios.",
    category: "Precios",
    level: "core",
    plainDefinition:
      "Cuando los precios de casi todo suben de manera sostenida en el tiempo. No es que solo subió el pan: es que sube toda la canasta y se mantiene. Resultado: tu plata vale menos cada mes (con $1.000 hoy comprás menos que hace un año).",
    definition:
      "Suba persistente del nivel general de precios. Se mide con índices como el IPC (Índice de Precios al Consumidor).",
    everydayExample:
      "Si el café costaba $1.000 en enero y $1.200 en diciembre, hay un 20% de inflación anual en ese producto.",
    economicExample:
      "Argentina cerró 2023 con una inflación del 211% anual. Eso significa que, en promedio, los precios se multiplicaron por aproximadamente 3,1 (1 + 2,11) en un año.",
    formula: "π = (IPC_t − IPC_{t−1}) / IPC_{t−1} · 100",
    formulaLegend: [
      { symbol: "π", meaning: "Tasa de inflación (letra griega 'pi')" },
      { symbol: "IPC_t", meaning: "Índice de precios del período actual (t)" },
      { symbol: "IPC_{t−1}", meaning: "Índice de precios del período anterior" },
    ],
    intuition:
      "Tu plata vale menos: con $1.000 hoy comprás menos cosas que hace un año.",
    commonMistake:
      "Confundir 'inflación bajando' con 'precios bajando'. Si la inflación baja del 10% al 5%, los precios SIGUEN subiendo (solo a menor velocidad). Que los precios bajen se llama deflación y es muy poco frecuente.",
    reviewQuestion:
      "Si el IPC pasa de 100 a 108 en un año, ¿cuál es la tasa de inflación?",
    reviewAnswer:
      "8% anual. (108 − 100) / 100 · 100 = 8%.",
    legalAngle: {
      title: "IPC oficial e indexación",
      body: "El IPC es el ancla de muchas obligaciones: salarios paritarios, alquileres (la Ley 27.551 de 2020 ataba a ICL/IPC; reformada en 2023), créditos UVA, deuda pública en pesos ajustada por CER (Ley 25.713). Si el índice oficial se 'rompe' o se manipula, todos esos contratos se desplazan: por eso el INDEC no es solo estadística, también es derecho aplicado.",
    },
    relatedTerms: ["IPC", "Deflación", "Inflación núcleo"],
  },
  {
    slug: "desempleo",
    title: "Desempleo",
    short: "Personas que buscan trabajo y no consiguen.",
    category: "Mercado laboral",
    level: "core",
    plainDefinition:
      "Porcentaje de personas que QUIEREN trabajar pero no encuentran empleo. Si alguien no busca trabajo (estudiante, jubilado, ama de casa, desalentado que ya no busca), no figura como desempleado. Por eso la cifra puede 'mejorar' simplemente porque la gente dejó de buscar.",
    definition:
      "Porcentaje de la población económicamente activa (PEA) que busca empleo activamente y no lo encuentra.",
    everydayExample:
      "En un grupo de 100 personas que quieren trabajar, si 8 no consiguen empleo, la tasa de desempleo es 8%.",
    economicExample:
      "Argentina suele tener tasas de desempleo entre 6% y 10%. España llegó al 27% post-crisis 2008.",
    formula: "u = Desocupados / Población económicamente activa · 100",
    formulaLegend: [
      { symbol: "u", meaning: "Tasa de desempleo (en %)" },
      { symbol: "Desocupados", meaning: "Personas que buscan trabajo y no encuentran" },
      { symbol: "PEA", meaning: "Población económicamente activa: ocupados + desocupados que buscan" },
    ],
    intuition:
      "No incluye a quienes no buscan trabajo (estudiantes, jubilados, desalentados). Solo cuenta desocupados que buscan activamente.",
    commonMistake:
      "Confundir 'no trabajar' con 'estar desempleado'. Un ama de casa o un estudiante no son desempleados según la estadística.",
    reviewQuestion:
      "Si una persona deja de buscar trabajo y se desalienta, ¿la tasa de desempleo medida sube o baja?",
    reviewAnswer:
      "Baja, paradójicamente: la persona sale de la PEA (deja de ser desocupada activa). El empleo no mejoró, pero el indicador sí. Por eso conviene mirar también la tasa de actividad.",
    relatedTerms: ["PEA"],
  },
  {
    slug: "tipo-de-cambio",
    title: "Tipo de cambio",
    short: "Precio de una moneda expresado en otra.",
    category: "Sector externo",
    level: "core",
    plainDefinition:
      "Cuánto cuesta un dólar (o cualquier moneda extranjera) en pesos. Si el dólar pasa de $1.000 a $1.250 hacen falta MÁS pesos para comprar lo mismo: el peso se 'depreció' (perdió valor frente al dólar). Si bajara el número, el peso se 'apreciaría'.",
    definition:
      "Cantidad de moneda local que se paga por una unidad de moneda extranjera (ej: cuántos pesos cuesta un dólar).",
    everydayExample:
      "Si 1 USD = $1.000 ARS, comprar un libro de USD 20 te cuesta $20.000.",
    economicExample:
      "Si el tipo de cambio pasa de $1.000 a $1.250 por dólar (hacen falta MÁS pesos para comprar el mismo dólar), decimos que el peso se depreció: los importados se vuelven más caros y los exportadores reciben más pesos por lo mismo.",
    intuition:
      "El tipo de cambio es el 'precio internacional' de una moneda. Bajo la convención usada en Argentina (pesos por dólar), si el número sube, el peso pierde valor (se deprecia); si el número baja, el peso gana valor (se aprecia). Refleja confianza, oferta y demanda de divisas, y diferencias de inflación entre países.",
    commonMistake:
      "Pensar que devaluación = pobreza inmediata. La devaluación encarece importados y abarata exportaciones, redistribuyendo ingresos entre sectores.",
    reviewQuestion:
      "Si el dólar pasa de $1.000 a $1.250, ¿el peso se apreció o se depreció?",
    reviewAnswer:
      "Se depreció: hacen falta más pesos para comprar el mismo dólar. La moneda local perdió valor relativo frente al dólar.",
    legalAngle: {
      title: "Régimen cambiario y RPC",
      body: "Las operaciones cambiarias están reguladas por la Ley 18.924 y las comunicaciones del BCRA. Operar fuera de los canales habilitados puede ser delito bajo el Régimen Penal Cambiario (Ley 19.359). Cuando hay 'cepo', las distintas paridades (oficial, MEP, CCL, blue) son consecuencia directa de esas restricciones administrativas.",
    },
    relatedTerms: ["Apreciación", "Depreciación", "Devaluación", "Brecha cambiaria"],
  },
  {
    slug: "tasa-de-interes",
    title: "Tasa de interés",
    short: "Precio del dinero en el tiempo.",
    category: "Mercados financieros",
    level: "core",
    plainDefinition:
      "Es el 'precio de la plata en el tiempo'. Si te prestan $100 al 50% anual, en un año debés $150. Si depositás a esa tasa, te devuelven $50 más. Tasa alta = caro endeudarse, conviene ahorrar. Tasa baja = al revés.",
    definition:
      "Porcentaje que se paga (o cobra) por usar dinero prestado durante un período.",
    everydayExample:
      "Si tomás un préstamo de $100.000 a una tasa anual de 80%, al cabo de un año debés $180.000.",
    economicExample:
      "La tasa de política monetaria del BCRA es la herramienta principal para influir sobre el crédito y la inflación.",
    formula: "Capital final = Capital · (1 + i)",
    formulaLegend: [
      { symbol: "i", meaning: "Tasa de interés del período (en decimal: 50% = 0,50)" },
      { symbol: "Capital", meaning: "Plata prestada o depositada al inicio" },
    ],
    intuition:
      "Es el 'alquiler' del dinero. Tasa alta → más caro endeudarse, más conviene ahorrar. Tasa baja → al revés. Para comparar tasas con inflación se usa la tasa real: (1 + i) / (1 + π) − 1. Con inflaciones bajas, alcanza con la aproximación tasa real ≈ tasa nominal − inflación; con inflación alta (Argentina) hay que usar la fórmula exacta.",
    commonMistake:
      "Confundir tasa nominal con tasa real. Si la tasa nominal es 100% y la inflación es 100%, la tasa real es ~0%: tu plata creció igual que los precios.",
    reviewQuestion:
      "Si la tasa nominal es 50% y la inflación 40%, ¿cuál es aproximadamente la tasa real (usando la aproximación)?",
    reviewAnswer:
      "≈ 10% (50% − 40%). Con la fórmula exacta sería (1,50/1,40) − 1 ≈ 7,1%. La aproximación pierde precisión cuando inflación y tasa son altas.",
    legalAngle: {
      title: "Usura, indexación y pesificación",
      body: "Distintos fallos de la CSJN limitaron tasas usurarias, validaron créditos UVA y resolvieron casos de pesificación de obligaciones en moneda extranjera bajo la Ley 25.561 (Bustos, Massa, Rinaldi). Toda discusión sobre intereses moratorios o capitalización en juicios es, en el fondo, una discusión sobre tasa real.",
    },
  },
  {
    slug: "demanda-agregada",
    title: "Demanda agregada (DA)",
    short: "Suma del gasto planeado en bienes y servicios de una economía.",
    category: "Demanda agregada",
    level: "deep",
    definition:
      "Cantidad total de bienes y servicios que los hogares, las empresas, el Estado y el resto del mundo quieren comprar a un nivel de precios dado. Se descompone en cuatro grandes componentes: consumo (C), inversión (I), gasto público (G) y exportaciones netas (X − M).",
    everydayExample:
      "Si C = $600, I = $200, G = $300 y X − M = −$100, la demanda agregada es $1.000. Eso es lo que TODOS juntos quieren comprar.",
    economicExample:
      "En Argentina, C suele rondar el 65% del PIB, G entre 18–22%, I entre 15–18%, y X − M cierra el resto y suele ser pequeño en valor absoluto.",
    formula: "DA = C + I + G + (X − M)",
    formulaLegend: [
      { symbol: "C", meaning: "Consumo de los hogares" },
      { symbol: "I", meaning: "Inversión privada" },
      { symbol: "G", meaning: "Gasto público en bienes y servicios" },
      { symbol: "X − M", meaning: "Exportaciones netas (saldo del comercio externo)" },
    ],
    intuition:
      "La DA es el lado del gasto: la suma de los cuatro 'que quieren comprar'. La oferta agregada es lo que la economía produce para satisfacer ese gasto. En equilibrio, lo producido (PIB) coincide con lo demandado (DA): por eso comparten la misma fórmula.",
    commonMistake:
      "Confundir demanda agregada con consumo. El consumo es solo uno de los cuatro componentes (aunque el más grande).",
    reviewQuestion:
      "Si el gasto público sube $100 y todo lo demás queda igual, ¿cuánto sube la demanda agregada en el primer momento?",
    reviewAnswer:
      "$100 en el primer momento (impacto directo). Después puede subir más por el efecto multiplicador, porque ese gasto se vuelve ingreso de alguien que vuelve a consumir.",
  },
  {
    slug: "consumo",
    title: "Consumo (C)",
    short: "Gasto de las familias en bienes y servicios.",
    category: "Demanda agregada",
    level: "deep",
    definition:
      "Componente más grande de la demanda agregada: lo que las familias gastan en bienes durables, no durables y servicios.",
    everydayExample:
      "Cuando comprás comida, ropa, Netflix o pagás un curso, todo eso suma al consumo agregado.",
    economicExample:
      "En Argentina, el consumo privado representa cerca del 65% del PIB.",
    formula: "C = c₀ + c₁ · Yd",
    formulaLegend: [
      { symbol: "c₀", meaning: "Consumo autónomo (lo que se gasta aunque el ingreso sea 0)" },
      { symbol: "c₁", meaning: "Propensión marginal a consumir (entre 0 y 1)" },
      { symbol: "Yd", meaning: "Ingreso disponible (ingreso − impuestos)" },
    ],
    intuition:
      "A mayor ingreso disponible (Yd = ingreso después de impuestos), más consumo. La propensión marginal al consumo (c₁) es la fracción de cada peso adicional que se gasta: si c₁ = 0,8, de cada $100 extra, $80 se consumen y $20 se ahorran. c₀ es el consumo autónomo: lo que se gastaría aunque el ingreso fuera 0 (por ahorro previo, deuda, ayuda familiar).",
    commonMistake:
      "Pensar que ahorrar siempre es bueno para la economía. La 'paradoja del ahorro' muestra que si todos ahorran a la vez, cae la demanda y baja el ingreso de todos.",
    reviewQuestion:
      "Si la propensión marginal al consumo es 0,8 y el ingreso aumenta $1.000, ¿cuánto aumenta el consumo?",
    reviewAnswer:
      "$800 (= 0,8 · $1.000). Los otros $200 se ahorran.",
  },
  {
    slug: "inversion",
    title: "Inversión (I)",
    short: "Gasto en bienes de capital y aumentos de stocks.",
    category: "Demanda agregada",
    level: "deep",
    definition:
      "Componente del PIB que incluye compra de maquinaria, construcción, equipos y variación de inventarios. NO incluye comprar acciones (eso es 'inversión financiera').",
    everydayExample:
      "Una panadería que compra un horno nuevo está invirtiendo. Una persona que compra acciones, en términos macro, NO está invirtiendo.",
    economicExample:
      "La inversión es muy volátil: cae fuerte en recesiones y se recupera rápido en expansiones.",
    intuition:
      "La inversión amplía la capacidad productiva futura: si invertís hoy, producís más mañana.",
    commonMistake:
      "Confundir inversión real (capital productivo NUEVO: maquinaria, construcción de obra nueva) con compra de activos existentes (un departamento usado, acciones). Solo la primera entra en el PIB; los activos ya existentes son una transferencia de propiedad, no nueva producción.",
    reviewQuestion:
      "¿La compra de un departamento usado para alquilarlo es inversión en el sentido macroeconómico?",
    reviewAnswer:
      "No. Es una transferencia de propiedad: cambia el dueño pero no se produjo nada nuevo. Construir un departamento desde cero sí sería inversión.",
  },
  {
    slug: "gasto-publico",
    title: "Gasto público (G)",
    short: "Compras de bienes y servicios del Estado.",
    category: "Demanda agregada",
    level: "deep",
    definition:
      "Lo que el Estado gasta en bienes y servicios: salarios públicos, infraestructura, defensa, educación, salud. NO incluye transferencias (jubilaciones, planes), porque esas no son compras directas.",
    everydayExample:
      "El sueldo de un docente público o construir una autopista es gasto público.",
    economicExample:
      "En Argentina, el gasto público total ronda el 38–40% del PIB.",
    intuition:
      "Es una de las palancas de política fiscal: subir G estimula la demanda; bajarlo enfría la economía.",
    commonMistake:
      "Sumar las jubilaciones al G. Las transferencias son ingreso de las familias, no gasto del Estado en bienes.",
    reviewQuestion:
      "¿Pagar una jubilación entra en G o en otra parte de la cuenta?",
    reviewAnswer:
      "No entra en G. Es una transferencia: el Estado le pasa plata a una persona que después la consume. Cuando esa persona la gasta, suma en C, no en G.",
  },
  {
    slug: "exportaciones-importaciones",
    title: "Exportaciones e importaciones",
    short: "Ventas y compras al/desde el exterior.",
    category: "Sector externo",
    level: "deep",
    definition:
      "Exportaciones (X): bienes y servicios que un país vende al exterior. Importaciones (M): los que compra del exterior.",
    everydayExample:
      "Vender soja a China = exportación. Comprar un iPhone hecho en China = importación.",
    economicExample:
      "Argentina exporta principalmente productos primarios (soja, carne, litio) y servicios; importa manufacturas, energía y tecnología.",
    intuition:
      "X − M es la contribución del comercio exterior al PIB. Si X > M, el país le 'vende' más al mundo de lo que le compra.",
    commonMistake:
      "Creer que importar es 'malo' siempre. Importar bienes de capital o insumos ayuda a producir más a futuro.",
    reviewQuestion:
      "Si X = 100, M = 120, ¿hay superávit o déficit comercial?",
    reviewAnswer:
      "Déficit: M > X, las importaciones superan a las exportaciones por 20.",
  },
  {
    slug: "balanza-comercial",
    title: "Balanza comercial",
    short: "Diferencia entre exportaciones e importaciones de bienes.",
    category: "Sector externo",
    level: "deep",
    definition:
      "Saldo entre lo que un país exporta y lo que importa. Si X > M hay superávit; si X < M, déficit.",
    everydayExample:
      "Una familia que vende manualidades por $50.000 y compra cosas por $30.000 'tiene superávit comercial' de $20.000.",
    economicExample:
      "Argentina suele tener superávit comercial gracias al agro, pero el dato puede ser distinto en distintos años.",
    formula: "BC = X − M",
    intuition:
      "Es uno de los componentes clave para entender de dónde salen o entran dólares al país.",
    commonMistake:
      "Confundir balanza comercial (bienes y a veces servicios) con balanza de pagos (incluye además flujos financieros).",
    reviewQuestion:
      "Si las exportaciones bajan 10% y las importaciones quedan iguales, ¿qué pasa con la balanza comercial?",
    reviewAnswer:
      "Empeora: el saldo X − M se reduce (puede pasar de superávit a déficit, o profundizar un déficit existente).",
  },
  {
    slug: "deficit-fiscal",
    title: "Déficit fiscal",
    short: "El Estado gasta más de lo que recauda.",
    category: "Política fiscal",
    level: "core",
    plainDefinition:
      "El Estado gastó más de lo que recaudó en impuestos. Como una persona que gasta más de lo que cobra y tiene que pedir prestado o emitir 'pesos nuevos' para cubrir el agujero. El déficit primario excluye los intereses de la deuda; el financiero los incluye.",
    definition:
      "Cuando el Estado tiene gastos mayores a sus ingresos en un período. Si los ingresos superan los gastos, hay superávit fiscal. Conviene distinguir dos versiones: déficit PRIMARIO (gastos − ingresos sin contar intereses de la deuda) y déficit FINANCIERO (incluye los intereses). En Argentina las metas con el FMI suelen fijarse sobre el primario.",
    everydayExample:
      "Si tus ingresos mensuales son $500.000 y gastás $600.000, tenés déficit de $100.000 que financiás con tarjeta o préstamos.",
    economicExample:
      "El déficit puede financiarse con deuda (emisión de bonos) o con emisión monetaria (creación de pesos por el Banco Central).",
    formula: "Déficit = Gasto público − Ingresos públicos",
    intuition:
      "Déficit persistente → deuda crece → más intereses → más déficit. Espiral conocida.",
    commonMistake:
      "Pensar que un Estado 'no puede quebrar' como una persona. Puede sí: las crisis de deuda soberana existen.",
    reviewQuestion:
      "¿Por qué un déficit financiado con emisión monetaria (creación de pesos por el Banco Central) suele generar inflación?",
    reviewAnswer:
      "Porque entra más dinero a la economía sin que aumente la cantidad de bienes y servicios. Más pesos persiguiendo los mismos productos = precios más altos. El efecto depende también de la demanda de dinero y de las expectativas.",
    legalAngle: {
      title: "Presupuesto y emisión",
      body: "El presupuesto nacional se aprueba por ley anual (Ley 24.156 de Administración Financiera; arts. 4 y 75 inc. 8 CN). El BCRA tiene límites a financiar al Tesoro en su Carta Orgánica (Ley 24.144). Cuando se exceden esos límites, hace falta una ley específica o se recurre a 'adelantos transitorios' y 'utilidades' del Banco Central.",
    },
    relatedTerms: ["Ajuste fiscal", "Superávit fiscal", "Deuda pública"],
  },
  {
    slug: "deuda-publica",
    title: "Deuda pública",
    short: "Lo que el Estado le debe a acreedores.",
    category: "Política fiscal",
    level: "deep",
    definition:
      "Stock total (acumulado, no de un año) de obligaciones del Estado con acreedores internos (bancos, jubilados, etc.) y externos (FMI, bonistas). Es un stock; el déficit fiscal es un flujo que la alimenta año a año.",
    everydayExample:
      "Como el saldo de tu tarjeta de crédito: lo que debés acumulado (stock), no lo que gastaste este mes (flujo).",
    economicExample:
      "Se mide en relación al PIB: una deuda del 90% del PIB significa que el país debe casi tanto como produce en un año.",
    intuition:
      "Hay deuda 'sostenible' y 'insostenible'. Importa el costo (tasa) y a quién se le debe (mercado, FMI, jubilados).",
    commonMistake:
      "Mirar el monto absoluto sin relación al PIB. Una deuda de USD 100.000 millones es enorme para un país pequeño y poco para uno grande.",
    reviewQuestion:
      "¿Por qué se mide la deuda como % del PIB en lugar de en valor absoluto?",
    reviewAnswer:
      "Porque el PIB mide la capacidad de generar ingresos del país. Una misma deuda es muy distinta para una economía chica que para una grande: lo que importa es la relación entre lo que debe y lo que produce.",
  },
  {
    slug: "crecimiento-economico",
    title: "Crecimiento económico",
    short: "Aumento sostenido del PIB real per cápita en el tiempo.",
    category: "Largo plazo",
    level: "deep",
    definition:
      "Aumento sostenido en el tiempo del PIB real, idealmente por habitante. Refleja mejoras en productividad, capital y tecnología.",
    everydayExample:
      "Si Argentina crece 3% al año durante 24 años, su economía se duplica.",
    economicExample:
      "Países como Corea del Sur multiplicaron su PIB per cápita por más de 20 veces entre 1960 y 2020.",
    formula: "g = (PIB_t − PIB_{t−1}) / PIB_{t−1} · 100",
    intuition:
      "El crecimiento es como el interés compuesto: pequeñas tasas sostenidas hacen diferencias enormes en décadas. Regla del 72: si una variable crece al g% anual, se duplica aproximadamente cada 72/g años (al 7% → ~10 años; al 3% → ~24 años).",
    commonMistake:
      "Confundir crecimiento (más producción real) con simple suba de precios.",
    reviewQuestion:
      "Si una economía crece al 7% anual, ¿cada cuántos años se duplica aprox?",
    reviewAnswer:
      "≈ 10 años. Por la regla del 72: 72 / 7 ≈ 10,3 años.",
  },
  {
    slug: "ciclo-economico",
    title: "Ciclo económico",
    short: "Fluctuaciones de la actividad alrededor de la tendencia.",
    category: "Corto plazo",
    level: "deep",
    definition:
      "Patrón recurrente de expansiones y recesiones de la economía. Fases: expansión, pico, recesión, valle, recuperación.",
    everydayExample:
      "Como el clima económico: hay veranos (booms) e inviernos (recesiones).",
    economicExample:
      "Una recesión técnica suele definirse como dos trimestres consecutivos de caída del PIB real.",
    intuition:
      "Mientras el crecimiento describe la tendencia de largo plazo, el ciclo describe cómo oscila alrededor de esa tendencia.",
    commonMistake:
      "Confundir ciclo (corto plazo, transitorio) con crecimiento (largo plazo, estructural).",
    reviewQuestion:
      "¿Qué fase del ciclo viene después del valle?",
    reviewAnswer:
      "La recuperación: la economía empieza a crecer otra vez desde su punto más bajo, hasta volver a una expansión.",
  },
  {
    slug: "politica-fiscal",
    title: "Política fiscal",
    short: "Decisiones del Estado sobre gasto e impuestos.",
    category: "Políticas",
    level: "deep",
    definition:
      "Manejo del gasto público (G) y los impuestos (T) por parte del gobierno para influir sobre la economía.",
    everydayExample:
      "Bajar el IVA o aumentar la inversión en obra pública son decisiones de política fiscal.",
    economicExample:
      "En recesión, una política fiscal expansiva (más gasto, menos impuestos) busca estimular la demanda.",
    intuition:
      "Es la palanca del Tesoro. La maneja el Ministerio de Economía / Hacienda.",
    commonMistake:
      "Confundirla con política monetaria. La fiscal es del Estado / Tesoro; la monetaria, del Banco Central.",
    reviewQuestion:
      "Si el gobierno baja impuestos para reactivar el consumo, ¿la política es expansiva o contractiva?",
    reviewAnswer:
      "Expansiva: deja más plata en manos de las familias y empresas, lo que tiende a aumentar el consumo y la demanda agregada.",
  },
  {
    slug: "politica-monetaria",
    title: "Política monetaria",
    short: "Decisiones del Banco Central sobre dinero y tasas.",
    category: "Políticas",
    level: "deep",
    definition:
      "Acciones del Banco Central para controlar la cantidad de dinero, la tasa de interés y el crédito en la economía.",
    everydayExample:
      "Cuando el BCRA sube la tasa, los plazos fijos rinden más y los créditos se encarecen.",
    economicExample:
      "Para frenar la inflación, los bancos centrales suelen subir tasas (política contractiva).",
    intuition:
      "Es la palanca del Banco Central. Su instrumento principal hoy es la tasa de interés de referencia.",
    commonMistake:
      "Pensar que 'imprimir dinero' siempre genera inflación inmediata. El efecto depende del contexto (demanda de dinero, expectativas, tipo de cambio).",
    reviewQuestion:
      "Si el BC sube fuerte la tasa, ¿qué efecto esperás sobre el consumo y la inversión?",
    reviewAnswer:
      "Caen: pedir prestado se vuelve caro y conviene más ahorrar. Las familias consumen menos a crédito y las empresas postergan inversiones. Por eso es una política contractiva: enfría la demanda.",
    legalAngle: {
      title: "Carta Orgánica del BCRA",
      body: "La Ley 24.144 fija los objetivos del BCRA y los límites a su financiamiento al Tesoro (adelantos transitorios, transferencia de utilidades). Las reformas históricas de la Carta Orgánica (1992, 2012, 2024) cambiaron el balance entre estabilidad monetaria y financiamiento del déficit.",
    },
  },
  {
    slug: "banco-central",
    title: "Banco Central",
    short: "Autoridad monetaria del país.",
    category: "Instituciones",
    level: "deep",
    definition:
      "Institución encargada de emitir la moneda, controlar la inflación y, según el régimen, regular bancos y reservas.",
    everydayExample:
      "En Argentina es el BCRA; en EE.UU., la Reserva Federal (Fed); en la UE, el Banco Central Europeo (BCE).",
    economicExample:
      "El BCRA fija la tasa de política monetaria, regula encajes y administra las reservas internacionales.",
    intuition:
      "Independencia del Banco Central → mejor control de inflación pero menos margen del gobierno para financiarse vía emisión.",
    commonMistake:
      "Pensar que el BC presta dinero a personas. Solo opera con bancos y el sector público.",
    reviewQuestion:
      "¿Por qué se considera importante la independencia del Banco Central?",
    reviewAnswer:
      "Porque si depende del gobierno de turno, es más probable que financie déficits emitiendo dinero, lo que termina en inflación. La independencia técnica permite priorizar la estabilidad de precios sobre las urgencias políticas.",
  },
  {
    slug: "oferta-y-demanda-agregada",
    title: "Oferta y demanda agregada",
    short: "Modelo OA-DA: precios y producto en equilibrio.",
    category: "Modelos básicos",
    level: "deep",
    definition:
      "Marco gráfico donde la demanda agregada (DA) muestra cuánto se quiere comprar a cada nivel de precios, y la oferta agregada (OA) cuánto se está dispuesto a producir.",
    everydayExample:
      "Como oferta y demanda de un mercado, pero a escala país: en el eje x va el PIB y en el y el nivel de precios.",
    economicExample:
      "Un shock de demanda positivo (más gasto público) desplaza la DA a la derecha → suben PIB y precios.",
    formula: "DA: Y = C + I + G + (X − M)",
    intuition:
      "Sirve para pensar shocks: ¿de demanda o de oferta? Cada uno mueve precios y PIB en distintas direcciones.",
    commonMistake:
      "Confundir oferta agregada con la oferta de un solo producto. La OA agrega la producción de toda la economía.",
    reviewQuestion:
      "Un shock negativo de oferta (suba del petróleo): ¿qué pasa con precios y PIB?",
    reviewAnswer:
      "Suben los precios y cae el PIB (estanflación). La curva de OA se desplaza a la izquierda: producir cuesta más, así que se produce menos y se vende más caro.",
  },

  // ─────────────────────────────────────────────────────────────
  // Categoría: Macro y derecho (puente para alumnos de derecho)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "presupuesto-nacional",
    title: "Presupuesto nacional",
    short: "Ley anual que autoriza gastos y proyecta recursos del Estado.",
    category: "Macro y derecho",
    level: "deep",
    plainDefinition:
      "Es la 'lista de compras' del Estado para el año, aprobada por ley. Estima cuánto va a recaudar y autoriza cuánto puede gastar cada ministerio. Sin esa autorización, el Poder Ejecutivo no puede gastar: es el principio de legalidad fiscal.",
    definition:
      "Plan financiero anual del Estado que estima ingresos públicos y autoriza gastos. Se aprueba por ley del Congreso bajo el régimen de la Ley 24.156 de Administración Financiera, en cumplimiento del art. 75 inciso 8 de la Constitución Nacional.",
    everydayExample:
      "Como el presupuesto anual de una familia: cuánto se proyecta cobrar de salarios y cómo se piensa repartirlo entre alquiler, comida, ahorro, etc. La diferencia: en el Estado lo aprueba el Congreso.",
    economicExample:
      "Si el Congreso no aprueba el presupuesto, rige el del año anterior 'reconducido' (art. 27 Ley 24.156). Esto pasó varias veces en Argentina y limita la capacidad del Ejecutivo de innovar en política fiscal.",
    intuition:
      "El presupuesto fija el límite legal del gasto público (G) y de la presión tributaria (T). Es el documento donde la macro se vuelve derecho positivo.",
    commonMistake:
      "Pensar que el presupuesto 'predice' lo que va a pasar. En realidad autoriza un máximo de gasto y proyecta recursos: la ejecución real puede ser muy distinta, sobre todo con alta inflación.",
    reviewQuestion:
      "¿Qué pasa si el Congreso no aprueba el presupuesto del año?",
    reviewAnswer:
      "Se reconduce el del año anterior (art. 27 Ley 24.156). El Ejecutivo gobierna con los créditos del ejercicio previo, lo que limita cambios de política y suele generar tensiones por reasignaciones por DNU.",
    legalAngle: {
      title: "Anclaje constitucional",
      body: "Art. 75 inc. 2 (impuestos) y 8 (presupuesto) CN. Ley 24.156 (Administración Financiera). Las modificaciones por DNU encuentran límites en el art. 99 inc. 3 CN (no puede usarse en materia tributaria) y en la Ley 26.122 que regula el control parlamentario.",
    },
    relatedTerms: ["Déficit fiscal", "Gasto público", "Política fiscal"],
  },
  {
    slug: "emergencia-economica",
    title: "Emergencia económica",
    short: "Régimen excepcional que habilita medidas que en tiempos normales serían inconstitucionales.",
    category: "Macro y derecho",
    level: "deep",
    plainDefinition:
      "Una ley que el Congreso dicta cuando la economía está en crisis fuerte y permite al Ejecutivo tomar medidas que normalmente no podría: cambiar moneda de contratos, congelar tarifas, renegociar deuda. La CSJN convalidó su uso varias veces, pero con límites.",
    definition:
      "Marco jurídico de excepción que delega facultades extraordinarias al Poder Ejecutivo para enfrentar crisis. La Ley 25.561 (2002) es el ejemplo paradigmático en Argentina: pesificó contratos, suspendió ejecuciones y cambió las reglas cambiarias.",
    everydayExample:
      "Como cuando una empresa entra en 'crisis' y el directorio aprueba medidas excepcionales que normalmente requerirían el voto de toda la asamblea: están permitidas porque la urgencia lo amerita, pero deben ser temporales y revisables.",
    economicExample:
      "La Ley 25.561 (enero 2002) terminó con la convertibilidad, pesificó deudas y dio origen a la 'pesificación asimétrica'. Varios fallos de la CSJN (Bustos 2004, Massa 2006, Rinaldi 2007) la convalidaron pero acotaron sus alcances.",
    intuition:
      "La emergencia justifica restringir derechos patrimoniales pero no extinguirlos: temporariedad, razonabilidad, fin público, no confiscación. Es el límite que pone la jurisprudencia al activismo estatal en macro.",
    commonMistake:
      "Pensar que la emergencia permite cualquier cosa. La CSJN exige que la medida sea proporcional, temporal y orientada a un fin público claro; si no, cae por inconstitucional.",
    reviewQuestion:
      "¿Qué tres requisitos exige la jurisprudencia de la CSJN para validar normas de emergencia económica?",
    reviewAnswer:
      "(1) situación real de emergencia, (2) finalidad pública legítima y (3) razonabilidad y temporalidad de los medios. Si la medida es definitiva o desproporcionada, deja de ser 'emergencia' y pasa a ser confiscación.",
    legalAngle: {
      title: "Jurisprudencia central",
      body: "CSJN: Peralta (1990), Smith (2002), Bustos (2004), Massa (2006), Rinaldi (2007). Discusión recurrente entre 'pesificación' y 'mantener moneda de origen'. La doctrina del 'esfuerzo compartido' nace de esta jurisprudencia.",
    },
    relatedTerms: ["Pesificación", "Convertibilidad"],
  },
  {
    slug: "deuda-soberana-fmi",
    title: "Deuda soberana y FMI",
    short: "Cómo se contrae deuda externa y qué rol juegan el Congreso y el FMI.",
    category: "Macro y derecho",
    level: "deep",
    plainDefinition:
      "Cuando un país pide plata afuera (a bonistas o al FMI), no es solo macro: es derecho. La Constitución exige que el Congreso intervenga en el endeudamiento externo. La Ley 27.612 ('Guzmán', 2021) endureció ese requisito para los acuerdos con el FMI.",
    definition:
      "Conjunto de obligaciones financieras del Estado nacional con acreedores externos. El art. 75 inc. 7 CN atribuye al Congreso 'arreglar el pago de la deuda interior y exterior'. La Ley 27.612 exige aprobación legislativa específica para acuerdos con el FMI y para emisiones de deuda en moneda extranjera bajo ley extranjera.",
    everydayExample:
      "Pedir un préstamo grande al banco requiere la firma de toda la familia, no solo del que va a la sucursal. Lo mismo el endeudamiento externo: requiere ley del Congreso, no solo decreto del Ejecutivo.",
    economicExample:
      "El acuerdo con el FMI de 2018 (USD 57.000 millones) y el de 2022 (refinanciación 'EFF') reabrieron la discusión sobre si los acuerdos requieren ley específica. La 27.612 dice que sí.",
    intuition:
      "La deuda soberana se rige a menudo por ley extranjera (Nueva York, Londres). Eso significa que un default puede llevar al país a tribunales de otra jurisdicción (caso 'fondos buitre', Griesa).",
    commonMistake:
      "Confundir 'reestructuración' con 'default'. Reestructurar es renegociar plazos y montos por acuerdo; el default es no pagar y suele activar cláusulas de aceleración (todo se vuelve exigible).",
    reviewQuestion:
      "¿Por qué un acuerdo con el FMI requiere ley del Congreso bajo la 27.612?",
    reviewAnswer:
      "Porque el art. 75 inc. 7 CN atribuye al Congreso 'arreglar el pago de la deuda exterior', y la 27.612 lo reglamentó exigiendo aprobación legislativa específica para acuerdos con el FMI y emisiones bajo ley extranjera. Antes era práctica que el Ejecutivo lo hiciera por decreto.",
    legalAngle: {
      title: "Marco normativo",
      body: "Art. 75 inc. 7 CN. Ley 27.612 (sostenibilidad de la deuda pública). Cláusulas de acción colectiva (CAC) en bonos modernos. Caso NML Capital v. Argentina (Griesa) y la Ley Cerrojo (26.017) y de Pago Soberano (26.984).",
    },
    relatedTerms: ["FMI", "Riesgo país"],
  },
  {
    slug: "regimen-cambiario",
    title: "Régimen cambiario y BCRA",
    short: "Quién regula el dólar y bajo qué normas.",
    category: "Macro y derecho",
    level: "deep",
    plainDefinition:
      "Las operaciones con dólares no son libres: están reguladas por la ley de cambios y por las comunicaciones del BCRA. Cuando hay 'cepo', se restringe quién puede comprar dólares, para qué y cuántos. Saltarse esas reglas puede ser delito (no infracción): Régimen Penal Cambiario.",
    definition:
      "Conjunto de normas que regulan la compra-venta de divisas. Núcleo: Ley 18.924 (Régimen de Cambios), Ley 19.359 (Régimen Penal Cambiario) y comunicaciones 'A' del BCRA (la Comunicación A 7030 fue el corazón del 'cepo' moderno).",
    everydayExample:
      "Comprar dólares es como entrar a un país: hay aduanas, requisitos, declaraciones juradas. El BCRA decide quién pasa, con qué documentación y por qué ventanilla.",
    economicExample:
      "El 'cepo' genera múltiples paridades: oficial, MEP, CCL, blue. La diferencia entre la oficial y las paralelas (brecha) refleja el grado de restricción. Mayor brecha → más distorsión sobre comercio exterior y precios.",
    intuition:
      "El mercado cambiario es probablemente el más reglamentado de la economía argentina. Para un abogado, dominar las comunicaciones del BCRA y la jurisprudencia del RPC es tan importante como entender la macro detrás.",
    commonMistake:
      "Suponer que el RPC es 'infracción administrativa'. Es derecho penal económico: tiene tipos penales propios, sanciones de prisión y un fuero específico (Penal Económico).",
    reviewQuestion:
      "¿Qué ley argentina tipifica como delito violar las normas cambiarias?",
    reviewAnswer:
      "La Ley 19.359 (Régimen Penal Cambiario), reformada por Ley 22.338. Las conductas se juzgan en el fuero Penal Económico (CABA) o federal (resto del país).",
    legalAngle: {
      title: "Stack normativo",
      body: "Ley 18.924 (cambios). Ley 19.359 / 22.338 (RPC). Carta Orgánica del BCRA (Ley 24.144). Comunicaciones 'A' del BCRA (texto ordenado de Cambios). En cada cambio de gobierno suele reformularse el régimen vía Comunicación A, sin tocar la ley.",
    },
    relatedTerms: ["Tipo de cambio", "Brecha cambiaria", "Banco Central"],
  },
  {
    slug: "indexacion-cer-uva",
    title: "Indexación: CER, UVA y sus límites legales",
    short: "Por qué indexar es un problema jurídico, no solo económico.",
    category: "Macro y derecho",
    level: "deep",
    plainDefinition:
      "Indexar es atar un contrato (alquiler, deuda, salario) a un índice de precios para que no se 'licue' con la inflación. Suena obvio, pero la Ley 23.928 (1991) lo prohibió como regla. El CER (deuda pública) y los créditos UVA son excepciones legales que existen a pesar de esa prohibición general.",
    definition:
      "Mecanismo por el cual el monto nominal de una obligación se ajusta periódicamente según un índice (IPC, costo de la construcción, etc.). En Argentina rige una prohibición general (arts. 7 y 10 de la Ley 23.928, mantenida por la Ley 25.561), con excepciones puntuales: CER (Decreto 214/2002, Ley 25.713) y UVA (Comunicación BCRA A 5945, 2016).",
    everydayExample:
      "Un alquiler 'ajustable por IPC' funciona así: si el IPC sube 8% en el período, el alquiler nominal sube 8%. El valor real (en bienes que se pueden comprar) se mantiene constante.",
    economicExample:
      "La deuda pública argentina en pesos está mayormente atada a CER (un coeficiente derivado del IPC). Si el IPC aumenta 200% en un año, el capital adeudado nominalmente se multiplica por 3.",
    intuition:
      "La indexación traslada el riesgo inflacionario del acreedor al deudor. Sin indexación, una inflación alta licúa deudas (favorece al deudor). Por eso es un campo de batalla jurídico recurrente.",
    commonMistake:
      "Creer que la indexación está 'permitida' en general. Sigue prohibida como regla; lo que existen son habilitaciones específicas (CER, UVA, ICL en alquileres bajo la 27.551 original, etc.) que la práctica jurídica fue puliendo a fuerza de fallos.",
    reviewQuestion:
      "¿Qué ley argentina prohíbe en general la indexación de obligaciones de dar sumas de dinero?",
    reviewAnswer:
      "La Ley 23.928 (de Convertibilidad), arts. 7 y 10. La prohibición se mantiene tras la salida de la convertibilidad por la Ley 25.561, con excepciones específicas (CER, UVA). Por eso cada nuevo mecanismo de ajuste requiere norma habilitante.",
    legalAngle: {
      title: "Marco y jurisprudencia",
      body: "Leyes 23.928 y 25.561. CER: Decreto 214/2002 y Ley 25.713. UVA: Comunicación BCRA A 5945 (2016). Jurisprudencia CSJN sobre 'esfuerzo compartido' y validez de cláusulas indexatorias en distintos contextos. Discusión actual: créditos UVA y reglas de actualización en alquileres tras reformas de la Ley 27.551.",
    },
    relatedTerms: ["Inflación", "IPC"],
  },
  {
    slug: "autonomia-bcra",
    title: "Autonomía del Banco Central",
    short: "Por qué importa que el BCRA no dependa del gobierno de turno.",
    category: "Macro y derecho",
    level: "deep",
    plainDefinition:
      "Si el Banco Central depende del Ministerio de Economía, cada vez que falte plata se va a 'imprimir' para tapar el agujero. Eso lleva a inflación. La autonomía busca que el BCRA tenga objetivos propios (estabilidad monetaria) y límites a financiar al Tesoro, fijados por ley.",
    definition:
      "Capacidad institucional del BCRA de fijar y ejecutar la política monetaria sin instrucciones directas del Poder Ejecutivo. Su régimen está en la Carta Orgánica (Ley 24.144), que ha sido reformada en 1992, 2012 y 2024 con cambios significativos en el balance entre estabilidad e financiamiento del déficit.",
    everydayExample:
      "Es como una caja de ahorro familiar manejada por una persona elegida por consenso, con reglas claras: 'no se saca plata para gastos comunes salvo emergencia'. Cuando la regla se rompe seguido, la caja se vacía.",
    economicExample:
      "Los 'adelantos transitorios' al Tesoro (art. 20 Ley 24.144) son préstamos del BCRA al gobierno con tope legal. Cuando se exceden, hace falta una ley específica o el uso de 'utilidades contables' del BCRA, lo que generó debate jurídico recurrente.",
    intuition:
      "Una BCRA autónoma promete inflación más baja a costa de menos margen para financiar déficit. El precio político de esa autonomía es alto y por eso suele revisarse cada vez que cambia el gobierno.",
    commonMistake:
      "Confundir autonomía con independencia absoluta. El BCRA siempre rinde cuentas al Congreso (informes, balance anual). Autonomía no es opacidad: es independencia técnica con control político.",
    reviewQuestion:
      "¿Cuál es el principal mecanismo legal por el cual el BCRA puede financiar al Tesoro y cómo se limita?",
    reviewAnswer:
      "Los adelantos transitorios (art. 20 Ley 24.144), con un tope expresado como porcentaje de la base monetaria y de los recursos en efectivo del Tesoro. Excederlo requiere ley específica. La transferencia de 'utilidades contables' es la otra vía, también limitada y muy debatida.",
    legalAngle: {
      title: "Carta Orgánica",
      body: "Ley 24.144 y sus reformas (1992, 2012, 2024). Discusión sobre el 'mandato dual' (estabilidad + actividad) vs 'mandato simple' (solo estabilidad). En el derecho comparado: Federal Reserve Act (EE.UU.), Tratado de la UE (BCE).",
    },
    relatedTerms: ["Banco Central", "Política monetaria", "Emisión monetaria"],
  },
];
