type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export default function PageHeader({ title, subtitle, eyebrow }: Props) {
  return (
    <header className="mb-8 sm:mb-10 max-w-4xl">
      {eyebrow && (
        <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
          {eyebrow}
        </div>
      )}
      <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl font-medium text-neutral-900 leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-neutral-600 mt-3 text-base sm:text-lg leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}
