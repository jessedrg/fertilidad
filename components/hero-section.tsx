"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { ArrowUp } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface HeroSectionProps {
  customTitle?: string
  customSubtitle?: string
  locality?: string
}

export function HeroSection({ customTitle, customSubtitle, locality }: HeroSectionProps = {}) {
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false)
  const [isTypingWelcome, setIsTypingWelcome] = useState(false)
  const [welcomeText, setWelcomeText] = useState("")
  const [leadSent, setLeadSent] = useState(false)
  const [displayedTexts, setDisplayedTexts] = useState<Record<string, string>>({})
  const [inputValue, setInputValue] = useState("")
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const fullWelcomeText = locality 
    ? `Hola, soy del equipo de nacería. Veo que estás buscando tratamiento de fertilidad en ${locality}. ¿Qué tipo de tratamiento te interesa?`
    : "Hola, soy del equipo de nacería. ¿En qué zona de España buscas clínica de fertilidad?"

  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (leadSent || messages.length < 4) return

    const phoneRegex = /(\+?34)?[\s.-]?[6789]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/

    let telefono = ""
    let nombre = ""
    const zona = ""
    const tipoAtencion = ""

    messages.forEach((m) => {
      if (m.role !== "user") return
      const text =
        typeof m.content === "string"
          ? m.content
          : m.parts
              ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
              .map((p) => p.text)
              .join("") || ""

      const phoneMatch = text.match(phoneRegex)
      if (phoneMatch) {
        telefono = phoneMatch[0]
      }

      if (!phoneMatch && text.length < 50 && !/\d/.test(text) && !zona) {
        if (!nombre && messages.indexOf(m) > 2) {
          nombre = text.trim()
        }
      }
    })

    if (telefono && !leadSent) {
      setLeadSent(true)

      const conversacion = messages
        .map((m) => {
          const content =
            typeof m.content === "string"
              ? m.content
              : m.parts
                  ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
                  .map((p) => p.text)
                  .join("") || ""
          return `${m.role === "user" ? "Cliente" : "nacería"}: ${content}`
        })
        .join("\n\n")

      fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre || "Ver conversación",
          telefono,
          zona: "Ver conversación",
          tipoAtencion: "Ver conversación",
          detalles: "Lead capturado via chat nacería Fertilidad",
          conversacion,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("[v0] Lead sent response:", data))
        .catch((err) => console.error("[v0] Error sending lead:", err))
    }
  }, [messages, leadSent])

  useEffect(() => {
    messages.forEach((message) => {
      if (message.role !== "assistant") return

      const fullText =
        typeof message.content === "string"
          ? message.content
          : message.parts
              ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
              .map((p) => p.text)
              .join("") || ""

      const currentDisplayed = displayedTexts[message.id] || ""

      if (currentDisplayed.length < fullText.length) {
        const baseSpeed = 20
        const variation = Math.random() * 15
        const currentChar = fullText[currentDisplayed.length]
        const punctuationDelay = [".", ",", "!", "?", ":"].includes(currentChar) ? 80 : 0
        const delay = baseSpeed + variation + punctuationDelay

        const timeoutId = setTimeout(() => {
          setDisplayedTexts((prev) => ({
            ...prev,
            [message.id]: fullText.slice(0, (prev[message.id]?.length || 0) + 1),
          }))
        }, delay)

        return () => clearTimeout(timeoutId)
      }
    })
  }, [messages, displayedTexts])

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setIsTypingWelcome(true)
    }, 800)

    const typingDelay = setTimeout(() => {
      setIsTypingWelcome(false)
      setShowWelcomeBubble(true)

      let currentIndex = 0
      const typeInterval = setInterval(() => {
        if (currentIndex <= fullWelcomeText.length) {
          setWelcomeText(fullWelcomeText.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 25)

      return () => clearInterval(typeInterval)
    }, 1500)

    return () => {
      clearTimeout(initialDelay)
      clearTimeout(typingDelay)
    }
  }, [])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages, isSending, welcomeText, displayedTexts])

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcomeBubble(false)
      setIsTypingWelcome(false)
    }
  }, [messages])

  // Mobile keyboard handling - scroll chat into view when input focused
  useEffect(() => {
    if (isInputFocused && chatContainerRef.current) {
      // Small delay to let the keyboard appear
      const timeoutId = setTimeout(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [isInputFocused])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isSending) return
    
    const userMessage = { id: Date.now().toString(), role: "user" as const, content: inputValue }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsSending(true)
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })
      
      if (!response.ok) throw new Error("Chat error")
      
      const data = await response.json()
      const assistantId = (Date.now() + 1).toString()
      
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant" as const, content: data.content }])
    } catch (error) {
      console.error("[v0] Chat error:", error)
    } finally {
      setIsSending(false)
    }
  }

  const getMessageText = (message: (typeof messages)[0]) => {
    if (typeof message.content === "string") return message.content
    return message.parts
      ?.filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("")
  }

  const getDisplayedText = (message: (typeof messages)[0]) => {
    if (message.role === "user") return getMessageText(message)
    return displayedTexts[message.id] || ""
  }

  const isWaitingForResponse =
    isSending && messages.length > 0 && messages[messages.length - 1].role === "user"

  const isRevealingText = useMemo(() => {
    return messages.some((m) => {
      if (m.role !== "assistant") return false
      const fullText = getMessageText(m)
      const displayed = displayedTexts[m.id] || ""
      return displayed.length < fullText.length
    })
  }, [messages, displayedTexts])

  return (
    <section className="relative flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-6 border-b border-border/30">
        <span className="font-serif text-base sm:text-lg tracking-tight text-foreground">nacería</span>
        <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-sans text-muted-foreground">
          Tu sueño de ser madre, más cerca
        </span>
      </header>

      <div className="flex-1 flex flex-col px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-12">
        <div className="text-center mb-6 sm:mb-10 md:mb-16">
          <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 sm:mb-4 font-sans">
            Clínicas de reproducción asistida
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter text-foreground">
            {customTitle ? (
              <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl">{customTitle}</span>
            ) : (
              <>FERTILIDAD<span className="text-2xl sm:text-3xl md:text-4xl align-super font-sans">®</span></>
            )}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-4 sm:mt-6 max-w-md mx-auto font-sans leading-relaxed px-2">
            {customSubtitle || "Conectamos parejas con las mejores clínicas de fertilidad. Sin esperas. Sin agobios. Solo el tratamiento perfecto para ti."}
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 max-w-7xl mx-auto w-full">
          {/* Left column - Image and stats */}
          <div className="flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">
            <div className="relative group">
              <img
                src="/fertility-clinic.jpg"
                alt="Clínica de fertilidad moderna"
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 sm:p-6">
                <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-sans text-foreground/80">
                  +1.200 bebés nacidos gracias a nosotros
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2 sm:pt-4">
              <div className="text-center">
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground">24h</p>
                <p className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-1 font-sans">
                  Primera cita
                </p>
              </div>
              <div className="text-center border-x border-border/30">
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground">65%</p>
                <p className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-1 font-sans">
                  Tasa éxito
                </p>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground">30+</p>
                <p className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-1 font-sans">
                  Clínicas
                </p>
              </div>
            </div>

            <blockquote className="hidden sm:block border-l-2 border-foreground/20 pl-4 mt-4">
              <p className="text-xs sm:text-sm font-sans text-muted-foreground italic leading-relaxed">
                "Sabemos que el camino hacia la maternidad puede ser difícil. Por eso te acompañamos en cada paso, conectándote con las mejores clínicas."
              </p>
              <cite className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-foreground/60 mt-2 block not-italic font-sans">
                — Equipo nacería
              </cite>
            </blockquote>
          </div>

          {/* Right column - Chat */}
          <div ref={chatContainerRef} className="flex flex-col order-1 lg:order-2 lg:sticky lg:top-8">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans">
                  Asesor disponible
                </p>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground">
                Tu clínica ideal
              </h2>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 font-sans">
                Responde 4 preguntas y te conectamos con la clínica perfecta para ti
              </p>
            </div>

            <div className="border border-border bg-card flex flex-col h-[350px] sm:h-[400px]">
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 scroll-smooth overscroll-contain"
              >
                <div className="space-y-3 sm:space-y-4">
                  {messages.length === 0 && isTypingWelcome && (
                    <div className="flex justify-start">
                      <div className="bg-muted/50 border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1.5 items-center h-5">
                          <span className="typing-dot" style={{ animationDelay: "0ms" }} />
                          <span className="typing-dot" style={{ animationDelay: "150ms" }} />
                          <span className="typing-dot" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {messages.length === 0 && showWelcomeBubble && (
                    <div className="flex justify-start">
                      <div className="bg-muted/50 border border-border rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2.5 sm:py-3 max-w-[90%] sm:max-w-[85%]">
                        <p className="text-xs sm:text-sm font-sans leading-relaxed text-foreground">
                          {welcomeText}
                          {welcomeText.length < fullWelcomeText.length && <span className="typing-cursor" />}
                        </p>
                      </div>
                    </div>
                  )}

                  {messages.map((message, index) => {
                    const displayText = getDisplayedText(message)
                    const fullText = getMessageText(message)
                    const isStillTyping = message.role === "assistant" && displayText.length < fullText.length

                    return (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[90%] sm:max-w-[85%] px-3 sm:px-4 py-2.5 sm:py-3 ${
                            message.role === "user"
                              ? "bg-foreground text-background rounded-2xl rounded-br-sm"
                              : "bg-muted/50 border border-border text-foreground rounded-2xl rounded-tl-sm"
                          }`}
                          style={{ minHeight: message.role === "assistant" ? "44px" : undefined }}
                        >
                          <p className="text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap">
                            {displayText}
                            {isStillTyping && <span className="typing-cursor" />}
                          </p>
                        </div>
                      </div>
                    )
                  })}

                  {isWaitingForResponse && (
                    <div className="flex justify-start">
                      <div className="bg-muted/50 border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1.5 items-center h-5">
                          <span className="typing-dot" style={{ animationDelay: "0ms" }} />
                          <span className="typing-dot" style={{ animationDelay: "150ms" }} />
                          <span className="typing-dot" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={onSubmit} className="border-t border-border p-3 sm:p-4 flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-transparent text-base sm:text-sm font-sans placeholder:text-muted-foreground focus:outline-none text-foreground"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    enterKeyHint="send"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isSending}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-foreground text-background rounded-full disabled:opacity-30 transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95"
                  >
                    <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-between mt-3 sm:mt-4 text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-sans">
              <span>Conversación privada</span>
              <span className="hidden sm:inline">·</span>
              <span>Cita en 24h</span>
              <span className="hidden sm:inline">·</span>
              <span>Asesor humano</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .typing-dot {
          width: 6px;
          height: 6px;
          background-color: currentColor;
          border-radius: 50%;
          opacity: 0.4;
          animation: typingWave 1.4s ease-in-out infinite;
        }

        @keyframes typingWave {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: currentColor;
          margin-left: 1px;
          animation: cursorBlink 0.6s ease-in-out infinite;
          vertical-align: text-bottom;
        }

        @keyframes cursorBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
