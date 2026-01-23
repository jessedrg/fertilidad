import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { VALID_SERVICES, MODIFIERS, type Service } from "@/lib/sitemap-data"

export const dynamicParams = true
export const revalidate = 604800

const KNOWN_MODIFIERS = MODIFIERS.filter(m => m !== "").map(m => m.slice(1)) as string[]

const SERVICE_NAMES: Record<Service, { name: string; title: string }> = {
  "clinica-fertilidad": { name: "Clínica de Fertilidad", title: "Clínicas Fertilidad" },
  "fecundacion-in-vitro": { name: "Fecundación In Vitro", title: "FIV - Fecundación In Vitro" },
  "inseminacion-artificial": { name: "Inseminación Artificial", title: "Inseminación Artificial" },
  "donacion-ovulos": { name: "Donación de Óvulos", title: "Donación Óvulos" },
  "congelacion-ovulos": { name: "Congelación de Óvulos", title: "Congelación Óvulos" },
  "tratamiento-fertilidad": { name: "Tratamiento de Fertilidad", title: "Tratamientos Fertilidad" },
  "ovodonacion": { name: "Ovodonación", title: "Ovodonación" },
  "banco-semen": { name: "Banco de Semen", title: "Bancos de Semen" },
  "fertilidad-masculina": { name: "Fertilidad Masculina", title: "Fertilidad Masculina" },
  "reproduccion-asistida": { name: "Reproducción Asistida", title: "Reproducción Asistida" },
}

function parseServiceAndModifier(rawService: string): {
  serviceId: Service | null
  modifier?: string
} {
  if (VALID_SERVICES.includes(rawService as Service)) {
    return { serviceId: rawService as Service }
  }

  for (const mod of KNOWN_MODIFIERS) {
    const suffix = `-${mod}`
    if (rawService.endsWith(suffix)) {
      const serviceId = rawService.slice(0, -suffix.length)
      if (VALID_SERVICES.includes(serviceId as Service)) {
        return { serviceId: serviceId as Service, modifier: mod }
      }
    }
  }

  return { serviceId: null }
}

function getCityDisplayName(slug: string): string {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatModifier(modifier: string): string {
  const modifierMap: Record<string, string> = {
    "urgente": "Urgente",
    "plaza-disponible": "con Plaza Disponible",
    "ingreso-inmediato": "con Ingreso Inmediato",
    "economica": "Económica",
    "barata": "Barata",
    "precios": "Precios",
    "publica": "Pública",
    "privada": "Privada",
    "concertada": "Concertada",
    "subvencionada": "Subvencionada",
    "de-lujo": "de Lujo",
    "premium": "Premium",
    "alzheimer": "Alzheimer",
    "demencia": "Demencia",
    "24-horas": "24 Horas",
    "con-enfermeria": "con Enfermería",
    "estancia-temporal": "Estancia Temporal",
    "respiro-familiar": "Respiro Familiar",
    "cerca-de-mi": "Cerca de Mí",
    "mejor-valorada": "Mejor Valorada",
  }
  return modifierMap[modifier] || modifier.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

interface PageProps {
  params: Promise<{ service: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: rawService, city: citySlug } = await params
  const { serviceId, modifier } = parseServiceAndModifier(rawService)

  if (!serviceId) {
    return { title: "No encontrado" }
  }

  const serviceName = SERVICE_NAMES[serviceId]
  const cityName = getCityDisplayName(citySlug)

  if (modifier) {
    const modifierText = formatModifier(modifier)
    const isUrgent = ["urgente", "plaza-disponible", "ingreso-inmediato", "ahora", "hoy"].includes(modifier)
    const urgencyText = isUrgent ? "Plazas disponibles AHORA." : "Consulta sin compromiso."

    return {
      title: `${serviceName.title} ${modifierText} en ${cityName} | Serena`,
      description: `${serviceName.title} ${modifierText.toLowerCase()} en ${cityName}. ${urgencyText} Compara precios y servicios. Asesoramiento GRATUITO. Llama: 910 123 456`,
      keywords: `${serviceName.name.toLowerCase()} ${modifier} ${cityName}, residencia ancianos ${cityName}, residencia mayores ${cityName}`,
      alternates: {
        canonical: `https://www.serenaresidencias.com/${rawService}/${citySlug}/`,
      },
      openGraph: {
        title: `${serviceName.title} ${modifierText} en ${cityName}`,
        description: `Encuentra ${serviceName.name.toLowerCase()} ${modifierText.toLowerCase()} en ${cityName}. Asesoramiento gratuito.`,
        type: "website",
      },
    }
  }

  return {
    title: `${serviceName.title} en ${cityName} | Compara Precios | Serena`,
    description: `Encuentra las mejores ${serviceName.title.toLowerCase()} en ${cityName}. Compara precios, servicios y disponibilidad. Asesoramiento GRATUITO y personalizado. Llama: 910 123 456`,
    keywords: `${serviceName.name.toLowerCase()} ${cityName}, residencia ancianos ${cityName}, residencia mayores ${cityName}, precios residencias ${cityName}`,
    alternates: {
      canonical: `https://www.serenaresidencias.com/${rawService}/${citySlug}/`,
    },
    openGraph: {
      title: `${serviceName.title} en ${cityName} - Compara y Elige`,
      description: `Las mejores ${serviceName.title.toLowerCase()} en ${cityName}. Asesoramiento gratuito personalizado.`,
      type: "website",
    },
  }
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { service: rawService, city: citySlug } = await params
  const { serviceId, modifier } = parseServiceAndModifier(rawService)

  if (!serviceId) {
    notFound()
  }

  const serviceName = SERVICE_NAMES[serviceId as Service]
  const cityName = getCityDisplayName(citySlug)
  const modifierText = modifier ? formatModifier(modifier) : ""

  const pageTitle = modifier 
    ? `${serviceName.title} ${modifierText} en ${cityName}`
    : `${serviceName.title} en ${cityName}`

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <HeroSection 
          customTitle={pageTitle}
          customSubtitle={`Encuentra la mejor ${serviceName.name.toLowerCase()} ${modifierText ? modifierText.toLowerCase() + ' ' : ''}en ${cityName}. Te ayudamos a comparar opciones y elegir la más adecuada para tu familiar.`}
          locality={cityName}
        />
      </main>
      <Footer />
    </div>
  )
}
