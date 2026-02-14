"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import Stack from "@/components/stack"
import { motion } from "motion/react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

type TabId = "about" | "dreams" | "bio"

const TAB_CONTENT: Record<
  TabId,
  {
    headline: string
    blurb: string
    paragraphs: string[]
    highlights?: string[]
  }
> = {
  about: {
    headline: "The Girl Behind the Lilac Glow",
    blurb: "Rooted in Kindness, Bravery, and Grace",
    paragraphs: [
      "Mehai is a gentle flame—kind to the world, brave in the face of every challenge, and humble no matter how bright she becomes. She carries kindness like a soft violet ribbon, offering warmth to those around her. Her courage blooms quietly but powerfully, the kind that stands firm without raising its voice. And through every achievement, she remains grounded, grateful, and gracefully aware of where she came from.",
      "Her debut is more than a celebration—it is her love letter to her parents, a tribute to the sacrifices that shaped her, the values they planted in her, and the roots she grows from. It is a moment to honor every small victory, every difficulty overcome, and every lesson learned.",
      "Tonight's palette of Silver, Soft Pink, and Neutral mirrors the heart she carries—resilient, warm, tender, and steady. As she steps into adulthood, she continues to learn, to rise, and to honor the home that raised her.",
    ],
    highlights: ["Kind, brave, and humble at heart", "Debut dedicated to her parents' love & sacrifices", "Growing, learning, and honoring her roots"],
  },
  dreams: {
    headline: "Blooming in shades of lavender skies",
    blurb: "Plans gathered between purple daydreams and gloss-kissed mirrors.",
    paragraphs: [
      "Mehai envisions a future carried by silver wings—where the world unfurls beneath her like a map of endless possibilities. Since her very first breath, her heart has pulsed with wanderlust, whispering one steadfast dream: to become a flight attendant and greet every horizon with grace.",
      "Her universe glows in rich purples and soft shimmers, expressed not through journal pages but through the art of makeup—each brushstroke a quiet celebration of confidence and becoming.",
      "Beyond her ambitions, she delights in discovering new things and savoring every vibrant moment of her teenage years with friends, family, and those who hold her closest. Her dreams shine warmly, rooted in love and the promise to rise high enough to make her parents proud.",
    ],
    highlights: ["Become a flight attendant", "Travel the world", "Make her parents proud"],
  },
  bio: {
    headline: "Chapters Softly Written in Lilac and Bravery",
    blurb: "A story of growth, service, and quiet courage.",
    paragraphs: [
      "Raised in the quiet town of Mangatarem, Mehai grew up as an only child—content, curious, and gently learning the rhythm of her small world. But life had brighter plans. A few years later, siblings arrived like unexpected bursts of color, turning her once–quiet days into a tapestry of laughter, chaos, and joy. They became the hues that made her world fuller, louder, and infinitely more fun.",
      "At fourteen, Mehai first stepped into the world of student leadership. Her journey began with Barkada Kontra Droga, unsure if she belonged, unsure if she would win—but certain she would give her honest, fearless best. From that brave beginning, she rose to the final five representatives, a moment that whispered, You can.",
      "With newfound confidence, she continued her path through school organizations until she reached the highest student body of all—the Supreme Secondary Learner Government. Now on her third year of service, she proudly stands as Vice President, carrying responsibilities she once doubted she could hold.",
      "Tonight, on her debut, Mehai stands at the edge of a new chapter—confident, steady, and glowing with quiet courage. She steps forward ready to embrace challenges, shaped by the lessons of her past and open to the wisdom of every tomorrow.",
    ],
    highlights: ["Born April 19, 2008 — Aries", "3 years in the SSLG — now Vice President", "Raised in Mangatarem"],
  },
}

export function Narrative() {
  const [activeTab, setActiveTab] = useState<TabId>("about")

  return (
    <Section id="narrative" className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#372847] via-[#4a2f5e] to-[#372847]">

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#DC96FD]/80 mb-2 sm:mb-3 md:mb-4">
            Lavender dreams of the debutante
          </p>
          <h2
            className={`${greatVibes.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#DC96FD] leading-tight`}
          >
            My Journey to 18
          </h2>
          <p className={`${inter.className} text-sm sm:text-base md:text-lg lg:text-xl text-[#FBF7F8]/80 mt-2 sm:mt-3 md:mt-4 tracking-[0.06em] sm:tracking-[0.08em] px-2`}>
            Every chapter blooms beautifully beneath lavender skies and dreamy lights.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-12 md:mt-16 flex flex-col items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="flex justify-center w-full">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="scale-75 sm:scale-90 md:scale-100 origin-center">
                <Stack
                  randomRotation
                  sensitivity={190}
                  sendToBackOnClick={false}
                  cardDimensions={{ width: 240, height: 300 }}
                  cardsData={[
                    { id: 1, img: "/mobile-background/debut (1).webp" },
                    { id: 2, img: "/mobile-background/debut (2).webp" },
                    { id: 3, img: "/mobile-background/debut (3).webp" },
                    { id: 4, img: "/mobile-background/debut (4).webp" },
                    { id: 5, img: "/mobile-background/debut (5).webp" },

                  ]}
                  animationConfig={{ stiffness: 260, damping: 22 }}
                />
              </div>

              <motion.p
                className="text-center text-[10px] sm:text-xs md:text-sm text-[#DC96FD]/80 mt-3 sm:mt-4 md:mt-6 tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                drag to discover memories
              </motion.p>
            </motion.div>
          </div>

          <div className="w-full max-w-3xl space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 px-1 sm:px-0">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              {(["about", "dreams", "bio"] as TabId[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`group relative overflow-hidden rounded-full border border-[#DC96FD]/25 px-3.5 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 text-[10px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.32em] uppercase transition-all duration-400 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#DC96FD] via-[#c880f0] to-[#DC96FD] text-[#372847] shadow-[0_12px_24px_rgba(220,150,253,0.35)]"
                      : "bg-[#372847]/40 text-[#DC96FD]/75 hover:bg-[#372847]/60"
                  }`}
                >
                  <span className="relative z-10">
                    {tab === "about" && "About Me"}
                    {tab === "dreams" && "My Dreams"}
                    {tab === "bio" && "Bio"}
                  </span>
                  {activeTab === tab && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#372847]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-[#DC96FD]/25 bg-[#372847] mx-1 sm:mx-0 px-3.5 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 transition-all duration-500"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-6">
                <div>
                  <p className="text-[9px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.38em] uppercase text-[#DC96FD]/70 leading-snug">
                    {TAB_CONTENT[activeTab].blurb}
                  </p>
                  <h3 className={`${playfair.className} text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#DC96FD] mt-1.5 sm:mt-2 md:mt-3 leading-tight`}>
                    {TAB_CONTENT[activeTab].headline}
                  </h3>
                </div>

                <div className="space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-5">
                  {TAB_CONTENT[activeTab].paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-xs sm:text-sm md:text-base lg:text-lg text-[#FBF7F8]/85 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {TAB_CONTENT[activeTab].highlights && (
                  <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-[#DC96FD]/15">
                    <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] sm:tracking-[0.42em] uppercase text-[#DC96FD]/60 mb-2 sm:mb-3 md:mb-4">
                      Favorite highlights
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5">
                      {TAB_CONTENT[activeTab].highlights?.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 rounded-full border border-[#DC96FD]/25 bg-[#372847]/40 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs text-[#FBF7F8]/90 tracking-[0.2em] sm:tracking-[0.24em] md:tracking-[0.28em]"
                        >
                          <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#DC96FD] flex-shrink-0" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 rounded-2xl sm:rounded-3xl border border-[#DC96FD]/20 bg-[#372847] px-4 sm:px-6 md:px-10 lg:px-12 py-4 sm:py-6 md:py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            { label: "Debut Date", value: siteConfig.wedding.date },
            { label: "Grand Venue", value: siteConfig.ceremony.venue },
            { label: "Call Time", value: siteConfig.wedding.time },
          ].map((item) => (
            <div key={item.label} className="text-center space-y-1 sm:space-y-2">
              <p className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.35em] sm:tracking-[0.42em] uppercase text-[#DC96FD]/70">{item.label}</p>
              <p className={`${playfair.className} text-base sm:text-lg md:text-xl lg:text-2xl text-[#DC96FD] leading-tight`}>{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}