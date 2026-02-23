import { Star, CheckCircle } from "lucide-react"

const reviews = [
  {
    name: "Maria L.",
    city: "Madrid",
    date: "Hace 3 dias",
    rating: 5,
    text: "Llevabamos 2 anos intentandolo sin exito. nacería nos recomendo una clinica en Madrid que fue perfecta para nosotros. A los 3 meses de tratamiento, embarazo positivo. Eternamente agradecidos.",
  },
  {
    name: "Ana P.",
    city: "Barcelona",
    date: "Hace 1 semana",
    rating: 5,
    text: "Como madre soltera, el proceso me daba mucho respeto. La asesora de nacería me acompano en todo, me explico cada opcion y me conecto con una clinica increible en Barcelona. Mi hija nacio en septiembre.",
  },
  {
    name: "Carlos y Elena",
    city: "Valencia",
    date: "Hace 5 dias",
    rating: 5,
    text: "Despues de dos FIV fallidas en otra clinica, nacería nos recomendo cambiar. La nueva clinica en Valencia fue un acierto total. Ahora somos papas de mellizos. Gracias infinitas.",
  },
  {
    name: "Sandra R.",
    city: "Sevilla",
    date: "Hace 2 semanas",
    rating: 5,
    text: "Congele mis ovulos a los 35 con una clinica que me recomendo nacería. Todo el proceso fue sencillo y me senti muy arropada. Ahora tengo 39 y estoy tranquila sabiendo que tengo esa opcion.",
  },
  {
    name: "Laura y Marta",
    city: "Bilbao",
    date: "Hace 4 dias",
    rating: 5,
    text: "Como pareja de mujeres, necesitabamos una clinica que nos tratara con naturalidad. nacería nos encontro la clinica perfecta en Bilbao. Nuestro hijo Pablo ya tiene 6 meses.",
  },
  {
    name: "Roberto M.",
    city: "Malaga",
    date: "Hace 1 semana",
    rating: 4,
    text: "Proceso rapido y profesional. Nos propusieron varias clinicas en Malaga y nos ahorraron semanas de busqueda. La clinica que elegimos tiene un equipo medico excelente y unas instalaciones de primera.",
  },
]

export function ReviewsSection() {
  return (
    <section id="opiniones" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Opiniones reales</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground text-balance">
            Miles de parejas ya confian en nosotros
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">4.9/5</span>
            <span className="text-muted-foreground">basado en 1.847 opiniones</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-foreground leading-relaxed text-sm">{review.text}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  Verificada
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{review.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
