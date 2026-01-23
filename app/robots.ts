import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: [
      "https://www.tufertilidad.xyz/sitemap-1.xml",
      "https://www.tufertilidad.xyz/sitemap-2.xml",
      "https://www.tufertilidad.xyz/sitemap-3.xml",
      "https://www.tufertilidad.xyz/sitemap-4.xml",
      "https://www.tufertilidad.xyz/sitemap-5.xml",
    ],
  }
}
