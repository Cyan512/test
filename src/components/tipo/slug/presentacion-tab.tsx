import { Programa } from "@/src/types";


interface PresentacionTabProps {
  objetivoGeneral: string
  objetivosEspecificos: string
}

export function PresentacionTab({ objetivoGeneral, objetivosEspecificos }: PresentacionTabProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {objetivoGeneral && (
        <section className="group">
          <div className="mb-4 pb-2 border-b-2 border-primary/20">
            <h2 className="font-heading text-3xl font-light uppercase tracking-wide text-foreground sm:text-4xl after:block after:w-8 after:h-0.5 after:bg-secondary after:mt-1">
              Objetivo General
            </h2>
          </div>
          <p className="font-sans text-base font-light leading-relaxed text-muted-foreground whitespace-pre-line">
            {objetivoGeneral}
          </p>
        </section>
      )}

      {objetivosEspecificos && (
        <section className="group">
          <div className="mb-4 pb-2 border-b-2 border-primary/20">
            <h2 className="font-heading text-3xl font-light uppercase tracking-wide text-foreground sm:text-4xl after:block after:w-8 after:h-0.5 after:bg-secondary after:mt-1">
              Objetivos Específicos
            </h2>
          </div>
          <div className="space-y-3">
            {objetivosEspecificos.split('\n').map((item, i) => (
              <div key={i} className="bg-linear-to-r from-primary/5 to-transparent border-l-2 border-primary pl-6 py-2 transition-all duration-200 hover:from-primary/10 hover:border-l-4">
                <p className="font-sans text-base font-light leading-relaxed text-muted-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
