import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"

const mainCities = [
  { name: "Madrid", slug: "madrid", count: 42 },
  { name: "Barcelona", slug: "barcelona", count: 38 },
  { name: "Valencia", slug: "valencia", count: 24 },
  { name: "Sevilla", slug: "sevilla", count: 18 },
  { name: "Bilbao", slug: "bilbao", count: 14 },
  { name: "Malaga", slug: "malaga", count: 16 },
  { name: "Zaragoza", slug: "zaragoza", count: 11 },
  { name: "Murcia", slug: "murcia", count: 12 },
]

const moreCities = [
  { name: "Valladolid", slug: "valladolid" },
  { name: "Palma", slug: "palma" },
  { name: "Cadiz", slug: "cadiz" },
  { name: "Salamanca", slug: "salamanca" },
  { name: "Granada", slug: "granada" },
  { name: "Cordoba", slug: "cordoba" },
  { name: "Santander", slug: "santander" },
  { name: "Pamplona", slug: "pamplona" },
  { name: "Toledo", slug: "toledo" },
  { name: "Tarragona", slug: "tarragona" },
  { name: "Oviedo", slug: "oviedo" },
  { name: "Burgos", slug: "burgos" },
  { name: "Gijon", slug: "gijon" },
  { name: "Badajoz", slug: "badajoz" },
  { name: "Lleida", slug: "lleida" },
  { name: "Lugo", slug: "lugo" },
]

export function CitiesSection() {
  return (
    <section id="ciudades" className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Cobertura nacional</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground text-balance">
            Clinicas de fertilidad en toda España
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Trabajamos con mas de 200 clinicas verificadas en las principales ciudades
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mainCities.map((city) => (
            <Link
              key={city.slug}
              href={`/fecundacion-in-vitro/${city.slug}`}
              className="group bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {city.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">{city.count}+ clinicas</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Ver opciones <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-sm font-semibold text-foreground mb-4 text-center">Tambien disponible en:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {moreCities.map((city) => (
              <Link
                key={city.slug}
                href={`/fecundacion-in-vitro/${city.slug}`}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
