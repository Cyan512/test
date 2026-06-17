import { AdmissionCTA } from "@/src/components/home/admission-cta";
import { FeaturedPrograms } from "@/src/components/home/featured-programs";
import { Hero } from "@/src/components/home/hero";
import { LatestComunicados } from "@/src/components/home/latest-comunicados";
import RectorMessage from "@/src/components/home/rector-message";
import StudentFAQ from "@/src/components/home/student-faq";

export default function Home() {
  return (
    <>
      <Hero />
      <RectorMessage />
      <AdmissionCTA />
      <LatestComunicados />
      <FeaturedPrograms />
      <StudentFAQ />
    </>
  );
}
