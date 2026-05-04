import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";

const NAV: { label: string; to: string }[] = [
  { to: "/", label: "Inicio" },
  { to: "/empezar", label: "Empezá por acá" },
  { to: "/ruta", label: "Ruta de aprendizaje" },
  { to: "/clases", label: "Clases" },
  { to: "/conceptos", label: "Conceptos" },
  { to: "/matematica", label: "Matemática" },
  { to: "/interactivos", label: "Interactivos" },
  { to: "/noticias", label: "Noticias" },
  { to: "/dudas", label: "Dudas" },
  { to: "/glosario", label: "Glosario" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-white text-neutral-900">
      <aside
        className={`fixed lg:sticky lg:top-0 z-30 inset-y-0 left-0 h-screen w-[17rem] xl:w-72 shrink-0 bg-white border-r border-neutral-200 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200`}
      >
        <div className="px-5 sm:px-6 pt-7 lg:pt-8 pb-6">
          <Link to="/" onClick={() => setOpen(false)} className="block">
            <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              Macroeconomía · UBA
            </div>
            <div className="font-serif text-xl mt-1 text-neutral-900">
              Wiki de cátedra
            </div>
          </Link>
        </div>
        <nav className="px-3 pb-6 text-sm overflow-y-auto max-h-[calc(100vh-7rem)]">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded transition-colors ${
                  isActive
                    ? "text-neutral-900 bg-neutral-100"
                    : "text-neutral-600 hover:text-neutral-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-white border-b border-neutral-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1 text-neutral-600"
            aria-label="Menú"
          >
            ☰
          </button>
          <span className="font-serif">Wiki Macro</span>
          <span className="w-6" />
        </header>
        {open && (
          <div
            className="lg:hidden fixed inset-0 bg-black/20 z-20"
            onClick={() => setOpen(false)}
          />
        )}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 py-8 sm:py-10 lg:py-12">
          <Outlet />
        </main>
        <footer className="px-6 py-6 text-xs text-neutral-400 text-center">
          Material de apoyo de cátedra.
        </footer>
      </div>
    </div>
  );
}
