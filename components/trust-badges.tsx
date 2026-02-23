import { ShieldCheck, Clock, Star, Users } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: "100% Verificado",
      description: "Todas las clinicas pasan nuestro control de calidad",
    },
    {
      icon: Clock,
      title: "Respuesta en 2h",
      description: "Un asesor te contacta en menos de 2 horas",
    },
    {
      icon: Star,
      title: "4.9/5 Valoracion",
      description: "Basado en miles de opiniones de parejas reales",
    },
    {
      icon: Users,
      title: "Servicio gratuito",
      description: "Nuestro asesoramiento es completamente gratis",
    },
  ]

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-border">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center gap-3 px-6 py-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{badge.title}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
