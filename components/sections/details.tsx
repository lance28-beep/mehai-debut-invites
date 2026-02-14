import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, PartyPopper, MapPin, Navigation, Copy, Check, Palette, Car, Sparkles } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { Great_Vibes, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems((prev) => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems((prev) => {
          const updated = new Set(prev)
          updated.delete(itemId)
          return updated
        })
      }, 1800)
    } catch (error) {
      console.error("Failed to copy text:", error)
    }
  }

  const { ceremony, reception } = siteConfig
  const venue = ceremony.location
  const entourageCall = ceremony.entourageTime
  const guestsCall = ceremony.guestsTime
  const mapsLink = `https://maps.google.com/?q=${encodeURIComponent(venue)}`

  const openInMaps = () => {
    window.open(mapsLink, "_blank", "noopener,noreferrer")
  }

  const schedule = [
    { label: "Ceremony Begins", value: ceremony.time },
    { label: "Reception Follows", value: reception.time },
    entourageCall && { label: "Entourage Call Time", value: entourageCall },
    guestsCall && { label: "Guest Doors Open", value: guestsCall },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <Section id="details" className="relative overflow-hidden py-14 sm:py-18 md:py-20 lg:py-24 bg-gradient-to-b from-[#372847] via-[#4a2f5e] to-[#372847]">
      {/* Ornate pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Base pattern - diagonal lines forming diamonds */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(220,150,253,0.1) 70px, rgba(220,150,253,0.1) 71px),
              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(220,150,253,0.1) 70px, rgba(220,150,253,0.1) 71px),
              repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(220,150,253,0.08) 35px, rgba(220,150,253,0.08) 36px),
              repeating-linear-gradient(225deg, transparent, transparent 35px, rgba(220,150,253,0.08) 35px, rgba(220,150,253,0.08) 36px)
            `,
            backgroundSize: '70px 70px, 70px 70px, 35px 35px, 35px 35px',
          }}
        />
        
        {/* Decorative scroll motifs - using SVG pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <pattern id="scrollPatternDetails" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
              {/* Scroll motifs at intersections */}
              <g fill="none" stroke="#DC96FD" strokeWidth="0.5">
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
          <rect width="100%" height="100%" fill="url(#scrollPatternDetails)" />
        </svg>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#372847]/80 via-transparent to-[#372847]/80" />
      </div>

      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-[#DC96FD]/85">
            Event Details
          </div>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#DC96FD] drop-shadow-[0_18px_48px_rgba(55,40,71,0.65)] mt-4`}
          >
            Your Evening Guide
          </h2>
          <p
            className={`${inter.className} text-xs sm:text-sm md:text-base text-[#FBF7F8]/85 max-w-2xl mx-auto mt-4 leading-relaxed`}
          >
            Join us as we celebrate Mehai's journey into womanhood. Here's everything you need to know for this special evening—from call times and venue details to the elegant dress code that honors this milestone moment.
          </p>
        </div>



        <div className="grid gap-5 lg:gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch mb-12 sm:mb-16 lg:mb-20">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/14 bg-white/8 backdrop-blur-2xl shadow-[0_26px_65px_rgba(8,16,34,0.42)]">
            <div className="relative h-[220px] sm:h-60 md:h-80 lg:h-[420px] xl:h-[460px] overflow-hidden">
              <Image
                src="/Details/VillaAnaya.jpg"
                alt={venue}
                fill
                priority
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#372847]/95 via-[#372847]/35 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 sm:bottom-6 text-white">
                <h3 className="text-xl sm:text-3xl font-serif font-semibold tracking-wide drop-shadow-lg">
                  Villa Anaya
                </h3>
                <p className="text-[10px] sm:text-[12px] text-white/80 tracking-[0.24em] uppercase">
                  Daan Kalikasan Road, Brgy. Parian, Mangatarem, Pangasinan
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-7 lg:p-8 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="inline-flex justify-center rounded-full border border-white/18 bg-white/10 px-4 py-1.5 text-white/80 text-[9px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.32em] uppercase whitespace-nowrap">
                  {`${ceremony.day}, ${ceremony.date}`}
                </div>
                <p className="text-[10px] sm:text-xs text-white/70 tracking-[0.3em] uppercase text-center sm:text-right">
                  Doors open in the twilight
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {schedule.map((entry) => (
                  <div
                    key={entry.label}
                    className="rounded-2xl border border-white/18 bg-white/12 px-3.5 py-3 text-center shadow-[0_12px_30px_rgba(12,20,46,0.28)]"
                  >
                    <p className="text-[9px] sm:text-[11px] tracking-[0.34em] uppercase text-white/70 mb-1">
                      {entry.label}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-white text-sm sm:text-base font-semibold">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{entry.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/18 bg-white/10 px-4 py-3.5 flex items-start sm:items-center gap-2.5 sm:gap-3 shadow-[0_12px_30px_rgba(12,20,46,0.25)]">
                <MapPin className="mt-[2px] sm:mt-0 h-4 w-4 sm:h-5 sm:w-5 text-[#DC96FD] flex-shrink-0" />
                <div className="text-[11px] sm:text-sm text-white/75 leading-relaxed">{venue}</div>
              </div>

              <div className="flex flex-row gap-2.5 sm:gap-3">
                <button
                  onClick={openInMaps}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#DC96FD] px-4 py-3 text-xs sm:text-sm font-semibold text-[#372847] transition-all duration-300 hover:-translate-y-1"
                  aria-label="Get directions to the venue"
                >
                  <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Get Directions
                </button>
                <button
                  onClick={() => copyToClipboard(venue, "venue")}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-4 py-3 text-xs sm:text-sm font-semibold text-white/85 shadow-[0_12px_30px_rgba(12,20,48,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:text-white"
                  aria-label="Copy venue address"
                >
                  {copiedItems.has("venue") ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {copiedItems.has("venue") ? "Copied!" : "Copy Address"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div className="rounded-[26px] sm:rounded-[30px] border border-white/18 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,16,34,0.4)] p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <PartyPopper className="h-6 w-6 text-[#DC96FD]" />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Debut Agenda</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Moments to Look Forward To</h3>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-1 h-3.5 w-3.5 text-[#DC96FD]" />
                  18 Candles &amp; 18 Treasures will follow after the formal program—prepare a short wish or keepsake.
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-1 h-3.5 w-3.5 text-[#DC96FD]" />
                  Please arrive before the entourage call time to sign the debut guest book and take portraits.
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-1 h-3.5 w-3.5 text-[#DC96FD]" />
                  Program wraps by 8:30 PM so you can rest and travel home safely.
                </li>
              </ul>
            </div>

            <div className="rounded-[26px] sm:rounded-[30px] border border-white/18 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,16,34,0.4)] p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6 text-[#DC96FD]" />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Attire & Palette</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Dress in Silver & Powder Pink</h3>
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75 leading-relaxed">
                <li>
                  Ladies: Powder pink, silver, or gray tones.
                </li>
                <li>Gentlemen: Silver, gray, or neutral suits.</li>
              </ul>
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-[0_8px_24px_rgba(10,16,34,0.4)]">
                <Image
                  src="/Details/attire.png"
                  alt="Attire Color Palette Guide"
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="rounded-[26px] sm:rounded-[30px] border border-white/18 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,16,34,0.4)] p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <Car className="h-6 w-6 text-[#DC96FD]" />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Travel Notes</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Parking & Transport</h3>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                <li>Complimentary parking is available at the venue—just mention Mehai's debut at the gate.</li>
                <li>Need a ride? The venue is accessible via private transport; kindly set drop-off to "Villa Anaya, Mangatarem".</li>
                <li>For guests traveling from afar, nearby accommodations are available in Mangatarem town proper.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}