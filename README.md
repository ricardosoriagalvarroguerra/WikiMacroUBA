# Wiki de Macroeconomía · Maestría en Economía y Derecho · UBA

Wiki didáctica para acompañar la cátedra de Macroeconomía. Pensada para
estudiantes con conocimiento nulo o muy básico de macroeconomía y matemática
financiera.

## Stack

- **Vite + React 19 + TypeScript**
- **React Router** (navegación cliente)
- **Tailwind CSS** (estilos)
- **D3.js** (gráficos y simuladores interactivos)
- **KaTeX** (renderizado de fórmulas)

## Scripts

```bash
npm install        # instalar dependencias
npm run dev        # entorno de desarrollo (http://localhost:5173)
npm run build      # build de producción → carpeta dist/
npm run preview    # servir el build localmente
```

## Estructura

```
src/
  components/      # Layout, PageHeader, Callout
  data/            # contenido editable (clases, conceptos, math, glosario)
  interactives/    # simuladores con D3 (PIB, inflación, interés compuesto, OA-DA, etc.)
  pages/           # rutas (Home, Clases, Conceptos, Matemática, Interactivos, Noticias, FAQ, Glosario, Ruta)
```

## Cómo agregar una nueva clase

Editar `src/data/classes.ts` y completar un nuevo objeto siguiendo el formato:

```ts
{
  id: "clase-02",
  number: 2,
  title: "Clase 2 · …",
  link: "https://…",
  status: "publicada",
  summary: "…",
  keyConcepts: [{ slug: "pib", label: "PIB" }],
  reviewQuestions: ["…"],
}
```

## Cómo agregar un concepto

Editar `src/data/concepts.ts` y agregar un objeto con `slug`, `title`,
`category`, `definition`, `everydayExample`, `economicExample`, `intuition`,
`commonMistake`, `reviewQuestion` y opcionalmente `formula`.

## Cómo agregar un tema de matemática

Editar `src/data/math.ts` siguiendo el formato existente: explicación,
fórmula, ejemplo resuelto paso a paso, ejercicio para practicar e
interpretación económica.

## Cómo agregar un nuevo simulador interactivo

1. Crear un componente en `src/interactives/MiSimulador.tsx` envuelto en
   `<InteractiveShell>` para mantener el formato (objetivo, variables, qué
   observar, interpretación).
2. Importarlo y renderizarlo en `src/pages/Interactive.tsx`.
3. Para gráficos, reutilizá `D3LineChart` o construí uno propio dentro del
   componente con un `useEffect` + D3.

## Persistencia compartida

Las secciones **Noticias** y **Dudas/FAQ** guardan los aportes de los alumnos
en el servidor (archivo JSON), de modo que toda la cátedra ve las mismas
entradas. Cada alumno se identifica con su nombre al subir un aporte.

- En desarrollo: los datos viven en `./data/news.json` y `./data/faq.json`
  (gitignored).
- En Railway: definir un **Volume** y la variable de entorno `DATA_DIR`
  apuntando al mount path del volumen (por ejemplo `/data`). Ver "Deploy".

El endpoint `GET /api/news` devuelve el listado completo; `POST /api/news`
agrega una entrada (el server intenta resolver Open Graph para mostrar
miniatura y título de la noticia); `DELETE /api/news/:id` la elimina para
todos.

## Deploy en Railway

1. Crear un nuevo servicio apuntando a este repo. Railway detecta Node y usa
   `railway.json`:
   - Build: `npm ci && npm run build`
   - Start: `npm start`
   - Healthcheck: `/api/health`
2. Agregar un **Volume** al servicio. Mount path sugerido: `/data`.
3. Agregar la variable de entorno `DATA_DIR=/data` para que el servidor
   persista las noticias y dudas en el volumen entre deploys.
4. (Opcional) `PORT` lo inyecta Railway automáticamente; el server lo
   respeta.

Sin volumen los datos se pierden al re-deployar. Con el volumen montado en
`DATA_DIR` cualquier alumno o profesor que abra la app ve los aportes que
subieron los demás.
