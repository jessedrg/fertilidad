import { NextResponse } from "next/server"
import { VALID_SERVICES, MODIFIERS, PROBLEMS, CITIES } from "@/lib/sitemap-data"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const BASE_URL = "https://www.tufertilidad.com"
const MAX_URLS_PER_SITEMAP = 45000

export async function GET() {
  const date = new Date().toISOString().split("T")[0]

  const sitemaps: string[] = []

  // Sitemaps for each service + modifier
  for (const service of VALID_SERVICES) {
    for (const modifier of MODIFIERS) {
      const id = modifier ? `${service}${modifier}` : service
      sitemaps.push(`${BASE_URL}/sitemap-files/${id}.xml`)
    }
  }

  // Sitemaps for problems/needs - CHUNKED to respect 50k limit
  const urlsPerProblem = CITIES.length // 8,118
  const problemsPerChunk = Math.floor(MAX_URLS_PER_SITEMAP / urlsPerProblem) // ~5

  for (const service of VALID_SERVICES) {
    const problems = PROBLEMS[service] || []
    const numChunks = Math.ceil(problems.length / problemsPerChunk)
    
    for (let i = 1; i <= numChunks; i++) {
      sitemaps.push(`${BASE_URL}/sitemap-files/${service}-necesidad-${i}.xml`)
    }
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const sitemap of sitemaps) {
    xml += `  <sitemap>\n    <loc>${sitemap}</loc>\n    <lastmod>${date}</lastmod>\n  </sitemap>\n`
  }

  xml += "</sitemapindex>"

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
