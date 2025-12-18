# Teamir Teshome - Portfolio

A dual-mode portfolio website with an OS-themed interface, combining professional experience display with personal reflection layers. Built with Next.js, TypeScript, and Framer Motion.

## Tech Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - UI library

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Declarative animations and gestures
- **Custom CSS** - Noise texture overlays and global styles

### Image Handling
- **Next.js Image Optimization** - Automatic image optimization
- **Dynamic Image API** - Server-side image directory scanning

## Architecture

### Page Structure

The portfolio consists of three main pages:

1. **Landing Page** (`app/page.tsx`)
   - Bootloader-style interface
   - Two entry points: `teamir.exe` (professional) and `teamir.raw` (personal)
   - Terminal-inspired UI with boot animations

2. **Professional Page** (`app/professional/page.tsx`)
   - OS-themed runtime interface
   - Displays projects, education, experience, skills, certifications
   - System-inspired components with status indicators

3. **Personal Page** (`app/personal/page.tsx`)
   - Personal reflection layer
   - Timeline, journal, notes, media gallery, languages, interests
   - Low-contrast dark aesthetic with warm tones

### Theme System

The theme is centralized in `lib/theme.ts`:

- **Color Hierarchy**: Different color intensities for landing (muted) vs OS (saturated)
- **Dual Mode Colors**: 
  - `teamir.exe`: Terminal green/blue accents
  - `teamir.raw`: Soft low-contrast dark with warm tones
- **Consistent Palette**: Shared color tokens across all pages

### Motion System

Animation presets in `lib/motion.ts`:

- **SYSTEM_MOUNT**: Fade + slight rise animations for sections
- **STATUS_FEEDBACK**: Fast hover/state transitions
- **TERMINAL_LIFE**: Cursor blink and subtle pulses
- **TRICOLOR_ACCENT**: Motion-only Ethiopian tricolor (green → yellow → red) for interactive elements

### Key Components

#### HoverableCard (`app/personal/page.tsx`)
Reusable card component with persistent tricolor hover effects:
- Plays tricolor sequence on hover start
- Maintains final enhanced state while hovered
- Returns to default on hover end

#### Section Components (`app/professional/page.tsx`)
Modular section components:
- `HeroSection` - Profile and identity display
- `EducationSection` - Academic background
- `ExperienceSection` - Work history
- `ProjectsSection` - Project showcase with images
- `CertificationsSection` - Certification display
- `SkillsSection` - Technical skills grid
- `TechnicalInterestsSection` - Professional interests
- `CareerTrajectorySection` - Career path narrative
- `LicensesCertificationsSection` - Additional credentials

## File Structure

```
├── app/
│   ├── page.tsx              # Landing page (bootloader)
│   ├── professional/
│   │   └── page.tsx          # Professional OS interface
│   ├── personal/
│   │   └── page.tsx          # Personal reflection layer
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles and noise overlay
├── lib/
│   ├── theme.ts              # Centralized theme configuration
│   └── motion.ts             # Framer Motion presets
├── public/
│   ├── images/
│   │   ├── professional/     # Professional page images
│   │   ├── personal/         # Personal page images
│   │   ├── certifications/  # Certification images
│   │   └── projects/         # Project screenshots
│   └── favicon.svg           # Custom geometric favicon
└── package.json
```

## Design Philosophy

### OS Metaphor
The portfolio uses an operating system metaphor throughout:
- **Landing**: Bootloader phase (anticipation, minimal motion)
- **Professional**: Runtime phase (stable, authoritative, saturated colors)
- **Personal**: Inspection mode (calm, reflective, low-contrast)

### Motion Hierarchy
- Landing has more motion (boot sequence)
- OS page has less motion (stable runtime)
- Personal page has subtle entrance animations

### Color System
- **Landing**: Muted/desaturated colors
- **Professional**: Saturated, high-contrast terminal colors
- **Personal**: Soft, low-contrast dark with warm tones

### Identity Expression
- Motion-only tricolor accents reveal Ethiopian identity through interaction
- Monochrome resting state maintains minimal aesthetic
- Cultural elements appear through motion, not decoration

## Development

### Getting Started

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm start
```

### Key Configuration Files

- `app/professional/page.tsx` - Update `PROFILE`, `PROJECTS`, `EDUCATION`, `EXPERIENCE`, `SKILLS`, `CERTIFICATIONS`
- `app/personal/page.tsx` - Update `TIMELINE_ERAS`, `JOURNAL_ENTRIES`, `PERSONAL_NOTES`, `METADATA`
- `lib/theme.ts` - Modify color palettes and theme tokens
- `lib/motion.ts` - Adjust animation presets and timing

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Image Optimization**: Automatic Next.js image optimization
- **Smooth Animations**: Framer Motion for performant animations
- **Type Safety**: Full TypeScript coverage
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Optimized images, lazy loading, code splitting

