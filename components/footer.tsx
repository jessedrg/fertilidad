import Link from "next/link"
import { Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <span className="text-3xl font-serif tracking-tight italic">nacería</span>
            <p className="mt-4 text-background/60 leading-relaxed text-sm">
              Conectamos parejas con las mejores clinicas de fertilidad en España. Asesoramiento personalizado y gratuito.
            </p>
            <a
              href="tel:+34936941874"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              936 941 874
            </a>
          </div>

          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-background/40 mb-4">Tratamientos</p>
            <nav className="flex flex-col gap-2.5">
              <Link href="/fecundacion-in-vitro/madrid" className="text-sm text-background/70 hover:text-background transition-colors">Fecundacion in vitro</Link>
              <Link href="/inseminacion-artificial/madrid" className="text-sm text-background/70 hover:text-background transition-colors">Inseminacion artificial</Link>
              <Link href="/ovodonacion/madrid" className="text-sm text-background/70 hover:text-background transition-colors">Ovodonacion</Link>
              <Link href="/congelacion-ovulos/madrid" className="text-sm text-background/70 hover:text-background transition-colors">Congelacion de ovulos</Link>
            </nav>
          </div>

          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-background/40 mb-4">Ciudades</p>
            <nav className="flex flex-col gap-2.5">
              <Link href="/fecundacion-in-vitro/madrid" className="text-sm text-background/70 hover:text-background transition-colors">Clinicas en Madrid</Link>
              <Link href="/fecundacion-in-vitro/barcelona" className="text-sm text-background/70 hover:text-background transition-colors">Clinicas en Barcelona</Link>
              <Link href="/fecundacion-in-vitro/valencia" className="text-sm text-background/70 hover:text-background transition-colors">Clinicas en Valencia</Link>
              <Link href="/fecundacion-in-vitro/sevilla" className="text-sm text-background/70 hover:text-background transition-colors">Clinicas en Sevilla</Link>
              <Link href="/fecundacion-in-vitro/bilbao" className="text-sm text-background/70 hover:text-background transition-colors">Clinicas en Bilbao</Link>
              <Link href="/fecundacion-in-vitro/malaga" className="text-sm text-background/70 hover:text-background transition-colors">Clinicas en Malaga</Link>
            </nav>
          </div>

          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-background/40 mb-4">Contacto</p>
            <div className="flex flex-col gap-2.5 text-sm text-background/70">
              <a href="mailto:hola@naceria.com" className="hover:text-background transition-colors">hola@naceria.com</a>
              <a href="tel:+34936941874" className="hover:text-background transition-colors">+34 936 941 874</a>
              <p>L-V 9:00 - 20:00</p>
              <p>Sabados 10:00 - 14:00</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">2026 nacería. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 text-xs text-background/40">
            <Link href="#" className="hover:text-background/70 transition-colors">Politica de privacidad</Link>
            <Link href="#" className="hover:text-background/70 transition-colors">Aviso legal</Link>
            <Link href="#" className="hover:text-background/70 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
