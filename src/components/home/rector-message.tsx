import { Quote } from 'lucide-react'

const rectorImage =
  'https://res.cloudinary.com/ds0tjwccs/image/upload/v1780310337/director-posgrado_kwfzqm.jpg'

export default function RectorMessage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="relative flex justify-center lg:col-span-5 lg:justify-start">
          <div className="absolute bottom-0 right-0 top-12 w-3/4 rounded-t-full bg-primary/10 opacity-60 z-0 lg:right-4 dark:opacity-20" />
          <div className="relative z-10 aspect-3/4 w-full max-w-sm overflow-hidden shadow-sm">
            <img
              src={rectorImage}
              alt="Dr. Eleazar Crucinta Ugarte, Rector de la UNSAAC"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center lg:col-span-7">
          <h2 className="font-heading text-3xl font-light uppercase tracking-wide text-foreground sm:text-4xl">
            La educación es el arma más poderosa que puedes usar para cambiar el mundo
          </h2>
          <div className="relative mt-8">
            {/* Comilla de apertura: se mantiene absoluta a la izquierda */}
            <Quote className="absolute -left-2 top-0 h-8 w-8 text-primary/20 rotate-180" />

            <blockquote className="space-y-6 pl-8 font-sans text-base font-light leading-relaxed text-muted-foreground">
              <p className='relative'>
                Desde 1984, nos hemos dedicado a una misión singular: dotar a la próxima generación de las habilidades de pensamiento crítico necesarias para desenvolverse en un mundo complejo. La Escuela de Posgrado de la Universidad Nacional de San Antonio Abad del Cusco no es solo una universidad, es un crisol para el cambio.
                <Quote className="inline-block h-8 w-8 text-primary/20 align-middle ml-1 -mt-2" />
              </p>
            </blockquote>
          </div>
          <div className="mt-8 border-l-2 border-primary/20 pl-8">
            <div className="font-heading text-lg font-light text-foreground">
              Dr. Pepito W. Hamilton
            </div>
            <div className="mt-1 font-sans text-xs font-light uppercase tracking-widest text-muted-foreground/80">
              Director de la Escuela de Posgrado
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
