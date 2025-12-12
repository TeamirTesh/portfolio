'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ===== CONFIGURATION - Easy to edit placeholders =====
const ROLES = [
  'Computer Science Nerd',
  'Fitness Fanatic',
  'Machine Learning Engineer',
  'Brother',
]

const NAME = 'Teamir'
const SUBTITLE = 'Welcome. Choose the version of me you want to see.'

// Fallback images if no images are found in folders
const FALLBACK_PROFESSIONAL_IMAGES = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
]

const FALLBACK_PERSONAL_IMAGES = [
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
]

const PORTAL_CONFIG = {
  professional: {
    title: 'mir.exe',
    label: '',
    subtitle: '',
    route: '/professional',
  },
  personal: {
    title: 'ተአምር',
    label: '',
    subtitle: '',
    route: '/personal',
  },
}

// ===== Typing Animation Component =====
function TypingAnimation() {
  const [displayText, setDisplayText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  useEffect(() => {
    const currentRole = ROLES[currentRoleIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        }, typingSpeed)
      } else {
        // Pause after typing complete
        timeout = setTimeout(() => {
          setIsDeleting(true)
          setTypingSpeed(50)
        }, 2000)
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, typingSpeed)
      } else {
        // Move to next role
        setIsDeleting(false)
        setTypingSpeed(100)
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, currentRoleIndex, isDeleting, typingSpeed])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Search input style container */}
        <div className="w-full px-6 py-4 md:px-8 md:py-5 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3">
            {/* Search icon */}
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {/* Search query text */}
            <div className="flex-1 text-left">
              <span className="text-gray-500 text-lg md:text-xl lg:text-2xl font-light">{NAME}, the </span>
              <span className="text-gray-900 text-lg md:text-xl lg:text-2xl font-normal">
                {displayText}
                <span className="animate-pulse text-blue-500">|</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== Image Slideshow Component with Parallax =====
function ImageSlideshow({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (images.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [images.length])

  // Slow parallax pan animation
  useEffect(() => {
    const panInterval = setInterval(() => {
      setPanOffset(prev => ({
        x: (prev.x + 0.1) % 10,
        y: (prev.y + 0.05) % 10
      }))
    }, 50)

    return () => clearInterval(panInterval)
  }, [])

  if (images.length === 0) {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-200 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No images found</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 transition-transform duration-[20000ms] ease-linear"
            style={{
              transform: `translate(${panOffset.x}%, ${panOffset.y}%) scale(1.1)`,
            }}
          >
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              quality={95}
              priority={index === 0}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// ===== Portal Card Component =====
function PortalCard({
  type,
  images,
  config,
  onMouseEnter,
  onMouseLeave,
}: {
  type: 'professional' | 'personal'
  images: string[]
  config: { title: string; label: string; subtitle: string; route: string }
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const isProfessional = type === 'professional'

  return (
    <div className="flex flex-col">
      {/* Title above the card */}
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          {config.title}
        </h2>
      </div>

      {/* Portal card */}
      <Link 
        href={config.route} 
        className="group block h-full perspective-1000"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={`
            relative h-full min-h-[350px] md:min-h-[400px] rounded-2xl overflow-hidden
            transition-all duration-700 ease-out
            group-hover:scale-105 group-hover:rotate-1 group-hover:[transform:rotateY(6deg)]
            ${isProfessional 
              ? 'shadow-[0_20px_60px_rgba(99,102,241,0.4)] group-hover:shadow-[0_30px_80px_rgba(99,102,241,0.5)]' 
              : 'shadow-[0_20px_60px_rgba(245,158,11,0.4)] group-hover:shadow-[0_30px_80px_rgba(245,158,11,0.5)]'
            }
          `}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Inner glow - cool for professional, warm for personal */}
          <div 
            className={`absolute -inset-2 rounded-2xl blur-xl transition-opacity duration-700 ${
              isProfessional 
                ? 'bg-gradient-to-br from-blue-400 via-indigo-500 to-violet-600 opacity-30 group-hover:opacity-50' 
                : 'bg-gradient-to-br from-yellow-400 via-amber-500 to-rose-500 opacity-30 group-hover:opacity-50'
            }`}
            style={{ zIndex: -1 }}
          />

          {/* Animated border */}
          <div 
            className={`absolute -inset-[2px] rounded-2xl ${
              isProfessional 
                ? 'opacity-60 group-hover:opacity-100' 
                : 'opacity-70 group-hover:opacity-100'
            } transition-opacity duration-700`}
            style={{ zIndex: 10 }}
          >
            {isProfessional ? (
              // Neon/glass border with animated gradient for professional
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6, #a855f7, #6366f1, #3b82f6)',
                  backgroundSize: '200% 100%',
                  animation: 'gradient-shift 3s ease infinite',
                }}
              />
            ) : (
              // Warm gold border with subtle pattern for personal
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706, #f59e0b)',
                }}
              >
                {/* Subtle Ethiopian-inspired pattern overlay */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 10px,
                      rgba(0,0,0,0.1) 10px,
                      rgba(0,0,0,0.1) 20px
                    )`,
                  }}
                />
              </div>
            )}
          </div>

          {/* Image slideshow */}
          <div className="absolute inset-[2px] z-0 rounded-2xl overflow-hidden">
            <ImageSlideshow images={images} alt={config.title} />
          </div>

          {/* Symbolic icons */}
          {isProfessional ? (
            // Tech icon (top-right)
            <div className="absolute top-4 right-4 z-20 bg-black/20 backdrop-blur-sm rounded-lg p-2 group-hover:bg-black/30 transition-colors">
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          ) : (
            // Ethiopian/gym symbol (top-left)
            <div className="absolute top-4 left-4 z-20 bg-black/20 backdrop-blur-sm rounded-lg p-2 group-hover:bg-black/30 transition-colors">
              <svg className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

// ===== Main Landing Page =====
export default function Home() {
  // Start with 'professional' (coding background) as default, keep last hovered portal active
  const [activePortal, setActivePortal] = useState<'professional' | 'personal'>('professional')
  const [professionalImages, setProfessionalImages] = useState<string[]>([])
  const [personalImages, setPersonalImages] = useState<string[]>([])
  const [codingBackgroundImage, setCodingBackgroundImage] = useState<string | null>(null)

  // Fetch images from API on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch professional images
        const professionalRes = await fetch('/api/images?folder=professional')
        const professionalData = await professionalRes.json()
        setProfessionalImages(
          professionalData.images && professionalData.images.length > 0
            ? professionalData.images
            : FALLBACK_PROFESSIONAL_IMAGES
        )

        // Fetch personal images
        const personalRes = await fetch('/api/images?folder=personal')
        const personalData = await personalRes.json()
        setPersonalImages(
          personalData.images && personalData.images.length > 0
            ? personalData.images
            : FALLBACK_PERSONAL_IMAGES
        )

        // Fetch coding background image
        const backgroundRes = await fetch('/api/images?type=background')
        const backgroundData = await backgroundRes.json()
        setCodingBackgroundImage(backgroundData.image || null)
      } catch (error) {
        console.error('Error fetching images:', error)
        // Use fallback images on error
        setProfessionalImages(FALLBACK_PROFESSIONAL_IMAGES)
        setPersonalImages(FALLBACK_PERSONAL_IMAGES)
      }
    }

    fetchImages()
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gray-200">
      {/* Light gray base background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #e5e7eb 0%, #d1d5db 50%, #e5e7eb 100%)'
          }}
        />
      </div>

      {/* Background overlays - fade on top of light background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {/* Coding background overlay (when professional is active) */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            activePortal === 'professional' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {codingBackgroundImage ? (
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${codingBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.4,
              }}
            />
          ) : (
            // Fallback coding pattern if no image
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                  linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                  linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(147, 51, 234, 0.06) 50%, rgba(59, 130, 246, 0.06) 100%)
                `,
                backgroundSize: '24px 24px, 24px 24px, 100% 100%',
                opacity: 0.3,
              }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 18px,
                      rgba(59, 130, 246, 0.04) 18px,
                      rgba(59, 130, 246, 0.04) 20px
                    )
                  `,
                }}
              />
            </div>
          )}
        </div>

        {/* Ethiopian colors background overlay (when personal is active) */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            activePortal === 'personal' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `
              linear-gradient(180deg, 
                rgba(218, 18, 18, 0.15) 0%, 
                rgba(218, 18, 18, 0.15) 33.33%, 
                rgba(252, 221, 9, 0.15) 33.33%, 
                rgba(252, 221, 9, 0.15) 66.66%, 
                rgba(7, 137, 48, 0.15) 66.66%, 
                rgba(7, 137, 48, 0.15) 100%
              )
            `,
          }}
        />
      </div>

      {/* Premium noise texture overlay - adds warmth and canvas-like feel */}
      <div className="noise-overlay" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Search query with entrance animation and complementary gradient */}
        <div className="w-full mb-8 md:mb-10 animate-fade-in">
          <div className="relative">
            {/* Subtle gradient fade connecting to portals */}
            <div 
              className="absolute -inset-8 rounded-2xl opacity-20 blur-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
              }}
            />
            <div className="relative">
              <TypingAnimation />
            </div>
          </div>
        </div>

        {/* Portal cards with upward fade */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-slide-up relative">
          {/* Gentle upward fade gradient from portals */}
          <div 
            className="absolute -top-20 left-0 right-0 h-32 pointer-events-none opacity-30"
            style={{
              background: 'linear-gradient(to top, rgba(99, 102, 241, 0.1) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 100%)',
            }}
          />
          
          {/* Professional Portal (Left) - Teamir */}
          <div className="animate-fade-in-delay-1 relative z-10">
            <PortalCard
              type="professional"
              images={professionalImages}
              config={PORTAL_CONFIG.professional}
              onMouseEnter={() => setActivePortal('professional')}
              onMouseLeave={() => {}} // Keep the last portal active
            />
          </div>

          {/* Personal Portal (Right) - ተአምር */}
          <div className="animate-fade-in-delay-2 relative z-10">
            <PortalCard
              type="personal"
              images={personalImages}
              config={PORTAL_CONFIG.personal}
              onMouseEnter={() => setActivePortal('personal')}
              onMouseLeave={() => {}} // Keep the last portal active
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in 1s ease-out 0.5s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.7s both;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

      `}</style>
    </main>
  )
}

