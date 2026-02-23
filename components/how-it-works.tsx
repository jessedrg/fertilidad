import { Phone } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Cuentanos tu situacion",
      description:
        "Llamanos o dejanos tus datos. Un asesor especializado en fertilidad te escuchara para entender tu caso: tipo de tratamiento, zona preferida y presupuesto.",
    },
    {
      number: "02",
      title: "Te proponemos las mejores clinicas",
      description:
        "En menos de 2 horas recibes una seleccion personalizada de clinicas verificadas que encajan con lo que buscas. Sin compromiso, sin costes ocultos.",
    },
    {
      number: "03",
      title: "Primera consulta y decision",
      description:
        "Te acompanamos en las consultas, resolvemos tus dudas y te ayudamos con todo el proceso. Estaremos a tu lado hasta que empieces tu tratamiento con total confianza.",
    },
  ]

  return (
    <section id="como-funciona" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Como funciona</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground text-balance">
            Encontrar la clinica ideal nunca fue tan facil
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Nos encargamos de todo para que tu solo tengas que preocuparte de lo importante: tu futuro bebe.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 relative">
              <div className="p-8 rounded-3xl bg-card border border-border hover:shadow-md transition-all h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold mb-5">
                  {step.number}
                </div>
                <h3 className="text-xl font-serif text-foreground">{step.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+34936941874"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Phone className="w-5 h-5" />
            Llamar al 936 941 874
          </a>
          <p className="text-sm text-muted-foreground">Llamada gratuita, sin compromiso</p>
        </div>

        <div className="mt-16 relative rounded-3xl overflow-hidden aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=2070&auto=format&fit=crop"
            alt="Clinica de fertilidad moderna con tecnologia avanzada"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
