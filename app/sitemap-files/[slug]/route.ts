import { NextResponse } from "next/server"
import { VALID_SERVICES, CITIES, MODIFIERS, PROBLEMS, type Service } from "@/lib/sitemap-data"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Max 50,000 URLs per sitemap (Google limit)
const MAX_URLS_PER_SITEMAP = 45000 // Leave margin

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const baseUrl = "https://www.naceria.com"
    const date = new Date().toISOString().split("T")[0]
    const id = slug.endsWith(".xml") ? slug.slice(0, -4) : slug

    const urls: string[] = []

    // Handle service-landings sitemap (national-level pages without city)
    if (id === "service-landings") {
      // Base service pages: /clinica-fertilidad/, /fecundacion-in-vitro/, etc.
      for (const svc of VALID_SERVICES) {
        urls.push(`${baseUrl}/${svc}/`)
      }
      // Service + modifier pages: /clinica-fertilidad-precios/, etc.
      for (const svc of VALID_SERVICES) {
        for (const mod of MODIFIERS) {
          if (mod) {
            urls.push(`${baseUrl}/${svc}${mod}/`)
          }
        }
      }

      const xmlParts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map(url => `<url><loc>${url}</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`),
        '</urlset>'
      ]
      const xml = xmlParts.join('\n')

      return new NextResponse(xml, {
        status: 200,
        headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" },
      })
    }

    // Handle chunked necesidad sitemaps: clinica-fertilidad-necesidad-1, etc.
    const necesidadMatch = id.match(/^(.+)-necesidad-(\d+)$/)
    if (necesidadMatch) {
      const service = necesidadMatch[1] as Service
      const chunkIndex = parseInt(necesidadMatch[2], 10) - 1 // 1-indexed to 0-indexed
      const problems = PROBLEMS[service] || []
      
      // Calculate which problems go in this chunk
      const urlsPerProblem = CITIES.length
      const problemsPerChunk = Math.floor(MAX_URLS_PER_SITEMAP / urlsPerProblem)
      const startProblem = chunkIndex * problemsPerChunk
      const endProblem = Math.min(startProblem + problemsPerChunk, problems.length)
      
      for (let i = startProblem; i < endProblem; i++) {
        const problem = problems[i]
        for (const city of CITIES) {
          urls.push(`${baseUrl}/necesidad/${service}/${problem}/${city}/`)
        }
      }
    } else if (id.endsWith("-necesidad")) {
      // Legacy: if no chunk number, return first chunk only
      const service = id.replace("-necesidad", "") as Service
      const problems = PROBLEMS[service] || []
      const urlsPerProblem = CITIES.length
      const problemsPerChunk = Math.floor(MAX_URLS_PER_SITEMAP / urlsPerProblem)
      
      for (let i = 0; i < Math.min(problemsPerChunk, problems.length); i++) {
        const problem = problems[i]
        for (const city of CITIES) {
          urls.push(`${baseUrl}/necesidad/${service}/${problem}/${city}/`)
        }
      }
    } else {
      let foundService = ""
      let foundModifier = ""

      if (VALID_SERVICES.includes(id as Service)) {
        foundService = id
        foundModifier = ""
      } else {
        for (const svc of VALID_SERVICES) {
          for (const mod of MODIFIERS) {
            if (mod && id === `${svc}${mod}`) {
              foundService = svc
              foundModifier = mod
              break
            }
          }
          if (foundService) break
        }
      }

      if (foundService) {
        for (const city of CITIES) {
          if (foundModifier) {
            urls.push(`${baseUrl}/${foundService}${foundModifier}/${city}/`)
          } else {
            urls.push(`${baseUrl}/${foundService}/${city}/`)
          }
        }
      }
    }

    // Optimized XML generation using array join (faster than string concatenation)
    const xmlParts = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map(url => `<url><loc>${url}</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`),
      '</urlset>'
    ]
    const xml = xmlParts.join('\n')

    return new NextResponse(xml, {
      status: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" },
    })
  } catch (error) {
    console.error("[v0] Sitemap error:", error)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        status: 200,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      },
    )
  }
}
