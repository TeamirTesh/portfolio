'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { THEME } from '@/lib/theme'
import { TRICOLOR_ACCENT } from '@/lib/motion'

const RAW_COLORS = THEME.colors.raw

// Navigation sections
type NavSection = 'timeline' | 'journal' | 'notes' | 'media' | 'languages' | 'interests'

// Hoverable card component with tricolor animation
function HoverableCard({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  const controls = useAnimation()
  
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ y: 0, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)', borderColor: RAW_COLORS.border.default }}
      animate={controls}
      whileHover={{ y: -1 }}
      onHoverStart={async () => {
        await controls.start({
          boxShadow: '0 4px 12px rgba(31, 95, 59, 0.15)',
          borderColor: TRICOLOR_ACCENT.colors.green,
          transition: { duration: 0.1 }
        })
        await controls.start({
          boxShadow: '0 4px 12px rgba(200, 168, 74, 0.15)',
          borderColor: TRICOLOR_ACCENT.colors.yellow,
          transition: { duration: 0.1 }
        })
        await controls.start({
          boxShadow: '0 4px 12px rgba(122, 42, 42, 0.15)',
          borderColor: TRICOLOR_ACCENT.colors.red,
          transition: { duration: 0.1 }
        })
        await controls.start({
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          borderColor: RAW_COLORS.border.soft,
          transition: { duration: 0.1 }
        })
      }}
      onHoverEnd={() => {
        controls.start({
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          borderColor: RAW_COLORS.border.default,
          transition: { duration: 0.2 }
        })
      }}
    >
      {children}
    </motion.div>
  )
}

// Era-based timeline entries
const TIMELINE_ERAS = [
  {
    year: '2006',
    age: 'Age 0',
    eraTitle: 'Beginning',
    description: 'Born in Atlanta, GA',
    obsessions: ['Family', 'Discovery', 'Roots'],
    images: [
      '/images/personal/age0_1.jpg',
      '/images/personal/age0_2.jpg',
      '/images/personal/age0_3.jpg',
    ],
    bgTint: 0,
  },
  {
    year: '2006–2012',
    age: 'Age 0–6',
    eraTitle: 'Ethiopian Years',
    description: 'Spent 6 beautiful years in Addis Ababa, Ethiopia',
    obsessions: ['Culture', 'Language', 'Connection', 'Home'],
    images: [
      '/images/personal/age0to6_1.JPG',
      '/images/personal/age0to6_2.jpg',
      '/images/personal/age0to6_3.jpg',
    ],
    bgTint: 1,
  },
  {
    year: '2012–2018',
    age: 'Age 6–12',
    eraTitle: 'Return & Adaptation',
    description: 'Returned to Atlanta, GA.\nAssimilated, made plenty of friends, adapted to my new life.',
    obsessions: ['Identity', 'Belonging', 'Learning', 'Transition'],
    images: [
      '/images/personal/age6to12_1.JPG',
      '/images/personal/age6to12_2.JPG',
      '/images/personal/age6to12_3.jpg',
    ],
    bgTint: 0,
  },
  {
    year: '2018–2022',
    age: 'Age 12–16',
    eraTitle: 'The Gaming Era',
    description: 'Gamed HARD.\nCall of Duty, Fortnite, 2k, GTA, Overwatch, Rocket League, Brawlhalla',
    obsessions: ['COD', 'Minecraft', 'GTA', '2K', 'Overwatch', 'Brawlhalla', 'Competition'],
    images: [
      '/images/personal/age12to16_1.jpg',
      '/images/personal/Age12to16_2.jpg',
      '/images/personal/age12to16_3.jpg',
    ],
    bgTint: 2,
  },
  {
    year: '2022–2024',
    age: 'Age 16+',
    eraTitle: 'Independence',
    description: 'Re-focused energy into self cultivation.\nSaved up and bought my first car cash.\nGym, Nutrition, and Money became the center of my life.',
    obsessions: ['Gym', 'Nutrition', 'Work Ethic', 'Financial Responsibility'],
    images: [
      '/images/personal/age16plus_1.jpg',
      '/images/personal/age16plus_2.jpg',
      '/images/personal/age16plus_3.jpg',
    ],
    bgTint: 0,
  },
  {
    year: '2024',
    age: 'Age 18',
    eraTitle: 'Graduation',
    description: 'Graduated from Dekalb Early College Academy with honors and 60 Early College credits from Georgia State University.',
    obsessions: ['Achievement', 'Early College', '60 Credits', 'Momentum'],
    images: [
      '/images/personal/age18_1.jpg',
      '/images/personal/age18_2.jpg',
      '/images/personal/age18_3.jpg',
    ],
    bgTint: 1,
  },
  {
    year: '2025',
    age: 'Age 19',
    eraTitle: 'Re-definition',
    description: 'Re-defined "Self Cultivation".\nGod, Family, and my Career now being the centers of my life.\nMy life looks like: Daily Gym, Projects, Networking+Applications, Family time.\nChurch Sunday',
    obsessions: ['Computer Science', 'Projects', 'Internships', 'Career Development', 'Building'],
    images: [
      '/images/personal/age19_1.jpg',
      '/images/personal/age19_2.jpg',
      '/images/personal/age19_3.jpg',
    ],
    bgTint: 1,
  },
  {
    year: '2026',
    age: 'Age 20',
    eraTitle: 'Next Chapter',
    description: 'Graduate with B.S in Computer Science from Georgia State University.\nBegin OMSCS in Computer Science w/ ML Specialization.\nBegin New Grad Software Engineering Role',
    obsessions: ['Graduation', 'Reflection', 'Transition', 'Next Chapter'],
    images: [
      '/images/personal/age20_1.jpg',
      '/images/personal/age20_2.jpg',
      '/images/personal/age20_3.jpg',
    ],
    bgTint: 0,
  },
]

// Journal entries
const JOURNAL_ENTRIES = [
  {
    title: 'Autonomy',
    content: `Life is not black and white. It's almost completely gray. Acknowledging nuance is important. But sometimes the gray is darker, sometimes it's lighter, and acknowledging that is equally imperative. Just because it is gray, doesn't mean it's anywhere close to an even blend.

That being said, define your morals and political views autonomously with your very own beliefs and logic with respect to the society you live in. Put those morals ahead of any political party or person. Yes, learn and grow, but don't simply shave your values to align with a person or movement.

You should be able to condemn any wrongdoing that comes from anybody on this earth, including yourself and whomever you support. You should be open to hearing facts and evidence that could challenge your claims and beliefs with open arms in the name of truth and growth. You should be able to confidently articulate the logic behind your beliefs and ideologies. Once you've lost this, you've lost autonomy and you've lost your dignity. You no longer stand for anything. Be careful out there!`,
  },
  {
    title: 'Choosing Your Suffering',
    content: `The greatest exhibition of strength is transcending beyond your fleshly desires, actually placing what you truly love and what truly benefits you first, and letting go of what's holding you back in spite of the comfort it may bring you. We are all victims to temptation. We constantly choose convenience, creating a new justification for each repetition until we reach cognitive dissonance. On the flip side, while mistakes are ultimately inevitable, most of us do still feel the weight of the burden we impose on ourselves as it adds on, and eventually seek change. Once the burden outweighs the comfort, we realize we'd benefit from a more sustainable satisfaction. We start to choose the high road. The long way. The quote unquote right way. On this path, the suffering will still exist, but it will be a predictable suffering that precedes a lasting satisfaction. See, no matter what path we walk in life, we are accepting some form of consequence and sacrifice. That being said, it is *generally* not up to me or anybody else to judge what path another person chooses in their life. I would, however, strongly advise you to take into consideration yourself, your future, and those around you who love you and have sacrificed for you when picking your poison. And most importantly, be happy, you get to live.`,
  },
]

// Personal philosophies / notes
const PERSONAL_NOTES = [
  "You can't control what happens on the outside, but you can control what happens on the inside.",
  'An eye for an eye only leavesthe whole world blind.',
  'Generalize your experiences, not your conclusions.',
  "Don't chase butterflies, build your garden.",
  'Discipline is actions taken in the absence of motivation.',
  "The fact that these quotes apply to my situation makes me priveleged. I shall remain grateful."
]

// Media gallery - supports both images and videos
const MEDIA_GALLERY = [
  {
    type: 'video',
    src: '/images/personal/media/Uzi.MOV',
    caption: 'Top of Stone Mountain',
  },
  {
    type: 'video',
    src: '/images/personal/media/Bench215.mp4',
    caption: '215 Bench Press',
  },
  {
    type: 'image',
    src: '/images/personal/media/TorontoBoys.JPG',
    caption: 'Toronto Boys',
  },
  {
    type: 'image',
    src: '/images/personal/media/NYC_Train.JPG',
    caption: 'NYC Subway',
  },
  {
    type: 'video',
    src: '/images/personal/media/Muscle_Ups.mov',
    caption: 'Calm Muscle-Ups',
  },
]

// Album covers
const ALBUM_COVERS = [
    '/images/personal/albums/Beloved.png',
    '/images/personal/albums/SouledOut.png',
    '/images/personal/albums/Bruno_Silk.png',
    '/images/personal/albums/YachinNeger.jpg',
    '/images/personal/albums/TikurSew.jpg',
    '/images/personal/albums/Tegereme.jpg',
  ]

// Personal metadata
const METADATA = {
  music: {
    'R&B / Pop': ['Giveon', 'Jhene Aiko', 'Bruno Mars', 'Mariah The Scientist'],
    'Ethiopian': ['Jah Lude', 'Teddy Afro', 'Abel Mulugeta', 'Dagi D', 'Tibebu Workiye'],
  },
  hobbies: [
    'Quality time with family and close friends',
    'Self cultivation (mind + body)',
    'Weightlifting & martial arts',
    'Career development (projects, resume, internships)',
    'Basketball',
    'Brainstorming & soul-searching',
    'Listening to music',
    'Watching Debates & Debating',
    'Walking and Hiking',
    'Watching mindbending shows and movies',
    'Slapping my brothers'
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
  const isScrollingProgrammatically = useRef(false)
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

  const scrollToEra = (index: number) => {
    if (timelineScrollRef.current && index >= 0 && index < TIMELINE_ERAS.length) {
      isScrollingProgrammatically.current = true
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
        
        // Reset flag after scroll completes
        setTimeout(() => {
          isScrollingProgrammatically.current = false
        }, 500)
      }
    }
  }

  const nextEra = () => {
    if (currentEra < TIMELINE_ERAS.length - 1) {
      const newEra = currentEra + 1
      setCurrentEra(newEra)
      scrollToEra(newEra)
    }
  }

  const prevEra = () => {
    if (currentEra > 0) {
      const newEra = currentEra - 1
      setCurrentEra(newEra)
      scrollToEra(newEra)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // Ignore scroll events during programmatic scrolling
      if (isScrollingProgrammatically.current) {
        return
      }
      
      if (timelineScrollRef.current) {
        const scrollLeft = timelineScrollRef.current.scrollLeft
        const containerWidth = timelineScrollRef.current.clientWidth
        const gap = 24
        
        // Find which panel is most visible
        let closestEra = 0
        let closestDistance = Infinity
        
        for (let i = 0; i < TIMELINE_ERAS.length; i++) {
          const panel = timelineScrollRef.current.children[i] as HTMLElement
          if (panel) {
            const panelLeft = panel.offsetLeft
            const panelWidth = panel.offsetWidth
            const panelCenter = panelLeft + panelWidth / 2
            const containerCenter = scrollLeft + containerWidth / 2
            const distance = Math.abs(panelCenter - containerCenter)
            
            if (distance < closestDistance) {
              closestDistance = distance
              closestEra = i
            }
          }
        }
        
        if (closestEra !== currentEra && closestEra >= 0 && closestEra < TIMELINE_ERAS.length) {
          setCurrentEra(closestEra)
        }
      }
    }

    const scrollContainer = timelineScrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [currentEra])

  const navSections: { id: NavSection; label: string }[] = useMemo(() => [
    { id: 'timeline', label: 'My Story' },
    { id: 'journal', label: 'Journal' },
    { id: 'notes', label: 'Notes' },
    { id: 'media', label: 'Life' },
    { id: 'languages', label: 'Languages' },
    { id: 'interests', label: 'Interests' },
  ], [])

  const [activeNavSection, setActiveNavSection] = useState<NavSection | null>(null)

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
  }, [navSections])

  return (
    <main 
      className="min-h-screen pb-12"
      style={{ backgroundColor: RAW_COLORS.bg.primary }}
    >
      {/* OS-style Top Bar */}
      <motion.header 
        className="sticky top-0 z-50 px-6 py-3"
        style={{ 
          backgroundColor: RAW_COLORS.bg.topBar,
          borderBottomColor: RAW_COLORS.border.divider,
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          {/* Left Side - Identity */}
          <div className="flex items-center gap-6 font-mono" style={{ color: RAW_COLORS.text.secondary }}>
            <span style={{ color: RAW_COLORS.text.primary }}>teamir.raw</span>
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
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-xs font-mono relative"
                style={{ 
                  color: activeNavSection === section.id 
                    ? RAW_COLORS.text.primary 
                    : RAW_COLORS.text.tertiary,
                }}
                whileHover={
                  activeNavSection !== section.id
                    ? {
                        color: [
                          RAW_COLORS.text.secondary,
                          TRICOLOR_ACCENT.colors.green,
                          TRICOLOR_ACCENT.colors.yellow,
                          TRICOLOR_ACCENT.colors.red,
                          RAW_COLORS.text.secondary,
                        ],
                        transition: {
                          duration: 0.4,
                          ease: 'easeInOut',
                          times: [0, 0.25, 0.5, 0.75, 1],
                        },
                      }
                    : {}
                }
              >
                {section.label}
                <AnimatePresence>
                  {activeNavSection === section.id && (
                    <motion.span 
                      className="absolute bottom-0 left-0 right-0 h-px"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: 1,
                        opacity: 1,
                        backgroundColor: [
                          TRICOLOR_ACCENT.colors.green,
                          TRICOLOR_ACCENT.colors.yellow,
                          TRICOLOR_ACCENT.colors.red,
                          RAW_COLORS.accent.blue,
                        ],
                      }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{
                        scaleX: { duration: 0.2 },
                        opacity: { duration: 0.2 },
                        backgroundColor: {
                          duration: 0.5,
                          ease: 'easeInOut',
                          times: [0, 0.33, 0.66, 1],
                        },
                      }}
                    />
                  )}
                </AnimatePresence>
                {activeNavSection !== section.id && (
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-px origin-left"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{
                      scaleX: [0, 1, 1, 0],
                      opacity: [0, 0.8, 0.8, 0],
                      backgroundColor: [
                        TRICOLOR_ACCENT.colors.green,
                        TRICOLOR_ACCENT.colors.green,
                        TRICOLOR_ACCENT.colors.yellow,
                        TRICOLOR_ACCENT.colors.red,
                      ],
                      transition: {
                        duration: 0.4,
                        ease: 'easeInOut',
                        times: [0, 0.33, 0.66, 1],
                      },
                    }}
                  />
                )}
              </motion.button>
            ))}
            <span style={{ color: RAW_COLORS.text.tertiary }}>|</span>
            <motion.div className="relative">
        <Link
          href="/"
                className="font-mono text-xs block"
                style={{ color: RAW_COLORS.text.secondary }}
              >
                <motion.span
                  whileHover={{
                    color: [
                      RAW_COLORS.text.primary,
                      TRICOLOR_ACCENT.colors.green,
                      TRICOLOR_ACCENT.colors.yellow,
                      TRICOLOR_ACCENT.colors.red,
                      RAW_COLORS.text.primary,
                    ],
                    transition: {
                      duration: 0.4,
                      ease: 'easeInOut',
                      times: [0, 0.25, 0.5, 0.75, 1],
                    },
                  }}
                >
                  {'< exit'}
                </motion.span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-px origin-left"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{
                    scaleX: [0, 1, 1, 0],
                    opacity: [0, 0.8, 0.8, 0],
                    backgroundColor: [
                      TRICOLOR_ACCENT.colors.green,
                      TRICOLOR_ACCENT.colors.green,
                      TRICOLOR_ACCENT.colors.yellow,
                      TRICOLOR_ACCENT.colors.red,
                    ],
                    transition: {
                      duration: 0.4,
                      ease: 'easeInOut',
                      times: [0, 0.33, 0.66, 1],
                    },
                  }}
                />
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      <motion.div 
        className="max-w-7xl mx-auto px-6 pt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {/* Content Sections - Monolithic Document */}
        <div>
          {/* Hero Section */}
          <motion.section 
            className="pt-8 pb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <HoverableCard
              className="rounded-lg p-8 md:p-10 shadow-sm cursor-default"
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
                  <motion.div 
                    className="text-2xl md:text-3xl font-semibold"
                    style={{ color: RAW_COLORS.text.primary }}
                    whileHover={{ 
                      color: RAW_COLORS.accent.blue,
                      transition: { duration: 0.2 },
                    }}
                  >
                    Teamir Teshome
                  </motion.div>
                  <div className="text-base leading-relaxed max-w-md" style={{ color: RAW_COLORS.text.secondary }}>
                    Greetings! This page is to get to know me more personally.
                    <br />
                    <br />
                    If you&apos;re just looking to learn about my technical background, please visit{' '}
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
                      teamir.exe
                    </Link>
                  </div>
                </div>
                </div>
              </div>
            </HoverableCard>
          </motion.section>

          {/* Timeline Section */}
          <motion.section
            ref={(el) => {
              sectionRefs.current['timeline'] = el
            }}
            className="scroll-mt-8 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.h2 
                className="text-lg font-mono"
                style={{ color: RAW_COLORS.text.primary }}
                whileHover={{ 
                  color: RAW_COLORS.accent.blue,
                  transition: { duration: 0.2 },
                }}
              >
                My Story
              </motion.h2>
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={prevEra}
                  disabled={currentEra === 0}
                  className="px-3 py-1.5 text-xs font-mono disabled:opacity-30"
                  style={{
                    color: RAW_COLORS.text.secondary,
                    backgroundColor: RAW_COLORS.bg.panel,
                    borderColor: RAW_COLORS.border.default,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                  whileHover={
                    currentEra !== 0
                      ? {
                          color: [
                            RAW_COLORS.text.secondary,
                            TRICOLOR_ACCENT.colors.green,
                            TRICOLOR_ACCENT.colors.yellow,
                            TRICOLOR_ACCENT.colors.red,
                            RAW_COLORS.text.secondary,
                          ],
                          borderColor: [
                            RAW_COLORS.border.default,
                            TRICOLOR_ACCENT.colors.green,
                            TRICOLOR_ACCENT.colors.yellow,
                            TRICOLOR_ACCENT.colors.red,
                            RAW_COLORS.border.default,
                          ],
                          transition: {
                            duration: 0.4,
                            ease: 'easeInOut',
                            times: [0, 0.25, 0.5, 0.75, 1],
                          },
                        }
                      : {}
                  }
                >
                  ← Previous
                </motion.button>
                <span 
                  className="text-xs font-mono"
                  style={{ color: RAW_COLORS.text.tertiary }}
                >
                  {currentEra + 1} / {TIMELINE_ERAS.length}
                </span>
                <motion.button
                  onClick={nextEra}
                  disabled={currentEra === TIMELINE_ERAS.length - 1}
                  className="px-3 py-1.5 text-xs font-mono disabled:opacity-30"
                  style={{
                    color: RAW_COLORS.text.secondary,
                    backgroundColor: RAW_COLORS.bg.panel,
                    borderColor: RAW_COLORS.border.default,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                  whileHover={
                    currentEra !== TIMELINE_ERAS.length - 1
                      ? {
                          color: [
                            RAW_COLORS.text.secondary,
                            TRICOLOR_ACCENT.colors.green,
                            TRICOLOR_ACCENT.colors.yellow,
                            TRICOLOR_ACCENT.colors.red,
                            RAW_COLORS.text.secondary,
                          ],
                          borderColor: [
                            RAW_COLORS.border.default,
                            TRICOLOR_ACCENT.colors.green,
                            TRICOLOR_ACCENT.colors.yellow,
                            TRICOLOR_ACCENT.colors.red,
                            RAW_COLORS.border.default,
                          ],
                          transition: {
                            duration: 0.4,
                            ease: 'easeInOut',
                            times: [0, 0.25, 0.5, 0.75, 1],
                          },
                        }
                      : {}
                  }
                >
                  Next →
                </motion.button>
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
                      className="flex-shrink-0 w-full md:w-[70%] lg:w-[60%] snap-center"
                    >
                      <HoverableCard
                        className="rounded-lg p-6 md:p-7 h-[475px] flex flex-col shadow-sm cursor-default"
                        style={{
                          backgroundColor: RAW_COLORS.bg.panel,
                          borderColor: RAW_COLORS.border.default,
                          borderWidth: '1px',
                          borderStyle: 'solid',
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
                          className="text-2xl md:text-3xl font-mono mb-4 transition-opacity"
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

                        <div className="mb-2">
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

                        {era.description && (
                          <p 
                            className="mb-3 text-sm leading-relaxed whitespace-pre-line"
                            style={{ 
                              color: RAW_COLORS.text.secondary,
                            }}
                          >
                            {era.description}
                          </p>
                        )}

                        {era.images && era.images.length > 0 && (
                          <div className="grid gap-2 mt-auto max-w-[80%] grid-cols-3">
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
                                <img
                                  src={image}
                                  alt={`${era.eraTitle} ${imgIdx + 1}`}
                                  className="absolute inset-0 w-full h-full object-cover transition-all"
                                  style={{
                                    transitionDuration: '150ms',
                                    transitionTimingFunction: 'ease-out',
                                    transform: 'none',
                                  }}
                                  onError={(e) => {
                                    console.error('Image failed to load:', image)
                                    e.currentTarget.style.display = 'none'
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </HoverableCard>
                    </div>
                  )
                })}
              </div>
          </motion.section>

          {/* Journal Section */}
          <motion.section
            ref={(el) => {
              sectionRefs.current['journal'] = el
            }}
            className="scroll-mt-8 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.h2 
                className="text-lg font-mono"
                style={{ color: RAW_COLORS.text.primary }}
                whileHover={{ 
                  color: RAW_COLORS.accent.blue,
                  transition: { duration: 0.2 },
                }}
              >
                Journal
              </motion.h2>
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

              <HoverableCard
                className="rounded-lg p-8 md:p-10 min-h-[400px] shadow-sm cursor-default"
                style={{
                  backgroundColor: RAW_COLORS.bg.panel,
                  borderColor: RAW_COLORS.border.default,
                  borderWidth: '1px',
                  borderStyle: 'solid',
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
              </HoverableCard>
          </motion.section>

          {/* Notes Section */}
          <motion.section
            ref={(el) => {
              sectionRefs.current['notes'] = el
            }}
            className="scroll-mt-8 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          >
            <motion.h2 
              className="text-lg font-mono mb-6"
              style={{ color: RAW_COLORS.text.primary }}
              whileHover={{ 
                color: RAW_COLORS.accent.blue,
                transition: { duration: 0.2 },
              }}
            >
              Notes
            </motion.h2>
              <div className="grid md:grid-cols-2 gap-4">
                {PERSONAL_NOTES.map((note, index) => {
                  // Determine row and color based on index
                  // Top row (0,1): green, Middle row (2,3): yellow, Bottom row (4,5): red
                  let borderColor: string = TRICOLOR_ACCENT.colors.green
                  if (index >= 2 && index <= 3) {
                    borderColor = TRICOLOR_ACCENT.colors.yellow
                  } else if (index >= 4) {
                    borderColor = TRICOLOR_ACCENT.colors.red
                  }
                  
                  return (
                    <div
                      key={index}
                      className="rounded-lg p-6 shadow-sm transition-all cursor-default"
                      style={{
                        backgroundColor: RAW_COLORS.bg.panel,
                        borderColor: RAW_COLORS.border.default,
                        borderLeftColor: borderColor,
                        borderWidth: '1px',
                        borderLeftWidth: '3px',
                        borderStyle: 'solid',
                        transitionDuration: '150ms',
                        transitionTimingFunction: 'ease-out',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)'
                        e.currentTarget.style.borderLeftWidth = '4px'
                        e.currentTarget.style.borderLeftColor = borderColor
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)'
                        e.currentTarget.style.borderLeftWidth = '3px'
                        e.currentTarget.style.borderLeftColor = borderColor
                      }}
                    >
                    <p 
                      className="text-sm leading-relaxed font-mono"
                      style={{ color: RAW_COLORS.text.secondary }}
                    >
                      {note}
                    </p>
                  </div>
                  )
                })}
              </div>
          </motion.section>

          {/* Media Section */}
          <motion.section
            ref={(el) => {
              sectionRefs.current['media'] = el
            }}
            className="scroll-mt-8 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          >
            <motion.h2 
              className="text-lg font-mono mb-6"
              style={{ color: RAW_COLORS.text.primary }}
              whileHover={{ 
                color: RAW_COLORS.accent.blue,
                transition: { duration: 0.2 },
              }}
            >
              Life
            </motion.h2>
            <HoverableCard
              className="rounded-lg px-6 pt-6 pb-0 shadow-sm overflow-hidden cursor-default"
              style={{ 
                backgroundColor: RAW_COLORS.bg.panel, 
                borderColor: RAW_COLORS.border.default, 
                borderWidth: '1px', 
                borderStyle: 'solid',
              }}
            >
              {MEDIA_GALLERY.length > 0 ? (
                <div className="flex" style={{ gap: 0, maxWidth: '66.67%', marginBottom: '-10%' }}>
                  {MEDIA_GALLERY.map((item, index) => {
                    // Check if this is the first of two consecutive images
                    const isFirstImage = item.type === 'image' && index < MEDIA_GALLERY.length - 1 && MEDIA_GALLERY[index + 1].type === 'image'
                    const isSecondImage = item.type === 'image' && index > 0 && MEDIA_GALLERY[index - 1].type === 'image'
                    
                    // Skip rendering the second image, it will be in the stack
                    if (isSecondImage) return null
                    
                    return (
                      <div key={index} style={{ 
                        width: '50%',
                        flexShrink: 0,
                        marginRight: index < MEDIA_GALLERY.length - 1 ? '-15%' : '0',
                      }}>
                        {isFirstImage ? (
                          // Vertical stack for the two images
                          <div className="flex flex-col" style={{ gap: 0 }}>
                            {[item, MEDIA_GALLERY[index + 1]].map((imgItem, imgIndex) => (
                              <div key={`img-${imgIndex}`} style={{ marginBottom: imgIndex === 0 ? '-35%' : '0' }}>
                                <div
                                  className="rounded-lg overflow-hidden shadow-sm transition-all"
                                  style={{
                                    backgroundColor: RAW_COLORS.bg.surface,
                                    borderColor: RAW_COLORS.border.default,
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    transitionDuration: '150ms',
                                    transitionTimingFunction: 'ease-out',
                                    transform: 'scale(0.65)',
                                    transformOrigin: 'top left',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(0.65) translateY(-2px)'
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)'
                                    e.currentTarget.style.borderColor = RAW_COLORS.border.soft
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(0.65) translateY(0)'
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)'
                                    e.currentTarget.style.borderColor = RAW_COLORS.border.default
                                  }}
                                >
                                  <div className="relative aspect-square w-full">
                                    <Image
                                      src={imgItem.src}
                                      alt={imgItem.caption || `Media ${index + imgIndex}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  {imgItem.caption && (
                                    <div className="px-3 py-2">
                                      <p 
                                        className="text-sm font-mono"
                                        style={{ color: RAW_COLORS.text.secondary }}
                                      >
                                        {imgItem.caption}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Regular item (video)
                          <div
                            className="rounded-lg overflow-hidden shadow-sm transition-all"
                            style={{
                              backgroundColor: RAW_COLORS.bg.surface,
                              borderColor: RAW_COLORS.border.default,
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              transitionDuration: '150ms',
                              transitionTimingFunction: 'ease-out',
                              transform: 'scale(0.65)',
                              transformOrigin: 'top left',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(0.65) translateY(-2px)'
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)'
                              e.currentTarget.style.borderColor = RAW_COLORS.border.soft
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(0.65) translateY(0)'
                              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)'
                              e.currentTarget.style.borderColor = RAW_COLORS.border.default
                            }}
                          >
                            <div className="relative aspect-[9/16] w-full">
                              <video
                                src={item.src}
                                className="w-full h-full object-cover"
                                controls
                                muted
                              />
                            </div>
                            {item.caption && (
                              <div className="px-3 py-2">
                                <p 
                                  className="text-sm font-mono"
                                  style={{ color: RAW_COLORS.text.secondary }}
                                >
                                  {item.caption}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm font-mono" style={{ color: RAW_COLORS.text.tertiary }}>Media gallery coming soon</p>
              )}
            </HoverableCard>
          </motion.section>

          {/* Languages Section */}
          <motion.section
            ref={(el) => {
              sectionRefs.current['languages'] = el
            }}
            className="scroll-mt-8 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          >
            <motion.h2 
              className="text-lg font-mono mb-6"
              style={{ color: RAW_COLORS.text.primary }}
              whileHover={{ 
                color: RAW_COLORS.accent.blue,
                transition: { duration: 0.2 },
              }}
            >
              Languages
            </motion.h2>
              <HoverableCard
                className="rounded-lg p-6 shadow-sm cursor-default"
                style={{ 
                  backgroundColor: RAW_COLORS.bg.panel, 
                  borderColor: RAW_COLORS.border.default, 
                  borderWidth: '1px', 
                  borderStyle: 'solid',
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
              </HoverableCard>
          </motion.section>

          {/* Interests Section */}
          <motion.section
            ref={(el) => {
              sectionRefs.current['interests'] = el
            }}
            className="scroll-mt-8 pt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          >
            <motion.h2 
              className="text-lg font-mono mb-6"
              style={{ color: RAW_COLORS.text.primary }}
              whileHover={{ 
                color: RAW_COLORS.accent.blue,
                transition: { duration: 0.2 },
              }}
            >
              Interests
            </motion.h2>
              <div className="grid md:grid-cols-2 gap-6">
                <HoverableCard
                  className="rounded-lg p-6 shadow-sm cursor-default"
                  style={{ 
                    backgroundColor: RAW_COLORS.bg.panel, 
                    borderColor: RAW_COLORS.border.default, 
                    borderWidth: '1px', 
                    borderStyle: 'solid',
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
                  {/* Album Covers */}
                  <div className="mt-6">
                    <h4 className="text-xs font-mono mb-3" style={{ color: RAW_COLORS.accent.blue }}>Albums</h4>
                    <div className="grid grid-cols-3 gap-3 max-w-[85%]">
                      {ALBUM_COVERS.map((album, index) => (
                        <div
                          key={index}
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
                            e.currentTarget.style.transform = 'scale(1.02)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = RAW_COLORS.border.default
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        >
                          <Image
                            src={album}
                            alt={`Album ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </HoverableCard>
                <HoverableCard
                  className="rounded-lg p-6 shadow-sm cursor-default"
                  style={{ 
                    backgroundColor: RAW_COLORS.bg.panel, 
                    borderColor: RAW_COLORS.border.default, 
                    borderWidth: '1px', 
                    borderStyle: 'solid',
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
                </HoverableCard>
              </div>
          </motion.section>
        </div>
        
        {/* Footer with Exit Button */}
        <motion.footer 
          className="py-8 px-6 mt-12"
          style={{ 
            borderTopColor: RAW_COLORS.border.default,
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="font-mono text-xs inline-block relative"
              style={{ color: RAW_COLORS.text.tertiary }}
            >
              <Link 
                href="/"
                className="relative inline-block"
              >
                <motion.span
                  whileHover={{
                    color: [
                      RAW_COLORS.text.secondary,
                      TRICOLOR_ACCENT.colors.green,
                      TRICOLOR_ACCENT.colors.yellow,
                      TRICOLOR_ACCENT.colors.red,
                      RAW_COLORS.text.secondary,
                    ],
                    transition: {
                      duration: 0.4,
                      ease: 'easeInOut',
                      times: [0, 0.25, 0.5, 0.75, 1],
                    },
                  }}
                >
                  {'> exit'}
                </motion.span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-px origin-left"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{
                    scaleX: [0, 1, 1, 0],
                    opacity: [0, 0.8, 0.8, 0],
                    backgroundColor: [
                      TRICOLOR_ACCENT.colors.green,
                      TRICOLOR_ACCENT.colors.green,
                      TRICOLOR_ACCENT.colors.yellow,
                      TRICOLOR_ACCENT.colors.red,
                    ],
                    transition: {
                      duration: 0.4,
                      ease: 'easeInOut',
                      times: [0, 0.33, 0.66, 1],
                    },
                  }}
                />
        </Link>
            </motion.div>
      </div>
        </motion.footer>
      </motion.div>
    </main>
  )
}
