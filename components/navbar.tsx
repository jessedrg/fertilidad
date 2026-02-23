"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl lg:text-3xl font-serif text-foreground tracking-tight italic">nacería</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link href="/#servicios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Tratamientos
          </Link>
          <Link href="/#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Como funciona
          </Link>
          <Link href="/#opiniones" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Opiniones
          </Link>
          <Link href="/#ciudades" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Ciudades
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+34936941874"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Phone className="w-4 h-4" />
            936 941 874
          </a>
          <a
            href="tel:+34936941874"
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Solicitar info
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-4 flex flex-col gap-3">
          <Link href="/#servicios" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-foreground">
            Tratamientos
          </Link>
          <Link href="/#como-funciona" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-foreground">
            Como funciona
          </Link>
          <Link href="/#opiniones" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-foreground">
            Opiniones
          </Link>
          <Link href="/#ciudades" onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-foreground">
            Ciudades
          </Link>
          <a
            href="tel:+34936941874"
            className="flex items-center gap-2 py-2 text-sm font-semibold text-foreground"
          >
            <Phone className="w-4 h-4" />
            +34 936 941 874
          </a>
        </div>
      )}
    </header>
  )
}
