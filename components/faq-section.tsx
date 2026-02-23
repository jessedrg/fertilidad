"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "El servicio de nacería tiene algun coste?",
    answer:
      "No, nuestro servicio es completamente gratuito para las parejas. Nos financiamos a traves de acuerdos con las clinicas, pero esto nunca afecta a nuestras recomendaciones. Siempre te proponemos las opciones que mejor encajan con tus necesidades, independientemente de nuestros acuerdos comerciales.",
  },
  {
    question: "Cuanto tardais en encontrar una clinica?",
    answer:
      "En la mayoria de los casos, un asesor te contacta en menos de 2 horas con una seleccion personalizada de clinicas. Para casos urgentes, podemos acelerar el proceso y tener opciones el mismo dia. El tiempo total depende de las consultas y tu decision, pero muchas parejas completan el proceso en menos de dos semanas.",
  },
  {
    question: "Como verificais las clinicas?",
    answer:
      "Todas las clinicas de nuestra red pasan un proceso de verificacion que incluye: revision de licencias y autorizaciones sanitarias, evaluacion de tasas de exito, revision del equipo medico y su formacion, analisis de tecnologia y equipamiento, y valoraciones de pacientes anteriores. Solo trabajamos con centros que cumplen nuestros estandares de calidad.",
  },
  {
    question: "Puedo visitar las clinicas antes de decidirme?",
    answer:
      "Por supuesto, y de hecho lo recomendamos. Coordinamos las primeras consultas por ti y, si lo deseas, un asesor de nacería te acompana para que puedas hacer las preguntas adecuadas y evaluar cada centro con criterio. No hay ningun compromiso hasta que tu estes completamente segura.",
  },
  {
    question: "Que tratamientos de fertilidad ofreceis?",
    answer:
      "Trabajamos con clinicas que ofrecen todos los tratamientos: fecundacion in vitro (FIV), inseminacion artificial, ovodonacion, congelacion de ovulos, diagnostico genetico preimplantacional (DGP), y tratamientos para parejas del mismo sexo y madres solteras. Cada recomendacion se adapta a tu situacion especifica.",
  },
  {
    question: "Ofreceis ayuda con financiacion o ayudas?",
    answer:
      "Si. Nuestros asesores conocen las opciones de financiacion de cada clinica, asi como las coberturas de seguros medicos privados y las prestaciones de la seguridad social en cada comunidad autonoma. Te orientamos sobre todas las opciones disponibles para hacer el tratamiento mas accesible.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Preguntas frecuentes</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif text-foreground text-balance">
            Resolvemos tus dudas
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
