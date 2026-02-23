"use client"

import { useState } from "react"
import Link from "next/link"
import type { Service } from "@/lib/sitemap-data"
import { Phone, Star, Shield, Clock, MapPin, Heart, Users, CheckCircle, ChevronDown, ArrowRight } from "lucide-react"

const PHONE = "+34936941874"
const PHONE_DISPLAY = "+34 936 941 874"

interface Review {
  name: string
  city: string
  rating: number
  text: string
  date: string
  verified: boolean
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

function generateReviews(cityName: string, serviceName: string, serviceId: string): Review[] {
  const seed = hashCode(`${cityName}-${serviceId}`)

  const allFirstNames = [
    "Maria", "Laura", "Ana", "Carmen", "Sandra", "Elena", "Marta", "Cristina",
    "Patricia", "Isabel", "Rosa", "Lucia", "Silvia", "Beatriz", "Teresa",
    "Carlos", "Roberto", "Javier", "Fernando", "Miguel", "Pedro", "Antonio",
    "David", "Jorge", "Sergio", "Andrea", "Paula", "Raquel", "Nuria", "Eva",
  ]
  const allSurnames = ["G.", "M.", "R.", "L.", "S.", "F.", "P.", "D.", "H.", "V.", "N.", "T.", "B.", "C.", "A."]
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

  const fivTemplates = [
    `Llevabamos 3 anos intentandolo y ya no sabiamos que hacer. nacería nos recomendo una clinica en ${cityName} que fue un acierto total. El equipo medico nos transmitio confianza desde el primer dia. A la segunda transferencia, positivo. Nuestro hijo ya tiene 4 meses.`,
    `Habiamos tenido dos FIV fallidas en otra clinica y estabamos destrozados. nacería nos sugirio cambiar a un centro en ${cityName} con mejor tasa de exito. El trato fue completamente distinto. Esta vez funciono a la primera.`,
    `El proceso de FIV da mucho miedo, pero la clinica que nos recomendo nacería en ${cityName} nos hizo sentir arropadas en todo momento. Somos dos mamas y nunca nos sentimos diferentes. Nuestro pequeno Pablo es la prueba de que merecio la pena.`,
    `Teniamos claro que queriamos hacer la FIV en ${cityName} pero habia demasiadas opciones. nacería nos hizo una comparativa honesta con precios reales y tasas de exito. Elegimos bien y ahora somos papas de mellizos.`,
    `Despues del diagnostico de baja reserva ovarica pense que no seria posible. nacería me conecto con una clinica en ${cityName} que tenia experiencia en casos complejos. Me explicaron todas las opciones con mucha empatia. Hoy tengo a mi hija en brazos.`,
    `Lo que mas valoro de nacería es la honestidad. No nos vendieron humo. Nos explicaron las probabilidades reales y nos recomendaron la clinica en ${cityName} que mejor encajaba con nuestro caso. El resultado habla por si solo.`,
  ]

  const inseminacionTemplates = [
    `Como madre soltera, el proceso me daba mucho respeto. La asesora de nacería me acompano en todo, me explico cada opcion y me conecto con una clinica increible en ${cityName}. Mi hija nacio en septiembre y no puedo estar mas feliz.`,
    `Empezamos con inseminacion artificial por recomendacion de nacería. La clinica en ${cityName} era fantastica, el equipo muy profesional. Al tercer intento lo conseguimos. Siempre agradecidos por la orientacion.`,
    `Somos pareja de mujeres y buscabamos una clinica en ${cityName} que nos tratara con naturalidad. nacería nos encontro el sitio perfecto. Todo fue sencillo, respetuoso y profesional. Nuestro bebe nace en dos meses.`,
    `Pensabamos que la inseminacion seria algo frio y clinico. La clinica que nos recomendo nacería en ${cityName} nos demostro lo contrario. El trato humano fue excepcional desde la primera consulta.`,
    `Teniamos dudas entre inseminacion y FIV. nacería nos oriento hacia inseminacion primero y acerto. La clinica en ${cityName} fue maravillosa y a la segunda funciono. Ahorramos tiempo y dinero gracias a su asesoramiento.`,
    `Mi pareja tiene baja movilidad espermatica y no sabiamos si la inseminacion era viable. nacería nos recomendo una clinica en ${cityName} con laboratorio de ultima generacion. Los resultados fueron mejores de lo esperado.`,
  ]

  const ovodonacionTemplates = [
    `A los 43 anos me dijeron que necesitaba ovodonacion. nacería me explico todo el proceso con mucha delicadeza y me recomendo una clinica en ${cityName} con un programa de donantes excelente. Mi hija ya tiene un ano.`,
    `El tema de la donacion de ovulos me generaba muchas dudas. nacería me conecto con una clinica en ${cityName} donde la psicologa me ayudo muchisimo a procesarlo. El equipo medico fue impecable y todo salio bien.`,
    `Llevabamos anos intentandolo con ovulos propios sin exito. nacería nos sugirio considerar la ovodonacion y nos recomendo un centro en ${cityName} con tasas de exito muy altas. Fue la mejor decision que tomamos.`,
    `Tenia menopausia precoz y pense que no podria ser madre. nacería me dio esperanza y me guio hacia una clinica en ${cityName} especializada en ovodonacion. Hoy tengo dos hijos preciosos.`,
    `Lo que mas me preocupaba era la lista de espera. nacería me encontro una clinica en ${cityName} donde apenas tuve que esperar. Todo el proceso fue mas rapido de lo que imaginaba.`,
    `La clinica que me recomendo nacería en ${cityName} para la ovodonacion tenia un equipo increible. Me explicaron todo sobre la donante, la sincronizacion y la transferencia. Me senti segura en cada paso.`,
  ]

  const congelacionTemplates = [
    `A los 34 decidi congelar mis ovulos para tener opciones en el futuro. nacería me recomendo una clinica en ${cityName} con tecnologia de vitrificacion de ultima generacion. El proceso fue rapido e indoloro.`,
    `Congele mis ovulos a los 36 con una clinica que me recomendo nacería en ${cityName}. Todo el proceso fue sencillo y me senti muy arropada. Ahora tengo 40 y estoy tranquila sabiendo que tengo esa opcion.`,
    `Me van a hacer quimioterapia y necesitaba preservar mi fertilidad con urgencia. nacería me encontro una clinica en ${cityName} que me atendio en menos de una semana. Su rapidez y profesionalidad me salvaron la posibilidad de ser madre.`,
    `No tenia prisa por ser madre pero queria tener la opcion. nacería me explico todo sobre la congelacion de ovulos y me recomendo un centro en ${cityName} con precios razonables. Fue la mejor inversion en mi futuro.`,
    `Mis amigas y yo decidimos informarnos juntas sobre vitrificacion. nacería nos asesoro a cada una por separado y nos recomendo clinicas en ${cityName} adaptadas a nuestras situaciones. Un servicio 10.`,
    `Tenia muchas dudas sobre si merecia la pena congelar a mi edad. La asesora de nacería me explico las estadisticas con honestidad y me recomendo una clinica en ${cityName} donde me hicieron todas las pruebas antes de decidir.`,
  ]

  const generalTemplates = [
    `Llevabamos 2 anos intentandolo sin exito. nacería nos recomendo una clinica en ${cityName} que fue perfecta para nosotros. A los 3 meses de tratamiento, embarazo positivo. Eternamente agradecidos.`,
    `El proceso de buscar clinica de fertilidad es agotador. Hay tanta informacion que no sabes por donde empezar. nacería nos simplifico todo. Nos recomendaron la clinica perfecta en ${cityName} y ahorramos semanas de busqueda.`,
    `Sabemos que el camino de la fertilidad es duro. nacería nos hizo sentir acompanados en cada paso. La clinica que nos recomendaron en ${cityName} tenia un equipo humano excepcional.`,
    `Lo que diferencia a nacería es el seguimiento. No solo nos encontraron la clinica perfecta en ${cityName}, sino que nos llamaron para preguntar que tal iba todo. Ese detalle lo dice todo.`,
    `Proceso rapido y profesional. Nos propusieron varias clinicas en ${cityName} y nos ahorraron semanas de busqueda. La clinica que elegimos tiene un equipo medico excelente.`,
    `Necesitabamos orientacion urgente. Llame a nacería un lunes y el miercoles ya teniamos cita en una clinica estupenda en ${cityName}. Rapidez y profesionalidad impecable.`,
  ]

  let templates: string[]
  if (serviceId.includes("fecundacion") || serviceId.includes("fiv")) {
    templates = fivTemplates
  } else if (serviceId.includes("inseminacion")) {
    templates = inseminacionTemplates
  } else if (serviceId.includes("ovodonacion") || serviceId.includes("donacion")) {
    templates = ovodonacionTemplates
  } else if (serviceId.includes("congelacion")) {
    templates = congelacionTemplates
  } else {
    templates = generalTemplates
  }

  const startIdx = seed % templates.length
  const selectedTemplates: string[] = []
  for (let i = 0; i < 6; i++) {
    selectedTemplates.push(templates[(startIdx + i) % templates.length])
  }

  const nameStartIdx = seed % allFirstNames.length
  const surnameStartIdx = (seed * 7) % allSurnames.length
  const daySeeds = [3, 17, 8, 24, 11, 29]
  const monthSeeds = [7, 9, 8, 10, 11, 7]

  return selectedTemplates.map((text, i) => ({
    name: `${allFirstNames[(nameStartIdx + i * 3) % allFirstNames.length]} ${allSurnames[(surnameStartIdx + i * 2) % allSurnames.length]}`,
    city: cityName,
    rating: (seed + i) % 5 === 0 ? 4 : 5,
    text,
    date: `${daySeeds[i]} de ${months[monthSeeds[i]]} 2025`,
    verified: true,
  }))
}

function generateFAQs(cityName: string, serviceName: { title: string; singular: string }, modifierText: string, serviceId: string) {
  const baseFaqs = [
    {
      q: `Cuanto cuesta un tratamiento de ${serviceName.singular} en ${cityName}?`,
      a: `El precio de ${serviceName.singular} en ${cityName} varia segun la clinica, el tipo de tratamiento y las tecnicas utilizadas. Los rangos van desde opciones mas accesibles hasta centros premium con tecnologia de ultima generacion. Nuestro equipo conoce las tarifas actualizadas de cada clinica en ${cityName} y te presentara opciones adaptadas a tu presupuesto. Muchas clinicas ofrecen financiacion. Llama al ${PHONE_DISPLAY} para orientacion gratuita.`
    },
    {
      q: `El servicio de nacería en ${cityName} tiene algun coste?`,
      a: `El asesoramiento de nacería es completamente gratuito para las parejas y personas de ${cityName} y de toda España. No cobramos comisiones ni tenemos costes ocultos. Nuestra recomendacion es siempre imparcial y basada en tus necesidades especificas. Llama sin compromiso.`
    },
    {
      q: `Cuanto tiempo tardais en presentar opciones en ${cityName}?`,
      a: `Nuestro equipo responde en menos de 2 horas desde la primera llamada. Tras conocer tu situacion, preparamos un informe personalizado con opciones concretas en ${cityName} en 24-48 horas. Cada caso es distinto y lo tratamos con la atencion y sensibilidad que merece.`
    },
  ]

  if (serviceId.includes("fecundacion") || serviceId.includes("fiv")) {
    baseFaqs.push(
      {
        q: `Cual es la tasa de exito de la FIV en ${cityName}?`,
        a: `La tasa de exito de la FIV depende de muchos factores: edad de la mujer, calidad embrionaria, causa de infertilidad y experiencia del equipo medico. En general, las clinicas de referencia en ${cityName} alcanzan tasas del 40-60% por transferencia en mujeres menores de 38 anos. nacería conoce las estadisticas reales de cada clinica y te orientamos hacia las que tienen mejores resultados para tu perfil.`
      },
      {
        q: `Cuantos intentos de FIV suelen ser necesarios?`,
        a: `La mayoria de embarazos por FIV se consiguen en los tres primeros ciclos. Sin embargo, cada caso es unico. Las clinicas que recomendamos en ${cityName} realizan una evaluacion exhaustiva para maximizar las probabilidades desde el primer intento. Si un ciclo no funciona, analizan las causas y ajustan el protocolo.`
      },
      {
        q: `La FIV es dolorosa?`,
        a: `El proceso de FIV implica estimulacion ovarica con inyecciones subcutaneas (la mayoria de pacientes se las ponen ellas mismas), una puncion ovarica bajo sedacion (no se siente dolor) y la transferencia embrionaria, que es indolora y no requiere anestesia. Las clinicas que recomendamos en ${cityName} cuidan especialmente el bienestar de la paciente en todo el proceso.`
      }
    )
  } else if (serviceId.includes("inseminacion")) {
    baseFaqs.push(
      {
        q: `Cual es la diferencia entre inseminacion artificial y FIV?`,
        a: `En la inseminacion artificial, los espermatozoides se depositan directamente en el utero, facilitando la fecundacion natural. En la FIV, la fecundacion ocurre en el laboratorio y luego se transfiere el embrion. La inseminacion es menos invasiva y mas economica, pero tiene tasas de exito algo menores. Nuestros asesores te orientan sobre cual es la mejor opcion para tu caso en ${cityName}.`
      },
      {
        q: `Puedo hacer inseminacion artificial como madre soltera en ${cityName}?`,
        a: `Si, la legislacion espanola permite la inseminacion artificial con semen de donante para mujeres solas. Las clinicas que recomendamos en ${cityName} tienen amplia experiencia con madres solteras por eleccion y ofrecen un acompanamiento integral, incluyendo apoyo psicologico si lo deseas.`
      },
      {
        q: `Cuantos intentos de inseminacion se recomiendan antes de pasar a FIV?`,
        a: `Generalmente se recomiendan entre 3 y 4 ciclos de inseminacion artificial antes de considerar la FIV, dependiendo de la edad y la causa de infertilidad. Las clinicas de ${cityName} que trabajamos evaluan cada caso individualmente. nacería te asesora durante todo el proceso.`
      }
    )
  } else if (serviceId.includes("congelacion")) {
    baseFaqs.push(
      {
        q: `Hasta que edad es recomendable congelar ovulos?`,
        a: `Los especialistas recomiendan congelar ovulos antes de los 35 anos para obtener la mejor calidad ovocitaria. Sin embargo, se pueden congelar hasta los 38-40 anos con buenos resultados. Las clinicas que recomendamos en ${cityName} realizan un estudio previo de reserva ovarica para orientarte sobre tus opciones reales.`
      },
      {
        q: `Cuanto tiempo pueden estar los ovulos congelados?`,
        a: `Con la tecnica de vitrificacion que utilizan las clinicas de ${cityName}, los ovulos pueden conservarse indefinidamente sin perder calidad. Las clinicas cobran una cuota anual de mantenimiento que varia entre centros. nacería te informa de todos los costes antes de decidir.`
      },
      {
        q: `El proceso de congelacion de ovulos afecta a mi fertilidad futura?`,
        a: `No. La estimulacion ovarica y la puncion no afectan a tu reserva ovarica ni a tu fertilidad futura. Los ovulos que se extraen son los que tu cuerpo iba a utilizar ese mes de forma natural. Las clinicas en ${cityName} que recomendamos te explican todo el proceso con transparencia.`
      }
    )
  } else {
    baseFaqs.push(
      {
        q: `Puedo visitar las clinicas de ${cityName} antes de decidirme?`,
        a: `Por supuesto, y de hecho lo recomendamos. Coordinamos las primeras consultas por ti y, si lo deseas, un asesor de nacería te acompana para que puedas hacer las preguntas adecuadas y evaluar cada centro con criterio. No hay ningun compromiso hasta que tu estes completamente segura.`
      },
      {
        q: `Como verificais las clinicas de fertilidad?`,
        a: `Todas las clinicas de nuestra red pasan un proceso de verificacion que incluye: revision de licencias sanitarias, evaluacion de tasas de exito publicadas, revision del equipo medico y su formacion, analisis de tecnologia y laboratorio, y valoraciones de pacientes anteriores. Solo trabajamos con centros que cumplen nuestros estandares.`
      },
      {
        q: `Ofreceis ayuda con financiacion?`,
        a: `Si. Nuestros asesores conocen las opciones de financiacion de cada clinica en ${cityName}, asi como las coberturas de seguros medicos privados y las prestaciones de la seguridad social. Te orientamos sobre todas las opciones disponibles para hacer el tratamiento mas accesible.`
      }
    )
  }

  return baseFaqs
}

interface ServiceCityContentProps {
  pageTitle: string
  serviceName: { name: string; title: string; singular: string }
  cityName: string
  citySlug: string
  serviceId: Service
  modifierText: string
  nearbyCities: string[]
  relatedServices: string[]
  serviceNames: Record<Service, { name: string; title: string; singular: string }>
}

export function ServiceCityContent({
  pageTitle,
  serviceName,
  cityName,
  citySlug,
  serviceId,
  modifierText,
  nearbyCities,
  relatedServices,
  serviceNames,
}: ServiceCityContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [visibleReviews, setVisibleReviews] = useState(3)

  const reviews = generateReviews(cityName, serviceName.title, serviceId)
  const faqs = generateFAQs(cityName, serviceName, modifierText, serviceId)
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)

  function getCityDisplayName(slug: string): string {
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }

  return (
    <>
      {/* Hero CTA */}
      <section className="relative bg-secondary">
        <div className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <nav className="text-xs tracking-wider text-muted-foreground mb-6 font-sans flex items-center gap-1.5">
                <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
                <span>/</span>
                <span>{serviceName.title}</span>
                <span>/</span>
                <span className="text-foreground">{cityName}</span>
              </nav>

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground text-balance">
                {pageTitle}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground mt-6 max-w-2xl font-sans leading-relaxed">
                {"Encuentra la mejor clinica de "}
                {serviceName.singular}
                {modifierText ? ` ${modifierText.toLowerCase()}` : ""}
                {` en ${cityName}. Comparamos precios, tasas de exito y opiniones reales. Asesoramiento gratuito y personalizado.`}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-sans text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-4 h-4" />
                  Llama gratis: {PHONE_DISPLAY}
                </a>
                <a
                  href="#como-funciona-ciudad"
                  className="inline-flex items-center justify-center gap-2 border-2 border-foreground text-foreground px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-sans text-sm sm:text-base font-semibold hover:bg-foreground hover:text-background transition-colors"
                >
                  Como funciona
                </a>
              </div>

              <div className="flex items-center gap-4 mt-8 text-xs sm:text-sm text-muted-foreground font-sans">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  <span className="ml-1 font-semibold text-foreground">{avgRating}/5</span>
                </div>
                <span className="text-border">|</span>
                <span>{reviews.length}+ opiniones verificadas</span>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=987&auto=format&fit=crop"
                  alt={`Clinica de ${serviceName.singular} en ${cityName}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6">
                  <p className="text-white font-semibold text-lg">+1.200 bebes nacidos</p>
                  <p className="text-white/70 text-sm">gracias a nuestro asesoramiento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-card">
        <div className="px-4 sm:px-6 md:px-12 py-6 sm:py-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-foreground/60 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-sans font-medium text-foreground">100% Verificado</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-sans">Clinicas visitadas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-foreground/60 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-sans font-medium text-foreground">{"< 2 horas"}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-sans">Tiempo respuesta</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-foreground/60 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-sans font-medium text-foreground">Gratuito</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-sans">Sin compromiso</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-foreground/60 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-sans font-medium text-foreground">+1.200 bebes</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-sans">Gracias a nuestro asesoramiento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona-ciudad" className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24 max-w-5xl mx-auto">
        <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">
          Como funciona
        </p>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-10 sm:mb-16 text-balance">
          {`Encontrar clinica de ${serviceName.singular} en ${cityName} nunca fue tan facil`}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="relative">
            <span className="font-serif text-5xl sm:text-6xl text-foreground/10">01</span>
            <h3 className="font-sans text-sm sm:text-base font-medium text-foreground mt-2">Cuentanos tu situacion</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
              {`Llamanos o escribenos. Cuentanos que tratamiento necesitas, tu situacion y tus preferencias en ${cityName}. Una llamada de 5 minutos es suficiente.`}
            </p>
          </div>
          <div className="relative">
            <span className="font-serif text-5xl sm:text-6xl text-foreground/10">02</span>
            <h3 className="font-sans text-sm sm:text-base font-medium text-foreground mt-2">Buscamos la mejor clinica</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
              {`Analizamos las clinicas de ${serviceName.singular} disponibles en ${cityName}, comparamos tasas de exito, precios y especialidades. Te enviamos un informe personalizado.`}
            </p>
          </div>
          <div className="relative">
            <span className="font-serif text-5xl sm:text-6xl text-foreground/10">03</span>
            <h3 className="font-sans text-sm sm:text-base font-medium text-foreground mt-2">Tu decides</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
              {`Coordinamos tu primera consulta en las clinicas que elijas en ${cityName}. Te acompanamos en todo el proceso. Sin presion, sin compromiso.`}
            </p>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 text-center">
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-sans text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            Empieza ahora: {PHONE_DISPLAY}
          </a>
        </div>
      </section>

      {/* Why nacería */}
      <section className="bg-card border-y border-border">
        <div className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24 max-w-5xl mx-auto">
          <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">
            Por que nacería
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-10 sm:mb-16 text-balance">
            {`Tu aliada en fertilidad en ${cityName}`}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-colors">
              <CheckCircle className="w-5 h-5 text-primary mb-4" />
              <h3 className="font-sans text-sm sm:text-base font-medium text-foreground">Clinicas verificadas</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                {`Verificamos cada clinica en ${cityName}: licencias, equipo medico, laboratorio, tasas de exito reales y opiniones de pacientes.`}
              </p>
            </div>
            <div className="border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-colors">
              <Shield className="w-5 h-5 text-primary mb-4" />
              <h3 className="font-sans text-sm sm:text-base font-medium text-foreground">Precios transparentes</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                {`Te informamos de los precios reales de cada tratamiento en ${cityName}. Sin costes ocultos, sin sorpresas en la factura.`}
              </p>
            </div>
            <div className="border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-colors">
              <Heart className="w-5 h-5 text-primary mb-4" />
              <h3 className="font-sans text-sm sm:text-base font-medium text-foreground">Acompanamiento emocional</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                {"Sabemos lo delicado que es este proceso. Te acompanamos con empatia en cada paso, respetando tus tiempos y decisiones."}
              </p>
            </div>
            <div className="border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-colors">
              <Users className="w-5 h-5 text-primary mb-4" />
              <h3 className="font-sans text-sm sm:text-base font-medium text-foreground">Equipo especializado</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                {`Nuestras asesoras conocen las clinicas de ${cityName} por dentro. Saben que equipo medico destaca en cada tratamiento.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-16">
          <div>
            <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">
              Opiniones reales
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl tracking-tight text-foreground text-balance">
              {`Familias de ${cityName} que confiaron en nacería`}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
              ))}
            </div>
            <span className="text-sm font-sans font-medium text-foreground">{avgRating}/5</span>
            <span className="text-xs text-muted-foreground font-sans">({reviews.length} opiniones)</span>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {reviews.slice(0, visibleReviews).map((review, i) => (
            <article key={i} className="border border-border p-5 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-foreground/10 flex items-center justify-center font-sans text-xs font-medium text-foreground">
                      {review.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-sans font-medium text-foreground">{review.name}</p>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <p className="text-[10px] sm:text-xs text-muted-foreground font-sans">{review.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-current text-amber-500" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 font-sans leading-relaxed">{review.text}</p>
              <div className="flex items-center gap-3 mt-4 text-[10px] sm:text-xs text-muted-foreground font-sans">
                <span>{review.date}</span>
                {review.verified && (
                  <>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verificada
                    </span>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        {visibleReviews < reviews.length && (
          <button
            onClick={() => setVisibleReviews(reviews.length)}
            className="mt-6 sm:mt-8 flex items-center gap-2 text-sm font-sans font-medium text-foreground hover:text-foreground/70 transition-colors mx-auto"
          >
            Ver mas opiniones
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </section>

      {/* Mid-page CTA */}
      <section className="bg-secondary">
        <div className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl tracking-tight text-foreground text-balance">
            {`No pierdas mas tiempo buscando clinica en ${cityName}`}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-4 sm:mt-6 max-w-xl mx-auto font-sans leading-relaxed">
            {"Llamanos ahora y en menos de 2 horas tendras opciones reales, con precios y tasas de exito. Es gratis."}
          </p>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 sm:px-10 py-4 sm:py-5 mt-8 rounded-full font-sans text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            Llamar ahora: {PHONE_DISPLAY}
          </a>
          <p className="text-xs text-muted-foreground mt-4 font-sans">Lunes a viernes, 9:00 - 20:00 | Sabados 10:00 - 14:00</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24 max-w-4xl mx-auto">
        <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">
          Preguntas frecuentes
        </p>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-10 sm:mb-16 text-balance">
          {`Todo lo que necesitas saber sobre ${serviceName.singular} en ${cityName}`}
        </h2>

        <div className="space-y-0 border-t border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 py-5 sm:py-6 text-left"
              >
                <h3 className="text-xs sm:text-sm font-sans font-medium text-foreground leading-relaxed pr-4">{faq.q}</h3>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className="pb-5 sm:pb-6 -mt-2">
                  <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-card border-y border-border">
        <div className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24 max-w-4xl mx-auto">
          <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">
            Guia completa
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl tracking-tight text-foreground mb-8 text-balance">
            {`Guia para elegir clinica de ${serviceName.singular} en ${cityName}`}
          </h2>
          <div className="prose-sm font-sans text-muted-foreground space-y-4 leading-relaxed text-xs sm:text-sm">
            <p>
              {`Elegir una clinica de ${serviceName.singular} en ${cityName} es una de las decisiones mas importantes de tu vida. Es normal sentir dudas, incertidumbre y nervios. En nacería lo entendemos porque hemos acompanado a mas de 1.200 familias en toda España en este camino.`}
            </p>

            {serviceId.includes("fecundacion") || serviceId.includes("fiv") ? (
              <>
                <h3 className="text-foreground font-medium text-sm sm:text-base pt-4">
                  {"Que buscar en una clinica de FIV"}
                </h3>
                <p>
                  {`Al elegir una clinica de fecundacion in vitro en ${cityName}, fijate en las tasas de exito publicadas (y compara con la media nacional), la experiencia del equipo de embriologos, la tecnologia del laboratorio (cultivo a blastocisto, time-lapse, DGP) y la atencion personalizada del equipo medico.`}
                </p>
                <p>
                  {"Una buena clinica de FIV debe ofrecer un protocolo personalizado basado en tu historia clinica, no un enfoque estandar para todas las pacientes. El ratio de embarazos por transferencia es un indicador mas fiable que el ratio por ciclo iniciado. Pregunta siempre por ambas cifras."}
                </p>
                <h3 className="text-foreground font-medium text-sm sm:text-base pt-4">
                  {"La importancia del laboratorio de embriologia"}
                </h3>
                <p>
                  {`El laboratorio es el corazon de una clinica de FIV. Las mejores clinicas de ${cityName} cuentan con sistemas de monitorizacion continua de embriones (time-lapse), cabinas de flujo laminar de ultima generacion y protocolos estrictos de calidad. Un buen laboratorio puede marcar la diferencia entre el exito y el fracaso del tratamiento.`}
                </p>
              </>
            ) : serviceId.includes("inseminacion") ? (
              <>
                <h3 className="text-foreground font-medium text-sm sm:text-base pt-4">
                  {"Cuando es la inseminacion artificial la mejor opcion"}
                </h3>
                <p>
                  {`La inseminacion artificial en ${cityName} es generalmente la primera opcion cuando hay problemas leves de fertilidad, como anovulacion, endometriosis leve, factor cervical o problemas leves de movilidad espermatica. Tambien es la tecnica de eleccion para madres solteras y parejas de mujeres que utilizan semen de donante.`}
                </p>
                <p>
                  {"El proceso es menos invasivo que la FIV, requiere menos medicacion y es significativamente mas economico. Sin embargo, las tasas de exito son menores (15-20% por ciclo frente al 40-60% de la FIV), por lo que es importante valorar cada caso individualmente."}
                </p>
              </>
            ) : serviceId.includes("congelacion") ? (
              <>
                <h3 className="text-foreground font-medium text-sm sm:text-base pt-4">
                  {"Preservar la fertilidad: una decision inteligente"}
                </h3>
                <p>
                  {`La congelacion de ovulos en ${cityName} se ha convertido en una opcion cada vez mas demandada por mujeres que quieren preservar su fertilidad. Ya sea por motivos profesionales, personales o medicos (como antes de un tratamiento oncologico), la vitrificacion permite conservar ovulos jovenes para utilizarlos en el futuro.`}
                </p>
                <p>
                  {"La vitrificacion es la tecnica mas avanzada de congelacion. A diferencia de la congelacion lenta tradicional, la vitrificacion evita la formacion de cristales de hielo, lo que preserva la calidad del ovulo de forma optima. Las tasas de supervivencia post-desvitrificacion superan el 90% en las mejores clinicas."}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-foreground font-medium text-sm sm:text-base pt-4">
                  {"Que tener en cuenta al elegir clinica de fertilidad"}
                </h3>
                <p>
                  {`${cityName} cuenta con una oferta variada de clinicas de reproduccion asistida. La clave esta en encontrar la que mejor se adapte a tu situacion: tipo de tratamiento necesario, presupuesto, ubicacion y, sobre todo, confianza en el equipo medico.`}
                </p>
                <p>
                  {`Te recomendamos visitar al menos 2 o 3 clinicas en ${cityName} antes de decidir. Fijate en como te tratan desde la primera llamada, si te dedican tiempo en la consulta, si explican las opciones con claridad y si las tasas de exito que te dan son realistas y verificables.`}
                </p>
              </>
            )}

            <h3 className="text-foreground font-medium text-sm sm:text-base pt-4">
              {`Por que confiar en nacería para encontrar clinica en ${cityName}`}
            </h3>
            <p>
              {`Nuestro equipo conoce las clinicas de ${cityName} por dentro. No nos basamos en publicidad ni en lo que los propios centros nos cuentan. Verificamos tasas de exito, hablamos con pacientes, evaluamos equipos medicos y actualizamos nuestra informacion constantemente. Cuando te recomendamos una clinica, es porque la conocemos de verdad.`}
            </p>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">
              {serviceName.title} en otras ciudades
            </p>
            <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-foreground mb-6">
              Localidades cercanas
            </h3>
            <nav aria-label="Ciudades cercanas">
              <ul className="space-y-2">
                {nearbyCities.map((city) => (
                  <li key={city}>
                    <Link
                      href={`/${serviceId}/${city}/`}
                      className="flex items-center justify-between py-2.5 border-b border-border/50 group"
                    >
                      <span className="text-xs sm:text-sm font-sans text-foreground group-hover:text-foreground/70 transition-colors">
                        {`${serviceName.title} en ${getCityDisplayName(city)}`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 font-sans">
              Otros tratamientos en {cityName}
            </p>
            <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-foreground mb-6">
              Tambien te puede interesar
            </h3>
            <nav aria-label="Tratamientos relacionados">
              <ul className="space-y-2">
                {relatedServices.map((svc) => (
                  <li key={svc}>
                    <Link
                      href={`/${svc}/${citySlug}/`}
                      className="flex items-center justify-between py-2.5 border-b border-border/50 group"
                    >
                      <span className="text-xs sm:text-sm font-sans text-foreground group-hover:text-foreground/70 transition-colors">
                        {`${serviceNames[svc as Service]?.title || svc} en ${cityName}`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-foreground">
        <div className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-widest uppercase text-background/40 mb-4 font-sans">
            Da el primer paso
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl tracking-tight text-background text-balance">
            {"Tu sueno de ser madre merece la mejor clinica"}
          </h2>
          <p className="text-sm sm:text-base text-background/70 mt-4 sm:mt-6 max-w-lg mx-auto font-sans leading-relaxed">
            {`Llama ahora y empieza a buscar la clinica ideal de ${serviceName.singular} en ${cityName}. Sin compromiso, sin coste.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 sm:px-10 py-4 sm:py-5 rounded-full font-sans text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-background/30 text-background px-8 sm:px-10 py-4 sm:py-5 rounded-full font-sans text-sm sm:text-base hover:border-background/60 transition-colors"
            >
              Ver mas tratamientos
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `nacería - ${pageTitle}`,
            description: `Encuentra las mejores clinicas de ${serviceName.singular} en ${cityName}. Asesoramiento gratuito.`,
            telephone: PHONE,
            url: `https://www.naceria.com/${serviceId}/${citySlug}/`,
            address: {
              "@type": "PostalAddress",
              addressLocality: cityName,
              addressCountry: "ES",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: avgRating,
              reviewCount: reviews.length,
              bestRating: "5",
              worstRating: "1",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </>
  )
}
