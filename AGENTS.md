# Proyecto: Escuela de Posgrado UNSAAC

## Objetivo del sistema
Sitio web institucional moderno para la Escuela de Posgrado UNSAAC, enfocado en informar, comunicar y mostrar programas académicos de forma clara y profesional.

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool |
| TypeScript | 6 | Lenguaje |
| Tailwind CSS | 4 | Estilos (vía `@tailwindcss/vite`) |
| shadcn/ui | 4 (radix-nova) | Componentes UI base |
| React Router DOM | 7 | Enrutamiento |
| Lucide React | 1 | Iconos |
| Geist Variable | 5 | Tipografía sans (Geist Variable) — reemplazada por Montserrat Alternates |
| Montserrat Alternates | 5 | Tipografía sans principal |
| Neuton | 5 | Tipografía serif para headings |
| Pridi | 5 | Tipografía serif adicional |
| CVA + clsx + tailwind-merge | — | Utilidades de clases |
| tw-animate-css | 1 | Animaciones |
| radix-ui | 1 | Primitivas de accesibilidad |

**Scripts:**
- `pnpm run dev` — Inicia servidor de desarrollo
- `pnpm run build` — `tsc -b && vite build`
- `pnpm run lint` — ESLint
- `pnpm run preview` — Vista previa del build

---

## Arquitectura del proyecto

```
src/
├── main.tsx                       # Entry point (StrictMode + index.css)
├── App.tsx                        # Router con todas las rutas
├── index.css                      # Tailwind v4 CSS-first + tokens oklch
├── assets/                        # Static assets (hero.png, svgs)
├── components/
│   ├── ui/                        # 10 componentes shadcn/ui base
│   │   ├── accordion.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   └── tabs.tsx
│   ├── home/                      # 7 secciones del Home
│   │   ├── HeroSection.tsx
│   │   ├── RectorMessage.tsx
│   │   ├── AdmissionCTA.tsx
│   │   ├── LatestComunicados.tsx
│   │   ├── FeaturedPrograms.tsx
│   │   ├── StudentFAQ.tsx
│   │   └── AdmissionTimeline.tsx
│   ├── shared/                    # 7 componentes reutilizables
│   │   ├── PageHero.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Tabs.tsx
│   │   ├── PresentacionTab.tsx
│   │   ├── MallaCurricularTab.tsx
│   │   ├── InversionBecasTab.tsx
│   │   └── LineasInvestigacionTab.tsx
│   ├── Header.tsx                 # Navbar con panel mobile
│   └── Footer.tsx                 # Footer institucional
├── pages/                         # 6 páginas del sistema
│   ├── Home.tsx
│   ├── Comunicados.tsx
│   ├── ComunicadoDetalle.tsx
│   ├── ProcesoAdmision.tsx
│   ├── ProgramList.tsx
│   └── ProgramDetail.tsx
├── layouts/
│   └── InstitutionalLayout.tsx    # Wrapper Header + Outlet + Footer
├── data/
│   └── comunicados.ts             # Datos estáticos de comunicados
├── types/
│   └── index.ts                   # Interfaces TypeScript globales
├── services/
│   └── api.ts                     # Placeholder para API externa
├── lib/
│   └── utils.ts                   # Función cn() (clsx + tailwind-merge)
└── hooks/                         # Directorio vacío (disponible)
```

---

## Configuración técnica

### vite.config.ts
- Plugin `@tailwindcss/vite` (no PostCSS)
- Plugin `@vitejs/plugin-react`
- Alias `@` → `./src`

### TypeScript
- `tsconfig.json` con project references: `tsconfig.app.json` + `tsconfig.node.json`
- Target: ES2023, JSX: react-jsx
- Path alias: `@/*` → `./src/*`
- Strict mode: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`

### components.json (shadcn/ui)
- Style: `radix-nova`
- Base color: `neutral`
- CSS variables: enabled
- Icon library: `lucide`

### lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Sistema de rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Landing page con 6 secciones |
| `/comunicados` | `Comunicados` | Listado de comunicados |
| `/comunicados/:slug` | `ComunicadoDetalle` | Detalle de comunicado |
| `/proceso-admision` | `ProcesoAdmision` | Timeline de admisión |
| `/:tipo` | `ProgramList` | Listado de programas por tipo |
| `/:tipo/:slug` | `ProgramDetail` | Detalle de programa |

Todas las rutas usan `InstitutionalLayout` en `App.tsx`:
```tsx
<Route element={<InstitutionalLayout />}>
  {/* rutas aquí */}
</Route>
```

### InstitutionalLayout
```tsx
<div className="flex min-h-screen flex-col">
  <Header />
  <main className="flex-1"><Outlet /></main>
  <Footer />
</div>
```

---

# 🎨 Sistema de Diseño: Tokens CSS (oklch - Tailwind v4)

Definidos en `src/index.css` con `@theme inline {}`.

## Modo Claro

| Variable | Valor oklch | Significado |
|---|---|---|
| `--background` | `0.985 0.005 55` | Fondo cálido sofisticado (Blanco con matiz cremoso) |
| `--foreground` | `0.147 0.012 20` | Texto principal (Casi negro con tinte guinda sutil) |
| `--primary` | `0.27 0.16 20` | Color institucional principal (Guinda Granate Profundo) |
| `--primary-foreground` | `0.97 0.004 55` | Texto sobre fondo primary (Blanco cálido armonioso) |
| `--secondary` | `0.62 0.18 72` | Color de acento UI (Dorado Elegante contenido) |
| `--secondary-foreground` | `0.12 0.01 20` | Texto sobre fondo dorado (Casi negro) |
| `--muted` | `0.92 0.006 55` | Fondos alternos con calidez, secciones secundarias |
| `--muted-foreground` | `0.38 0.018 24` | Texto secundario, párrafos y metadatos (Gris con carácter) |
| `--border` | `0.84 0.008 55` | Bordes de componentes y líneas divisorias cálidos |
| `--radius` | `0.625rem` | Radio base |
| `--font-sans` | `'Geist Variable', sans-serif` | Tipografía sans |
| `--font-heading` | `'Neuton', serif` | Tipografía serif (Neuton) |
| `--font-sans` | `'Montserrat Alternates', sans-serif` | Tipografía sans (Montserrat Alternates) |

Modo oscuro activado con clase `.dark` en ancestro.

## Mapeo semántico de colores

| Elemento de diseño | Token |
|---|---|---|
| Fondos principales (Blanco Lienzo con calidez) | `bg-background` o `bg-card` |
| Títulos (Gris oscuro profundo) | `text-foreground` |
| Textos y párrafos (Gris mitigado con carácter) | `text-muted-foreground` |
| Detalles decorativos (Tinte guinda/gris suave) | `bg-muted`, `bg-primary/10` |
| Estructuras, Banners y Headers (Guinda #6B1426) | `bg-primary` |
| Botones destacados / Acciones (Dorado #C98A1F) | `bg-secondary` + `hover:bg-secondary/90` |
| Líneas y bordes corporativos | `border-border` o `border-primary/20` |

## Reglas de color

| Token | Usar para | NO usar para |
|---|---|---|
| `bg-foreground` | ❌ | PROHIBIDO como fondo |
| `text-foreground` | Títulos, texto sobre `bg-secondary` | Texto sobre `bg-primary` |
| `text-muted-foreground` | Párrafos, descripciones de sección | Títulos |
| `text-primary` | Enlaces aislados, acentos de texto guinda | Párrafos largos |
| `bg-primary` | Banners institucionales, Headers, CTAs | Fondo general de la aplicación |
| `bg-secondary` | Botones destacados (Descargar, Postular, Admisión) | Párrafos o bloques de texto |
| `bg-muted/30` | Secciones con fondo suave alterno | — |
| `bg-muted/50` | Footer institucional, hover states | — |
| `bg-muted/60` | Badges informativos, metadata, placeholders | — |
## 📌 Sistema de Tipografía

### Reglas generales
- **Títulos (H1-H4):** `font-heading` + `font-light` + `uppercase` + `tracking-wide`. Prohibido `font-bold`, `font-semibold`, `font-medium`, `tracking-tight`, `capitalize`, `normal-case`.
- **Contenido:** `font-sans` + `font-light` + `leading-relaxed`.
- **Botones, nav y UI:** `font-sans` + `uppercase` + `tracking-widest`.
- **`font-normal` permitido solo en:** Nav links, botones CTA, footer links, footer copyright.
- **`font-light` obligatorio** en: títulos (H1-H4), contenido, badges, nombres autoridad, cargos, step pill, count.

### 🚫 Prohibiciones
- Prohibido `text-[X]` arbitrario, `text-md` (no existe en Tailwind)
- Prohibido `font-semibold`, `font-bold`, `font-medium` en títulos
- Prohibido `tracking-tight`, `capitalize`, `normal-case` en títulos
- Solo tokens estándar: `text-xs`(12px), `text-sm`(14px), `text-base`(16px), `text-lg`(18px), `text-xl`(20px), `text-2xl`(24px), `text-3xl`(30px), `text-4xl`(36px), `text-5xl`(48px), `text-6xl`(60px)

### Tabla completa de estilos tipográficos

| Elemento | Font | Size | Weight | Case | Tracking | Color | Dónde se usa |
|---|---|---|---|---|---|---|---|
| **HEADINGS** | | | | | | | |
| H1 página | `font-heading` | `text-4xl sm:text-5xl` | `font-light` | `uppercase` | `tracking-wide` | `text-foreground` | PageHero, Comunicados, ProgramList, ProgramDetail |
| H1 hero institucional | `font-heading` | `text-4xl sm:text-5xl lg:text-6xl` | `font-light` | `uppercase` | `tracking-wide` | `text-foreground` | HeroSection (única excepción) |
| H1 error/empty state | `font-heading` | `text-4xl sm:text-5xl` | `font-light` | `uppercase` | `tracking-wide` | `text-foreground` | ComunicadoDetalle, ProgramDetail, ProgramList |
| H2 sección | `font-heading` | `text-3xl sm:text-4xl` | `font-light` | `uppercase` | `tracking-wide` | `text-foreground` | RectorMessage, FeaturedPrograms, StudentFAQ, AdmissionTimeline, LatestComunicados, Comunicados, tabs de detalle |
| H2 sección en CTA | `font-heading` | `text-3xl sm:text-4xl` | `font-light` | `uppercase` | `tracking-wide` | `text-primary-foreground` | AdmissionCTA, ProcesoAdmision, CTA en Comunicados/ComunicadoDetalle |
| H3 card título | `font-heading` | `text-lg` | `font-light` | `uppercase` | `tracking-wide` | `text-foreground` | Card destacado Comunicados, cards ProgramList, StudentFAQ items, Inversión cards, LatestComunicados destacada |
| H3 card en CTA | `font-heading` | `text-lg` | `font-light` | `uppercase` | `tracking-wide` | `text-primary-foreground` | Sidebar eventos header (LatestComunicados) |
| H3 step título | `font-heading` | `text-sm` | `font-light` | `uppercase` | `tracking-wide` | `text-foreground` | AdmissionTimeline (mobile y desktop card) |
| H3 panel nav título | `font-heading` | `text-4xl` | `font-light` | `—` | `tracking-wide` | `text-primary-foreground` | Header panel |
| H4 card secundario | `font-heading` | `text-xs` | `font-light` | `uppercase` | `tracking-wide` | `text-foreground` | Noticia secundaria (LatestComunicados), modalidad (InversionBecasTab) |
| H4 en CTA sidebar | `font-heading` | `text-xs` | `font-light` | `uppercase` | `tracking-wide` | `text-primary-foreground` | Evento title en sidebar (LatestComunicados) |
| Step pill número (mobile) | `font-heading` | `text-xs` | `font-light` | `—` | `—` | `text-foreground` | AdmissionTimeline mobile |
| Step pill número (desktop) | `font-heading` | `text-3xl` | `font-light` | `—` | `—` | `text-muted-foreground` | AdmissionTimeline desktop |
| Header brand | `font-heading` | `text-sm` | `font-light` | `—` | `—` | — | "Posgrado UNSAAC" |
| Footer brand | `font-heading` | `text-base` | `font-light` | `—` | `tracking-wide` | — | "Escuela de Posgrado UNSAAC" |
| Footer título sección | `font-heading` | `text-xs` | `font-light` | `uppercase` | `tracking-widest` | `text-foreground` | "Programas", "Información" |
| Accordion trigger | `font-heading` | `text-sm` | `—` | `—` | `tracking-wide` | — | Accordion base |
| Sheet título | `font-heading` | `text-base` | `font-medium` | `—` | `—` | `text-foreground` | Sheet title |
| **SUBTÍTULOS & DESCRIPCIONES** | | | | | | | |
| Subtítulo hero | `font-sans` | `text-base` | `font-light` | `—` | `—` | `text-muted-foreground` | Debajo H1 en HeroSection, PageHero |
| Subtítulo sección | `font-sans` | `text-base` | `font-light` | `—` | `—` | `text-muted-foreground` | Debajo H2 en secciones normales |
| Subtítulo en CTA | `font-sans` | `text-base` | `font-light` | `—` | `—` | `text-primary-foreground/80` | Debajo H2 en bg-primary |
| Descripción card (override) | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-muted-foreground/80` | Facultad en ProgramList, fecha en Comunicados |
| Cita / blockquote | `font-sans` | `text-base` | `font-light` | `—` | `—` | `text-muted-foreground` | Cita del rector |
| Sheet descripción | `font-sans` | `text-sm` | `—` | `—` | `—` | `text-muted-foreground` | Sheet base |
| Accordion contenido | `font-sans` | `—` | `font-light` | `—` | `—` | `text-muted-foreground` | Accordion content |
| **PÁRRAFOS & TEXTO** | | | | | | | |
| Párrafo largo | `font-sans` | `text-sm` | `font-light` | `—` | `—` | `text-muted-foreground` | Cards, empty states, descripciones |
| Párrafo lead (artículo) | `font-sans` | `text-base` | `font-light` | `—` | `—` | `text-muted-foreground` | Primer párrafo extendido en ComunicadoDetalle |
| Párrafo contenido (base) | `font-sans` | `text-base` | `font-light` | `—` | `—` | `text-muted-foreground` | Párrafos subsiguientes |
| Párrafo lead pull-quote | `font-sans` | `text-base` | `font-light` | `—` | `—` | `text-foreground` | Primer párrafo destacado (+ italic, border-left) |
| Nombre autoridad | `font-heading` | `text-lg` | `font-light` | `—` | `—` | `text-foreground` | RectorMessage |
| Cargo autoridad | `font-sans` | `text-xs` | `font-light` | `uppercase` | `tracking-widest` | `text-muted-foreground/80` | RectorMessage |
| Imagen caption | `font-sans` | `text-xs` | `—` | `—` | `—` | `text-muted-foreground` | ComunicadoDetalle |
| Disclaimer | `font-sans` | `text-xs` | `font-light` | `—` | `—` | `text-muted-foreground` | Nota legal (+ italic) |
| Nombre programa (card home) | `font-heading` | `text-sm sm:text-xl sm:group-hover:text-2xl` | `font-light` | `uppercase` | `tracking-wide` | `text-primary-foreground` | FeaturedPrograms |
| Count programas | `font-sans` | `text-xs sm:text-sm` | `font-light` | `—` | `—` | `text-primary-foreground/80` | "12 programas disponibles" |
| Monto inversión total | `font-heading` | `text-3xl md:text-5xl` | `font-light` | `—` | `tracking-wide` | `text-primary-foreground` | InversionBecasTab |
| Monto card inversión | `font-sans` | `text-xl` | `font-light` | `—` | `—` | `text-foreground` | Cards de Inversión |
| **BADGES & METADATA** | | | | | | | |
| Badge metadata (default) | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-muted-foreground` | Fechas, duración, modalidad |
| Badge metadata (bg-muted/60) | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-muted-foreground` | Badge estándar en PageHero |
| Badge convocatoria | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-primary-foreground` | "En convocatoria" encima de card |
| Badge categoría | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-primary` | Tag de categoría en ComunicadoDetalle |
| Badge author name | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-foreground` | Autor en ComunicadoDetalle |
| Badge outline | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | — | Badge outline en PageHero |
| Badge inversión label | `font-sans` | `text-xs` | `font-light` | `uppercase` | `tracking-widest` | `text-primary-foreground/80` | "Inversión Total del Programa" |
| Badge inversión tag | `font-sans` | `text-xs` | `font-light` | `—` | `—` | — | "Valor Garantizado 2026" |
| **NAVEGACIÓN (HEADER)** | | | | | | | |
| Nav link | `font-sans` | `text-xs` | `font-normal` | `uppercase` | `tracking-widest` | — | Desktop nav links |
| Nav link panel mobile | `font-heading` | `text-lg` | `font-light` | `—` | `—` | `text-primary-foreground` | Links en panel mobile |
| Nav link número | `font-sans` | `text-xs` | `—` | `—` | `—` | `text-primary-foreground/30` | "01", "02" |
| Nav section label | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-primary-foreground/30` | Labels en panel |
| Header badge/logo | `font-sans` | `text-xs` | `font-light` | `—` | `tracking-widest` | `text-primary` | "EP" en Header |
| Header subtitle | `font-sans` | `text-xs` | `—` | `—` | `—` | `text-muted-foreground` | "UNSAAC . Cusco, Perú" |
| Header contact value | `font-sans` | `text-sm` | `font-light` | `—` | `—` | `text-primary-foreground/50` | Email, teléfono, dirección |
| Header CTA (mobile) | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-primary` | "Proceso de Admisión" en panel mobile |
| Header CTA (desktop) | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-primary-foreground` | "Proceso de Admisión" en panel desktop |
| Header copyright | `font-sans` | `text-xs` | `—` | `—` | `—` | `text-primary-foreground/20` | "UNSAAC . 2026" |
| **BOTONES** | | | | | | | |
| Botón CTA (default) | `font-sans` | `text-sm` | `font-normal` | `uppercase` | `tracking-widest` | — | Botones primario/outline en fondos claros |
| Botón primario en CTA | `font-sans` | `text-sm` | `font-normal` | `uppercase` | `tracking-widest` | `text-primary` | Botón sobre bg-primary con bg-primary-foreground |
| Botón outline en CTA | `font-sans` | `text-sm` | `font-normal` | `uppercase` | `tracking-widest` | `text-primary-foreground` | Botón outline sobre bg-primary con bg-transparent |
| Nav inline CTA | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-primary` | "Leer más", "Ver programa", "Volver al inicio" |
| Sidebar action | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-muted-foreground` | "Compartir", "Imprimir", "Volver" en sidebar |
| Card footer CTA | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-primary/60` | "Ver programa" / "Leer más" en card footer |
| **FOOTER** | | | | | | | |
| Footer link | `font-sans` | `text-sm` | `font-normal` | `—` | `—` | `text-muted-foreground` | Links de programas/información |
| Footer copyright | `font-sans` | `text-xs` | `font-normal` | `—` | `—` | `text-muted-foreground` | © año |
| Footer icon initials | `font-sans` | `text-sm` | `font-medium` | `—` | `—` | `text-primary-foreground` | "EP" en bg-primary |
| **EVENTOS (SIDEBAR)** | | | | | | | |
| Evento día | `font-heading` | `text-2xl` | `font-light` | `—` | `—` | `text-primary-foreground` | "15", "22" |
| Evento mes | `font-sans` | `text-xs` | `font-light` | `—` | `tracking-widest` | `text-primary-foreground` | "JUL", "AGO" |
| Evento fecha/hora | `font-sans` | `text-xs` | `font-light` | `—` | `—` | `text-primary-foreground/70` | Fecha y hora |
| Evento ubicación | `font-sans` | `text-xs` | `font-light` | `—` | `—` | `text-primary-foreground/60` | Ubicación |
| **TABLAS** | | | | | | | |
| Table header | `font-sans` | `text-xs` | `—` | `uppercase` | `tracking-widest` | `text-primary` | Cabeceras en MallaCurricular |
| Table cell | `font-sans` | `text-sm` | `font-light` | `—` | `—` | `text-muted-foreground` | Celdas de cuerpo |

---

## 📐 Reglas de espaciado

- **Padding sección estándar:** `py-16`
- **Padding hero:** `py-24 sm:py-32`
- **Padding sección CTA:** `py-16` (prohibido `py-20`, `py-24`)
- **Padding horizontal contenedor:** `px-4 sm:px-6 lg:px-8`
- **Max width contenedor:** `max-w-7xl`
- **Margen título → descripción en CTAs:** `mt-3`
- **Margen descripción → botones en CTAs:** `mt-8`
- **Shadow cards:** `shadow-sm`, `hover:shadow-md` (prohibido `shadow-xl`)
- **Grid cards listado:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- **Layout detalle (sidebar + contenido):** `lg:grid-cols-12 gap-12`, sidebar `lg:col-span-3`, contenido `lg:col-span-9`, padding `py-8`
- **Valores permitidos:** Múltiplos de 4 (`0,1,2,3,4,5,6,8,10,12,14,16,20,24,...`)
- **Gaps permitidos:** `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8`, `gap-12` (prohibido `gap-5`, `gap-7`)
- **Space-y permitidos:** `space-y-2`, `space-y-4`, `space-y-6`, `space-y-8`, `space-y-12`

---

## 🎯 Reglas de hover states

| Contexto | Clase |
|---|---|
| Links de texto (nav, footer, "Leer más") | `hover:text-foreground` |
| Botón CTA primario (`bg-primary`) | `hover:bg-primary/90` (nunca `/80`) |
| Botón CTA invertido (`bg-primary-foreground`) | `hover:bg-primary-foreground/90` |
| Botón outline sobre bg-primary | `hover:bg-primary-foreground/10` |
| Botón outline default | `hover:bg-muted` |
| Accordion trigger, nav triggers | `hover:bg-muted/50` / `dark:hover:bg-muted/20` |
| Link variant (button/badge) | `hover:bg-muted` (no `hover:underline`) |
| Card hover (elevación) | `hover:shadow-sm` o `hover:shadow-md` |

---

## 🖱️ Reglas de botones CTA

- **Tamaño mínimo texto:** `text-sm` (14px) en `size="lg"`, `size="default"`, `size="sm"`. `text-xs` solo en `size="icon"` o badges.
- **Outline sobre `bg-primary`:** siempre agregar `bg-transparent` al className.
- **Resumen:**

| Contexto | Texto | Fondo botón |
|---|---|---|
| Primario sobre bg-primary | `text-primary` | `bg-primary-foreground` |
| Outline sobre bg-primary | `text-primary-foreground` | `bg-transparent` + `border-primary-foreground/30` |
| Outline default | `text-foreground` | `bg-background` (heredado) |

---

## 🧩 Componentes shadcn/ui modificados

### Accordion
- `AccordionTrigger`: `font-heading text-sm tracking-wide`, hover `bg-muted/50` / `dark:bg-muted/20`, iconos ChevronDownIcon/ChevronUpIcon
- `AccordionContent`: `font-sans font-light leading-relaxed text-muted-foreground`
- `AccordionItem`: `not-last:border-b border-border`

### Card
- `CardTitle`: `font-heading text-base leading-snug font-medium`
- `CardDescription`: `text-sm text-muted-foreground`

### Button
- `link` variant: `hover:bg-muted` (cambiado de `hover:underline`)
- `sm` size: `text-xs` (cambiado de `text-[0.8rem]`)

### Badge
- `link` variant: `hover:bg-muted` (cambiado de `hover:underline`)

### Sheet
- `SheetTitle`: `font-heading text-base font-medium text-foreground`
- `SheetDescription`: `font-sans text-sm text-muted-foreground`

---

## 📋 Patrón de sección CTA (obligatorio)

Toda sección CTA sigue este patrón exacto:

```tsx
<section className="bg-primary">
  <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
    <h2 className="font-heading text-3xl font-light uppercase tracking-wide text-primary-foreground sm:text-4xl">
      TÍTULO
    </h2>
    <p className="mx-auto mt-3 max-w-2xl font-sans text-base font-light leading-relaxed text-primary-foreground/80">
      DESCRIPCIÓN
    </p>
    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button asChild size="lg" className="bg-primary-foreground font-sans text-sm font-normal uppercase tracking-widest text-primary hover:bg-primary-foreground/90">
        <Link to="...">BOTÓN PRIMARIO</Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 font-sans text-sm font-normal uppercase tracking-widest text-primary-foreground hover:bg-primary-foreground/10">
        <Link to="...">BOTÓN SECUNDARIO</Link>
      </Button>
    </div>
  </div>
</section>
```

Implementado en: `AdmissionCTA.tsx`, `Comunicados.tsx` (CTA final), `ComunicadoDetalle.tsx` (CTA final), `ProcesoAdmision.tsx` (CTA final).

---

## 📛 Patrón de Badge

- **Badge metadata:** `bg-muted/60 font-sans text-xs uppercase tracking-widest text-muted-foreground dark:bg-muted/20`
- **Badge categoría:** `rounded-full bg-primary/10 px-3 py-1 font-sans text-xs uppercase tracking-widest text-primary` (solo en ComunicadoDetalle)
- **Badge convocatoria:** `absolute left-1/2 top-3 -translate-x-1/2 bg-primary font-sans text-xs uppercase tracking-widest text-primary-foreground` (solo sobre card en ProgramList)
- **Badge outline:** `font-sans text-xs uppercase tracking-widest` (usar variant="outline")

---

## 🖼️ Regla de imágenes institucionales
- Usar `<img>` tag, nunca `background-image` CSS
- `alt` obligatorio. Imágenes decorativas: `alt=""`

---

## 🌓 Regla de modo oscuro
- Elementos decorativos en bg-muted con opacidad: `opacity-60 dark:opacity-20`
- Ningún componente debe quedar bloqueado en un color claro

---

## Componentes del proyecto

### Header (`src/components/Header.tsx`)
- Navbar fija (`fixed inset-x-0 top-0 z-50 h-16`)
- Panel mobile de 3 columnas estilo navegación completa
- Logo "EP" + "Posgrado UNSAAC" + "UNSAAC · Cusco, Perú"
- Botón hamburguesa toggle
- Panel izquierdo: bg-primary con links (Inicio, Maestrías, Doctorados, Admisión, Comunicados)
- Panel central: bg-primary/90 con "Programas & Admisión"
- Panel derecho: bg-muted con datos de contacto
- CTA mobile: `bg-primary-foreground text-primary font-sans text-xs uppercase tracking-widest`
- CTA desktop: `bg-primary text-primary-foreground font-sans text-xs uppercase tracking-widest`

### Footer (`src/components/Footer.tsx`)
- `border-t bg-muted/50`
- Grid `sm:grid-cols-2 lg:grid-cols-4`
- Brand: logo "EP" en `bg-primary font-sans text-sm font-medium text-primary-foreground` + "Escuela de Posgrado UNSAAC" en `font-heading text-base font-light tracking-wide`
- Descripción: `font-sans text-sm font-light leading-relaxed text-muted-foreground` (max-w-xs)
- Secciones: título `font-heading text-xs font-light uppercase tracking-widest text-foreground`, links `font-sans text-sm font-normal text-muted-foreground hover:text-foreground`
- Copyright: `font-sans text-xs font-normal text-muted-foreground`

### PageHero (`src/components/shared/PageHero.tsx`)
- Imagen full-width + gradiente overlay
- `relative flex min-h-[50vh] flex-col justify-center overflow-hidden border-b py-24 sm:py-32`
- H1 + subtitle `text-base` + description `text-base` + badges + action Button
- Gradiente: `bg-gradient-to-r from-background/95 via-background/80 to-background/60`

### FilterBar (`src/components/shared/FilterBar.tsx`)
- `rounded-xl border bg-card p-4 shadow-sm`
- Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4`
- Input search con icono Search + 3 Selects (facultad, modalidad, convocatoria) + Button aplicar + Button ghost limpiar
- Props: `facultades: string[]`, `onApply: (filters: FilterState) => void`, `onClear: () => void`

### PresentacionTab (`src/components/shared/PresentacionTab.tsx`)
- Muestra objetivo_general, objetivos_especificos, perfil_egresado del programa
- H2 sección + párrafos en `font-sans text-base font-light leading-relaxed text-muted-foreground`
- Objetivos específicos: items con `bg-linear-to-r from-primary/5 to-transparent border-l-2 border-primary`

### MallaCurricularTab (`src/components/shared/MallaCurricularTab.tsx`)
- Tabla con semestres agrupados
- `<th>`: `font-sans text-xs uppercase tracking-widest text-primary text-left`
- `<td>`: `font-sans text-sm font-light text-muted-foreground`
- Bordes: `border border-border/40`, `bg-primary/5` en header

### InversionBecasTab (`src/components/shared/InversionBecasTab.tsx`)
- Sección `bg-primary` con monto total: `font-heading text-3xl md:text-5xl font-light tracking-wide text-primary-foreground`
- Cards de matrícula y financiamiento: `border border-border/40 bg-card`, título H3, monto `font-sans text-xl font-light text-foreground`
- Modalidad: H4 `font-heading text-xs font-light uppercase tracking-wide text-muted-foreground`, valor `font-sans text-base font-light text-foreground`
- Disclaimer: `font-sans text-xs font-light italic leading-relaxed text-muted-foreground`

### LineasInvestigacionTab (`src/components/shared/LineasInvestigacionTab.tsx`)
- Items con `bg-linear-to-r from-primary/5 to-transparent border-l-2 border-primary`

### Tabs (`src/components/shared/Tabs.tsx`)
- Componente custom con tabs nativas (no shadcn)
- Tab activa: `border-primary text-foreground`
- Tab inactiva: `border-transparent text-muted-foreground hover:text-foreground hover:border-border`

---

## Páginas del proyecto

### Home (`src/pages/Home.tsx`)
- 6 secciones en orden: HeroSection → RectorMessage → AdmissionCTA → LatestComunicados → FeaturedPrograms → StudentFAQ
- Sin fondos extras, cada sección maneja su propio fondo

### Comunicados (`src/pages/Comunicados.tsx`)
- PageHero con title="Comunicados" + subtitle
- Card destacado (rounded-2xl border bg-card, flex md:flex-row): tag "Último Comunicado" + H3 + descripción `text-sm` + fecha + Button "Leer comunicado" + imagen placeholder
- Sección "Comunicados anteriores": H2 + descripción + grid de cards (shadcn Card) con hover animation (líneas scale-x)
- Botón "Ver más comunicados" / "Ver menos comunicados" con ChevronUp/Down
- CTA final bg-primary

### ComunicadoDetalle (`src/pages/ComunicadoDetalle.tsx`)
- Empty state: H1 error + p + Button "Volver a comunicados"
- Layout: grid lg:grid-cols-12 gap-12
- Sidebar (lg:col-span-3): "Volver" link + divider + "Compartir" + "Imprimir"
- Contenido (lg:col-span-9): artículo con metadata (badge categoría + fecha) + H1 + descripción `text-base` + autor + imagen + párrafos
- Primer párrafo: pull-quote (italic, border-left-4, bg-muted/30, text-foreground)
- Párrafos subsiguientes: `font-sans text-base font-light leading-relaxed text-muted-foreground`
- Comunicados relacionados: grid cards con misma estructura que Comunicados
- CTA final bg-primary

### ProcesoAdmision (`src/pages/ProcesoAdmision.tsx`)
- PageHero con title + subtitle
- AdmissionTimeline (componente reutilizado del home)
- CTA final bg-primary con botones "Ver convocatorias" y "Explorar programas"

### ProgramList (`src/pages/ProgramList.tsx`)
- PageHero con title dinámico (según tipo)
- FilterBar + contador de programas
- Grid de cards: imagen placeholder + Badge "En convocatoria" (condicional) + CardTitle + CardDescription (facultad) + CardFooter con líneas animadas
- Empty state con "Limpiar filtros"
- Error state: H1 "Programas no encontrados" + link "Volver al inicio"

### ProgramDetail (`src/pages/ProgramDetail.tsx`)
- PageHero con title + description + badges (duración y modalidad)
- Layout: lg:grid-cols-12 gap-12
- Sidebar: "Volver a programas" + "Compartir" + "Imprimir"
- Desktop: Tabs shadcn (Presentación, Malla Curricular, Inversión y Becas, Líneas de Investigación)
- Mobile: Accordion (mismos tabs)
- TabsTrigger: sin shadow en active (override con `group-data-[variant=default]/tabs-list:data-active:shadow-none`)
- Error state: H1 "Programa no encontrado" + Button "Volver a programas"

---

## Tipos TypeScript (`src/types/index.ts`)

```ts
interface Comunicado {
  slug: string
  title: string
  date: string
  description: string
  content: string        // Texto completo separado por \n\n
  image: string          // URL imagen principal
  contentImage?: string  // Imagen adicional en cuerpo
  contentImageAlt?: string
  contentImageCaption?: string
  category: string
  author: string
  authorImage?: string
  tags?: string[]
  destacada?: boolean    // true = aparece como destacado
}

interface ProgramaCurso {
  semestre: string       // "I", "II", etc.
  costo_matricula: number
  numero_matriculas: number
  costo_cuota: number
  numero_cuotas: number
}

interface CursoConRelacion {
  nombre: string
  creditos: number
  categoria: string      // "Obligatorio" | "Optativo"
  programaCurso: ProgramaCurso
}

interface Programa {
  slug: string
  title: string
  facultad: string
  duration: string       // "2 años"
  modality: string       // "Presencial" | "Semipresencial"
  description: string
  enConvocatoria: boolean
  image?: string
  objetivo_general?: string
  objetivos_especificos?: string  // Separado por \n
  perfil_egresado?: string
  cursos?: CursoConRelacion[]
  lineas_investigacion?: string   // Separado por \n
  content?: string
}

interface TimelineStep {
  step: number
  title: string
  description: string
}

interface FAQItem {
  id: string
  question: string
  answer: string
}
```

---

## Datos estáticos

### comunicados.ts (`src/data/comunicados.ts`)
Array de 9 comunicados con slug, title, date, description, content, image, category, author, tags. El primero tiene `destacada: true`. Categories disponibles: "Convocatoria", "Noticia", "Evento", "Beca".

### Programas en ProgramList.tsx
Datos hardcodeados por tipo (`maestrias`, `doctorados`), con slug, title, facultad, duration, modality, description, enConvocatoria.

### Programas en ProgramDetail.tsx
Datos hardcodeados con estructura completa: `maestrias.gestion-publica` con cursos (4 materias), lineas_investigacion, objetivo_general, etc.

---

## Secciones del Home — orden y fondos

| Sección | Fondo | Componente |
|---|---|---|
| Hero institucional | `relative overflow-hidden border-b` (imagen + gradiente) | `HeroSection.tsx` |
| Mensaje del Rector | `bg-background` | `RectorMessage.tsx` |
| Ruta de Admisión (CTA) | `bg-primary` | `AdmissionCTA.tsx` |
| Últimos Comunicados | `bg-background` | `LatestComunicados.tsx` |
| Programas Destacados | `border-y bg-muted/30` | `FeaturedPrograms.tsx` |
| Información al Estudiante | `bg-background` | `StudentFAQ.tsx` |

---

## Patrones de componente reutilizables

### Card pattern (ProgramList + Comunicados)
```tsx
<Link to={...}>
  <Card className="group h-full overflow-hidden !pt-0 transition-shadow hover:shadow-md">
    <div className="relative aspect-video w-full bg-muted">
      {enConvocatoria && <Badge className="absolute left-1/2 top-3 z-10 -translate-x-1/2 bg-primary font-sans text-xs uppercase tracking-widest text-primary-foreground">En convocatoria</Badge>}
    </div>
    <CardHeader>
      <CardTitle className="font-heading text-lg font-light uppercase tracking-wide text-foreground">...</CardTitle>
      <CardDescription className="font-sans text-xs uppercase tracking-widest text-muted-foreground/80">...</CardDescription>
    </CardHeader>
    <CardFooter className="border-t border-border/40 bg-transparent transition-colors duration-300 group-hover:border-primary/30">
      <div className="flex w-full items-center gap-3">
        <span className="h-px flex-1 origin-left scale-x-0 bg-primary/40 transition-transform duration-500 ease-out group-hover:scale-x-100" />
        <span className="flex shrink-0 items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-primary/60 transition-colors duration-300 group-hover:text-primary">Ver programa</span>
        <span className="h-px flex-1 origin-right scale-x-0 bg-primary/40 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </div>
    </CardFooter>
  </Card>
</Link>
```

### Sidebar detail pattern (ComunicadoDetalle + ProgramDetail)
```tsx
<aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 h-fit">
  <Button variant="ghost" asChild className="group -ml-4 rounded-none hover:bg-transparent text-muted-foreground hover:text-foreground">
    <Link to="..." className="inline-flex items-center gap-2">
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Volver</span>
    </Link>
  </Button>
  <div className="h-px bg-border/40" />
  <div className="flex flex-col gap-3 pt-2">
    <button className="flex items-center gap-2 text-left font-sans text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
      <Share2 className="h-4 w-4" /> Compartir
    </button>
    <button onClick={() => window.print()} className="flex items-center gap-2 text-left font-sans text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
      <Printer className="h-4 w-4" /> Imprimir
    </button>
  </div>
</aside>
```

### Tabs/Accordion responsive pattern (ProgramDetail)
- Desktop (`hidden md:block`): Tabs shadcn con `TabsList` variant="line" (sin bg, con línea inferior animada)
- Mobile (`block md:hidden`): Accordion con mismas secciones
- TabsTrigger: override de shadow con `group-data-[variant=default]/tabs-list:data-active:shadow-none`

---

## Reglas generales de desarrollo
- **Tipado estricto:** Nunca usar `any`
- **Paradigma:** Componentes funcionales + Hooks, PascalCase
- **Modularidad:** Componentes pequeños, reutilizables, sin lógica compleja en componentes visuales
- **Sin comentarios en JSX:** Prohibido dejar comentarios en el código de producción
- **Rutas dinámicas:** `/:tipo` para tipos de programa, sin página `/programas` estática
