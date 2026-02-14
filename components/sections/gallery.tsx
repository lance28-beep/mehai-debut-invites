"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

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
  weight: ["400", "500", "600"],
})

const galleryItems = [
  { image: "/mobile-background/debut (1).webp", text: "Lavender Reverie" },
  { image: "/mobile-background/debut (2).webp", text: "Violet Light" },
  { image: "/mobile-background/debut (3).webp", text: "Velvet Steps" },
  { image: "/mobile-background/debut (4).webp", text: "Silver Whispers" },
  { image: "/desktop-background/debut (5).webp", text: "Lavender Glow" },
  { image: "/desktop-background/debut (4).webp", text: "Evening Poise" },
  { image: "/desktop-background/debut (1).webp", text: "Radiant Silhouette" },
  { image: "/desktop-background/debut (3).webp", text: "Lavender Glow" },
]

const tileLayouts = [
  "md:col-span-3 md:row-span-3 md:col-start-1 md:row-start-1",
  "md:col-span-2 md:row-span-3 md:col-start-4 md:row-start-1",
  "md:col-span-1 md:row-span-3 md:col-start-6 md:row-start-1",
  "md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-4",
  "md:col-span-3 md:row-span-2 md:col-start-4 md:row-start-4",
  "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-6",
  "md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-6",
  "md:col-span-2 md:row-span-1 md:col-start-5 md:row-start-6",
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: "prev" | "next") => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === "next") {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return

      if (e.key === "ArrowLeft") navigateImage("prev")
      if (e.key === "ArrowRight") navigateImage("next")
      if (e.key === "Escape") setSelectedImage(null)
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedImage])

  useEffect(() => {
    if (selectedImage) {
      const next = new Image()
      next.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
      const prev = new Image()
      prev.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <Section
      id="gallery"
      className="relative bg-[#372847] py-14 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(220,150,253,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(55,40,71,0.5),transparent_45%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_85%,rgba(55,40,71,0.35),transparent_50%)]" />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs sm:text-sm tracking-[0.45em] uppercase text-white/75 mb-3">Lavender keepsakes</p>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl text-white`}
          >
            Gallery of Lavender Evenings
          </h2>
          <p className={`${inter.className} text-sm sm:text-base md:text-lg text-white/85 mt-4 leading-relaxed`}>
            Moments draped in lavender, violet, and silver—{siteConfig.debutante.nickname}'s debut glow, framed for you to relive.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 sm:mt-14 lg:mt-16 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
              <div className="w-14 h-14 border-[3px] border-[#372847]/30 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            <div className="mx-auto max-w-5xl w-full px-1">
              <div className="grid w-full min-h-[420px] sm:min-h-[460px] md:min-h-0 md:aspect-square grid-cols-2 sm:grid-cols-3 md:grid-cols-6 md:grid-rows-6 gap-2 sm:gap-3 md:gap-4">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.image + index}
                    type="button"
                    className={`group relative min-h-[190px] sm:min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-[#372847]/60 backdrop-blur-sm shadow-[0_18px_35px_rgba(55,40,71,0.45)] transition-all duration-500 hover:shadow-[0_26px_50px_rgba(106,35,158,0.65)] hover:border-white/40 ${tileLayouts[index] ?? ""}`}
                    onClick={() => {
                      setSelectedImage(item)
                      setCurrentIndex(index)
                    }}
                    aria-label={`Open image ${index + 1}`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute -inset-5 sm:-inset-6 bg-gradient-to-br from-[#DC96FD]/25 via-transparent to-[#372847]/30 blur-2xl sm:blur-3xl" />
                    </div>

                    <div className="relative h-full w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#372847]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white/95">
                      <span className={`${playfair.className} text-[9px] sm:text-xs tracking-[0.25em] uppercase`}>{item.text}</span>
                      <span className="text-[8px] sm:text-[10px] tracking-[0.38em] uppercase text-white/70">{index + 1}/{galleryItems.length}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-[#1a1020]/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => {
            setSelectedImage(null)
            resetZoom()
          }}
        >
          <div
            className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                const now = Date.now()
                if (now - lastTap < 300) {
                  setZoomScale((s) => (s > 1 ? 1 : 2))
                  setPan({ x: 0, y: 0 })
                }
                setLastTap(now)
                const t = e.touches[0]
                setTouchStartX(t.clientX)
                setTouchDeltaX(0)
                if (zoomScale > 1) {
                  setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                }
              }
              if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                const dist = Math.hypot(dx, dy)
                setPinchStartDist(dist)
                setPinchStartScale(zoomScale)
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 2 && pinchStartDist) {
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                const dist = Math.hypot(dx, dy)
                const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                setZoomScale(scale)
              } else if (e.touches.length === 1) {
                const t = e.touches[0]
                if (zoomScale > 1 && panStart) {
                  const dx = t.clientX - panStart.x
                  const dy = t.clientY - panStart.y
                  setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                } else if (touchStartX !== null) {
                  setTouchDeltaX(t.clientX - touchStartX)
                }
              }
            }}
            onTouchEnd={() => {
              setPinchStartDist(null)
              setPanStart(null)
              if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                navigateImage(touchDeltaX > 0 ? "prev" : "next")
              }
              setTouchStartX(null)
              setTouchDeltaX(0)
            }}
          >
            <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-3 sm:px-6 pt-3 sm:pt-6">
              <div className="bg-[#372847]/80 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 shadow-[0_12px_24px_rgba(55,40,71,0.45)]">
                <span className="text-xs sm:text-sm font-medium text-white tracking-[0.18em]">
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </div>

            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("prev")
                    resetZoom()
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#372847]/70 hover:bg-[#372847]/90 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/30 hover:border-white/60"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("next")
                    resetZoom()
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#372847]/70 hover:bg-[#372847]/90 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/30 hover:border-white/60"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden">
              <div
                className="relative inline-block max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(null)
                    resetZoom()
                  }}
                  className="absolute top-3 right-3 z-40 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/35 bg-[#372847]/80 backdrop-blur-md shadow-[0_14px_28px_rgba(55,40,71,0.6)] transition-all duration-200 hover:scale-105"
                  aria-label="Close lightbox"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#DC96FD]/35 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <X size={18} className="sm:w-6 sm:h-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
                </button>
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
                    transition: pinchStartDist ? "none" : "transform 200ms ease-out",
                  }}
                  className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-2xl shadow-[0_35px_65px_rgba(55,40,71,0.75)]"
                />

                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-[#372847]/70 hover:bg-[#372847]/90 backdrop-blur-md text-white rounded-full px-3 py-1.5 text-xs font-medium border border-white/25 transition-all duration-200"
                  >
                    Reset Zoom
                  </button>
                )}
              </div>
            </div>

            {galleryItems.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-xs text-white/80 bg-[#372847]/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
                  Swipe to navigate
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 mt-12 sm:mt-14 md:mt-16 flex justify-center px-4">
        <a
          href="/gallery"
          className="group relative inline-flex h-full min-h-[3.5rem] sm:min-h-[3.75rem] items-center justify-center overflow-hidden rounded-full border border-[#6A239E]/30 bg-white px-10 sm:px-12 md:px-14 text-[9px] sm:text-[10px] md:text-xs tracking-[0.48em] uppercase text-[#372847] shadow-[0_26px_58px_rgba(55,40,71,0.3)] transition-all duration-600 ease-out hover:-translate-y-2 hover:shadow-[0_36px_70px_rgba(106,35,158,0.4)]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#6A239E]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
          <span className="absolute inset-[2px] rounded-full bg-white backdrop-blur-2xl border border-[#6A239E]/20" />
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out bg-gradient-to-r from-transparent via-[#6A239E]/15 to-transparent" />
          <span className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-[1100ms] ease-out bg-gradient-to-l from-transparent via-[#6A239E]/10 to-transparent" />
          <span className="relative z-10 inline-flex items-center justify-center">
            View Full Gallery
          </span>
        </a>
      </div>
    </Section>
  )
}