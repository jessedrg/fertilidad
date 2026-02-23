import { Phone, ArrowRight, Heart } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24 text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-primary-foreground/80" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-foreground text-balance max-w-3xl mx-auto leading-tight">
              Tu sueño de ser madre merece la mejor clinica
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Llamanos hoy y un asesor especializado en fertilidad te ayudara a encontrar la clinica perfecta. Sin compromiso, sin costes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+34936941874"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-foreground text-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                <Phone className="w-6 h-6" />
                936 941 874
              </a>
              <a
                href="tel:+34936941874"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Solicitar llamada <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/60">
              Lunes a viernes de 9:00 a 20:00 | Sabados de 10:00 a 14:00
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
