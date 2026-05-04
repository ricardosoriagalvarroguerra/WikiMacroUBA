import type { ReactNode } from "react";

type Props = {
  title: string;
  goal: string;
  variables: string[];
  observe: string;
  interpretation: string;
  children: ReactNode;
};

export default function InteractiveShell({
  title,
  goal,
  variables,
  observe,
  interpretation,
  children,
}: Props) {
  return (
    <section className="my-12 pt-10 border-t border-neutral-200 first:border-t-0 first:pt-0 first:mt-0">
      <h3 className="font-serif text-xl text-neutral-900 mb-4">{title}</h3>

      <div className="text-sm text-neutral-700 leading-relaxed space-y-1.5 mb-6 max-w-2xl">
        <p>
          <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mr-2">
            Objetivo
          </span>
          {goal}
        </p>
        <p>
          <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mr-2">
            Variables
          </span>
          {variables.join(" · ")}
        </p>
        <p>
          <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mr-2">
            Qué observar
          </span>
          {observe}
        </p>
        <p>
          <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mr-2">
            Interpretación
          </span>
          {interpretation}
        </p>
      </div>

      <div>{children}</div>
    </section>
  );
}
