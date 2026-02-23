import type React from "react"
import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _cormorant = Cormorant_Garamond({ weight: ["400", "500", "600", "700"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "nacería — Encuentra la clínica de fertilidad perfecta para ti",
  description:
    "Conectamos parejas con las mejores clínicas de fertilidad en España. Te ayudamos a encontrar el tratamiento ideal con asesoramiento personalizado y gratuito.",
  generator: "v0.app",
  openGraph: {
    title: "nacería — Encuentra la clínica de fertilidad perfecta",
    description:
      "Te ayudamos a encontrar la mejor clínica de fertilidad. Asesoramiento personalizado y gratuito.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "nacería - Clínicas de fertilidad",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nacería — Encuentra la clínica de fertilidad perfecta",
    description: "Te ayudamos a encontrar la mejor clínica de fertilidad.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
