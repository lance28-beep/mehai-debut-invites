"use client"

import { useState } from "react"

import { ChevronDown } from "lucide-react"

import { Section } from "@/components/section"

import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

import { siteConfig } from "@/content/site"



const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })



interface FAQItem {

  question: string

  answer: string

}



const faqItems: FAQItem[] = [

  {

    question: `What is the dress code for ${siteConfig.debutante.nickname}'s debut?`,

    answer:

      "Ladies: Light Yellow or Blush Pink long gown.\n\nGentlemen: Suit or Tuxedo.\n\nKindly avoid bright, neon, or overly casual attire to keep the evening elegant and sophisticated.",

  },

  {

    question: "When and where is the debut celebration?",

    answer:

      `${siteConfig.debutante.nickname}'s eighteenth debut is on ${siteConfig.ceremony.day}, ${siteConfig.wedding.date} at ${siteConfig.wedding.time} at ${siteConfig.wedding.venue}. The celebration will take place at ${siteConfig.ceremony.venue}.`,

  },

  {

    question: "What time should I arrive?",

    answer:

      `Guest doors open at ${siteConfig.ceremony.guestsTime}. We recommend arriving 15-20 minutes early to sign the debut guest book, take portraits, and find your seat before the formal program begins.`,

  },

  {

    question: "When is the RSVP deadline?",

    answer:

      `Kindly RSVP. Your response helps us prepare for ${siteConfig.debutante.nickname}'s special night. [RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,

  },

  {

    question: "Do you have a gift registry?",

    answer:

      `Your presence is the most precious gift for ${siteConfig.debutante.nickname}'s debut celebration. If you wish to share a token of love, we welcome monetary gifts that will help her pursue her dreams and aspirations.`,

  },

  {

    question: "Is there parking available at the venue?",

    answer:

      `Yes! Complimentary parking is available at the venue. Just mention ${siteConfig.debutante.nickname}'s debut at the gate. We recommend arriving early to secure a spot.`,

  },

  {

    question: "Can I bring additional guests?",

    answer:

      "We have reserved a specific seat for you. As much as we would love to accommodate everyone, we can only cater to the guests indicated on your invitation (1 invite admits 1 guest). Thank you for understanding!",

  },

  {

    question: "What if I have dietary restrictions or allergies?",

    answer:

      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP. We'll do our best to accommodate your needs.",

  },

  {

    question: "Can I take photos during the debut?",

    answer:

      `Yes! We have a professional photographer, but you're welcome to capture moments throughout the evening. We'll have a dedicated time for group photos with ${siteConfig.debutante.nickname} after the formal program.`,

  },

  {

    question: "What should I do if I need to cancel or update my RSVP?",

    answer:

      "Please update your RSVP as soon as possible if your plans change. You can search for your name in the RSVP section and update your response. We appreciate your timely communication!",

  },

  {

    question: "What time does the celebration end?",

    answer:

      "The program wraps by 8:30 PM so you can rest and travel home safely. We want everyone to enjoy the evening while ensuring a safe journey home.",

  },

  {

    question: "Are children welcome at the debut?",

    answer:

      "While we love children, this is a formal evening celebration. We kindly request that only guests listed in your RSVP attend. If you have questions about bringing children, please reach out to us directly.",

  },

  {

    question: "Is there a specific entrance or registration area?",

    answer:

      "Yes, there will be a registration area at the entrance where you can sign the guest book and receive your program. Our ushers will be available to guide you to your assigned table.",

  },

  {

    question: "What if I'm running late?",

    answer:

      "We understand that sometimes delays happen. Please arrive as soon as possible and our ushers will help you find your seat with minimal disruption to the program.",

  },

]



export function FAQ() {

  const [openIndex, setOpenIndex] = useState<number | null>(null)



  const toggleItem = (index: number) => {

    setOpenIndex(openIndex === index ? null : index)

  }



  return (

    <Section

      id="faq"

      className="relative z-[30] overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-[#372847]"

    >

      {/* Ornate pattern background */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">

        {/* Base pattern - diagonal lines forming diamonds */}

        <div 

          className="absolute inset-0"

          style={{

            backgroundImage: `

              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(255,255,255,0.1) 70px, rgba(255,255,255,0.1) 71px),

              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(255,255,255,0.1) 70px, rgba(255,255,255,0.1) 71px),

              repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(255,255,255,0.08) 35px, rgba(255,255,255,0.08) 36px),

              repeating-linear-gradient(225deg, transparent, transparent 35px, rgba(255,255,255,0.08) 35px, rgba(255,255,255,0.08) 36px)

            `,

            backgroundSize: '70px 70px, 70px 70px, 35px 35px, 35px 35px',

          }}

        />

        

        {/* Decorative scroll motifs - using SVG pattern */}

        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>

          <defs>

            <pattern id="scrollPatternFAQ" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">

              {/* Scroll motifs at intersections */}

              <g fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5">

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

          <rect width="100%" height="100%" fill="url(#scrollPatternFAQ)" />

        </svg>



        {/* Subtle overlay for depth */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#372847]/80 via-transparent to-[#372847]/80" />

      </div>



      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16 px-3 sm:px-4">

        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#372847]/40 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-white">

          Your Questions Answered

        </div>

        <h2

          className={`${greatVibes.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white drop-shadow-[0_18px_40px_rgba(55,40,71,0.68)] mt-3 sm:mt-4`}

        >

          Frequently Asked Questions

        </h2>

        <p className={`${inter.className} text-[11px] sm:text-xs md:text-sm lg:text-base text-white/85 max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed px-2`}>

          Everything you need to know about {siteConfig.debutante.nickname}'s elegant debut celebration

        </p>

      </div>



      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">

        <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] md:rounded-[32px] border-2 border-white/20 bg-white shadow-[0_20px_55px_rgba(55,40,71,0.4)] sm:shadow-[0_26px_70px_rgba(55,40,71,0.45)]">

          <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">

            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">

              {faqItems.map((item, index) => {

                const isOpen = openIndex === index

                const contentId = `faq-item-${index}`

                return (

                  <div

                    key={index}

                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#372847]/20 bg-white transition-all duration-300 hover:border-[#372847]/40 hover:shadow-[0_12px_30px_rgba(55,40,71,0.25)]"

                  >

                    <button

                      onClick={() => toggleItem(index)}

                      className="w-full px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5 flex items-start sm:items-center justify-between gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#372847]/30 transition-colors min-h-[3.5rem] sm:min-h-[4rem]"

                      aria-expanded={isOpen}

                      aria-controls={contentId}

                    >

                      <span

                        className={`${playfair.className} font-semibold text-[#372847] flex-1 text-[13px] sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed group-hover:text-[#372847]/80 transition-colors duration-200`}

                      >

                        {item.question}

                      </span>

                      <ChevronDown

                        size={18}

                        className={`text-[#372847]/70 flex-shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-[#372847]" : ""} w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-0 group-hover:text-[#372847]`}

                        aria-hidden

                      />

                    </button>



                    <div

                      id={contentId}

                      role="region"

                      className={`grid transition-all duration-500 ease-out ${

                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"

                      }`}

                    >

                      <div className="overflow-hidden">

                        <div className="px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-[#372847]/5 border-t border-[#372847]/20">

                          {item.answer.includes("[RSVP_LINK]") ? (

                            <p className={`${inter.className} text-[#372847]/80 leading-relaxed text-[12px] sm:text-sm md:text-base lg:text-lg whitespace-pre-line`}>

                              {item.answer.split("[RSVP_LINK]")[0]}

                              <a

                                href="#guest-list"

                                className="text-[#372847] underline font-semibold hover:text-[#372847]/70 transition-colors break-words"

                                onClick={(e) => {

                                  e.preventDefault()

                                  document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })

                                }}

                              >

                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}

                              </a>

                              {item.answer.split("[/RSVP_LINK]")[1]}

                            </p>

                          ) : (

                            <p className={`${inter.className} text-[#372847]/80 leading-relaxed text-[12px] sm:text-sm md:text-base lg:text-lg whitespace-pre-line`}>

                              {item.answer}

                            </p>

                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                )

              })}

            </div>

          </div>

        </div>

      </div>

    </Section>

  )

}
