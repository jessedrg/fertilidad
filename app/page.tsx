import { Navbar } from "@/components/navbar"
import { HomeHero } from "@/components/home-hero"
import { TrustBadges } from "@/components/trust-badges"
import { HowItWorks } from "@/components/how-it-works"
import { ServicesSection } from "@/components/services-section"
import { ReviewsSection } from "@/components/reviews-section"
import { CitiesSection } from "@/components/cities-section"
import { CtaSection } from "@/components/cta-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <TrustBadges />
        <HowItWorks />
        <ServicesSection />
        <ReviewsSection />
        <CtaSection />
        <CitiesSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
