import { Phone, Star, Heart } from "lucide-react"

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-background to-background" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-12 lg:pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Heart className="w-4 h-4" />
            Tu camino hacia la maternidad empieza aqui
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-foreground leading-[1.1] tracking-tight">
            Encuentra la clinica de fertilidad
            <span className="text-primary"> perfecta </span>
            para ti
          </h1>
          <p className="mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Cobertura en toda España. Clinicas 100% verificadas.
            Asesoramiento personalizado y gratuito.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+34936941874"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              <Phone className="w-5 h-5" />
              Llamar ahora
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-border text-foreground text-lg font-medium hover:bg-muted transition-colors"
            >
              Como funciona
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 justify-center">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">4.9/5</span> basado en{" "}
              <span className="font-semibold text-foreground">1.847 opiniones</span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden md:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1200&auto=format&fit=crop"
              alt="Pareja feliz en consulta de fertilidad"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6 lg:p-8">
              <p className="text-white font-semibold text-lg">+1.200 bebes nacidos</p>
              <p className="text-white/70 text-sm">gracias a nuestro asesoramiento</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex-1 rounded-2xl bg-secondary p-6 lg:p-8 flex flex-col justify-center">
              <p className="text-4xl lg:text-5xl font-serif text-foreground">24h</p>
              <p className="text-sm text-muted-foreground mt-2">Primera consulta en menos de un dia</p>
            </div>
            <div className="flex-1 rounded-2xl bg-primary/10 p-6 lg:p-8 flex flex-col justify-center">
              <p className="text-4xl lg:text-5xl font-serif text-primary">65%</p>
              <p className="text-sm text-muted-foreground mt-2">Tasa de exito media en primer ciclo</p>
            </div>
            <div className="flex-1 rounded-2xl bg-muted p-6 lg:p-8 flex flex-col justify-center">
              <p className="text-4xl lg:text-5xl font-serif text-foreground">30+</p>
              <p className="text-sm text-muted-foreground mt-2">Clinicas verificadas en toda España</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
