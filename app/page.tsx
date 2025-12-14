'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { THEME } from '@/lib/theme'
import { SYSTEM_MOUNT, STATUS_FEEDBACK, GLOW_FEEDBACK, TERMINAL_LIFE } from '@/lib/motion'

// Landing page uses muted colors
const LANDING_COLORS = THEME.colors.primary.landing

export default function Home() {
  const [mirExeHovered, setMirExeHovered] = useState(false)
  const [mirRawHovered, setMirRawHovered] = useState(false)
  const [isBooting, setIsBooting] = useState(false)
  const router = useRouter()

  const handleMirExeClick = () => {
    setIsBooting(true)
    setTimeout(() => {
      router.push('/professional')
    }, 800)
  }

  const colors = THEME.colors

  return (
    <main className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: colors.bg.primary }}>
      {/* Minimal noise texture - very subtle */}
      <div className="noise-overlay opacity-[0.015]" />

      {/* Terminal prompt - top-left */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <div className="font-mono text-sm md:text-base" style={{ color: LANDING_COLORS.main }}>
          <span style={{ color: colors.text.secondary }}>mir@boot</span>
          <span style={{ color: colors.text.tertiary }}>:</span>
          <span style={{ color: LANDING_COLORS.main }}>~</span>
          <span style={{ color: colors.text.tertiary }}>$</span>
          <motion.span 
            className="ml-2"
            style={{ color: colors.text.secondary }}
            {...TERMINAL_LIFE.cursor}
          >
            _
          </motion.span>
        </div>
      </div>

      {/* Main content - centered */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* Dominant mir.exe executable card */}
          <motion.div
            className="mb-12"
            {...SYSTEM_MOUNT.boot}
            transition={{ ...SYSTEM_MOUNT.boot.transition, delay: 0.2 }}
          >
            <motion.div
              className="relative"
              onMouseEnter={() => setMirExeHovered(true)}
              onMouseLeave={() => setMirExeHovered(false)}
              onClick={handleMirExeClick}
              whileHover={STATUS_FEEDBACK.landing.hover}
              whileTap={STATUS_FEEDBACK.landing.tap}
            >
              {/* Border glow - muted for landing */}
              <motion.div
                className="absolute -inset-[1px] rounded-sm"
                animate={mirExeHovered ? GLOW_FEEDBACK.primary.landing.hover : GLOW_FEEDBACK.primary.landing.idle}
                style={{
                  background: `linear-gradient(135deg, ${LANDING_COLORS.border.low}, ${LANDING_COLORS.border.high})`,
                }}
              />

              {/* Main card */}
              <div 
                className="relative rounded-sm p-8 md:p-10 cursor-pointer"
                style={{ 
                  backgroundColor: colors.bg.panel,
                  borderColor: colors.border.default,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                {/* System metadata */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs md:text-sm" style={{ color: colors.text.tertiary }}>NAME:</span>
                    <span className="font-mono text-lg md:text-xl font-semibold" style={{ color: LANDING_COLORS.main }}>mir.exe</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs md:text-sm" style={{ color: colors.text.tertiary }}>DESCRIPTION:</span>
                    <span className="font-mono text-sm md:text-base" style={{ color: colors.text.secondary }}>Professional Runtime Environment</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs md:text-sm" style={{ color: colors.text.tertiary }}>STATUS:</span>
                    <motion.span
                      className="font-mono text-sm md:text-base font-semibold"
                      style={{ color: LANDING_COLORS.status }}
                    >
                      {mirExeHovered ? 'BOOTING...' : 'READY'}
                    </motion.span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs md:text-sm" style={{ color: colors.text.tertiary }}>FOCUS:</span>
                    <span className="font-mono text-sm md:text-base" style={{ color: colors.text.secondary }}>Software Engineering | AI/ML</span>
                  </div>
                </div>

                {/* Execute button */}
                <motion.div
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-sm md:text-base transition-colors"
                  style={{ 
                    backgroundColor: colors.bg.elevated,
                    borderColor: colors.border.hover,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    color: LANDING_COLORS.main,
                  }}
                  whileHover={{ 
                    backgroundColor: colors.border.hover,
                    opacity: 0.9,
                  }}
                  whileTap={STATUS_FEEDBACK.landing.tap}
                >
                  <span>▶</span>
                  <span>EXECUTE</span>
                </motion.div>

                {/* Boot animation overlay */}
                <AnimatePresence>
                  {isBooting && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center rounded-sm"
                      style={{ backgroundColor: colors.bg.primary }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center">
                        <div className="font-mono text-sm mb-2" style={{ color: LANDING_COLORS.main }}>BOOTING SYSTEM...</div>
                        <div className="w-48 h-1 rounded-full overflow-hidden" style={{ backgroundColor: colors.bg.elevated }}>
                          <motion.div
                            className="h-full"
                            style={{ backgroundColor: LANDING_COLORS.main }}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Secondary mir.raw link */}
          <motion.div
            className="text-center"
            {...SYSTEM_MOUNT.boot}
            transition={{ ...SYSTEM_MOUNT.boot.transition, delay: 0.4 }}
          >
            <Link
              href="/personal"
              onMouseEnter={() => setMirRawHovered(true)}
              onMouseLeave={() => setMirRawHovered(false)}
              className="inline-block"
            >
              <motion.div
                className="font-mono text-sm md:text-base transition-colors"
                style={{ color: colors.text.tertiary }}
                animate={mirRawHovered ? {
                  textShadow: '0 0 8px rgba(212, 160, 23, 0.35)', // Reduced glow
                  transition: { duration: 0.4 },
                } : {
                  textShadow: 'none',
                  transition: { duration: 0.4 },
                }}
              >
                <span style={{ color: colors.text.secondary }}>mir.raw</span>
                <span className="ml-2" style={{ color: colors.text.muted }}>—</span>
                <span className="ml-2" style={{ color: colors.text.tertiary }}>personal logs, culture, journey</span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
