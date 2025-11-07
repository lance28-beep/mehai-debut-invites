"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)

  const getInitials = (name: string) => {
    if (!name) return "?"
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?"
  }

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only attending guests and normalize Guest field
      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || '1', // Ensure Guest field exists
        }))
      
      // Calculate total guests by summing the Guest column values
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1
        return sum + guestCount
      }, 0)
      
      setGuests(attendingGuests)
      setTotalGuests(totalGuestCount)
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  return (
    <div 
      id="guests" 
      className="relative z-[55] isolate bg-gradient-to-b from-[#666956] via-[#8D8E7C] to-[#666956] py-20 md:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating geometric shapes with palette */}
        <div className="hidden sm:block absolute top-10 left-10 w-24 h-24 bg-[#B08981]/12 rounded-full blur-2xl animate-pulse" />
        <div className="hidden sm:block absolute top-20 right-20 w-20 h-20 bg-[#EFBFBB]/18 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="hidden sm:block absolute bottom-20 left-20 w-28 h-28 bg-[#B08981]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="hidden sm:block absolute bottom-10 right-10 w-16 h-16 bg-[#EFBFBB]/16 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        {/* Mobile subtle shapes */}
        <div className="sm:hidden absolute top-8 left-8 w-12 h-12 bg-[#B08981]/10 rounded-full blur-lg animate-pulse" />
        <div className="sm:hidden absolute bottom-8 right-8 w-10 h-10 bg-[#EFBFBB]/12 rounded-full blur-md animate-pulse" />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B08981]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/25 to-transparent" />
        
        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-bl from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tr from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tl from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-tl-3xl" />
        {/* Decorative corner images - all 4 corners */}
        {/* Top Right */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-56 sm:w-72 md:w-96 lg:w-[34rem] xl:w-[40rem] opacity-80 select-none"
        />
        {/* Top Left */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-56 sm:w-72 md:w-96 lg:w-[34rem] xl:w-[40rem] opacity-80 select-none transform scale-x-[-1]"
        />
        {/* Bottom Left */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-80 lg:w-[30rem] xl:w-[36rem] opacity-70 rotate-180 select-none"
        />
        {/* Bottom Right */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-80 lg:w-[30rem] xl:w-[36rem] opacity-70 rotate-180 select-none transform scale-x-[-1]"
        />
      </div>

      {/* Enhanced title section */}
      <div className="relative z-10 text-center mb-8 md:mb-20 px-4">
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/60 to-[#EFBFBB]/30" />
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#EFBFBB] rounded-full" />
            <div className="w-1 h-1 bg-[#FFE5E4] rounded-full self-center" />
            <div className="w-2 h-2 bg-[#EFBFBB] rounded-full" />
          </div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-[#EFBFBB]/60 to-[#EFBFBB]/30" />
        </div>

        <div className="inline-flex items-center gap-1 md:gap-3 mb-2 md:mb-4">
          <Sparkles className="text-[#FFE5E4]/80 h-3 w-3 md:h-6 md:w-6 animate-pulse" />
          <span className="text-[#FFE5E4]/80 font-lora text-xs md:text-sm uppercase tracking-wider">Guest Registry</span>
          <Sparkles className="text-[#FFE5E4]/80 h-3 w-3 md:h-6 md:w-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#FFE5E4] mb-3 md:mb-6 text-balance drop-shadow-2xl relative">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#B08981] via-[#EFBFBB] to-[#FFE5E4]">Book of Guests</span>
          {/* Text glow effect */}
          <span className="absolute inset-0 text-[#EFBFBB]/25 blur-2xl -z-10">Book of Guests</span>
        </h2>
        
        <p className="text-sm md:text-xl text-[#FFE5E4]/90 font-sans font-light max-w-2xl mx-auto px-4 leading-relaxed">
          See who's celebrating with us on our special day
        </p>

        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
          <div className="w-1 h-1 bg-[#EFBFBB] rounded-full" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
        </div>
      </div>

      {/* Enhanced guests content */}
      <div className="relative z-10">
        {/* Premium stats card */}
        <div className="text-center mb-6 sm:mb-12 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative max-w-3xl mx-auto">
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-[#FFE5E4] via-white to-[#FFE5E4] backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-[#B08981]/35 shadow-[0_8px_24px_rgba(102,105,86,0.22)]">
              {/* Decorative corner accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-bl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-tr from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-tl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              
              {/* Inner decorative border */}
              <div className="absolute inset-2 border border-[#B08981]/30 rounded-xl" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-1 md:gap-3 mb-2 md:mb-4">
                  <div className="bg-gradient-to-r from-[#666956] to-[#8D8E7C] p-1 md:p-3 rounded-full shadow-lg">
                    <Heart className="text-[#FFE5E4] h-3 w-3 md:h-6 md:w-6" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-sm sm:text-2xl md:text-3xl font-playfair font-bold text-[#666956]">
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666956]/60 font-lora mt-1">
                      {guests.length} {guests.length === 1 ? "RSVP entry" : "RSVP entries"}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-base md:text-lg text-[#666956]/75 font-lora leading-relaxed">
                  Thank you for confirming your RSVP! Your presence means the world to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced guest list container */}
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#FFE5E4] via-white to-[#FFE5E4] backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border-2 border-[#B08981]/35">
            {/* Decorative corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-bl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-tr from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-tl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
            
            {/* Inner decorative border */}
            <div className="absolute inset-2 border border-[#B08981]/30 rounded-xl" />
            {isLoading ? (
              <div className="flex items-center justify-center h-24 sm:h-48">
                <div className="flex flex-col items-center gap-2 md:gap-4">
                  <div className="relative">
                    <Loader2 className="h-6 w-6 md:h-10 md:w-10 animate-spin text-[#402921]" />
                    <div className="absolute inset-0 h-6 w-6 md:h-10 md:w-10 animate-ping rounded-full bg-[#BB8A3D]/25"></div>
                  </div>
                  <span className="text-[#402921] font-lora text-xs md:text-lg font-medium">Loading guests...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-24 sm:h-48 text-red-500">
                <div className="flex flex-col items-center gap-2 md:gap-4">
                  <div className="bg-red-100 p-2 md:p-4 rounded-full">
                    <MessageSquare className="h-5 w-5 md:h-8 md:w-8 text-red-500" />
                  </div>
                  <span className="font-lora text-xs md:text-lg">{error}</span>
                </div>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex items-center justify-center py-10 sm:py-16">
                <div className="relative text-center bg-gradient-to-br from-[#402921] to-[#583016] rounded-2xl px-6 sm:px-10 py-8 sm:py-12 shadow-2xl border border-white/20 max-w-xl w-full">
                  {/* Decorative glow */}
                  <div className="absolute -inset-1 rounded-2xl bg-white/10 blur-xl opacity-30 pointer-events-none" />
                  <div className="relative">
                    <div className="relative inline-flex items-center justify-center mb-4 sm:mb-6">
                      <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-60" />
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/25 flex items-center justify-center shadow-lg">
                        <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-[#FFF6E7]" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-playfair font-bold text-[#FFF6E7] mb-2 sm:mb-3">
                      No guests have RSVP'd yet
                    </h3>
                    <p className="text-xs sm:text-base text-[#FFF6E7]/90 font-lora max-w-md mx-auto leading-relaxed">
                      Be the first to RSVP and kick off the celebration!
                    </p>
                    <div className="mt-4 sm:mt-6 flex justify-center">
                      <div className="inline-flex items-center gap-2 bg-white text-[#402921] rounded-full px-3 sm:px-5 py-1.5 sm:py-2 shadow-md">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs sm:text-sm font-lora">Search your name to RSVP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-6 relative z-10">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    {/* Main card */}
                    <div className={`group relative p-2 sm:p-6 rounded-md sm:rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      index % 2 === 0 
                        ? "bg-gradient-to-r from-[#BB8A3D]/10 to-white border-[#BB8A3D]/25 hover:border-[#BB8A3D]/40" 
                        : "bg-gradient-to-r from-white to-[#CDAC77]/10 border-[#BB8A3D]/25 hover:border-[#BB8A3D]/40"
                    }`}>
                    
                    <div className="flex flex-col gap-2 sm:gap-4">
                      {/* Header section */}
                      <div className="flex items-start gap-2 sm:gap-3">
                        {/* Avatar */}
                        <div className="relative h-8 w-8 sm:h-12 sm:w-12 flex-shrink-0">
                          <div className="h-full w-full rounded-full bg-gradient-to-br from-[#666956] to-[#8D8E7C] text-[#FFE5E4] flex items-center justify-center font-semibold shadow-lg ring-2 ring-white text-xs sm:text-base">
                            {getInitials(guest.Name)}
                          </div>
                        </div>
                        
                        {/* Name, Email, and Guest Count */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                            <div className="flex-1">
                              <h4 className="font-lora text-[#666956] text-sm sm:text-xl font-semibold leading-tight transition-colors duration-300 group-hover:text-[#B08981]">
                                {guest.Name}
                              </h4>
                            </div>
                            {/* Guest count badge */}
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <User className="h-3 w-3 sm:h-4 sm:w-4 text-[#B08981] flex-shrink-0" />
                              <span className="inline-flex items-center justify-center px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-semibold border border-blue-200 min-w-[2.5rem] sm:min-w-[3rem]">
                                {guest.Guest ? (parseInt(String(guest.Guest)) || 1) : 1} {parseInt(String(guest.Guest || '1')) === 1 ? 'guest' : 'guests'}
                              </span>
                            </div>
                          </div>
                          {guest.Email && guest.Email !== "Pending" && (
                            <div className="flex items-center text-xs sm:text-sm text-[#666956]/70 mt-0.5 sm:mt-1">
                              <Mail className="h-2 w-2 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-[#B08981] flex-shrink-0" />
                              <span className="font-lora break-all truncate text-xs sm:text-sm">{guest.Email}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/30 to-transparent" />

                      {/* Premium message section */}
                      {guest.Message && (
                        <div className="relative">
                          <div className="bg-gradient-to-r from-[#B08981]/10 to-[#EFBFBB]/10 rounded-md sm:rounded-xl p-2 sm:p-4 border-l-2 sm:border-l-4 border-[#B08981]">
                            <div className="flex items-start gap-1 sm:gap-3">
                              <div className="bg-[#666956] p-0.5 sm:p-2 rounded-full flex-shrink-0">
                                <MessageSquare className="h-2 w-2 sm:h-4 sm:w-4 text-[#FFE5E4]" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs sm:text-base text-[#666956] font-lora leading-relaxed italic">
                                  "{guest.Message}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
