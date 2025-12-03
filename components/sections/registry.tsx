"use client"

import { Section } from "@/components/section"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

export function Registry() {
  return (
    <Section id="registry" className="relative overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2 sm:px-3 md:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-[#FDECEF]/85 mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          With Love &amp; Gratitude
        </p>
        
        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
        >
          Gift Wishes
        </h2>
        
        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2 mb-3 sm:mb-4 md:mb-5`}>
          With all that we have, we&apos;ve been truly blessed.
          <br />
          Your presence and prayers are all that we request.
          <br />
          But if you desire to give nonetheless,
          <br />
          a monetary gift is one we humbly suggest.
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-white/60" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FDECEF]/80 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/80 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FDECEF]/80 rounded-full" />
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-white/60" />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative bg-white/10 backdrop-blur-md border border-[#FDECEF]/25 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8 md:p-10">
          <p className={`${cormorant.className} text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed text-center`}>
            With all that we have, we&apos;ve been truly blessed.
            <br />
            Your presence and prayers are all that we request.
            <br />
            But if you desire to give nonetheless,
            <br />
            a monetary gift is one we humbly suggest.
          </p>
        </div>
      </div>
    </Section>
  )
}
