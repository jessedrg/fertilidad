import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: [
      "https://www.naceria.com/sitemap-1.xml",
      "https://www.naceria.com/sitemap-2.xml",
      "https://www.naceria.com/sitemap-3.xml",
      "https://www.naceria.com/sitemap-4.xml",
      "https://www.naceria.com/sitemap-5.xml",
    ],
  }
}
