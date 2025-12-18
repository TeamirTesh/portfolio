/**
 * Framer Motion presets for system-wide consistency
 * 
 * - SYSTEM_MOUNT: Fade + slight rise (for sections, cards, panels)
 * - STATUS_FEEDBACK: Fast hover/state transitions
 * - TERMINAL_LIFE: Cursor blink / subtle pulse
 */

import { Variants, Transition } from 'framer-motion'

// ===== SYSTEM_MOUNT =====
// Used for mounting sections, cards, and panels
// Landing page: More motion (longer duration, more movement)
// OS page: Less motion (shorter duration, minimal movement)

export const SYSTEM_MOUNT = {
  // Boot phase (landing page) - more motion
  boot: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as Transition,
  },

  // Runtime phase (OS page) - less motion, more stable
  runtime: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as Transition,
  },
} as const

// Staggered mount for multiple items
export const SYSTEM_MOUNT_STAGGER = {
  boot: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as Transition,
  },
  runtime: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as Transition,
  },
} as const

// ===== STATUS_FEEDBACK =====
// Fast, responsive hover and state transitions
export const STATUS_FEEDBACK = {
  // Landing - minimal/no scaling
  landing: {
    hover: {
      // No scale on landing - only subtle effects
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    tap: {
      scale: 0.99, // Very subtle
      transition: { duration: 0.15, ease: 'easeOut' },
    },
  },
  // OS - subtle hover response
  os: {
    hover: {
      // No scale - only opacity/glow changes
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.15, ease: 'easeOut' },
    },
  },
  // Legacy support
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
  transition: {
    duration: 0.2,
    ease: 'easeOut',
  } as Transition,
} as const

// Glow intensity transitions
export const GLOW_FEEDBACK = {
  // For mir.exe (blue/green)
  primary: {
    // Landing - reduced intensity, slower
    landing: {
      idle: {
        boxShadow: '0 0 7px rgba(59, 130, 246, 0.14)', // ~30% reduction
        transition: { duration: 0.4 }, // Slower
      },
      hover: {
        boxShadow: [
          '0 0 14px rgba(59, 130, 246, 0.28)', // ~30% reduction
          '0 0 21px rgba(34, 211, 238, 0.35)', // ~30% reduction
          '0 0 14px rgba(59, 130, 246, 0.28)',
        ] as string[],
        transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' as const }, // Slower
      },
    },
    // OS - stronger, more responsive
    os: {
      idle: {
        boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
        transition: { duration: 0.3 },
      },
      hover: {
        boxShadow: [
          '0 0 20px rgba(59, 130, 246, 0.5)',
          '0 0 30px rgba(34, 211, 238, 0.6)',
          '0 0 20px rgba(59, 130, 246, 0.5)',
        ] as string[],
        transition: { duration: 0.3, repeat: Infinity, repeatType: 'reverse' as const },
      },
    },
    // Legacy support
    idle: {
      boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)',
      transition: { duration: 0.3 },
    },
    hover: {
      boxShadow: [
        '0 0 20px rgba(59, 130, 246, 0.4)',
        '0 0 30px rgba(34, 211, 238, 0.5)',
        '0 0 20px rgba(59, 130, 246, 0.4)',
      ] as string[],
      transition: { duration: 0.3, repeat: Infinity, repeatType: 'reverse' as const },
    },
  },

  // For mir.raw (amber)
  secondary: {
    idle: {
      textShadow: 'none',
      transition: { duration: 0.3 },
    },
    hover: {
      textShadow: '0 0 10px rgba(212, 160, 23, 0.5)',
      transition: { duration: 0.3 },
    },
  },
}

// ===== TERMINAL_LIFE =====
// Cursor blink and subtle pulse animations
export const TERMINAL_LIFE = {
  // Landing - slower cursor blink
  cursor: {
    animate: {
      opacity: [1, 1, 0, 0] as number[],
    },
    transition: {
      duration: 1.2, // Slower for landing
      repeat: Infinity,
      repeatType: 'loop' as const,
      times: [0, 0.5, 0.5, 1] as number[],
    },
  },
  // OS - faster, more alive cursor
  cursorOS: {
    animate: {
      opacity: [1, 1, 0, 0] as number[],
    },
    transition: {
      duration: 0.8, // Faster for OS
      repeat: Infinity,
      repeatType: 'loop' as const,
      times: [0, 0.5, 0.5, 1] as number[],
    },
  },
  // Status pulse for OS (very subtle)
  statusPulse: {
    animate: {
      opacity: [1, 0.96, 1] as number[], // Minimal oscillation
    },
    transition: {
      duration: 3, // Slow, subtle
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'easeInOut',
    },
  },
  // Legacy support
  pulse: {
    animate: {
      opacity: [0.5, 1, 0.5],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'easeInOut',
    },
  },
} as const

// ===== Variants for common patterns =====
export const mountVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// OS-specific stagger (faster, more responsive)
export const staggerContainerOS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // 30-50ms per child
    },
  },
}

// Hover response for OS cards/panels (no scale, only visual feedback)
export const OS_HOVER_RESPONSE = {
  card: {
    whileHover: {
      opacity: 0.95,
      transition: { duration: 0.2 },
    },
  },
  border: {
    whileHover: {
      borderColor: 'var(--border-active)', // Will be set via inline style
      transition: { duration: 0.2 },
    },
  },
} as const

// ===== ETHIOPIAN TRICOLOR ACCENT (motion-only) =====
// Sequential color sweep: green → yellow → red
// Only appears on interaction, fades back to neutral
export const TRICOLOR_ACCENT = {
  // Desaturated, earthy Ethiopian tricolor
  colors: {
    green: '#1f5f3b',
    yellow: '#c8a84a',
    red: '#7a2a2a',
  },
  
  // Underline sweep animation (for text links)
  underline: {
    initial: { scaleX: 0, opacity: 0 },
    animate: {
      scaleX: [0, 1, 1, 0],
      opacity: [0, 0.8, 0.8, 0],
      backgroundColor: [
        '#1f5f3b', // green
        '#1f5f3b',
        '#c8a84a', // yellow
        '#7a2a2a', // red
      ],
    },
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      times: [0, 0.33, 0.66, 1],
    },
  },
  
  // Border sweep animation (for cards, buttons)
  border: {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.6, 0.6, 0],
      borderColor: [
        '#1f5f3b', // green
        '#1f5f3b',
        '#c8a84a', // yellow
        '#7a2a2a', // red
      ],
    },
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      times: [0, 0.33, 0.66, 1],
    },
  },
  
  // Text color sweep (for interactive text)
  text: {
    initial: {},
    animate: {
      color: [
        '#1f5f3b', // green
        '#1f5f3b',
        '#c8a84a', // yellow
        '#7a2a2a', // red
      ],
      opacity: [1, 1, 1, 1],
    },
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      times: [0, 0.33, 0.66, 1],
    },
  },
  
  // Glow/shadow sweep (subtle background effect)
  glow: {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.3, 0.3, 0],
      boxShadow: [
        '0 0 8px rgba(31, 95, 59, 0.2)', // green
        '0 0 8px rgba(31, 95, 59, 0.2)',
        '0 0 8px rgba(200, 168, 74, 0.2)', // yellow
        '0 0 8px rgba(122, 42, 42, 0.2)', // red
      ],
    },
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      times: [0, 0.33, 0.66, 1],
    },
  },
} as const

