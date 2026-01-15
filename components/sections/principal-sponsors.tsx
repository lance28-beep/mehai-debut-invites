"use client"

import React from "react"

import { useEffect, useMemo, useState } from "react"

import { Section } from "@/components/section"

import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"



const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })



interface PrincipalSponsor {

  MalePrincipalSponsor: string

  FemalePrincipalSponsor: string

}



export function PrincipalSponsors() {

  const SectionTitle = ({

    children,

    align = "center",

    className = "",

  }: {

    children: React.ReactNode

    align?: "left" | "center" | "right"

    className?: string

  }) => {

    const textAlign =

      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"

    return (

      <h3

        className={`${playfair.className} text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase text-[#FCE1B6] mb-2 sm:mb-3 md:mb-4 ${textAlign} ${className}`}

      >

        {children}

      </h3>

    )

  }



  const NameItem = ({ name, align = "center" }: { name: string; align?: "left" | "center" | "right" }) => {

    const containerAlign =

      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"

    const textAlign =

      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"

    return (

      <div className={`flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1 w-full`}>

        <p className={`${playfair.className} text-[13px] sm:text-sm md:text-base font-medium text-[#FCE1B6] leading-snug break-words ${textAlign}`}>

          {name}

        </p>

      </div>

    )

  }



  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)



  const fetchSponsors = async () => {

    setIsLoading(true)

    try {

      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })

      if (!res.ok) throw new Error("Failed to load principal sponsors")

      const data: PrincipalSponsor[] = await res.json()

      setSponsors(data)

    } catch (e: any) {

      console.error(e)

      setError(e?.message || "Failed to load principal sponsors")

    } finally {

      setIsLoading(false)

    }

  }



  useEffect(() => {

    fetchSponsors()

  }, [])



  const sponsorPairs = useMemo(

    () => sponsors.filter((s) => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),

    [sponsors]

  )



  return (

    <Section

      id="sponsors"

      className="relative bg-[#490505] py-10 sm:py-12 md:py-14 lg:py-16 overflow-hidden"

    >

      {/* Ornate pattern background - matching Countdown section */}

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

            <pattern id="sponsorScrollPattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">

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

          <rect width="100%" height="100%" fill="url(#sponsorScrollPattern)" />

        </svg>



        {/* Subtle overlay for depth */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#490505]/80 via-transparent to-[#490505]/80" />

      </div>



      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-4">

        <div className="inline-flex items-center gap-2 rounded-full border border-[#FCE1B6]/20 bg-[#FCE1B6]/10 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-[#FCE1B6]/85">

          Principal Sponsors

        </div>

        <h2

          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FCE1B6] drop-shadow-[0_18px_48px_rgba(73,5,5,0.65)] mt-2`}

        >

          Guardians of Grace

        </h2>

        <p className={`${inter.className} text-xs sm:text-sm md:text-base text-[#FCE1B6]/85 max-w-2xl mx-auto mt-2 leading-relaxed`}>

          Honoring the distinguished mentors and godparents who have guided Kaith's journey. Their wisdom, love, and blessings illuminate her path as she steps into womanhood on this momentous eighteenth year.

        </p>

      </div>



      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">

        <div className="relative bg-[#490505]/80 backdrop-blur-2xl border border-[#FCE1B6]/20 rounded-xl sm:rounded-2xl shadow-[0_25px_80px_rgba(73,5,5,0.45)] overflow-hidden">

          <div className="absolute inset-[10px] sm:inset-[14px] md:inset-[18px] border border-[#FCE1B6]/15 rounded-lg sm:rounded-xl pointer-events-none" />



          <div className="relative p-4 sm:p-5 md:p-6 lg:p-7">

            {isLoading ? (

              <div className="flex items-center justify-center py-24">

                <div className="flex flex-col items-center gap-4">

                  <div className="w-12 h-12 border-4 border-[#FCE1B6]/20 border-t-[#FCE1B6]/70 rounded-full animate-spin" />

                  <span className={`${inter.className} text-[#FCE1B6]/80 text-lg`}>

                    Gathering her sponsors…

                  </span>

                </div>

              </div>

            ) : error ? (

              <div className="flex items-center justify-center py-24">

                <div className="text-center">

                  <p className={`${inter.className} text-red-400 text-lg mb-2`}>{error}</p>

                  <button

                    onClick={fetchSponsors}

                    className={`${playfair.className} text-[#FCE1B6] hover:text-[#FCE1B6]/70 transition-colors underline`}

                  >

                    Try again

                  </button>

                </div>

              </div>

            ) : sponsorPairs.length === 0 ? (

              <div className="text-center py-24">

                <p className={`${inter.className} text-[#FCE1B6]/70 text-lg`}>

                  Her sponsors will be announced soon.

                </p>

              </div>

            ) : (

              <div className="mb-0">

                <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">

                  {sponsorPairs.map((pair, idx) => (

                    <div key={`pair-${idx}`} className="flex flex-col items-center gap-1 sm:gap-1.5 w-full">

                      {pair.MalePrincipalSponsor && (

                        <NameItem name={pair.MalePrincipalSponsor} align="center" />

                      )}

                      {pair.FemalePrincipalSponsor && (

                        <NameItem name={pair.FemalePrincipalSponsor} align="center" />

                      )}

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </Section>

  )

}
