"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { MessageCircle, Heart, Sparkles, Send } from "lucide-react"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"
import { Great_Vibes, Inter } from "next/font/google"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfiy8yjeCsPG8ZvBxMOwaOnlWxQBgL8QnszGVFqJGxmMtj_0A/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto px-3 sm:px-0">
      {/* Style to override placeholder color */}
      <style>{`
        .message-form-input::placeholder {
          color: #9CA3AF !important;
          opacity: 1 !important;
        }
        .message-form-textarea::placeholder {
          color: #9CA3AF !important;
          opacity: 1 !important;
        }
      `}</style>
      
      {/* Decorative background elements (lavender) */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#DC96FD]/25 rounded-full blur-sm animate-pulse-slow" />
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#6A239E]/30 rounded-full blur-md animate-pulse-slow" />
      
      <Card className={`relative w-full border-2 border-white/30 shadow-[0_12px_30px_rgba(106,35,158,0.35)] bg-white/90 backdrop-blur-md transition-all duration-500 group overflow-hidden rounded-2xl ${
        isFocused ? "scale-[1.01] border-[#DC96FD] bg-white/95" : "hover:bg-white/95"
      } ${isSubmitted ? "animate-bounce" : ""}`}>
        {/* Glass effect gradient overlays - lavender */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#DC96FD]/15 via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
        
        {/* Frosted glass effect */}
        <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/18 to-white/6" />
        
        {/* Animated shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DC96FD]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {/* Success animation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#6A239E]/25 via-[#DC96FD]/20 to-transparent flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-16 h-16 bg-[#6A239E] rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <p className="text-white font-semibold text-lg">Sent!</p>
            </div>
          </div>
        )}
        
        <CardContent className="relative p-3 sm:p-5 md:p-6 lg:p-8 xl:p-10">
          {/* Header with icon */}
          <div className="text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            <div className="relative inline-block mb-2 sm:mb-3 md:mb-4">
              <div className="absolute inset-0 bg-[#DC96FD]/40 rounded-full blur-lg scale-150" />
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 bg-[#6A239E] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
              </div>
            </div>
            <p className={`${inter.className} text-[9px] sm:text-[10px] md:text-xs tracking-[0.35em] uppercase text-foreground/70 mb-2`}>
              Message For The Debutante
            </p>
            <h3 className={`${greatVibes.className} text-xl sm:text-2xl md:text-3xl text-foreground mb-1.5 sm:mb-2`}>
              Leave a Gilded Wish
            </h3>
            <p className={`${inter.className} text-[10px] sm:text-xs md:text-sm text-foreground/70 mb-3`}>
              Every note becomes part of her story
            </p>
            <div className={`${inter.className} flex items-center justify-center gap-2 text-[10px] sm:text-xs text-foreground/60`}>
              <span>Share</span>
              <span>•</span>
              <span>Bless</span>
              <span>•</span>
              <span>Send</span>
            </div>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Name Field */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground font-lora flex items-center gap-1.5 sm:gap-2">
                <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-[#DC96FD]/25 to-[#6A239E]/25 rounded-full flex items-center justify-center transition-all duration-300 ${
                  focusedField === "name" ? "scale-110 bg-[#DC96FD]/40" : ""
                }`}>
                  <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#6A239E]" />
                </div>
                Your Name
              </label>
              <div className="relative">
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Full Name"
                  className={`message-form-input w-full border-2 rounded-xl py-2 sm:py-2.5 md:py-3 lg:py-3.5 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base font-lora placeholder:italic transition-all duration-300 bg-white/85 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg ${
                    focusedField === "name"
                      ? "border-[#6A239E] focus:border-[#6A239E] focus:ring-4 focus:ring-[#6A239E]/25 shadow-lg"
                      : "border-[#6A239E]/40 hover:border-[#6A239E]/40"
                  }`}
                />
                {nameValue && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground font-lora flex items-center gap-1.5 sm:gap-2">
                <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-[#DC96FD]/25 to-[#6A239E]/25 rounded-full flex items-center justify-center transition-all duration-300 ${
                  focusedField === "message" ? "scale-110 bg-[#DC96FD]/40" : ""
                }`}>
                    <MessageCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#6A239E]" />
                  </div>
                  Your Message
                </label>
                {messageValue && (
                  <span className={`text-[10px] sm:text-xs font-lora transition-colors ${
                    messageValue.length > 500 ? 'text-red-500' : 'text-foreground/50'
                  }`}>
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <div className="relative">
                <Textarea
                  name="message"
                  required
                  value={messageValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={`Write a heartfelt message for ${siteConfig.debutante.nickname}... share your wishes, memories, or words of love that will be treasured forever 💕`}
                  className={`message-form-textarea w-full border-2 rounded-xl min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-xs sm:text-sm md:text-base font-lora placeholder:italic placeholder:leading-relaxed transition-all duration-300 resize-none bg-white/85 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-5 ${
                    focusedField === "message"
                      ? "border-[#6A239E] focus:border-[#6A239E] focus:ring-4 focus:ring-[#6A239E]/25 shadow-lg"
                      : "border-[#6A239E]/40 hover:border-[#6A239E]/40"
                  }`}
                />
                {messageValue && (
                  <div className="absolute right-3 top-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className="w-full text-white py-2 sm:py-2.5 md:py-3 lg:py-3.5 px-4 sm:px-5 md:px-6 lg:px-7 rounded-xl text-xs sm:text-sm md:text-base font-lora font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group border border-[#6A239E]"
              style={{
                backgroundColor: "#6A239E",
                boxShadow: "0 6px 20px rgba(106,35,158,0.35), 0 2px 8px rgba(106,35,158,0.2)",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "#372847";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(106,35,158,0.4), 0 3px 10px rgba(106,35,158,0.25)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#6A239E";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(106,35,158,0.35), 0 2px 8px rgba(106,35,158,0.2)";
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch("/api/messages", {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.warn("Unexpected messages response; expected an array", data)
          setMessages([])
          setLoading(false)
          return
        }
        
        const parsed = data
          .filter((m) => m.name || m.message || m.timestamp)
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <Section
      id="messages"
      className="relative py-14 sm:py-18 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Ornate pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Base pattern - diagonal lines forming diamonds */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(252,225,182,0.1) 70px, rgba(252,225,182,0.1) 71px),
              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(252,225,182,0.1) 70px, rgba(252,225,182,0.1) 71px),
              repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(252,225,182,0.08) 35px, rgba(252,225,182,0.08) 36px),
              repeating-linear-gradient(225deg, transparent, transparent 35px, rgba(252,225,182,0.08) 35px, rgba(252,225,182,0.08) 36px)
            `,
            backgroundSize: '70px 70px, 70px 70px, 35px 35px, 35px 35px',
          }}
        />
        
        {/* Decorative scroll motifs - using SVG pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <pattern id="scrollPatternMessages" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
              {/* Scroll motifs at intersections */}
              <g fill="none" stroke="#FCE1B6" strokeWidth="0.5">
                {/* Top scroll */}
                <path d="M 70 0 Q 65 15 70 30 Q 75 15 70 0" />
                {/* Bottom scroll */}
                <path d="M 70 140 Q 65 125 70 110 Q 75 125 70 140" />
                {/* Left scroll */}
                <path d="M 0 70 Q 15 65 30 70 Q 15 75 0 70" />
                {/* Right scroll */}
                <path d="M 140 70 Q 125 65 110 70 Q 125 75 140 70" />
                {/* Center decorative element */}
                <path d="M 70 30 Q 60 50 70 70 Q 80 50 70 30" />
                <path d="M 70 110 Q 60 90 70 70 Q 80 90 70 110" />
                <path d="M 30 70 Q 50 60 70 70 Q 50 80 30 70" />
                <path d="M 110 70 Q 90 60 70 70 Q 90 80 110 70" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scrollPatternMessages)" />
        </svg>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#490505]/80 via-transparent to-[#490505]/80" />
      </div>

      <div className="relative max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
          <p className={`${inter.className} text-xs sm:text-sm tracking-[0.45em] uppercase text-[#FCE1B6]/75 mb-3`}>
            Words She&apos;ll Keep Forever
          </p>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl text-[#FCE1B6] mb-4 drop-shadow-[0_18px_48px_rgba(46,4,26,0.65)]`}
          >
            Letters for {siteConfig.debutante.nickname}
          </h2>
          <p className={`${inter.className} text-sm sm:text-base md:text-lg text-[#FCE1B6]/85 max-w-2xl mx-auto mt-4 leading-relaxed`}>
            Write a wish for her eighteenth chapter
          </p>
          <p className={`${inter.className} text-xs sm:text-sm md:text-base text-[#FCE1B6]/75 max-w-2xl mx-auto mt-2 leading-relaxed`}>
            Send a note woven in wine red and gold—a keepsake {siteConfig.debutante.nickname} will treasure long after the candles fade.
          </p>
        </div>

        {/* Form Section - lavender container with motif */}
        <div className="flex justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <div className="relative max-w-xl w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#372847] border border-white/20 shadow-[0_20px_50px_rgba(55,40,71,0.4)]">
            {/* Ornate motif - container only */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(255,255,255,0.1) 70px, rgba(255,255,255,0.1) 71px),
                    repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(255,255,255,0.1) 70px, rgba(255,255,255,0.1) 71px),
                    repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(255,255,255,0.08) 35px, rgba(255,255,255,0.08) 36px),
                    repeating-linear-gradient(225deg, transparent, transparent 35px, rgba(255,255,255,0.08) 35px, rgba(255,255,255,0.08) 36px)
                  `,
                  backgroundSize: "70px 70px, 70px 70px, 35px 35px, 35px 35px",
                }}
              />
              <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
                <defs>
                  <pattern id="scrollPatternMessagesForm" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
                    <g fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5">
                      <path d="M 70 0 Q 65 15 70 30 Q 75 15 70 0" />
                      <path d="M 70 140 Q 65 125 70 110 Q 75 125 70 140" />
                      <path d="M 0 70 Q 15 65 30 70 Q 15 75 0 70" />
                      <path d="M 140 70 Q 125 65 110 70 Q 125 75 140 70" />
                      <path d="M 70 30 Q 60 50 70 70 Q 80 50 70 30" />
                      <path d="M 70 110 Q 60 90 70 70 Q 80 90 70 110" />
                      <path d="M 30 70 Q 50 60 70 70 Q 50 80 30 70" />
                      <path d="M 110 70 Q 90 60 70 70 Q 90 80 110 70" />
                    </g>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#scrollPatternMessagesForm)" />
              </svg>
            </div>
            <div className="relative z-10 p-4 sm:p-5 md:p-6">
              <MessageForm onMessageSent={fetchMessages} />
            </div>
          </div>
        </div>

        {/* Messages Display Section */}
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className="relative inline-block mb-3 sm:mb-4 md:mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6A239E]/50 via-[#DC96FD]/35 to-[#6A239E]/30 rounded-full blur-xl scale-150 animate-pulse-slow" />
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#6A239E] to-[#372847] rounded-full flex items-center justify-center mx-auto shadow-lg hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-4 w-4 sm:h-6 sm:h-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#6A239E]/35 via-[#DC96FD]/25 to-[#6A239E]/25 blur-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-playfair font-bold text-white mb-1.5 sm:mb-2 md:mb-3">
              Messages from Loved Ones
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white font-lora max-w-2xl mx-auto px-2 sm:px-4">
              Read the beautiful messages shared by family and friends
            </p>
          </div>
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

      </div>
    </Section>
  )
}
