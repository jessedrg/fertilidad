import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiceCityContent } from "@/components/service-city-content"
import { VALID_SERVICES, MODIFIERS, CITIES, type Service } from "@/lib/sitemap-data"

export const dynamicParams = true
export const revalidate = 604800

const KNOWN_MODIFIERS = MODIFIERS.filter(m => m !== "").map(m => m.slice(1)) as string[]

const SERVICE_NAMES: Record<Service, { name: string; title: string; singular: string }> = {
  "clinica-fertilidad": { name: "Clínica de Fertilidad", title: "Clínicas de Fertilidad", singular: "fertilidad" },
  "fecundacion-in-vitro": { name: "Fecundación In Vitro", title: "Fecundación In Vitro", singular: "fecundación in vitro" },
  "inseminacion-artificial": { name: "Inseminación Artificial", title: "Inseminación Artificial", singular: "inseminación artificial" },
  "donacion-ovulos": { name: "Donación de Óvulos", title: "Donación de Óvulos", singular: "donación de óvulos" },
  "congelacion-ovulos": { name: "Congelación de Óvulos", title: "Congelación de Óvulos", singular: "congelación de óvulos" },
  "tratamiento-fertilidad": { name: "Tratamiento de Fertilidad", title: "Tratamientos de Fertilidad", singular: "tratamiento de fertilidad" },
  "ovodonacion": { name: "Ovodonación", title: "Ovodonación", singular: "ovodonación" },
  "banco-semen": { name: "Banco de Semen", title: "Bancos de Semen", singular: "banco de semen" },
  "fertilidad-masculina": { name: "Fertilidad Masculina", title: "Fertilidad Masculina", singular: "fertilidad masculina" },
  "reproduccion-asistida": { name: "Reproducción Asistida", title: "Reproducción Asistida", singular: "reproducción asistida" },
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
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

function formatModifier(modifier: string): string {
  const modifierMap: Record<string, string> = {
    "precios": "Precios",
    "economica": "Económica",
    "barata": "Barata",
    "cuanto-cuesta": "Cuánto Cuesta",
    "financiacion": "con Financiación",
    "seguridad-social": "Seguridad Social",
    "mejor": "Mejor",
    "recomendada": "Recomendada",
    "especializada": "Especializada",
    "prestigiosa": "Prestigiosa",
    "alta-tasa-exito": "Alta Tasa de Éxito",
    "mayores-40": "Mayores de 40",
    "mayores-45": "Mayores de 45",
    "edad-avanzada": "Edad Avanzada",
    "garantizada": "Garantizada",
    "sin-exito-no-pago": "Sin Éxito No Pago",
    "primera-consulta-gratis": "Primera Consulta Gratis",
    "cerca-de-mi": "Cerca de Mí",
    "centro": "Centro",
    "economica-garantizada": "Económica Garantizada",
    "mejor-precio": "Mejor Precio",
  }
  return modifierMap[modifier] || modifier.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

interface PageProps {
  params: Promise<{ service: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: rawService, city: citySlug } = await params
  const { serviceId, modifier } = parseServiceAndModifier(rawService)
  if (!serviceId) return { title: "No encontrado" }

  const serviceName = SERVICE_NAMES[serviceId]
  const cityName = getCityDisplayName(citySlug)
  const modifierText = modifier ? ` ${formatModifier(modifier)}` : ""
  const fullTitle = `${serviceName.title}${modifierText} en ${cityName}`

  return {
    title: `${fullTitle} | Compara Precios y Opiniones | nacería`,
    description: `Encuentra las mejores clínicas de ${serviceName.title.toLowerCase()}${modifierText.toLowerCase()} en ${cityName}. Comparamos precios, tasas de éxito y opiniones reales. Asesoramiento GRATUITO. Llama ahora: +34 936 941 874`,
    keywords: `${serviceName.name.toLowerCase()} ${cityName}, ${serviceName.title.toLowerCase()} ${cityName}, clinica fertilidad ${cityName}, tratamiento fertilidad ${cityName}`,
    alternates: {
      canonical: `https://www.naceria.com/${rawService}/${citySlug}/`,
    },
    openGraph: {
      title: fullTitle,
      description: `Las mejores clínicas de ${serviceName.title.toLowerCase()}${modifierText.toLowerCase()} en ${cityName}. Asesoramiento gratuito y personalizado. +34 936 941 874`,
      type: "website",
      siteName: "nacería",
    },
  }
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { service: rawService, city: citySlug } = await params
  const { serviceId, modifier } = parseServiceAndModifier(rawService)
  if (!serviceId) notFound()

  const serviceName = SERVICE_NAMES[serviceId as Service]
  const cityName = getCityDisplayName(citySlug)
  const modifierText = modifier ? formatModifier(modifier) : ""
  const pageTitle = modifier
    ? `${serviceName.title} ${modifierText} en ${cityName}`
    : `${serviceName.title} en ${cityName}`

  const cityIndex = CITIES.indexOf(citySlug)
  const nearbyCities = CITIES.slice(
    Math.max(0, cityIndex - 5),
    Math.min(CITIES.length, cityIndex + 6)
  ).filter(c => c !== citySlug).slice(0, 5)

  const relatedServices = VALID_SERVICES.filter(s => s !== serviceId).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <ServiceCityContent
          pageTitle={pageTitle}
          serviceName={serviceName}
          cityName={cityName}
          citySlug={citySlug}
          serviceId={serviceId as Service}
          modifierText={modifierText}
          nearbyCities={nearbyCities}
          relatedServices={relatedServices}
          serviceNames={SERVICE_NAMES}
        />
      </main>
      <Footer />
    </div>
  )
}
