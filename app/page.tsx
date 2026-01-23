import { HeroSection } from "@/components/hero-section"
import { ProjectSection } from "@/components/project-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProjectSection />
      <Footer />
    </main>
  )
}
