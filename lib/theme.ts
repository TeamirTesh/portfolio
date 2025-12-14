/**
 * System-wide theme configuration
 * Ensures consistency between bootloader (landing) and OS (professional) pages
 */

// ===== Color Palette =====
export const COLORS = {
  // Backgrounds
  bg: {
    primary: '#000000',      // Main background (black)
    panel: '#0a0a0a',        // Panel/card background (near-black)
    surface: '#0f0f0f',      // Surface elements
    elevated: '#1a1a1a',      // Elevated surfaces (hover states)
  },

  // Borders
  border: {
    default: '#1a1a1a',      // Default border
    hover: '#2a2a2a',        // Hover border
    active: '#3a3a3a',        // Active border
  },

  // Text
  text: {
    primary: '#ffffff',      // Primary text (white)
    secondary: '#888888',    // Secondary text (gray)
    tertiary: '#666666',      // Tertiary text (darker gray)
    muted: '#555555',        // Muted text
  },

  // mir.exe (Primary - Blue/Green)
  primary: {
    // Landing (bootloader) - muted/desaturated
    landing: {
      main: '#00cc00',         // Muted terminal green
      glow: {
        low: 'rgba(59, 130, 246, 0.14)',      // Reduced by ~30% (0.2 * 0.7)
        medium: 'rgba(59, 130, 246, 0.28)',   // Reduced by ~30% (0.4 * 0.7)
        high: 'rgba(34, 211, 238, 0.35)',     // Reduced by ~30% (0.5 * 0.7)
      },
      border: {
        low: 'rgba(59, 130, 246, 0.21)',      // Reduced by ~30%
        high: 'rgba(34, 211, 238, 0.21)',     // Reduced by ~30%
      },
      status: '#00cc00',       // Muted status
    },
    // OS (runtime) - saturated/strong
    os: {
      main: '#00ff00',         // Strong terminal green
      glow: {
        low: 'rgba(59, 130, 246, 0.3)',       // Stronger for OS
        medium: 'rgba(59, 130, 246, 0.5)',    // Stronger for OS
        high: 'rgba(34, 211, 238, 0.6)',      // Stronger for OS
      },
      border: {
        low: 'rgba(59, 130, 246, 0.4)',      // Stronger for OS
        high: 'rgba(34, 211, 238, 0.4)',     // Stronger for OS
      },
      status: '#00ff00',       // Strong status
      statusActive: '#00ff00', // Active status
    },
    // Legacy support (defaults to OS for backward compatibility)
    main: '#00ff00',
    glow: {
      low: 'rgba(59, 130, 246, 0.2)',
      medium: 'rgba(59, 130, 246, 0.4)',
      high: 'rgba(34, 211, 238, 0.5)',
    },
    border: {
      low: 'rgba(59, 130, 246, 0.3)',
      high: 'rgba(34, 211, 238, 0.3)',
    },
    status: '#00ff00',
    statusActive: '#00ff00',
  },

  // mir.raw (Secondary - Amber/Gold)
  secondary: {
    main: '#d4a017',         // Amber/gold (secondary accent)
    glow: {
      low: 'rgba(212, 160, 23, 0.3)',      // Low intensity glow
      medium: 'rgba(212, 160, 23, 0.5)',   // Medium intensity glow
      high: 'rgba(245, 158, 11, 0.6)',     // High intensity glow
    },
    hover: '#d4a017',        // Hover color
  },

  // System status
  status: {
    success: '#00ff00',      // Success/active (green)
    warning: '#d4a017',      // Warning (amber)
    error: '#ff4444',        // Error (red)
    info: '#3b82f6',         // Info (blue)
  },
} as const

// ===== Theme Export =====
export const THEME = {
  colors: COLORS,
} as const

