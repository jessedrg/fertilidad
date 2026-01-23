export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-xs font-sans">
          <div>
            <span className="font-serif text-lg tracking-tight">SERENA</span>
            <p className="text-muted-foreground mt-2">Conectamos familias con residencias de confianza.</p>
          </div>

          <div className="space-y-1 text-muted-foreground">
            <p className="text-foreground">Contacto</p>
            <p>hola@serena.es</p>
            <p>+34 900 000 000</p>
          </div>

          <div className="space-y-1 text-muted-foreground">
            <p className="text-foreground">Legal</p>
            <p>Política de privacidad</p>
            <p className="mt-4">© 2026 Serena</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
