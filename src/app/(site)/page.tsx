import { Hero } from "@/src/components/home/hero"
import RectorMessage from "@/src/components/home/rector-message"
import { AdmissionCTA } from "@/src/components/home/admission-cta"
import { LatestComunicados } from "@/src/components/home/latest-comunicados"
import { FeaturedPrograms } from "@/src/components/home/featured-programs"
import StudentFAQ from "@/src/components/home/student-faq"
import { getProgramas, getTiposPrograma } from "@/src/lib/api"

export default async function Home() {
  const programas = await getProgramas({ convocatoria: true })
  const tipoProgramas = await getTiposPrograma()

  return (
    <>
      <Hero />
      <RectorMessage />
      <AdmissionCTA />
      <LatestComunicados />
      <FeaturedPrograms programas={tipoProgramas} />
      <StudentFAQ />
    </>
  )
}
