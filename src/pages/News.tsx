import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Callout from "../components/Callout";

type Preview = {
  url: string;
  image: string | null;
  title: string | null;
  description: string | null;
  site: string | null;
} | null;

type NewsEntry = {
  id: string;
  createdAt?: string;
  author: string;
  url: string;
  date: string;
  source: string;
  region: string;
  topic: string;
  summary: string;
  concepts: string;
  questions: string;
  preview: Preview;
};

const empty = {
  author: "",
  url: "",
  date: "",
  source: "",
  region: "",
  topic: "",
  summary: "",
  concepts: "",
  questions: "",
};

const AUTHOR_KEY = "wiki-macro:author";

export default function News() {
  const [entries, setEntries] = useState<NewsEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState({ ...empty });
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<Preview>(null);
  const [previewing, setPreviewing] = useState(false);

  // Restore the last author name used in this browser to ease repeated submissions
  useEffect(() => {
    const stored = localStorage.getItem(AUTHOR_KEY);
    if (stored) setDraft((d) => ({ ...d, author: stored }));
  }, []);

  // Initial load from API
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/news");
        if (!r.ok) throw new Error("respuesta inválida");
        const data: NewsEntry[] = await r.json();
        if (!cancelled) setEntries(data);
      } catch (e) {
        if (!cancelled) setError("No se pudieron cargar las noticias.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-fetch link preview after URL stops changing
  useEffect(() => {
    const url = draft.url.trim();
    setPreview(null);
    if (!/^https?:\/\//i.test(url)) return;
    setPreviewing(true);
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/og?url=${encodeURIComponent(url)}`, {
          signal: ctrl.signal,
        });
        if (!r.ok) return;
        const data = await r.json();
        setPreview(data);
      } catch {
        /* ignore */
      } finally {
        setPreviewing(false);
      }
    }, 600);
    return () => {
      clearTimeout(t);
      ctrl.abort();
      setPreviewing(false);
    };
  }, [draft.url]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.url.trim() || !draft.author.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, preview }),
      });
      if (!r.ok) {
        const body = await r.json().catch(() => ({}));
        throw new Error(body.error || "No se pudo guardar.");
      }
      const created: NewsEntry = await r.json();
      setEntries((prev) => [created, ...prev]);
      localStorage.setItem(AUTHOR_KEY, draft.author.trim());
      setDraft({ ...empty, author: draft.author.trim() });
      setPreview(null);
    } catch (err: any) {
      setError(err?.message || "Error al guardar.");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar esta noticia para todos?")) return;
    try {
      const r = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (!r.ok && r.status !== 204) throw new Error();
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError("No se pudo eliminar la noticia.");
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "noticias-macro.json";
    a.click();
  };

  return (
    <>
      <PageHeader
        eyebrow="Aplicación a la actualidad"
        title="Noticias económicas"
        subtitle="Pegá una noticia, vinculala con los conceptos vistos en clase y dejá tus preguntas. Las entradas se comparten entre todos los alumnos y la cátedra."
      />

      <Callout title="Cómo usar">
        Las noticias se guardan en el servidor y son visibles para toda la
        cátedra. Poné tu nombre así sabemos quién subió cada aporte. Si pegás un
        link, vamos a buscar automáticamente la miniatura y el título de la
        noticia.
      </Callout>

      <form onSubmit={submit} className="my-10 grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Tu nombre *"
            value={draft.author}
            onChange={(v) => setDraft({ ...draft, author: v })}
            placeholder="Nombre Apellido"
            required
          />
          <Field
            label="Link *"
            value={draft.url}
            onChange={(v) => setDraft({ ...draft, url: v })}
            placeholder="https://…"
            required
            type="url"
          />
        </div>

        {(previewing || preview?.image || preview?.title) && (
          <PreviewCard preview={preview} loading={previewing} />
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Fecha" type="date" value={draft.date} onChange={(v) => setDraft({ ...draft, date: v })} />
          <Field label="Fuente" value={draft.source} onChange={(v) => setDraft({ ...draft, source: v })} placeholder="La Nación, Bloomberg, FT…" />
          <Field label="País / región" value={draft.region} onChange={(v) => setDraft({ ...draft, region: v })} placeholder="Argentina, Eurozona, Global…" />
          <Field label="Tema" value={draft.topic} onChange={(v) => setDraft({ ...draft, topic: v })} placeholder="Inflación, política monetaria, FX…" />
          <Field label="Conceptos vistos en clase" value={draft.concepts} onChange={(v) => setDraft({ ...draft, concepts: v })} placeholder="PIB, IPC, tasa de interés…" />
        </div>
        <Textarea label="Resumen" value={draft.summary} onChange={(v) => setDraft({ ...draft, summary: v })} placeholder="¿Qué dice la noticia en 2-3 frases?" />
        <Textarea label="Preguntas o dudas" value={draft.questions} onChange={(v) => setDraft({ ...draft, questions: v })} placeholder="¿Qué no termino de entender?" />

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="submit"
            className="btn"
            disabled={submitting || !draft.url.trim() || !draft.author.trim()}
          >
            {submitting ? "Guardando…" : "Guardar"}
          </button>
          <button
            type="button"
            onClick={exportJson}
            className="btn-secondary"
            disabled={entries.length === 0}
          >
            Exportar JSON
          </button>
        </div>
      </form>

      <div className="space-y-0 border-t border-neutral-200 divide-y divide-neutral-200">
        {loading && (
          <p className="text-sm text-neutral-500 py-6">Cargando noticias…</p>
        )}
        {!loading && entries.length === 0 && (
          <p className="text-sm text-neutral-500 py-6">
            No hay noticias todavía. Subí la primera.
          </p>
        )}
        {entries.map((e) => (
          <NewsItem key={e.id} entry={e} onRemove={() => remove(e.id)} />
        ))}
      </div>
    </>
  );
}

function NewsItem({
  entry,
  onRemove,
}: {
  entry: NewsEntry;
  onRemove: () => void;
}) {
  const p = entry.preview;
  const title = p?.title ?? entry.url;
  const desc = p?.description;
  const site = p?.site || hostnameOf(entry.url);

  return (
    <article className="py-5">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {p?.image ? (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full sm:w-40 shrink-0"
          >
            <img
              src={p.image}
              alt=""
              loading="lazy"
              className="w-full sm:w-40 h-32 object-cover rounded border border-neutral-200 bg-neutral-100"
              onError={(ev) => {
                (ev.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </a>
        ) : (
          <div className="hidden sm:block w-40 h-32 shrink-0 rounded border border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center">
            <span className="text-[10px] text-neutral-400">sin miniatura</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-3">
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm sm:text-base text-neutral-900 font-serif leading-snug hover:underline underline-offset-2"
            >
              {title}
            </a>
            <button
              onClick={onRemove}
              className="text-xs text-neutral-400 hover:text-red-700 shrink-0"
            >
              eliminar
            </button>
          </div>
          {desc && (
            <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
              {desc}
            </p>
          )}
          <div className="text-xs text-neutral-500 mt-2 flex flex-wrap gap-x-3 gap-y-1">
            <span className="font-medium text-neutral-700">
              {entry.author}
            </span>
            {entry.date && <span>{entry.date}</span>}
            {site && <span>{site}</span>}
            {entry.source && <span>{entry.source}</span>}
            {entry.region && <span>{entry.region}</span>}
            {entry.topic && <span className="pill">{entry.topic}</span>}
          </div>
          {entry.summary && (
            <p className="text-sm text-neutral-700 mt-3">{entry.summary}</p>
          )}
          {entry.concepts && (
            <p className="text-xs text-neutral-500 mt-2">
              <span className="text-neutral-400">Conceptos: </span>
              {entry.concepts}
            </p>
          )}
          {entry.questions && (
            <p className="text-xs text-neutral-700 mt-1">
              <span className="text-neutral-400">Dudas: </span>
              {entry.questions}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function PreviewCard({
  preview,
  loading,
}: {
  preview: Preview;
  loading: boolean;
}) {
  if (loading && !preview) {
    return (
      <div className="text-xs text-neutral-500 border border-dashed border-neutral-300 rounded p-3">
        Buscando miniatura del link…
      </div>
    );
  }
  if (!preview) return null;
  return (
    <div className="border border-neutral-200 rounded-md p-3 flex gap-3 items-start bg-neutral-50">
      {preview.image && (
        <img
          src={preview.image}
          alt=""
          className="w-24 h-20 object-cover rounded shrink-0"
          onError={(ev) => {
            (ev.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-1">
          Vista previa del link
        </div>
        {preview.title && (
          <p className="text-sm text-neutral-900 font-serif leading-snug">
            {preview.title}
          </p>
        )}
        {preview.description && (
          <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
            {preview.description}
          </p>
        )}
        {preview.site && (
          <p className="text-[10px] text-neutral-500 mt-1">{preview.site}</p>
        )}
      </div>
    </div>
  );
}

function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="block text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-1">
        {label}
      </span>
      <input
        type={type ?? "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border-b border-neutral-300 focus:border-neutral-900 outline-none px-1 py-1.5 bg-transparent"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="block text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-1">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full border border-neutral-200 rounded px-3 py-2 focus:border-neutral-900 outline-none"
      />
    </label>
  );
}
