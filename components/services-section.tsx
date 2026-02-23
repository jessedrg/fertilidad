import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      title: "Fecundacion In Vitro (FIV)",
      slug: "fecundacion-in-vitro",
      description:
        "El tratamiento mas efectivo de reproduccion asistida. Fecundacion del ovulo en laboratorio y transferencia del embrion al utero con las mayores tasas de exito.",
      features: ["Alta tasa de exito", "Tecnologia avanzada", "Seguimiento completo"],
    },
    {
      title: "Inseminacion Artificial",
      slug: "inseminacion-artificial",
      description:
        "Tratamiento menos invasivo que introduce los espermatozoides directamente en el utero. Ideal para parejas jovenes o con problemas leves de fertilidad.",
      features: ["Menos invasivo", "Proceso sencillo", "Coste accesible"],
    },
    {
      title: "Ovodonacion",
      slug: "ovodonacion",
      description:
        "Tratamiento con ovulos de donante para mujeres que no pueden usar sus propios ovulos. Altas tasas de exito y donantes rigurosamente seleccionadas.",
      features: ["Altas tasas de exito", "Donantes seleccionadas", "Anonimato garantizado"],
    },
    {
      title: "Congelacion de Ovulos",
      slug: "congelacion-ovulos",
      description:
        "Preserva tu fertilidad para el futuro. Ideal para mujeres que quieren posponer la maternidad sin perder sus posibilidades de ser madres.",
      features: ["Preserva fertilidad", "Sin prisa", "Tecnologia puntera"],
    },
  ]

  return (
    <section id="servicios" className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Nuestros tratamientos</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground text-balance">
            Cada pareja merece el tratamiento adecuado
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Te ayudamos a encontrar la clinica perfecta segun tus necesidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}/madrid`}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span key={f} className="px-3 py-1 rounded-full bg-secondary text-sm text-foreground">
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                Ver clinicas
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
