"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
} from "lucide-react"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Message: string
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Message: "",
  })

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Message: "",
  })

  const searchRef = useRef<HTMLDivElement>(null)

  // Fetch all guests on component mount
  useEffect(() => {
    fetchGuests()
  }, [])

  // Filter guests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests([])
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = guests.filter((guest) =>
      guest.Name.toLowerCase().includes(query)
    )

    setFilteredGuests(filtered)
    setIsSearching(filtered.length > 0)
  }, [searchQuery, guests])

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }
      const data = await response.json()
      setGuests(data)
    } catch (error) {
      console.error("Error fetching guests:", error)
      setError("Failed to load guest list")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.Name)
    setIsSearching(false)
    
    // Set form data with existing guest info
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Message: guest.Message || "",
    })
    
    // Check if guest has already responded
    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""))
    
    // Show modal
    setShowModal(true)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return

    if (!formData.RSVP) {
      setError("Please select if you can attend")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Message: formData.Message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      // Show success and close modal after delay
      setSuccess("Thank you for your response!")
      setHasResponded(true)
      
      // Trigger event to refresh Book of Guests
      window.dispatchEvent(new Event("rsvpUpdated"))
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowModal(false)
        setSearchQuery("")
        setSelectedGuest(null)
        setSuccess(null)
        fetchGuests()
      }, 3000)
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      setError("Failed to submit RSVP. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedGuest(null)
    setSearchQuery("")
    setFormData({ Name: "", Email: "", RSVP: "", Message: "" })
    setHasResponded(false)
    setError(null)
  }

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setRequestSuccess(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit request")
      }

      setRequestSuccess("Request submitted! We'll review and get back to you.")
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowRequestModal(false)
        setRequestFormData({ Name: "", Email: "", Phone: "", Message: "" })
        setSearchQuery("")
        setRequestSuccess(null)
      }, 3000)
    } catch (error) {
      console.error("Error submitting request:", error)
      setError("Failed to submit request. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseRequestModal = () => {
    setShowRequestModal(false)
    setRequestFormData({ Name: "", Email: "", Phone: "", Message: "" })
    setError(null)
    setRequestSuccess(null)
  }

  return (
    <Section id="guest-list" className="relative z-[60] isolate py-16 sm:py-20 md:py-24 lg:py-32 overflow-visible">
      {/* Decorative corner images - all 4 corners */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
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

      {/* Custom larger title */}
      <div className="relative text-center mb-12 sm:mb-16 md:mb-20 px-4" style={{ zIndex: 10 }}>
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/60 to-[#EFBFBB]/30" />
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#EFBFBB] rounded-full" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#FFE5E4] rounded-full self-center" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#EFBFBB] rounded-full" />
          </div>
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#EFBFBB]/60 to-[#EFBFBB]/30" />
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white mb-4 sm:mb-6 text-balance drop-shadow-lg relative px-2">
          RSVP
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-[#FFE5E4]/95 font-sans font-light max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
          Please search for your name below to confirm your attendance and help us prepare for this special celebration
        </p>
        
        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
          <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#EFBFBB] rounded-full" />
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
        </div>
      </div>

      {/* Search Section */}
      <div className="relative w-full" style={{ zIndex: 10 }}>
        <div className="flex justify-center px-2 sm:px-4">
          <div className="max-w-3xl w-full">
            {/* Enhanced search container */}
            <div className="relative" style={{ overflow: 'visible', zIndex: 50 }}>
              {/* Multiple layered glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#B08981]/20 via-[#EFBFBB]/15 to-[#B08981]/20 rounded-3xl blur-2xl opacity-40 animate-pulse" />
              <div className="absolute -inset-3 bg-gradient-to-r from-[#B08981]/30 via-[#EFBFBB]/20 to-[#B08981]/30 rounded-3xl blur-md opacity-50 animate-pulse" />

              {/* Enhanced decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 bg-gradient-to-br from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-bl from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-tr from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-gradient-to-tl from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />

              {/* Main search card with enhanced multi-layer styling */}
              <div className="relative bg-gradient-to-br from-[#FFE5E4] via-[#EFBFBB]/25 to-[#FFE5E4] backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-[#B08981]/50 shadow-[0_8px_32px_rgba(102,105,86,0.25),0_0_0_1px_rgba(176,137,129,0.15)] overflow-visible" style={{ overflow: 'visible' }}>
                
                {/* Inner decorative border with gradient */}
                <div className="absolute inset-1 sm:inset-2 border border-[#B08981]/40 rounded-xl sm:rounded-2xl" />
                
                {/* Additional inner glow */}
                <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-[#EFBFBB]/15 to-transparent rounded-xl sm:rounded-2xl" />
                
                {/* Search content */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-[#666956] to-[#8D8E7C] p-2 rounded-xl shadow-lg">
                      <Search className="h-5 w-5 text-[#FFE5E4]" />
                    </div>
                    <div>
                    <label className="block text-base sm:text-lg font-semibold text-black font-sans mb-1">
                        Find Your Name
                      </label>
                    <p className="text-xs sm:text-sm text-black/80 font-sans">
                        Type as you search to see instant results
                      </p>
                    </div>
                  </div>
                  <div ref={searchRef} className="relative overflow-visible" style={{ zIndex: 50 }}>
                    <div className="relative">
                      <Search className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[#B08981]/60 pointer-events-none transition-colors duration-200" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Type your name..."
                        className="w-full pl-10 sm:pl-14 pr-3 sm:pr-6 py-3.5 sm:py-5 border-2 border-[#666956]/20 focus:border-[#B08981] rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-sans placeholder:text-[#666956]/40 transition-all duration-300 hover:border-[#B08981]/40 focus:ring-4 focus:ring-[#B08981]/10 bg-gradient-to-br from-white to-[#FFE5E4]/50 shadow-inner focus:shadow-lg"
                      />
                    </div>
                        {/* Enhanced Autocomplete dropdown - Premium Design */}
                        {isSearching && filteredGuests.length > 0 && (
                          <div 
                            className="absolute z-50 w-full mt-2 sm:mt-3 bg-white/95 backdrop-blur-lg border-2 border-[#B08981]/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in duration-200" 
                            style={{ 
                              position: 'absolute', 
                              top: '100%',
                              zIndex: 50,
                              boxShadow: '0 20px 60px rgba(102, 105, 86, 0.25), 0 8px 24px rgba(176, 137, 129, 0.15)'
                            }}
                          >
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#FFE5E4]/5 to-transparent pointer-events-none" />
                            <div className="relative">
                              {filteredGuests.map((guest, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSearchSelect(guest)}
                                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left hover:bg-gradient-to-r hover:from-[#B08981]/10 hover:to-[#EFBFBB]/5 active:bg-gradient-to-r active:from-[#B08981]/15 active:to-[#EFBFBB]/10 transition-all duration-200 flex items-center gap-3 sm:gap-4 border-b border-[#666956]/5 last:border-b-0 group relative"
                                >
                                  {/* Subtle hover effect */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-[#B08981]/0 via-[#EFBFBB]/0 to-[#B08981]/0 group-hover:from-[#B08981]/5 group-hover:via-[#EFBFBB]/5 group-hover:to-[#B08981]/5 transition-all duration-300 rounded-lg" />
                                  
                                  <div className="relative flex-shrink-0 z-10">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#666956] to-[#8D8E7C] rounded-full blur-md opacity-0 group-hover:opacity-40 transition-all duration-300 scale-110"></div>
                                    <div className="relative bg-gradient-to-br from-[#666956] to-[#8D8E7C] p-1.5 sm:p-2 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FFE5E4] transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0 z-10">
                                    <div className="font-semibold text-sm sm:text-base text-[#666956] group-hover:text-[#B08981] transition-colors duration-200 truncate">
                                      {guest.Name}
                                    </div>
                                    {guest.Email && guest.Email !== "Pending" && (
                                      <div className="text-[10px] sm:text-xs text-[#666956]/60 truncate mt-0.5">
                                        {guest.Email}
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-[#B08981]/40 group-hover:text-[#B08981] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 z-10">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {searchQuery && filteredGuests.length === 0 && (
                          <div 
                            className="absolute z-50 w-full mt-2 sm:mt-3 bg-gradient-to-br from-white/95 to-[#FFE5E4]/30 backdrop-blur-lg border-2 border-[#B08981]/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in duration-200" 
                            style={{ 
                              position: 'absolute', 
                              top: '100%',
                              zIndex: 50,
                              boxShadow: '0 20px 60px rgba(102, 105, 86, 0.25), 0 8px 24px rgba(176, 137, 129, 0.15)'
                            }}
                          >
                            <div className="p-4 sm:p-5">
                              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                                <div className="bg-gradient-to-br from-[#666956] to-[#8D8E7C] p-1.5 sm:p-2 rounded-xl flex-shrink-0 shadow-md">
                                  <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFE5E4]" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm sm:text-base text-[#666956] mb-1">Not finding your name?</h4>
                                  <p className="text-xs sm:text-sm text-[#666956]/70 leading-relaxed">
                                    We'd love to have you with us! Send a request to join the celebration.
                                  </p>
                                </div>
                              </div>
                              <Button
                                onClick={() => {
                                  setRequestFormData({ ...requestFormData, Name: searchQuery })
                                  setShowRequestModal(true)
                                }}
                                className="w-full bg-gradient-to-r from-[#666956] to-[#8D8E7C] hover:from-[#8D8E7C] hover:to-[#666956] text-[#FFE5E4] py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                              >
                                <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-2 inline" />
                                Request to Join
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  
                  {/* Enhanced decorative sparkle effects */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#EFBFBB] rounded-full animate-ping opacity-80 shadow-lg" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B08981] rounded-full animate-pulse opacity-70 shadow-md" />
                  <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFE5E4] rounded-full animate-pulse opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-2xl mx-3 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#B08981]/30 overflow-hidden animate-in zoom-in-95 duration-300">
              {/* Modal Header with Gradient */}
              <div className="relative bg-gradient-to-r from-[#666956] via-[#8D8E7C] to-[#666956] p-4 sm:p-6 md:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">
                        You're Invited!
                      </h3>
                    </div>
                    <p className="text-white/95 text-sm sm:text-base md:text-lg font-sans">
                      Hello <span className="font-extrabold text-[#FFE5E4] drop-shadow-[0_1px_6px_rgba(102,105,86,0.55)]">{selectedGuest?.Name}</span>, you are invited to our wedding!
                    </p>
                  </div>
                  {!hasResponded && (
                    <button
                      onClick={handleCloseModal}
                      className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 md:p-8 max-h-[75vh] sm:max-h-[70vh] overflow-y-auto">
                {hasResponded ? (
                  // Thank you message for guests who already responded
                  <div className="text-center py-6 sm:py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-4 sm:mb-6">
                      <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#666956] mb-2 sm:mb-3">
                      Thank You for Responding!
                    </h4>
                    <p className="text-[#666956]/80 text-sm sm:text-base mb-4 sm:mb-6">
                      We've received your RSVP and look forward to celebrating with you!
                    </p>
                    <div className="bg-gradient-to-br from-[#B08981]/10 to-[#EFBFBB]/5 rounded-xl p-4 sm:p-6 border border-[#B08981]/20">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        {selectedGuest?.RSVP === "Yes" && (
                          <>
                            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            <span className="text-base sm:text-lg font-semibold text-green-600">
                              You're Attending!
                            </span>
                          </>
                        )}
                        {selectedGuest?.RSVP === "No" && (
                          <>
                            <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            <span className="text-base sm:text-lg font-semibold text-red-600">
                              Unable to Attend
                            </span>
                          </>
                        )}
                      </div>
                      {selectedGuest && selectedGuest.Message && selectedGuest.Message.trim() !== "" && (
                        <p className="text-xs sm:text-sm text-[#666956]/80 italic">
                          "{selectedGuest.Message}"
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={handleCloseModal}
                      className="mt-4 sm:mt-6 bg-gradient-to-r from-[#666956] to-[#8D8E7C] hover:from-[#8D8E7C] hover:to-[#666956] text-[#FFE5E4] px-6 sm:px-8 py-3 rounded-xl"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  // RSVP Form for guests who haven't responded
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRSVP()
                    }}
                    className="space-y-5 sm:space-y-6"
                  >
                    {/* Can you attend? */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#666956] mb-2 sm:mb-4 font-sans">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#B08981]" />
                        Can you attend? *
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "Yes" }))}
                          className={`relative p-3 sm:p-6 rounded-2xl border-4 transition-all duration-300 ${
                            formData.RSVP === "Yes"
                              ? "border-green-500 bg-green-50 shadow-lg scale-105"
                              : "border-[#666956]/20 bg-white hover:border-[#B08981]/40 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <CheckCircle
                              className={`h-6 w-6 sm:h-8 sm:w-8 ${
                                formData.RSVP === "Yes" ? "text-green-600" : "text-[#666956]/40"
                              }`}
                            />
                            <span
                              className={`text-base sm:text-xl font-bold ${
                                formData.RSVP === "Yes"
                                  ? "text-green-600"
                                  : "text-[#666956]"
                              }`}
                            >
                              Yes!
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                          className={`relative p-3 sm:p-6 rounded-2xl border-4 transition-all duration-300 ${
                            formData.RSVP === "No"
                              ? "border-red-500 bg-red-50 shadow-lg scale-105"
                              : "border-[#666956]/20 bg-white hover:border-[#B08981]/40 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2 sm:gap-3">
                            <XCircle
                              className={`h-6 w-6 sm:h-8 sm:w-8 ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#666956]/40"
                              }`}
                            />
                            <span
                              className={`text-base sm:text-xl font-bold ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#666956]"
                              }`}
                            >
                              Sorry, No
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Message to the couple */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#666956] mb-2 sm:mb-3 font-sans">
                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-[#B08981]" />
                        Your Message to the Couple
                        <span className="text-xs sm:text-sm font-normal text-[#666956]/60">(Optional)</span>
                      </label>
                      <textarea
                        name="Message"
                        value={formData.Message}
                        onChange={handleFormChange}
                        placeholder="Share your excitement, well wishes, or any special dietary requirements..."
                        rows={4}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#666956]/20 focus:border-[#B08981] rounded-xl text-sm font-sans placeholder:text-[#666956]/40 transition-all duration-300 focus:ring-4 focus:ring-[#B08981]/10 resize-none bg-white/80"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#666956] mb-2 sm:mb-3 font-sans">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#B08981]" />
                        Your Email Address
                        <span className="text-xs sm:text-sm font-normal text-[#666956]/60">(Optional - can be left blank)</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleFormChange}
                        placeholder="your.email@example.com (optional)"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#666956]/20 focus:border-[#B08981] rounded-xl text-sm font-sans placeholder:text-[#666956]/40 transition-all duration-300 focus:ring-4 focus:ring-[#B08981]/10 bg-white/80"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3 sm:pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#666956] to-[#8D8E7C] hover:from-[#8D8E7C] hover:to-[#666956] text-[#FFE5E4] py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-3">
                            <RefreshCw className="h-5 w-5 animate-spin" />
                            <span className="text-sm sm:text-base">Submitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <Heart className="h-5 w-5" />
                            <span className="text-sm sm:text-base">Submit RSVP</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Enhanced Success Overlay */}
              {success && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#666956]/98 via-[#8D8E7C]/98 to-[#666956]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300">
                  <div className="text-center p-6 sm:p-8 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-5 sm:mb-6">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-4 border-[#FFE5E4]/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#FFE5E4]/30" />
                      {/* Icon container */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#FFE5E4] to-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-[#666956]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFE5E4] mb-3 sm:mb-4">
                      RSVP Confirmed!
                    </h4>
                    
                    {/* Message based on RSVP response */}
                    {formData.RSVP === "Yes" && (
                      <div className="space-y-2 mb-4 sm:mb-5">
                        <p className="text-[#FFE5E4]/95 text-base sm:text-lg font-medium">
                          We're thrilled you'll be joining us!
                        </p>
                        <p className="text-[#FFE5E4]/80 text-sm sm:text-base">
                          Your response has been recorded
                        </p>
                      </div>
                    )}
                    {formData.RSVP === "No" && (
                      <p className="text-[#FFE5E4]/90 text-base sm:text-lg mb-4 sm:mb-5">
                        We'll miss you, but thank you for letting us know.
                      </p>
                    )}
                    {!formData.RSVP && (
                      <p className="text-[#FFE5E4]/90 text-base sm:text-lg mb-4 sm:mb-5">
                        Thank you for your response!
                      </p>
                    )}
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
                      <div className="w-1.5 h-1.5 bg-[#FFE5E4]/60 rounded-full animate-pulse" />
                      <p className="text-[#FFE5E4]/70 text-xs sm:text-sm">
                        This will close automatically
                      </p>
                      <div className="w-1.5 h-1.5 bg-[#FFE5E4]/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="px-6 sm:px-8 pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-600 font-semibold text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Request to Join Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-2xl mx-3 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#B08981]/30 overflow-hidden animate-in zoom-in-95 duration-300">
              {/* Modal Header with Gradient */}
              <div className="relative bg-gradient-to-r from-[#666956] via-[#8D8E7C] to-[#666956] p-4 sm:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">
                        Request to Join
                      </h3>
                    </div>
                    <p className="text-white/95 text-sm sm:text-base font-sans">
                      {requestFormData.Name ? (
                        <>Hi <span className="font-extrabold text-[#FFE5E4] drop-shadow-[0_1px_6px_rgba(102,105,86,0.55)]">{requestFormData.Name}</span> — want to celebrate with us? Send a request!</>
                      ) : (
                        <>Want to celebrate with us? Send a request!</>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseRequestModal}
                    className="text-white/80 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/20 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-8 max-h-[75vh] sm:max-h-[70vh] overflow-y-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitRequest()
                  }}
                  className="space-y-5 sm:space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#666956] mb-2 sm:mb-3 font-sans">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#B08981]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={requestFormData.Name}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#666956]/20 focus:border-[#B08981] rounded-xl text-sm font-sans placeholder:text-[#666956]/40 transition-all duration-300 focus:ring-4 focus:ring-[#B08981]/10 bg-white/80"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#666956] mb-2 sm:mb-3 font-sans">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#B08981]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={requestFormData.Email}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#666956]/20 focus:border-[#B08981] rounded-xl text-sm font-sans placeholder:text-[#666956]/40 transition-all duration-300 focus:ring-4 focus:ring-[#B08981]/10 bg-white/80"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#666956] mb-2 sm:mb-3 font-sans">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#B08981]" />
                      Phone Number
                      <span className="text-sm font-normal text-[#666956]/60">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      value={requestFormData.Phone}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#666956]/20 focus:border-[#B08981] rounded-xl text-sm font-sans placeholder:text-[#666956]/40 transition-all duration-300 focus:ring-4 focus:ring-[#B08981]/10 bg-white/80"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-[#666956] mb-2 sm:mb-3 font-sans">
                      <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-[#B08981]" />
                      Message
                      <span className="text-sm font-normal text-[#666956]/60">(Optional)</span>
                    </label>
                    <textarea
                      name="Message"
                      value={requestFormData.Message}
                      onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                      placeholder="Share why you'd like to join the celebration..."
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#666956]/20 focus:border-[#B08981] rounded-xl text-sm font-sans placeholder:text-[#666956]/40 transition-all duration-300 focus:ring-4 focus:ring-[#B08981]/10 resize-none bg-white/80"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 sm:pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#666956] to-[#8D8E7C] hover:from-[#8D8E7C] hover:to-[#666956] text-[#FFE5E4] py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <RefreshCw className="h-5 w-5 animate-spin" />
                          <span className="text-sm sm:text-base">Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <UserPlus className="h-5 w-5" />
                          <span className="text-sm sm:text-base">Send Request</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Enhanced Success Overlay */}
              {requestSuccess && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#666956]/98 via-[#8D8E7C]/98 to-[#666956]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300">
                  <div className="text-center p-6 sm:p-8 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-5 sm:mb-6">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-4 border-[#FFE5E4]/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#FFE5E4]/30" />
                      {/* Icon container */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#FFE5E4] to-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-[#666956]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFE5E4] mb-3 sm:mb-4">
                      Request Sent!
                    </h4>
                    
                    {/* Message */}
                    <div className="space-y-2 mb-4 sm:mb-5">
                      <p className="text-[#FFE5E4]/95 text-base sm:text-lg font-medium">
                        We've received your request
                      </p>
                      <p className="text-[#FFE5E4]/85 text-sm sm:text-base">
                        We'll review it and get back to you soon
                      </p>
                    </div>
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
                      <div className="w-1.5 h-1.5 bg-[#FFE5E4]/60 rounded-full animate-pulse" />
                      <p className="text-[#FFE5E4]/70 text-xs sm:text-sm">
                        This will close automatically
                      </p>
                      <div className="w-1.5 h-1.5 bg-[#FFE5E4]/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="px-6 sm:px-8 pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-600 font-semibold text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Floating Status Messages (outside modals) */}
      {success && !showModal && !showRequestModal && !requestSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="text-green-600 font-semibold text-sm sm:text-base">{success}</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
