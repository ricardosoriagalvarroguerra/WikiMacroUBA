import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { MATH } from "../data/math";

export default function MathIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Matemática aplicada"
        title="Matemática básica para macroeconomía"
        subtitle="Desde porcentajes hasta valor presente, paso a paso, con ejercicios."
      />
      <ol className="border-t border-neutral-200 divide-y divide-neutral-200">
        {MATH.map((m, i) => (
          <li key={m.slug}>
            <Link
              to={`/matematica/${m.slug}`}
              className="flex gap-4 py-4 group items-baseline"
            >
              <span className="font-mono text-xs text-neutral-400 w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block font-serif text-base text-neutral-900 group-hover:underline underline-offset-4">
                  {m.title}
                </span>
                <span className="block text-sm text-neutral-500 mt-0.5">
                  {m.short}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
