import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";
import CompoundInterest from "../interactives/CompoundInterest";
import PIBGrowth from "../interactives/PIBGrowth";
import InflationSim from "../interactives/InflationSim";
import NominalVsReal from "../interactives/NominalVsReal";
import PurchasingPower from "../interactives/PurchasingPower";
import BusinessCycle from "../interactives/BusinessCycle";
import ASAD from "../interactives/ASAD";
import FX from "../interactives/FX";
import Multiplier from "../interactives/Multiplier";

const ITEMS = [
  { id: "pib", title: "Crecimiento del PIB", group: "Producción y crecimiento" },
  { id: "ciclo", title: "Ciclo económico", group: "Producción y crecimiento" },
  { id: "nom-real", title: "PIB nominal vs real", group: "Producción y crecimiento" },
  { id: "inflacion", title: "Salario nominal vs real", group: "Inflación y poder de compra" },
  { id: "panes", title: "Poder adquisitivo", group: "Inflación y poder de compra" },
  { id: "interes", title: "Interés compuesto vs simple", group: "Finanzas" },
  { id: "fx", title: "Tipo de cambio", group: "Sector externo" },
  { id: "multiplicador", title: "Multiplicador keynesiano", group: "Demanda agregada" },
  { id: "asad", title: "Oferta y demanda agregada", group: "Demanda agregada" },
];

export default function Interactive() {
  const groups = ITEMS.reduce<Record<string, typeof ITEMS>>((acc, it) => {
    (acc[it.group] ||= []).push(it);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow="Calculadoras y simuladores"
        title="Ejemplos interactivos"
        subtitle="Movés los controles, probás escenarios prefijados y observás cómo cambian los gráficos, los números y la fórmula."
      />
      <Callout title="Cómo aprovecharlos">
        En cada ejemplo aclaramos qué mirar y qué intuición económica deja.
        Pasá el mouse por encima de los gráficos para ver valores punto a punto.
      </Callout>

      <nav className="my-8">
        <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
          Índice
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {Object.entries(groups).map(([group, list]) => (
            <div key={group}>
              <div className="text-xs text-neutral-500 mb-1">{group}</div>
              <ul>
                {list.map((it) => (
                  <li key={it.id}>
                    <a
                      href={`#${it.id}`}
                      className="text-neutral-700 hover:text-neutral-900 underline decoration-neutral-200 hover:decoration-neutral-900 underline-offset-2"
                    >
                      {it.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div id="pib"><PIBGrowth /></div>
      <div id="ciclo"><BusinessCycle /></div>
      <div id="nom-real"><NominalVsReal /></div>
      <div id="inflacion"><InflationSim /></div>
      <div id="panes"><PurchasingPower /></div>
      <div id="interes"><CompoundInterest /></div>
      <div id="fx"><FX /></div>
      <div id="multiplicador"><Multiplier /></div>
      <div id="asad"><ASAD /></div>
    </>
  );
}
