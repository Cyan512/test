import { Calendar, CheckCircle2, GraduationCap, Wallet } from "lucide-react"
import type { CursoConRelacion } from '@/types'

interface InversionBecasTabProps {
  cursos: CursoConRelacion[]
  modalidad: string
}

export function InversionBecasTab({ cursos, modalidad }: InversionBecasTabProps) {
  const primeraRelacion = cursos[0]?.programaCurso

  if (!primeraRelacion) {
    return <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">Información de inversión no disponible.</p>
  }

  const costoTotalMatricula = primeraRelacion.costo_matricula * primeraRelacion.numero_matriculas
  const costoTotalCuotas = primeraRelacion.costo_cuota * primeraRelacion.numero_cuotas

  const inversionTotal = costoTotalMatricula + costoTotalCuotas

  const formatCurrency = (value: number) => {
    return `S/. ${value.toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
          <div className="mb-4 pb-2 border-b-2 border-primary/20">
        <h2 className="font-heading text-3xl font-light uppercase tracking-wide text-foreground sm:text-4xl after:block after:w-8 after:h-0.5 after:bg-secondary after:mt-1">
          Inversión del Programa
        </h2>
      </div>

      <div className="bg-primary text-primary-foreground p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div className="space-y-1">
          <span className="font-sans text-xs font-light uppercase tracking-widest text-primary-foreground/80">
            Inversión Total del Programa
          </span>
          <p className="font-heading text-3xl md:text-5xl font-light tracking-wide text-primary-foreground">
            {formatCurrency(inversionTotal)}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-secondary" />
          <span className="font-sans text-xs font-light">Valor Garantizado 2026</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-border/40 bg-card p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-all duration-200">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/5 border border-primary/10 text-primary">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-light uppercase tracking-wide text-foreground">
                  Matrícula
                </h3>
                <p className="font-sans text-xs font-light text-muted-foreground">
                  {primeraRelacion.numero_matriculas > 1 ? `Pago en ${primeraRelacion.numero_matriculas} partes` : "Pago único inicial"}
                </p>
              </div>
            </div>
            <div className="pt-2 border-b border-border/40">
              <p className="font-sans text-xl font-light text-foreground pb-2">
                {formatCurrency(costoTotalMatricula)}
              </p>
            </div>
          </div>
          <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">
            Requisito para reserva de cupo y formalización de ingreso.
          </p>
        </div>
        <div className="border border-border/40 bg-card p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-all duration-200">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 border border-secondary/10 text-secondary">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-light uppercase tracking-wide text-foreground">
                  Plan de Financiamiento
                </h3>
                <p className="font-sans text-xs font-light text-muted-foreground">
                  Pagos mensuales
                </p>
              </div>
            </div>
            <div className="pt-2 border-b border-border/40">
              <p className="font-sans text-xl font-light text-foreground pb-2">
                <span className="font-medium">{primeraRelacion.numero_cuotas} cuotas</span> de{" "}
                <span className="font-medium text-primary">{formatCurrency(primeraRelacion.costo_cuota)}</span>
              </p>
            </div>
          </div>
          <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">
            Sin intereses durante la duración estándar del programa académico.
          </p>
        </div>
      </div>
      <div className="bg-muted/40 border border-border/40 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-primary">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading text-xs font-light uppercase tracking-wide text-foreground">
              Modalidad de Estudios
            </h4>
            <p className="font-sans text-base font-light text-foreground">
              {modalidad}
            </p>
          </div>
        </div>
        <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground max-w-md md:text-right">
          {modalidad === "Semipresencial"
            ? "Combina clases virtuales interactivas con sesiones presenciales intensivas una vez al mes."
            : modalidad === "Presencial"
              ? "Desarrolla tus estudios mediante clases presenciales con interacción directa y acceso a los recursos del campus."
              : modalidad === "Virtual"
                ? "Accede a una formación flexible y de calidad mediante clases virtuales desde cualquier lugar."
                : ""}
        </p>
      </div>
      <div className="bg-linear-to-r from-primary/5 to-transparent border-l-2 border-primary pl-6 py-4">
        <p className="font-sans text-xs font-light italic leading-relaxed text-muted-foreground">
          * Los valores presentados están sujetos a cambios según las políticas institucionales.
          Consulte con un asesor los descuentos por pago al contado o convenios empresariales vigentes.
        </p>
      </div>
    </div>
  );
}
