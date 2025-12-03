import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import MasonryGallery from "@/components/masonry-gallery"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const [desktop, mobile] = await Promise.all([
    getImagesFrom("desktop-background"),
    getImagesFrom("mobile-background"),
  ])
  const images = [
    ...desktop.map((src) => ({ src, category: "desktop" as const })),
    ...mobile.map((src) => ({ src, category: "mobile" as const })),
  ]

  return (
    <main className="min-h-screen bg-[#525E2C] relative overflow-hidden">
      {/* Enhanced background elements with sage green spring motif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays with sage + champagne palette */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#2F3724]/90 via-[#525E2C]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#2F3724]/95 via-[#525E2C]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,207,181,0.3),transparent_55%)] opacity-90" />
        
        {/* Floating decorative circles with motif colors */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#909E8D]/26 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute top-20 right-16 w-24 h-24 bg-[#E0CFB5]/26 rounded-full blur-2xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-16 left-20 w-28 h-28 bg-[#F0F0EE]/22 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-24 right-12 w-20 h-20 bg-[#D1AB6D]/26 rounded-full blur-2xl animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#525E2C]/24 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        />
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D1AB6D]/40 to-transparent" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#E0CFB5]/60" />
            <div className="w-1.5 h-1.5 bg-[#D1AB6D]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#F0F0EE]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#909E8D]/80 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#E0CFB5]/60" />
          </div>
          
          <h1
            className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
          >
            Gallery
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-xl mx-auto leading-relaxed px-2">
            A collection from our favorite moments
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-[#D1AB6D]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#F0F0EE]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#909E8D]/80 rounded-full" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-white/90">
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-[#660033]/80 rounded border border-[#FDECEF]/30 text-white">
                public/desktop-background
              </code>{" "}
              or{" "}
              <code className="px-2 py-1 bg-[#660033]/80 rounded border border-[#FDECEF]/30 text-white">
                public/mobile-background
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}

        {/* CTA Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <div className="bg-[#525E2C]/98 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-[#E0CFB5]/60 max-w-2xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300">
            {/* Corner accents */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E0CFB5]/70 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E0CFB5]/70 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E0CFB5]/70 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E0CFB5]/70 rounded-br-lg" />
              
              <h2 className="font-playfair text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 drop-shadow-md">
                Help us capture every smile!
              </h2>
              <p className="text-white/90 font-light text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed px-2">
                Upload your snapshots and be part of our wedding album and be featured in this gallery.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#F7E7CE]/30 border-2 border-[#E0CFB5]/60 rounded-full text-white font-semibold text-xs sm:text-sm md:text-base shadow-md">
                  #KimAndCedSayIDo
                </span>
              </div>
              <Link
                href="/#snap-share"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#D1AB6D] to-[#F7E7CE] text-[#2F3724] font-semibold text-xs sm:text-sm md:text-base rounded-full hover:from-[#D1AB6D]/90 hover:to-[#F7E7CE]/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More About Sharing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


