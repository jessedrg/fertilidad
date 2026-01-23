import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SERENA — Encuentra la residencia perfecta para tu ser querido",
  description:
    "Somos la agencia que conecta familias con las mejores residencias de mayores. Te ayudamos a encontrar el lugar ideal donde tu ser querido recibirá el cuidado que merece.",
  generator: "v0.app",
  openGraph: {
    title: "SERENA — Encuentra la residencia perfecta",
    description:
      "Te ayudamos a encontrar la mejor residencia para tu ser querido. Asesoramiento personalizado y gratuito.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SERENA - Cuidado de mayores",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SERENA — Encuentra la residencia perfecta",
    description: "Te ayudamos a encontrar la mejor residencia para tu ser querido.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
