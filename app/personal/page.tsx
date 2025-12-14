'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { THEME } from '@/lib/theme'

const RAW_COLORS = THEME.colors.raw

// Navigation sections
type NavSection = 'timeline' | 'journal' | 'notes' | 'media' | 'languages' | 'interests'

// Era-based timeline entries
const TIMELINE_ERAS = [
  {
    year: '2006',
    age: 'Age 0',
    eraTitle: 'Beginning',
    obsessions: ['Family', 'Discovery', 'Roots'],
    images: [],
    bgTint: 0,
  },
  {
    year: '2006–2012',
    age: 'Age 0–6',
    eraTitle: 'Ethiopian Years',
    obsessions: ['Culture', 'Language', 'Connection', 'Home'],
    images: [],
    bgTint: 1,
  },
  {
    year: '2012–2018',
    age: 'Age 6–12',
    eraTitle: 'Return & Adaptation',
    obsessions: ['Identity', 'Belonging', 'Learning', 'Transition'],
    images: [],
    bgTint: 0,
  },
  {
    year: '2018–2022',
    age: 'Age 12–16',
    eraTitle: 'The Gaming Era',
    obsessions: ['COD', 'Minecraft', 'GTA', '2K', 'Overwatch', 'Brawlhalla', 'Competition', 'Friendship'],
    images: [],
    bgTint: 2,
  },
  {
    year: '2022',
    age: 'Age 16',
    eraTitle: 'Graduation',
    obsessions: ['Achievement', 'Early College', '60 Credits', 'Momentum'],
    images: [],
    bgTint: 1,
  },
  {
    year: '2022–Present',
    age: 'Age 16+',
    eraTitle: 'Independence',
    obsessions: ['Gym', 'Nutrition', 'Work Ethic', 'Financial Responsibility', 'Own Car', 'Self-Reliance'],
    images: [],
    bgTint: 0,
  },
  {
    year: '2022–2026',
    age: 'Age 16–20',
    eraTitle: 'College & Career',
    obsessions: ['Computer Science', 'Projects', 'Internships', 'Career Development', 'Building'],
    images: [],
    bgTint: 1,
  },
  {
    year: 'Summer 2026',
    age: 'Age 20',
    eraTitle: 'Completion',
    obsessions: ['Graduation', 'Reflection', 'Transition', 'Next Chapter'],
    images: [],
    bgTint: 0,
  },
  {
    year: 'Fall 2026',
    age: 'Age 20',
    eraTitle: 'Graduate School',
    obsessions: ['Advanced Study', 'Specialization', 'Research', 'Growth'],
    images: [],
    bgTint: 2,
  },
]

// Journal entries
const JOURNAL_ENTRIES = [
  {
    title: 'On Autonomy',
    content: '[Your thoughts on personal autonomy and self-determination]',
  },
  {
    title: 'Reflections on Growth',
    content: '[Your reflections on personal growth and development]',
  },
  {
    title: 'Mind & Body',
    content: '[Your thoughts on the connection between mental and physical cultivation]',
  },
]

// Personal philosophies / notes
const PERSONAL_NOTES = [
  'Personal autonomy is the foundation of meaningful growth.',
  'Equal rights for all humans, without exception.',
  'Mental health and spirituality exist independently of religious doctrine.',
  'Discipline is self-cultivation, not self-punishment.',
  'Reject cult-like thinking in all forms—political, social, or ideological.',
]

// Personal metadata
const METADATA = {
  music: {
    'R&B / Pop': ['Giveon', 'Jhene Aiko', 'Bruno Mars', 'Mariah The Scientist'],
    'Ethiopian': ['Jah Lude', 'Teddy Afro', 'Abel Mulugeta', 'Dagi D', 'Tibebu Workiye'],
  },
  hobbies: [
    'Self cultivation (mind + body)',
    'Weightlifting & martial arts',
    'Career development (projects, resume, internships)',
    'Political discourse (principled, non-partisan)',
    'Basketball',
    'Brainstorming & soul-searching',
    'Quality time with close friends and family',
  ],
  languages: [
    { name: 'English', level: 'Fluent / Advanced' },
    { name: 'Amharic', level: 'Intermediate speaking, fluent understanding, learning literacy' },
    { name: 'Spanish', level: 'Conversational (paused)' },
    { name: 'Swedish', level: 'Beginner (casual learning)' },
  ],
}

export default function PersonalPage() {
  const [currentJournalPage, setCurrentJournalPage] = useState(0)
  const [currentEra, setCurrentEra] = useState(0)
  const timelineScrollRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const scrollToSection = (sectionId: NavSection) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const nextJournalPage = () => {
    setCurrentJournalPage((prev) => (prev + 1) % JOURNAL_ENTRIES.length)
  }

  const prevJournalPage = () => {
    setCurrentJournalPage((prev) => (prev - 1 + JOURNAL_ENTRIES.length) % JOURNAL_ENTRIES.length)
  }

  const nextEra = () => {
    if (currentEra < TIMELINE_ERAS.length - 1) {
      setCurrentEra((prev) => prev + 1)
      scrollToEra(currentEra + 1)
    }
  }

  const prevEra = () => {
    if (currentEra > 0) {
      setCurrentEra((prev) => prev - 1)
      scrollToEra(currentEra - 1)
    }
  }

  const scrollToEra = (index: number) => {
    if (timelineScrollRef.current) {
      const panel = timelineScrollRef.current.children[index] as HTMLElement
      if (panel) {
        const container = timelineScrollRef.current
        const panelLeft = panel.offsetLeft
        const panelWidth = panel.offsetWidth
        const containerWidth = container.clientWidth
        const scrollPosition = panelLeft - (containerWidth / 2) + (panelWidth / 2)
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (timelineScrollRef.current) {
        const scrollLeft = timelineScrollRef.current.scrollLeft
        const containerWidth = timelineScrollRef.current.clientWidth
        const gap = 24
        const panelWidth = containerWidth * 0.9 + gap
        
        const newEra = Math.min(
          Math.round(scrollLeft / panelWidth),
          TIMELINE_ERAS.length - 1
        )
        
        if (newEra !== currentEra && newEra >= 0 && newEra < TIMELINE_ERAS.length) {
          setCurrentEra(newEra)
        }
      }
    }

    const scrollContainer = timelineScrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [currentEra])

  const navSections: { id: NavSection; label: string }[] = [
    { id: 'timeline', label: 'Timeline' },
    { id: 'journal', label: 'Journal' },
    { id: 'notes', label: 'Notes' },
    { id: 'media', label: 'Media' },
    { id: 'languages', label: 'Languages' },
    { id: 'interests', label: 'Interests' },
  ]

  const [activeNavSection, setActiveNavSection] = useState<NavSection | null>(null)

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navSections.map(s => s.id)
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sectionRefs.current[sections[i]]
        if (element) {
          const offsetTop = element.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveNavSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main 
      className="min-h-screen"
      style={{ backgroundColor: RAW_COLORS.bg.primary }}
    >
      {/* OS-style Top Bar */}
      <header 
        className="sticky top-0 z-50 px-6 py-3"
        style={{ 
          backgroundColor: RAW_COLORS.bg.topBar,
          borderBottomColor: RAW_COLORS.border.divider,
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          {/* Left Side - Identity */}
          <div className="flex items-center gap-6 font-mono" style={{ color: RAW_COLORS.text.secondary }}>
            <span style={{ color: RAW_COLORS.text.primary }}>mir.raw</span>
            <span style={{ color: RAW_COLORS.text.tertiary }}>—</span>
            <span>Personal Logs</span>
            <span style={{ color: RAW_COLORS.text.tertiary }}>|</span>
            <span>Mode: <span style={{ color: RAW_COLORS.accent.blue }}>INSPECTION</span></span>
            <span style={{ color: RAW_COLORS.text.tertiary }}>|</span>
            <span>Context: Personal</span>
          </div>

          {/* Right Side - Section Navigation + Exit */}
          <nav className="flex items-center gap-4">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-xs font-mono transition-all relative"
                style={{ 
                  color: activeNavSection === section.id 
                    ? RAW_COLORS.text.primary 
                    : RAW_COLORS.text.tertiary,
                  transitionDuration: '150ms',
                  transitionTimingFunction: 'ease-out',
                }}
                onMouseEnter={(e) => {
                  if (activeNavSection !== section.id) {
                    e.currentTarget.style.color = RAW_COLORS.text.secondary
                    e.currentTarget.style.textDecoration = 'underline'
                    e.currentTarget.style.textUnderlineOffset = '2px'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeNavSection !== section.id) {
                    e.currentTarget.style.color = RAW_COLORS.text.tertiary
                    e.currentTarget.style.textDecoration = 'none'
                  }
                }}
              >
                {section.label}
                {activeNavSection === section.id && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ 
                      backgroundColor: RAW_COLORS.accent.blue,
                    }}
                  />
                )}
              </button>
            ))}
            <span style={{ color: RAW_COLORS.text.tertiary }}>|</span>
            <Link 
              href="/"
              className="font-mono text-xs transition-colors"
              style={{ color: RAW_COLORS.text.secondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = RAW_COLORS.text.primary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = RAW_COLORS.text.secondary
              }}
            >
              {'< exit'}
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-1">
        {/* Content Sections - Monolithic Document */}
        <div>
          {/* Hero Section */}
          <section className="pt-8 pb-0">
            <div 
              className="rounded-lg p-8 md:p-10 shadow-sm"
              style={{
                backgroundColor: RAW_COLORS.bg.panel,
                borderColor: RAW_COLORS.border.default,
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div 
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden transition-all"
                  style={{ 
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: RAW_COLORS.border.default,
                    backgroundColor: RAW_COLORS.bg.surface,
                    transitionDuration: '150ms',
                    transitionTimingFunction: 'ease-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = RAW_COLORS.border.soft
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = RAW_COLORS.border.default
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Image
                    src="/images/personal/profile.jpg"
                    alt="Teamir Teshome"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Identity Block */}
              <div className="space-y-4 flex-1">
                <div className="font-mono space-y-3" style={{ color: RAW_COLORS.text.primary }}>
                  <div className="text-2xl md:text-3xl font-semibold">Teamir Teshome</div>
                  <div className="text-base leading-relaxed max-w-md" style={{ color: RAW_COLORS.text.secondary }}>
                    Greetings. This page is to get to know me more personally.
                    <br />
                    If you're only looking to know about my technical capabilities, please visit{' '}
                    <Link 
                      href="/professional"
                      className="underline transition-colors"
                      style={{ color: RAW_COLORS.accent.blue }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = RAW_COLORS.accent.blueDark
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = RAW_COLORS.accent.blue
                      }}
                    >
                      mir.exe
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section
            ref={(el) => {
              sectionRefs.current['timeline'] = el
            }}
            className="scroll-mt-8 pt-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-lg font-mono"
                style={{ color: RAW_COLORS.text.primary }}
              >
                Timeline
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={prevEra}
                  disabled={currentEra === 0}
                  className="px-3 py-1.5 text-xs font-mono transition-colors disabled:opacity-30"
                  style={{
                    color: RAW_COLORS.text.secondary,
                    backgroundColor: RAW_COLORS.bg.panel,
                    borderColor: RAW_COLORS.border.default,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.color = RAW_COLORS.accent.blue
                      e.currentTarget.style.borderColor = RAW_COLORS.accent.blue
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = RAW_COLORS.text.secondary
                    e.currentTarget.style.borderColor = RAW_COLORS.border.default
                  }}
                >
                  ← Previous
                </button>
                <span 
                  className="text-xs font-mono"
                  style={{ color: RAW_COLORS.text.tertiary }}
                >
                  {currentEra + 1} / {TIMELINE_ERAS.length}
                </span>
                <button
                  onClick={nextEra}
                  disabled={currentEra === TIMELINE_ERAS.length - 1}
                  className="px-3 py-1.5 text-xs font-mono transition-colors disabled:opacity-30"
                  style={{
                    color: RAW_COLORS.text.secondary,
                    backgroundColor: RAW_COLORS.bg.panel,
                    borderColor: RAW_COLORS.border.default,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.color = RAW_COLORS.accent.blue
                      e.currentTarget.style.borderColor = RAW_COLORS.accent.blue
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = RAW_COLORS.text.secondary
                    e.currentTarget.style.borderColor = RAW_COLORS.border.default
                  }}
                >
                  Next →
                </button>
              </div>
            </div>

              <div
                ref={timelineScrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${RAW_COLORS.border.default} ${RAW_COLORS.bg.primary}`,
                }}
              >
                {TIMELINE_ERAS.map((era, index) => {
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full md:w-[90%] lg:w-[80%] snap-center"
                    >
                      <div
                        className="rounded-lg p-8 md:p-10 min-h-[500px] flex flex-col shadow-sm transition-all cursor-default"
                        style={{
                          backgroundColor: RAW_COLORS.bg.panel,
                          borderColor: RAW_COLORS.border.default,
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          transitionDuration: '150ms',
                          transitionTimingFunction: 'ease-out',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-1px)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)'
                          e.currentTarget.style.borderColor = RAW_COLORS.border.soft
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)'
                          e.currentTarget.style.borderColor = RAW_COLORS.border.default
                        }}
                      >
                        <div className="mb-6">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span 
                              className="text-xs font-mono"
                              style={{ color: RAW_COLORS.accent.blue }}
                            >
                              {era.year}
                            </span>
                            <span 
                              className="text-xs font-mono"
                              style={{ color: RAW_COLORS.text.tertiary }}
                            >
                              ·
                            </span>
                            <span 
                              className="text-xs font-mono"
                              style={{ color: RAW_COLORS.text.tertiary }}
                            >
                              {era.age}
                            </span>
                          </div>
                        </div>

                        <h3 
                          className="text-3xl md:text-4xl font-mono mb-8 transition-opacity"
                          style={{ 
                            color: RAW_COLORS.text.primary,
                            opacity: 0.95,
                            transitionDuration: '150ms',
                            transitionTimingFunction: 'ease-out',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '1'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '0.95'
                          }}
                        >
                          {era.eraTitle}
                        </h3>

                        <div className="mb-8 flex-1">
                          <div className="flex flex-wrap gap-2">
                            {era.obsessions.map((obsession, obsIdx) => (
                              <span
                                key={obsIdx}
                                className="text-sm px-3 py-1.5 rounded font-mono transition-all cursor-default"
                                style={{
                                  backgroundColor: RAW_COLORS.bg.surface,
                                  borderColor: RAW_COLORS.border.default,
                                  borderWidth: '1px',
                                  borderStyle: 'solid',
                                  color: RAW_COLORS.text.secondary,
                                  transitionDuration: '120ms',
                                  transitionTimingFunction: 'ease-out',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = RAW_COLORS.bg.panel
                                  e.currentTarget.style.borderColor = RAW_COLORS.border.soft
                                  e.currentTarget.style.color = RAW_COLORS.text.primary
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = RAW_COLORS.bg.surface
                                  e.currentTarget.style.borderColor = RAW_COLORS.border.default
                                  e.currentTarget.style.color = RAW_COLORS.text.secondary
                                }}
                              >
                                {obsession}
                              </span>
                            ))}
                          </div>
                        </div>

                        {era.images && era.images.length > 0 && (
                          <div className="grid grid-cols-3 gap-4 mt-auto">
                            {era.images.map((image, imgIdx) => (
                              <div
                                key={imgIdx}
                                className="relative aspect-square rounded-lg overflow-hidden transition-all"
                                style={{
                                  borderColor: RAW_COLORS.border.default,
                                  borderWidth: '1px',
                                  borderStyle: 'solid',
                                  transitionDuration: '150ms',
                                  transitionTimingFunction: 'ease-out',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.borderColor = RAW_COLORS.border.soft
                                  const img = e.currentTarget.querySelector('img')
                                  if (img) {
                                    img.style.filter = 'contrast(1.05) brightness(1.02)'
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.borderColor = RAW_COLORS.border.default
                                  const img = e.currentTarget.querySelector('img')
                                  if (img) {
                                    img.style.filter = 'contrast(1) brightness(1)'
                                  }
                                }}
                              >
                                <Image
                                  src={image}
                                  alt={`${era.eraTitle} ${imgIdx + 1}`}
                                  fill
                                  className="object-cover transition-all"
                                  style={{
                                    transitionDuration: '150ms',
                                    transitionTimingFunction: 'ease-out',
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
          </section>

          {/* Journal Section */}
          <section
            ref={(el) => {
              sectionRefs.current['journal'] = el
            }}
            className="scroll-mt-8 pt-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-lg font-mono"
                style={{ color: RAW_COLORS.text.primary }}
              >
                Journal
              </h2>
              <div className="flex items-center gap-4">
                  <button
                    onClick={prevJournalPage}
                    className="px-3 py-1.5 text-sm font-mono transition-colors"
                    style={{
                      color: RAW_COLORS.text.secondary,
                      backgroundColor: RAW_COLORS.bg.panel,
                      borderColor: RAW_COLORS.border.default,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = RAW_COLORS.accent.blue
                      e.currentTarget.style.borderColor = RAW_COLORS.accent.blue
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = RAW_COLORS.text.secondary
                      e.currentTarget.style.borderColor = RAW_COLORS.border.default
                    }}
                  >
                    ← Previous
                  </button>
                  <span 
                    className="text-xs font-mono"
                    style={{ color: RAW_COLORS.text.tertiary }}
                  >
                    {currentJournalPage + 1} / {JOURNAL_ENTRIES.length}
                  </span>
                  <button
                    onClick={nextJournalPage}
                    className="px-3 py-1.5 text-sm font-mono transition-colors"
                    style={{
                      color: RAW_COLORS.text.secondary,
                      backgroundColor: RAW_COLORS.bg.panel,
                      borderColor: RAW_COLORS.border.default,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = RAW_COLORS.accent.blue
                      e.currentTarget.style.borderColor = RAW_COLORS.accent.blue
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = RAW_COLORS.text.secondary
                      e.currentTarget.style.borderColor = RAW_COLORS.border.default
                    }}
                  >
                    Next →
                  </button>
              </div>
            </div>

              <div
                className="rounded-lg p-8 md:p-10 min-h-[400px] shadow-sm transition-all cursor-default"
                style={{
                  backgroundColor: RAW_COLORS.bg.panel,
                  borderColor: RAW_COLORS.border.default,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  transitionDuration: '150ms',
                  transitionTimingFunction: 'ease-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)'
                  e.currentTarget.style.borderColor = RAW_COLORS.border.soft
                  e.currentTarget.style.borderRightColor = RAW_COLORS.accent.blue
                  e.currentTarget.style.borderRightWidth = '2px'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)'
                  e.currentTarget.style.borderColor = RAW_COLORS.border.default
                  e.currentTarget.style.borderRightWidth = '1px'
                }}
              >
                <h3 
                  className="text-xl font-mono mb-6"
                  style={{ color: RAW_COLORS.text.primary }}
                >
                  {JOURNAL_ENTRIES[currentJournalPage].title}
                </h3>
                <p 
                  className="text-sm leading-relaxed font-mono"
                  style={{ color: RAW_COLORS.text.secondary }}
                >
                  {JOURNAL_ENTRIES[currentJournalPage].content}
                </p>
              </div>
          </section>

          {/* Notes Section */}
          <section
            ref={(el) => {
              sectionRefs.current['notes'] = el
            }}
            className="scroll-mt-8 pt-12"
          >
            <h2 
              className="text-lg font-mono mb-6"
              style={{ color: RAW_COLORS.text.primary }}
            >
              Notes
            </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {PERSONAL_NOTES.map((note, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-6 shadow-sm transition-all cursor-default"
                    style={{
                      backgroundColor: RAW_COLORS.bg.panel,
                      borderColor: RAW_COLORS.border.default,
                      borderLeftColor: RAW_COLORS.accent.blue,
                      borderWidth: '1px',
                      borderLeftWidth: '3px',
                      borderStyle: 'solid',
                      transitionDuration: '150ms',
                      transitionTimingFunction: 'ease-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)'
                      e.currentTarget.style.borderLeftWidth = '4px'
                      e.currentTarget.style.borderLeftColor = RAW_COLORS.accent.blueDark
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)'
                      e.currentTarget.style.borderLeftWidth = '3px'
                      e.currentTarget.style.borderLeftColor = RAW_COLORS.accent.blue
                    }}
                  >
                    <p 
                      className="text-sm leading-relaxed font-mono"
                      style={{ color: RAW_COLORS.text.secondary }}
                    >
                      {note}
                    </p>
                  </div>
                ))}
              </div>
          </section>

          {/* Media Section */}
          <section
            ref={(el) => {
              sectionRefs.current['media'] = el
            }}
            className="scroll-mt-8 pt-12"
          >
            <h2 
              className="text-lg font-mono mb-6"
              style={{ color: RAW_COLORS.text.primary }}
            >
              Media
            </h2>
            <div className="rounded-lg p-8 shadow-sm" style={{ backgroundColor: RAW_COLORS.bg.panel, borderColor: RAW_COLORS.border.default, borderWidth: '1px', borderStyle: 'solid' }}>
              <p className="text-sm font-mono" style={{ color: RAW_COLORS.text.tertiary }}>Media gallery coming soon</p>
            </div>
          </section>

          {/* Languages Section */}
          <section
            ref={(el) => {
              sectionRefs.current['languages'] = el
            }}
            className="scroll-mt-8 pt-12"
          >
            <h2 
              className="text-lg font-mono mb-6"
              style={{ color: RAW_COLORS.text.primary }}
            >
              Languages
            </h2>
              <div 
                className="rounded-lg p-6 shadow-sm transition-all"
                style={{ 
                  backgroundColor: RAW_COLORS.bg.panel, 
                  borderColor: RAW_COLORS.border.default, 
                  borderWidth: '1px', 
                  borderStyle: 'solid',
                  transitionDuration: '150ms',
                  transitionTimingFunction: 'ease-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div className="space-y-4">
                  {METADATA.languages.map((lang, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start justify-between py-3 border-b transition-colors"
                      style={{ 
                        borderBottomColor: RAW_COLORS.border.divider,
                        transitionDuration: '120ms',
                        transitionTimingFunction: 'ease-out',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor = RAW_COLORS.border.soft
                        e.currentTarget.style.backgroundColor = RAW_COLORS.bg.surface
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = RAW_COLORS.border.divider
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      <span className="text-sm font-mono" style={{ color: RAW_COLORS.text.primary }}>{lang.name}</span>
                      <span className="text-xs font-mono" style={{ color: RAW_COLORS.text.tertiary }}>{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
          </section>

          {/* Interests Section */}
          <section
            ref={(el) => {
              sectionRefs.current['interests'] = el
            }}
            className="scroll-mt-8 pt-12"
          >
            <h2 
              className="text-lg font-mono mb-6"
              style={{ color: RAW_COLORS.text.primary }}
            >
              Interests
            </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  className="rounded-lg p-6 shadow-sm transition-all"
                  style={{ 
                    backgroundColor: RAW_COLORS.bg.panel, 
                    borderColor: RAW_COLORS.border.default, 
                    borderWidth: '1px', 
                    borderStyle: 'solid',
                    transitionDuration: '150ms',
                    transitionTimingFunction: 'ease-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <h3 className="text-sm font-mono mb-4" style={{ color: RAW_COLORS.text.primary }}>Music</h3>
                  <div className="space-y-4">
                    {Object.entries(METADATA.music).map(([genre, artists]) => (
                      <div key={genre}>
                        <h4 className="text-xs font-mono mb-2" style={{ color: RAW_COLORS.accent.blue }}>{genre}</h4>
                        <div className="flex flex-wrap gap-2">
                          {artists.map((artist, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded font-mono transition-all cursor-default"
                              style={{
                                backgroundColor: RAW_COLORS.bg.surface,
                                borderColor: RAW_COLORS.border.default,
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                color: RAW_COLORS.text.secondary,
                                transitionDuration: '120ms',
                                transitionTimingFunction: 'ease-out',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = RAW_COLORS.bg.panel
                                e.currentTarget.style.borderColor = RAW_COLORS.border.soft
                                e.currentTarget.style.color = RAW_COLORS.text.primary
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = RAW_COLORS.bg.surface
                                e.currentTarget.style.borderColor = RAW_COLORS.border.default
                                e.currentTarget.style.color = RAW_COLORS.text.secondary
                              }}
                            >
                              {artist}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div 
                  className="rounded-lg p-6 shadow-sm transition-all"
                  style={{ 
                    backgroundColor: RAW_COLORS.bg.panel, 
                    borderColor: RAW_COLORS.border.default, 
                    borderWidth: '1px', 
                    borderStyle: 'solid',
                    transitionDuration: '150ms',
                    transitionTimingFunction: 'ease-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <h3 className="text-sm font-mono mb-4" style={{ color: RAW_COLORS.text.primary }}>Hobbies</h3>
                  <ul className="space-y-2">
                    {METADATA.hobbies.map((hobby, idx) => (
                      <li key={idx} className="text-sm font-mono" style={{ color: RAW_COLORS.text.secondary }}>
                        • {hobby}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          </section>
        </div>
      </div>
    </main>
  )
}
