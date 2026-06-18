import { ClipboardList, Network, CalendarDays, Signpost, Languages } from 'lucide-react'

const items = [
  {
    id: 1,
    titulo: 'Reglamentos y Normas',
    descripcion:
      'Accede a la normativa vigente que regula los procesos académicos y administrativos de la Escuela de Posgrado.',
    icono: <ClipboardList className="h-9 w-9 text-primary" />,
  },
  {
    id: 2,
    titulo: 'Trámites Académicos',
    descripcion:
      'Conoce los procedimientos para solicitudes de matrícula, convalidaciones, licencias y certificaciones académicas.',
    icono: <Network className="h-9 w-9 text-secondary" />,
  },
  {
    id: 3,
    titulo: 'Calendario Académico y de Pagos',
    descripcion:
      'Mantente al día con las fechas importantes del semestre: matrículas, evaluaciones, feriados y cronograma de pagos.',
    icono: <CalendarDays className="h-9 w-9 text-primary" />,
  },
  {
    id: 4,
    titulo: 'Ruta del Graduado',
    descripcion:
      'Descubre los pasos y requisitos para la obtención del grado académico, desde la sustentación hasta la titulación.',
    icono: <Signpost className="h-9 w-9 text-secondary" />,
  },
  {
    id: 5,
    titulo: 'Acreditación del Idioma',
    descripcion:
      'Información sobre los exámenes de suficiencia y módulos de idiomas requeridos para la titulación y el posgrado.',
    icono: <Languages className="h-9 w-9 text-primary" />,
  }
]

export default function StudentFAQ() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mb-8">
        <h2 className="font-heading text-3xl font-light uppercase tracking-wide text-foreground sm:text-4xl after:block after:w-16 after:h-0.5 after:bg-secondary after:mt-3">
          Información para el Estudiante
        </h2>
      </div>

      <div className="relative flex flex-col items-start gap-6 lg:flex-row">
        <div className="hidden lg:block lg:h-[720px] lg:w-[54%] lg:overflow-hidden lg:rounded-xl lg:bg-muted lg:shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1544535830-9dff9e0d4bec?auto=format&fit=crop&q=80&w=1000"
            alt="Estatua Académica"
            className="h-full w-full object-cover object-center grayscale-15 contrast-110"
          />
        </div>

        <div className="z-10 w-full rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8 lg:relative lg:-ml-24 lg:mt-16 lg:w-[53%] lg:p-10">
          <p className="mb-8 font-sans text-base font-light leading-relaxed text-muted-foreground">
            En esta sección encontrarás toda la información esencial para
            organizar y gestionar tu vida académica. Te recomendamos revisarla
            con frecuencia para estar al tanto de fechas importantes y procesos
            administrativos.
          </p>

          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex items-start gap-4 rounded-lg transition-colors hover:bg-primary/5 -mx-2 px-2 py-1"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-primary/5 dark:bg-primary/10">
                  {item.icono}
                </div>
                <div className="pt-0.5">
                  <h3 className="font-heading text-lg font-light uppercase tracking-wide text-foreground">
                    {item.titulo}
                  </h3>
                  <p className="mt-1 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                    {item.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
