'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { THEME } from '@/lib/theme'
import { SYSTEM_MOUNT, staggerContainer, staggerContainerOS, mountVariants, TERMINAL_LIFE, OS_HOVER_RESPONSE } from '@/lib/motion'

// OS page uses saturated colors
const OS_COLORS = THEME.colors.primary.os

// Profile configuration
const PROFILE = {
  name: 'Teamir Teshome',
  role: 'Software Engineer',
  major: 'Computer Science',
  university: 'Georgia State University',
  graduation: 'Aug 2026',
  focus: 'Full-Stack Development, AI/ML',
  email: 'teamirteshome1@gmail.com',
  github: 'https://github.com/TeamirTesh',
  linkedin: 'https://www.linkedin.com/in/teamir-teshome-084219337/',
  resume: 'https://docs.google.com/document/d/1R_75GgWsFAIC4uS5EW19V5_VJoSt5c5oDolJE608cgY/edit?usp=sharing',
  headshot: '/images/professional/headshot1.jpeg',
  phone: '(470)-691-9093',
  citizenship: 'U.S. Citizen',
}

const PROJECTS = [
  {
    name: 'XP Lab (EmoryHacks \'25 Winner)',
    status: 'STABLE',
    processType: 'CORE SERVICE',
    isFlagship: true,
    techStack: 'Python, FastAPI, React.js, PostgreSQL (Supabase), WebSockets, Whisper API',
    focus: 'AI-powered lecture intelligence platform for professors and students',
    impact: [
      'Built a real-time, two-sided education platform that improves lecture quality for professors while simultaneously increasing student engagement through AI-driven feedback, analytics, and gamification.',
      'Designed and implemented a live lecture pipeline using FastAPI, WebSockets, and OpenAI Whisper to stream audio, transcribe lectures in real time, and surface pacing, engagement, and confusion insights during and after class.',
      'Engineered a gamified student experience (points, streaks, ranks, badges, leaderboards) with React, Tailwind CSS, and Vite to motivate participation, reinforce consistency, and visualize learning progression.',
      'Developed a scalable backend architecture with Supabase (PostgreSQL), role-based authentication, and real-time session management to support concurrent classes, students, and professors.',
      'Integrated AI-assisted question generation and hybrid workflows that allow professors to combine manual input with AI suggestions, enabling rapid in-class assessments without disrupting lecture flow.',
    ],
    devpostUrl: 'https://devpost.com/software/classmind',
    demoUrl: 'https://drive.google.com/file/d/1_7LMqYiMdbg638skEzfH_pomy0YWTRRi/view',
    repoUrl: 'https://github.com/amy14-w/XP-LAB',
    expanded: {
      architecture: 'Scalable backend architecture using Supabase (PostgreSQL), role-based authentication, and real-time audio streaming',
      decisions: 'Engineered gamified learner experience with points, streaks, badges, and leaderboards that increased student engagement',
    },
  },
  {
    name: 'JobHunter.AI',
    status: 'STABLE',
    processType: 'PRODUCTION SYSTEM',
    isFlagship: true,
    techStack: 'Python, Flask, React.js, PostgreSQL (Supabase), OpenAI, Google Cloud, Azure, Matplotlib, Plotly',
    focus: 'Automated job application tracking system',
    impact: [
      'Designed and built an end-to-end automated job application tracking system that removes the need for manual data entry by continuously ingesting job-related emails from Gmail and Outlook.',
      'Implemented OAuth-secured email integrations with Google and Microsoft APIs to safely access user inboxes, manage token lifecycles, and support multiple connected email accounts per user.',
      'Developed an AI-powered email intelligence pipeline using OpenAI that classifies incoming messages, extracts structured fields (company, role, location, status), and updates application records automatically.',
      'Engineered a Flask-based backend architecture that orchestrates email ingestion, AI processing, background synchronization, and database persistence in a reliable and maintainable manner.',
      'Built a responsive React dashboard with search, filtering, and status management that allows users to view and control their entire job search across multiple inboxes from a single interface.',
    ],
    viewUrl: '',
    repoUrl: 'https://github.com/TeamirTesh/JobHunter.Ai',
    expanded: {
      architecture: 'Flask backend handles email ingestion, parsing, and database updates with continuous data-processing pipeline',
      decisions: 'Created interactive visual analytics (Matplotlib, Plotly) to help users visualize application progress and trends',
    },
  },
  {
    name: 'Document_Intelligence.RAG',
    status: 'STABLE',
    processType: 'PRODUCTION SYSTEM',
    isFlagship: false,
    techStack: 'Python, LlamaIndex, Hugging Face, Mistral-7B, Phi-2, FAISS, Tesseract OCR, Gradio',
    focus: 'End-to-end document intelligence system for mortgage-related PDFs, combining OCR, metadata-aware retrieval, and open-source LLMs to enable accurate, source-grounded question answering.',
    impact: [
      'Designed and implemented a full Retrieval-Augmented Generation (RAG) pipeline capable of processing both digital and scanned mortgage documents.',
      'Built a selective OCR fallback using Tesseract to extract text from low-quality or scanned PDFs while avoiding unnecessary OCR on digital documents.',
      'Engineered a chunking and metadata tagging strategy to preserve legal clauses and fee sections, enabling targeted and semantically accurate retrieval.',
      'Integrated BGE embeddings with a FAISS-backed vector index via LlamaIndex to support fast semantic search over document chunks.',
      'Implemented a mixed-model architecture using Phi-2 for query routing and document classification, and Mistral-7B for final answer generation.',
      'Developed a RAG prompt strategy that constrains LLM responses to retrieved context, returning answers with citations and confidence scores.',
      'Built an interactive Gradio chatbot interface to support document upload, chat history, and real-time question answering.',
      'Evaluated routing accuracy, retrieval consistency, confidence scoring, and end-to-end stability across multiple mortgage document types.',
    ],
    viewUrl: 'https://docs.google.com/presentation/d/1SNMmC7SkiD1D4J0JRDMeY_zD8EwoKaOI5Fq4-Wjb6Ew/edit?usp=sharing',
    viewLabel: 'slides',
    demoUrl: 'https://drive.google.com/file/d/1bN-x_2LlJndSuoYcdS-I5IhYK3PBy14G/view?usp=sharing',
    repoUrl: 'https://github.com/TeamirTesh/Blob.AI',
    expanded: {
      architecture: 'Modular RAG architecture with clear separation between document ingestion (OCR & parsing), semantic indexing (chunking, embeddings, vector search), and reasoning (LLM-based answer generation), designed to mirror production document AI systems.',
      decisions: 'Mixed-model design chosen to balance latency and reasoning quality; lightweight embeddings selected for efficient indexing; metadata-aware retrieval used to improve precision; CPU-only Colab environment prioritized stability and reproducibility over raw inference speed.',
    },
  },
  {
    name: 'Spamify.ML',
    status: 'STABLE',
    processType: 'PRODUCTION SYSTEM',
    isFlagship: false,
    techStack: 'Python, scikit-learn, Pandas, NumPy, TF-IDF, Linear SVM',
    focus: 'End-to-end email spam detection using traditional NLP techniques with emphasis on reproducibility, validation discipline, and clean ML pipeline design.',
    impact: [
      'Designed and implemented a complete machine learning pipeline to classify email messages as spam or ham using TF-IDF feature extraction and a linear Support Vector Machine.',
      'Ingested and normalized multiple training datasets with differing schemas, unifying labels and text fields into a consistent representation.',
      'Engineered a text preprocessing workflow including stop-word removal, lowercasing, and minimum document frequency filtering to reduce noise in high-dimensional feature space.',
      'Trained and evaluated a baseline LinearSVC model using a stratified train/validation split, reporting accuracy, precision, recall, F1 score, and full classification metrics.',
      'Performed hyperparameter tuning with 5-fold cross-validation using GridSearchCV, optimizing for F1 score to balance false positives and false negatives.',
      'Re-trained the final model on all available labeled data and generated predictions for an unseen test dataset, persisting results to a structured output artifact.',
      'Refactored exploratory notebook code into a standalone, reproducible Python script with clear separation between data, source code, and outputs.',
    ],
    viewUrl: '',
    repoUrl: 'https://github.com/TeamirTesh/EmailClassification',
    expanded: {
      architecture: 'Script-based ML pipeline with explicit separation of data ingestion, preprocessing, feature extraction, model training, validation, and inference; exploratory development in Jupyter/Colab with a production-style execution script.',
      decisions: 'TF-IDF selected for interpretability and efficiency on sparse text data; Linear SVM chosen for strong performance in high-dimensional NLP tasks; validation-based evaluation used to prevent data leakage due to unavailable test labels; notebook retained for exploration with a cleaned script for reproducible execution.',
    },
  },
  {
    name: 'Employee Management System',
    status: 'ARCHIVED',
    processType: 'INFRASTRUCTURE',
    isFlagship: false,
    techStack: 'Java, MySQL, JDBC, SQL, Console-Based Application Architecture',
    focus: 'Secure employee data management with role-based access control and payroll reporting',
    impact: [
      'Designed and implemented a Java-based employee management system that provides secure, role-based access for HR administrators and employees to manage and view sensitive employee data.',
      'Built a role-based authentication and authorization layer that enforces full CRUD privileges for HR administrators while restricting general employees to read-only access.',
      'Developed a robust relational database schema in MySQL with normalized tables, foreign key constraints, and many-to-many relationships to model employees, divisions, job titles, and payroll records accurately.',
      'Implemented employee search and management workflows that support queries by employee ID, name, SSN, and date of birth, with real-time updates persisted safely to the database.',
      'Engineered payroll and reporting functionality that generates monthly pay summaries by job title and division, employee-specific pay histories, and hire-date range reports.',
      'Used prepared statements throughout the data access layer to prevent SQL injection and ensure secure interaction with the database.',
      'Structured the application with a clear separation of concerns (authentication services, business logic, repositories, and database access) to improve maintainability and extensibility.',
    ],
    viewUrl: '',
    demoUrl: '',
    repoUrl: 'https://github.com/TeamirTesh/EmployeeManagementSystem',
    expanded: {
      architecture: 'Layered architecture with separation of concerns: authentication services, business logic, repositories, and database access',
      decisions: 'Prepared statements throughout data access layer for security, normalized database schema with foreign key constraints',
    },
  },
  {
    name: 'TeamirTeshome.com',
    status: 'STABLE',
    processType: 'PRODUCTION SYSTEM',
    isFlagship: true,
    techStack: 'Next.js, TypeScript, React, Framer Motion, Tailwind CSS, Next.js Image Optimization',
    focus: 'Dual-mode portfolio website with OS-themed professional interface and personal reflection layer',
    impact: [
      'Designed and implemented a bootloader-style landing page that presents two distinct modes (teamir.exe and teamir.raw) with terminal-inspired UI and smooth navigation transitions.',
      'Built a professional OS-themed interface (teamir.exe) that displays projects, education, and technical experience using system-inspired components with status indicators and process management metaphors.',
      'Developed a personal reflection layer (teamir.raw) featuring a horizontal scrolling timeline, paginated journal entries, media gallery, and curated personal metadata with warm, low-contrast dark aesthetic.',
      'Engineered a centralized theme system with shared color palettes and motion presets to ensure visual consistency across landing, professional, and personal pages.',
      'Implemented a motion-only tricolor accent system that reveals Ethiopian identity through subtle animated color sweeps on interactive elements while maintaining a minimal monochrome resting state.',
      'Created reusable animation components using Framer Motion with useAnimation hooks to enable persistent hover effects that play tricolor sequences and maintain enhanced states during interaction.',
      'Designed responsive layouts with mobile-first approach using Tailwind CSS grid and flexbox systems that adapt seamlessly across desktop, tablet, and mobile viewports.',
      'Integrated Next.js Image optimization and API routes to serve dynamic image galleries with automatic format conversion and lazy loading for improved performance.',
      'Architected a modular component structure with shared HoverableCard components, theme constants, and motion presets to enable consistent styling and behavior across all sections.',
    ],
    viewUrl: '',
    repoUrl: 'https://github.com/TeamirTesh/portfolio',
    expanded: {
      architecture: 'Next.js App Router with client-side routing; shared theme and motion configuration in lib/ directory; modular page components (landing, professional, personal) with reusable UI primitives; Framer Motion for declarative animations; Tailwind CSS for utility-first styling.',
      decisions: 'OS metaphor chosen to differentiate from traditional portfolios and create memorable user experience; dual-mode design separates professional and personal content while maintaining system cohesion; tricolor accent system adds cultural identity without overwhelming minimal aesthetic; TypeScript selected for type safety across complex component hierarchies; Framer Motion used for performant declarative animations over imperative DOM manipulation.',
    },
  },
  {
    name: 'HearSpace',
    status: 'EXPERIMENTAL',
    processType: 'HARDWARE',
    isFlagship: false,
    techStack: 'Python, Computer Vision, Embedded Systems, ESP32-CAM, Deep Learning Models, Spatial Audio',
    focus: 'Assistive navigation through real-time vision-to-audio spatial mapping',
    impact: [
      'Designing an assistive navigation system that integrates embedded hardware, computer vision, and audio feedback to translate visual spatial information into intuitive sound-based cues.',
      'Developing a real-time perception pipeline using camera input and deep learning models to detect obstacles and estimate depth for navigation assistance.',
      'Integrating edge hardware components (ESP32-CAM and embedded camera modules) with backend processing logic to support low-latency data capture and transmission.',
      'Exploring spatial audio mapping techniques to convert object position and distance into directional audio cues that improve user situational awareness.',
      'Engineering the system incrementally with a modular architecture, allowing vision models, audio logic, and hardware components to evolve independently during development.',
    ],
    viewUrl: '',
    repoUrl: '',
    expanded: {
      architecture: 'Modular architecture with separate components for vision processing, audio mapping, and hardware integration',
      decisions: 'Incremental development approach allows independent evolution of vision models, audio logic, and hardware components',
    },
  },
]

const CERTIFICATIONS = [
  {
    name: 'Intermediate Technical Interview Prep',
    image: '/images/certifications/certificate_TIP102.png',
    status: 'COMPLETE',
  },
  {
    name: 'AI Document Intelligence Extern',
    image: '/images/certifications/certificate_extern.png',
    status: 'COMPLETE',
  },
  {
    name: 'Microsoft Azure AI Fundamentals',
    image: '/images/certifications/loading.jpg',
    status: 'IN PROGRESS',
  },
  {
    name: 'Grokking the System Design Interview',
    image: '/images/certifications/loading.jpg',
    status: 'IN PROGRESS',
  },
  {
    name: 'Github Certified Developer',
    image: '/images/certifications/loading.jpg',
    status: 'IN PROGRESS',
  },
]

const SKILLS = {
  Languages: ['Python', 'SQL', 'C', 'JavaScript', 'HTML', 'CSS'],
  'Frameworks/Libraries': ['Flask', 'FastAPI', 'React.js', 'Librosa', 'PyTorch', 'NumPy', 'Pandas', 'Matplotlib'],
  'Tools/Databases': ['Git/Github', 'Supabase', 'MySQL', 'PostgreSQL', 'Google Cloud', 'Azure', 'OpenAI'],
}

const EXPERIENCE = [
  {
    role: 'Incoming Software Engineer Intern',
    company: 'Cargill',
    period: 'Summer 2026',
    description: '',
  },
  {
    role: 'Undergraduate Researcher',
    company: 'CHAI Lab and Morse Studio',
    period: 'Sept 2025 - Present',
    description: 'Joining two research labs, excited to share what we work on!',
  },
  {
    role: 'AI / Document Intelligence Extern',
    company: 'Outamation',
    period: 'Aug 2025 - Present',
    description: [
      'Ran retrieval experiments across embedding models (MiniLM/E5/BGE) and retriever settings (top-k, similarity thresholding, optional reranking), selecting a configuration that improved document-grounded QA on mortgage fee worksheets.',
      'Implemented hybrid ingestion (PyMuPDF text extraction + Tesseract OCR fallback) and validated OCR triggers using text-length heuristics to avoid unnecessary OCR on clean digital PDFs.',
      'Optimized chunking parameters (window size, overlap) to preserve contract clauses and fee tables, improving retrieval coherence and reducing context fragmentation.',
      'Added metadata tagging + filtering (doc_type, source_file, page/chunk IDs) to route queries and reduce noise during multi-PDF "blob" retrieval.',
      'Measured pipeline outputs (confidence, retrieved sources, latency, chunks-used) on a query test set and iteratively refined prompts and retrieval logic based on observed failure modes.',
      'Shipped an interactive Gradio chatbot wired to the full RAG backend (LlamaIndex + FAISS + llama.cpp LLMs) to demo and validate the system end-to-end.',
    ],
  },
  {
    role: 'Undergraduate Teaching Assistant - Calculus & Statistics',
    company: 'Georgia State University',
    period: 'Jan 2024 - May 2025',
    description: [
      'Planned, organized, and led weekly peer-assisted study sessions for Calculus and Statistics courses, independently designing session structure, problem sets, and instructional strategies to reinforce core mathematical concepts and exam readiness.',
      'Proactively marketed and promoted sessions through campus outreach and peer networks, driving consistent attendance and engagement without direct faculty oversight.',
      'Facilitated large-group problem-solving discussions, breaking down complex concepts into clear, intuitive explanations that enabled students of varying backgrounds to reach understanding and apply techniques independently.',
      'Mentored students in independent learning strategies, emphasizing analytical thinking, self-debugging, and effective study methods rather than dependency on instructors or tutors.',
      'Built strong cross-year peer relationships, collaborating with upperclassmen and repeat attendees to foster a supportive learning environment and sustained academic progression.',
      'Earned 100% satisfaction ratings in anonymous student feedback surveys, with students citing leadership, clarity of instruction, and measurable improvement tied directly to session participation.',
    ],
  },
  {
    role: 'Tutoring Data & Systems Clerk',
    company: 'Saturday Academy - RAOC',
    period: 'Aug 2025 - Present',
    description: [
      'Managed and organized student performance and attendance data to track tutoring progress, identify trends, and support data-driven instructional decisions across multiple students.',
      'Designed and maintained streamlined data-tracking processes for recording outcomes, improving consistency, accuracy, and ease of analysis for tutors and administrators.',
      'Supported mentorship and tutoring initiatives by working directly with younger students, building strong relationships that encouraged engagement, confidence, and long-term academic growth.',
      'Collaborated with tutors and staff to translate performance data into actionable insights, helping tailor support strategies to individual student needs.',
      'Planning and developing a web-based platform to centralize student records, streamline reporting workflows, and improve accessibility and transparency for stakeholders',
    ],
  },
  {
    role: 'Founder',
    company: 'TMD Detailz',
    period: 'Jan 2024 - Dec 2025',
    description: 'Founded and operated a successful detailing business in Stone Mountain, Georgia. Managed all aspects of business operations including client relations, service delivery, and business development.',
  },
]

const EDUCATION = [
  {
    degree: 'B.S Computer Science',
    university: 'Georgia State University',
    graduation: 'Expected Aug 2026',
    gpa: 'Major GPA: 4.0/4.3',
    coursework: [
      'Algorithms',
      'Data Structures',
      'Software Development',
      'Machine Learning',
      'Database Systems',
      'Mobile App Development',
      'Systems Programming',
      'Programming Language Concepts',
      'Computer Architecture',
      'Probability & Statistics',
      'Calculus II',
      'Linear Algebra',
    ],
    honors: [
      "President's List",
      'Excellence Scholarship',
      "EmoryHacks '25 Winner",
    ],
    organizations: [
      'Programming Club at GSU',
      'National Society of Black Engineers',
      'African Student Association',
    ],
  },
  {
    degree: 'High School Diploma',
    university: 'Dekalb Early College Academy',
    graduation: 'May 2022',
    gpa: 'GPA: 4.2',
    coursework: [
      '60 Early College Credits at Georgia State University',
    ],
    honors: [
      "President's List",
      "Principal's List",
      'Student of the Month',
    ],
    organizations: [],
  },
]

const TECHNICAL_INTERESTS = [
  'AI + Systems Engineering',
  'Full-Stack & ML Development',
  'Applied Machine Learning',
  'Backend Architecture & Performance',
  'Systems Programming',
]
const CAREER_TRAJECTORY = `Right now, I’m primarily locked in on software engineering, so I’m investing heavily in core SWE skills through things like a systems design certification, an AWS/cloud certification, and an upcoming SWE internship. At the same time, I’m intentionally building strong AI/ML fundamentals by joining two research labs and working on ML-focused projects, with the long-term goal of specializing in machine learning during graduate school. I see SWE as my foundation and AI/ML as my specialization, allowing me to bridge production-level systems with advanced machine learning rather than treating them as separate paths.`

const LICENSES_CERTIFICATIONS: Array<{ name: string; issuer: string; year: string }> = [
]

// ===== Logo Background Colors =====
const LOGO_BACKGROUNDS: Record<string, string> = {
  'Cargill': '#FFFFFF', // White
  'Georgia State University': '#0039A6',
  'MORSE Studio': '#0039A6', // Uses GSU logo
  'CHAI Lab and Morse Studio': '#0039A6', // Uses GSU logo
}

// ===== Logo Aliases (companies that should use another company's logo) =====
const LOGO_ALIASES: Record<string, string> = {
  'MORSE Studio': 'Georgia State University', // MORSE Studio uses GSU logo
  'CHAI Lab and Morse Studio': 'Georgia State University', // CHAI Lab and Morse Studio uses GSU logo
}

// ===== Custom Logo Filenames (companies with specific logo file names) =====
const CUSTOM_LOGO_FILENAMES: Record<string, string> = {
  'Outamation': 'extern', // Outamation uses extern.png instead of outamation.png
}

// ===== Custom Project Folder Names =====
const CUSTOM_PROJECT_FOLDERS: Record<string, string> = {
  'XP Lab': 'xplab_emoryhacks_25_winner', // Keep old folder name for existing images
  'HearSpace': 'hearspace_assistive_navigation_system_in_progress', // Keep old folder name
  'Employee Management System': 'employee_management_system_role_based_backend_system', // Keep old folder name
}

// ===== Helper Functions =====
function getInitials(text: string): string {
  const words = text.split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return text.substring(0, 2).toUpperCase()
}

function normalizeCompanyName(name: string): string {
  // Convert to lowercase, remove special characters, replace spaces with underscores
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '_')
    .replace(/-/g, '_')
    .replace(/_+/g, '_') // Collapse multiple underscores into one
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
}

function CompanyIcon({ company, icon }: { company: string; icon?: string }) {
  const colors = THEME.colors
  const [imageError, setImageError] = useState(false)
  const [currentExtensionIndex, setCurrentExtensionIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null)
  
  // Check if this company should use another company's logo
  const logoCompany = LOGO_ALIASES[company] || company
  
  // Check if this company has a custom logo filename, otherwise normalize the company name
  const logoFilename = CUSTOM_LOGO_FILENAMES[company] || normalizeCompanyName(logoCompany)
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg']
  
  // Get background color for this company
  const backgroundColor = LOGO_BACKGROUNDS[company] || colors.bg.elevated
  
  // Determine image source
  const imageSrc = icon || (currentExtensionIndex < imageExtensions.length 
    ? `/images/logos/${logoFilename}${imageExtensions[currentExtensionIndex]}`
    : null)
  
  // Handle image load to get aspect ratio
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const aspectRatio = img.naturalWidth / img.naturalHeight
    setImageAspectRatio(aspectRatio)
    setImageLoaded(true)
  }
  
  // Try next extension on error
  const handleImageError = () => {
    if (icon) {
      setImageError(true)
      return
    }
    
    if (currentExtensionIndex < imageExtensions.length - 1) {
      setCurrentExtensionIndex(currentExtensionIndex + 1)
      setImageLoaded(false)
    } else {
      setImageError(true)
    }
  }
  
  // Reset when company or icon changes
  useEffect(() => {
    setImageError(false)
    setCurrentExtensionIndex(0)
    setImageLoaded(false)
    setImageAspectRatio(null)
  }, [company, icon])
  
  if (imageSrc && !imageError) {
    // Determine scaling: if image is wider than tall, fill width; otherwise fill height
    const isWide = imageAspectRatio ? imageAspectRatio > 1 : true
    const imageStyle = isWide 
      ? { width: '100%', height: 'auto' }
      : { width: 'auto', height: '100%' }
    
    return (
      <div 
        className="w-10 h-10 flex-shrink-0 rounded flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundColor,
          borderColor: colors.border.hover,
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        <Image 
          src={imageSrc} 
          alt={company} 
          width={200}
          height={100}
          style={imageStyle}
          className="object-contain"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    )
  }
  
  // Fallback to initials
  const initials = getInitials(company)
  return (
    <div 
      className="w-10 h-10 flex-shrink-0 rounded flex items-center justify-center"
      style={{ 
        backgroundColor: colors.bg.elevated,
        borderColor: colors.border.hover,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      <span className="text-xs font-mono font-semibold" style={{ color: colors.text.secondary }}>{initials}</span>
    </div>
  )
}

// ===== Components =====
function SystemHeader() {
  const colors = THEME.colors
  
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-3"
      style={{ 
        backgroundColor: colors.bg.panel,
        borderBottomColor: colors.border.default,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
      }}
      {...SYSTEM_MOUNT.runtime}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-6 font-mono" style={{ color: colors.text.secondary }}>
          <span style={{ color: colors.text.primary }}>teamir.exe</span>
          <span style={{ color: colors.text.tertiary }}>—</span>
          <span>Professional Runtime Environment</span>
          <span style={{ color: colors.text.tertiary }}>|</span>
          <span>Status: <motion.span 
            style={{ color: OS_COLORS.status }}
            animate={{ opacity: [1, 0.96, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
          >ACTIVE</motion.span></span>
          <span style={{ color: colors.text.tertiary }}>|</span>
          <span>Role: {PROFILE.role}</span>
          <span style={{ color: colors.text.tertiary }}>|</span>
          <span>Graduation: {PROFILE.graduation}</span>
          {/* Terminal presence - blinking cursor */}
          <motion.span 
            className="ml-2"
            style={{ color: OS_COLORS.main }}
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'loop', times: [0, 0.5, 0.5, 1] }}
          >
            _
          </motion.span>
        </div>
        <nav className="flex items-center gap-4">
          <Link 
            href="/" 
            className="font-mono text-xs transition-colors"
            style={{ color: colors.text.secondary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.text.primary
              e.currentTarget.style.textShadow = `0 0 8px ${OS_COLORS.glow.low}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.text.secondary
              e.currentTarget.style.textShadow = 'none'
            }}
          >
            {'< exit'}
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}

function HeroSection() {
  const colors = THEME.colors
  
  return (
    <motion.section 
      className="pt-8 pb-4 px-6"
      {...SYSTEM_MOUNT.runtime}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
          {/* Headshot */}
          <motion.div 
            className="flex-shrink-0"
            {...SYSTEM_MOUNT.runtime}
            transition={{ ...SYSTEM_MOUNT.runtime.transition, delay: 0.1 }}
          >
            <motion.div 
              className="relative w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden cursor-pointer"
              style={{ 
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: colors.border.hover,
                backgroundColor: colors.bg.elevated,
              }}
              whileHover={{ 
                opacity: 0.95,
                borderColor: colors.border.active,
                boxShadow: `0 0 12px ${OS_COLORS.glow.low}`,
                transition: { duration: 0.2 },
              }}
            >
              <Image
                src={PROFILE.headshot}
                alt={PROFILE.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Identity Block */}
          <motion.div 
            className="space-y-4 flex-1"
            {...SYSTEM_MOUNT.runtime}
            transition={{ ...SYSTEM_MOUNT.runtime.transition, delay: 0.15 }}
          >
            <div className="font-mono text-sm mb-2" style={{ color: colors.text.tertiary }}>
              {'> whoami'}
            </div>
            <div className="font-mono space-y-2" style={{ color: colors.text.primary }}>
              <motion.div 
                className="text-2xl md:text-3xl font-semibold"
                whileHover={{ 
                  color: OS_COLORS.main,
                  transition: { duration: 0.2 },
                }}
              >
                {PROFILE.name}
              </motion.div>
              <div className="text-lg" style={{ color: colors.text.secondary }}>{PROFILE.major}</div>
              <div className="text-base" style={{ color: colors.text.secondary }}>{PROFILE.university}</div>
              <div className="text-sm mt-2" style={{ color: colors.text.tertiary }}>{PROFILE.citizenship} | {PROFILE.phone}</div>
              <div className="text-sm mt-4" style={{ color: colors.text.tertiary }}>Focus: {PROFILE.focus}</div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              {[
                { href: PROFILE.github, label: 'GitHub', icon: 'github' },
                { href: PROFILE.linkedin, label: 'LinkedIn', icon: 'linkedin' },
                { href: PROFILE.resume, label: 'Resume', icon: 'resume' },
                { href: `mailto:${PROFILE.email}`, label: 'Email', icon: 'email' },
              ].map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="w-10 h-10 flex items-center justify-center rounded transition-colors"
                  style={{ 
                    backgroundColor: colors.bg.elevated,
                    borderColor: colors.border.hover,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.border.hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.bg.elevated
                  }}
                  whileHover={{ opacity: 0.9 }}
                  aria-label={link.label}
                >
                  {link.icon === 'github' && (
                    <svg className="w-5 h-5" style={{ color: colors.text.primary }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {link.icon === 'linkedin' && (
                    <svg className="w-5 h-5" style={{ color: colors.text.primary }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {link.icon === 'resume' && (
                    <svg className="w-5 h-5" style={{ color: colors.text.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {link.icon === 'email' && (
                    <svg className="w-5 h-5" style={{ color: colors.text.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// Status color mapping
const getStatusColor = (status: string, colors: typeof THEME.colors) => {
  switch (status) {
    case 'ACTIVE':
      return OS_COLORS.status // Green
    case 'STABLE':
      return OS_COLORS.status // Green
    case 'EXPERIMENTAL':
      return colors.secondary.main // Amber
    case 'IN PROGRESS':
      return colors.secondary.main // Amber (same as experimental)
    case 'ARCHIVED':
      return colors.text.tertiary // Gray
    default:
      return OS_COLORS.status
  }
}

// Status pulse - only for active/stable
const shouldPulseStatus = (status: string) => {
  return status === 'ACTIVE' || status === 'STABLE'
}

function ProjectsSection() {
  const [projectImages, setProjectImages] = useState<Record<number, string[]>>({})

  // Fetch project images on mount
  useEffect(() => {
    const fetchProjectImages = async () => {
      const images: Record<number, string[]> = {}
      
      for (let i = 0; i < PROJECTS.length; i++) {
        const project = PROJECTS[i]
        const projectFolder = CUSTOM_PROJECT_FOLDERS[project.name] || project.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
        
        try {
          const response = await fetch(`/api/images?folder=projects&project=${encodeURIComponent(projectFolder)}`)
          const data = await response.json()
          if (data.images && data.images.length > 0) {
            images[i] = data.images
          }
        } catch (error) {
          console.error(`Error fetching images for project ${i}:`, error)
        }
      }
      
      setProjectImages(images)
    }
    
    fetchProjectImages()
  }, [])

  const colors = THEME.colors

  return (
    <motion.section 
      id="projects"
      className="py-12 px-6"
      {...SYSTEM_MOUNT.runtime}
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm mb-6" style={{ color: colors.text.tertiary }}>
          {'> ls projects/'}
        </div>
        <motion.div 
          className="grid md:grid-cols-2 gap-4"
          variants={staggerContainerOS}
          initial="hidden"
          animate="visible"
        >
          {PROJECTS.map((project, index) => {
            const projectStatus = (project as any).status || 'STABLE'
            const processType = (project as any).processType || 'PRODUCTION SYSTEM'
            const isFlagship = (project as any).isFlagship || false
            const statusColor = getStatusColor(projectStatus, colors)
            const shouldPulse = shouldPulseStatus(projectStatus)
            
            // Flagship projects get stronger visual weight
            const borderWidth = isFlagship ? '2px' : '1px'
            const baseGlow = isFlagship ? OS_COLORS.glow.medium : OS_COLORS.glow.low
            
            return (
            <motion.div
              key={index}
              className="rounded-lg p-6"
              style={{ 
                backgroundColor: colors.bg.surface,
                borderColor: isFlagship ? colors.border.active : colors.border.hover,
                borderWidth: borderWidth,
                borderStyle: 'solid',
              }}
              variants={mountVariants}
              whileHover={isFlagship ? {
                // Flagship: title + border emphasis
                borderColor: OS_COLORS.main,
                boxShadow: `0 0 20px ${baseGlow}`,
                transition: { duration: 0.2 },
              } : processType === 'HARDWARE' || processType === 'EXPERIMENTAL' ? {
                // Experimental: status indicator emphasis
                borderColor: colors.border.active,
                boxShadow: `0 0 12px ${baseGlow}`,
                transition: { duration: 0.2 },
              } : {
                // Standard: border + subtle glow
                borderColor: colors.border.active,
                opacity: 0.95,
                boxShadow: `0 0 10px ${baseGlow}`,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  {/* Process Type Badge */}
                  <div className="mb-2">
                    <span 
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{ 
                        backgroundColor: colors.bg.elevated,
                        borderColor: colors.border.default,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        color: colors.text.tertiary,
                      }}
                    >
                      {processType}
                    </span>
                  </div>
                  
                  <motion.h3 
                    className="font-mono mb-2" 
                    style={{ 
                      color: colors.text.primary,
                      fontSize: isFlagship ? '1.25rem' : '1.125rem', // Slightly larger for flagship
                    }}
                    whileHover={isFlagship ? {
                      color: OS_COLORS.main,
                      transition: { duration: 0.2 },
                    } : {
                      color: colors.text.secondary,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {project.name}
                  </motion.h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: statusColor }}
                      animate={shouldPulse ? { opacity: [1, 0.96, 1] } : { opacity: 1 }}
                      transition={shouldPulse ? { duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' } : {}}
                    />
                    <span className="text-sm italic" style={{ color: colors.text.secondary }}>
                      {projectStatus}
                    </span>
                  </div>
                  <div className="text-sm mb-2" style={{ color: colors.text.secondary }}>
                    <span style={{ color: colors.text.tertiary }}>Stack:</span> {project.techStack}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  {[(project as any).devpostUrl && { url: (project as any).devpostUrl, label: 'devpost' },
                     (project as any).demoUrl && { url: (project as any).demoUrl, label: 'demo' },
                     project.viewUrl && { url: project.viewUrl, label: (project as any).viewLabel || 'view' },
                     project.repoUrl && { url: project.repoUrl, label: 'repo', isIcon: true }]
                    .filter(Boolean)
                    .map((link: any, idx) => link.isIcon ? (
                      <motion.a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded transition-colors"
                        style={{ 
                          backgroundColor: colors.bg.elevated,
                          borderColor: colors.border.hover,
                          borderWidth: '1px',
                          borderStyle: 'solid',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.border.hover}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.bg.elevated}
                        whileHover={{ opacity: 0.9 }}
                        aria-label="GitHub Repository"
                      >
                        <svg className="w-5 h-5" style={{ color: colors.text.primary }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </motion.a>
                    ) : (
                      <motion.a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded text-sm font-mono transition-colors"
                        style={{ 
                          backgroundColor: colors.bg.elevated,
                          borderColor: colors.border.hover,
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          color: colors.text.primary,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.border.hover}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.bg.elevated}
                        whileHover={{ opacity: 0.9 }}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                </div>
              </div>
              <div className="text-sm mb-2" style={{ color: colors.text.secondary }}>
                <span style={{ color: colors.text.tertiary }}>Focus:</span> {project.focus}
              </div>
              <div className="text-sm" style={{ color: colors.text.secondary }}>
                {Array.isArray(project.impact) ? (
                  <ul className="ml-4 list-disc space-y-1">
                    {project.impact.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <span>{project.impact}</span>
                )}
              </div>
              {project.expanded && (
                <div 
                  className="mt-4 pt-4 space-y-2 text-sm"
                  style={{ 
                    borderTopColor: colors.border.hover,
                    borderTopWidth: '1px',
                    borderTopStyle: 'solid',
                    color: colors.text.secondary,
                  }}
                >
                  <div>
                    <span className="font-mono" style={{ color: colors.text.tertiary }}>Architecture:</span> {project.expanded.architecture}
                  </div>
                  <div>
                    <span className="font-mono" style={{ color: colors.text.tertiary }}>Decisions:</span> {project.expanded.decisions}
                  </div>
                </div>
              )}
              
              {/* Project Images */}
              {projectImages[index] && projectImages[index].length > 0 && (
                <div 
                  className="mt-4 pt-4"
                  style={{ 
                    borderTopColor: colors.border.hover,
                    borderTopWidth: '1px',
                    borderTopStyle: 'solid',
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {projectImages[index].map((image, imgIndex) => (
                      <div 
                        key={imgIndex} 
                        className="relative aspect-video rounded-lg overflow-hidden"
                        style={{ 
                          borderColor: colors.border.hover,
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          backgroundColor: colors.bg.elevated,
                        }}
                      >
                        <Image
                          src={image}
                          alt={`${project.name} screenshot ${imgIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}

function CertificationsSection() {
  const colors = THEME.colors
  const [selectedImage, setSelectedImage] = useState<{ src: string; name: string } | null>(null)
  
  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])
  
  return (
    <>
      <motion.section 
        className="py-12 px-6"
        style={{ backgroundColor: colors.bg.panel }}
        {...SYSTEM_MOUNT.runtime}
      >
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-sm mb-6" style={{ color: colors.text.tertiary }}>
            {'> cat certs'}
          </div>
          <motion.div 
            className="flex flex-wrap gap-6"
            variants={staggerContainerOS}
            initial="hidden"
            animate="visible"
          >
            {CERTIFICATIONS.map((cert, index) => {
              const statusColor = cert.status === 'COMPLETE' 
                ? OS_COLORS.status // Green
                : colors.secondary.main // Amber for IN PROGRESS
              const shouldPulse = cert.status === 'COMPLETE'
              
              return (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center rounded-lg p-4"
                  style={{ 
                    backgroundColor: colors.bg.surface,
                    borderColor: colors.border.hover,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    minWidth: '200px',
                  }}
                  variants={mountVariants}
                  whileHover={{ 
                    opacity: 0.95,
                    borderColor: colors.border.active,
                    boxShadow: `0 0 12px ${OS_COLORS.glow.low}`,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.div 
                    className="relative w-32 h-32 mb-3 rounded overflow-hidden cursor-pointer" 
                    style={{ backgroundColor: '#000000' }}
                    onClick={() => setSelectedImage({ src: cert.image, name: cert.name })}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                  <motion.h3 
                    className="font-mono text-sm text-center mb-2" 
                    style={{ color: colors.text.primary }}
                    whileHover={{ 
                      color: OS_COLORS.main,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {cert.name}
                  </motion.h3>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: statusColor }}
                      animate={shouldPulse ? { opacity: [1, 0.96, 1] } : { opacity: 1 }}
                      transition={shouldPulse ? { duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' } : {}}
                    />
                    <span className="text-xs italic" style={{ color: colors.text.secondary }}>
                      {cert.status}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Modal/Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-xl max-h-[80vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute -top-12 right-0 text-white font-mono text-sm hover:opacity-70 transition-opacity"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                [ESC] Close
              </motion.button>
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
                <div className="relative" style={{ width: '80%', height: '80%' }}>
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.name}
                    width={1200}
                    height={800}
                    className="object-contain w-full h-full"
                    unoptimized
                  />
                </div>
              </div>
              
              {/* Certificate name */}
              <div className="mt-4 text-center">
                <h3 className="font-mono text-lg" style={{ color: colors.text.primary }}>
                  {selectedImage.name}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SkillsSection() {
  const colors = THEME.colors
  
  return (
    <motion.section 
      className="py-12 px-6"
      style={{ backgroundColor: colors.bg.panel }}
      {...SYSTEM_MOUNT.runtime}
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm mb-6" style={{ color: colors.text.tertiary }}>
          {'> cat skills.txt'}
        </div>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerOS}
          initial="hidden"
          animate="visible"
        >
          {Object.entries(SKILLS).map(([category, items]) => (
            <motion.div 
              key={category} 
              className="rounded-lg p-4"
              style={{ 
                backgroundColor: colors.bg.surface,
                borderColor: colors.border.hover,
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
              variants={mountVariants}
              whileHover={{ 
                opacity: 0.95,
                borderColor: colors.border.active,
                boxShadow: `0 0 12px ${OS_COLORS.glow.low}`,
                transition: { duration: 0.2 },
              }}
            >
              <motion.h3 
                className="font-mono text-sm mb-3" 
                style={{ color: colors.text.primary }}
                whileHover={{ 
                  color: OS_COLORS.main,
                  transition: { duration: 0.2 },
                }}
              >
                {category}
              </motion.h3>
              <ul className="space-y-1">
                {items.map((skill, index) => (
                  <li key={index} className="text-sm" style={{ color: colors.text.secondary }}>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

function EducationSection() {
  const colors = THEME.colors
  
  return (
    <motion.section 
      className="pt-4 pb-12 px-6"
      {...SYSTEM_MOUNT.runtime}
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm mb-6" style={{ color: colors.text.tertiary }}>
          {'> cat education.txt'}
        </div>
        <motion.div 
          className="grid md:grid-cols-2 gap-4"
          variants={staggerContainerOS}
          initial="hidden"
          animate="visible"
        >
          {EDUCATION.map((edu, index) => (
            <motion.div 
              key={index} 
              className="rounded-lg p-6"
              style={{ 
                backgroundColor: colors.bg.surface,
                borderColor: colors.border.hover,
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
              variants={mountVariants}
              whileHover={{ 
                opacity: 0.95,
                borderColor: colors.border.active,
                boxShadow: `0 0 12px ${OS_COLORS.glow.low}`,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <CompanyIcon company={edu.university} icon={(edu as any).icon} />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <motion.h3 
                        className="font-mono text-lg" 
                        style={{ color: colors.text.primary }}
                        whileHover={{ 
                          color: OS_COLORS.main,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {edu.degree}
                      </motion.h3>
                      <div className="text-sm" style={{ color: colors.text.secondary }}>{edu.university}</div>
                    </div>
                    <div className="text-sm font-mono text-right ml-4" style={{ color: colors.text.tertiary }}>{edu.graduation}</div>
                  </div>
                </div>
              </div>
              <div className="ml-14">
                {edu.gpa && (
                  <div className="text-xs mb-4" style={{ color: colors.text.secondary }}>{edu.gpa}</div>
                )}
                <div className="mt-4">
                <div className="text-sm font-mono mb-2" style={{ color: colors.text.tertiary }}>Relevant Coursework:</div>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded text-xs"
                      style={{ 
                        backgroundColor: colors.bg.elevated,
                        borderColor: colors.border.hover,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        color: colors.text.secondary,
                      }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
              {edu.honors && edu.honors.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-mono mb-2" style={{ color: colors.text.tertiary }}>Honors & Awards:</div>
                  <div className="flex flex-wrap gap-2">
                    {edu.honors.map((honor, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs"
                        style={{ 
                          backgroundColor: colors.bg.elevated,
                          borderColor: colors.border.hover,
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          color: colors.text.secondary,
                        }}
                      >
                        {honor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {edu.organizations && edu.organizations.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-mono mb-2" style={{ color: colors.text.tertiary }}>Organizations:</div>
                  <div className="flex flex-wrap gap-2">
                    {edu.organizations.map((org, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs"
                        style={{ 
                          backgroundColor: colors.bg.elevated,
                          borderColor: colors.border.hover,
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          color: colors.text.secondary,
                        }}
                      >
                        {org}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

function ExperienceSection() {
  const colors = THEME.colors
  
  if (EXPERIENCE.length === 0) return null

  return (
    <motion.section 
      className="py-12 px-6"
      style={{ backgroundColor: colors.bg.panel }}
      {...SYSTEM_MOUNT.runtime}
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm mb-6" style={{ color: colors.text.tertiary }}>
          {'> cat experience.txt'}
        </div>
        <motion.div 
          className="space-y-4"
          variants={staggerContainerOS}
          initial="hidden"
          animate="visible"
        >
          {EXPERIENCE.map((exp, index) => (
            <motion.div 
              key={index} 
              className="rounded-lg p-6"
              style={{ 
                backgroundColor: colors.bg.surface,
                borderColor: colors.border.hover,
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
              variants={mountVariants}
              whileHover={{ 
                opacity: 0.95,
                borderColor: colors.border.active,
                boxShadow: `0 0 12px ${OS_COLORS.glow.low}`,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-start gap-4 mb-2">
                <CompanyIcon company={exp.company} icon={(exp as any).icon} />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <motion.h3 
                        className="font-mono text-lg" 
                        style={{ color: colors.text.primary }}
                        whileHover={{ 
                          color: OS_COLORS.main,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {exp.role}
                      </motion.h3>
                      <div className="text-sm" style={{ color: colors.text.secondary }}>{exp.company}</div>
                    </div>
                    <div className="text-sm font-mono ml-4" style={{ color: colors.text.tertiary }}>{exp.period}</div>
                  </div>
                </div>
              </div>
              {exp.description && (
                <div className="ml-14">
                  {Array.isArray(exp.description) ? (
                    <ul className="text-sm mt-2 leading-relaxed space-y-1 list-disc list-inside" style={{ color: colors.text.secondary }}>
                      {exp.description.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: colors.text.secondary }}>{exp.description}</p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

function TechnicalInterestsSection() {
  const colors = THEME.colors
  
  return (
    <motion.section 
      className="py-12 px-6"
      style={{ backgroundColor: colors.bg.panel }}
      {...SYSTEM_MOUNT.runtime}
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm mb-6" style={{ color: colors.text.tertiary }}>
          {'> cat interests.txt'}
        </div>
        <motion.div 
          className="rounded-lg p-6"
          style={{ 
            backgroundColor: colors.bg.surface,
            borderColor: colors.border.hover,
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          {...SYSTEM_MOUNT.runtime}
          whileHover={{ 
            borderColor: colors.border.active,
            boxShadow: `0 0 12px ${OS_COLORS.glow.low}`,
            transition: { duration: 0.2 },
          }}
        >
          <ul className="space-y-2">
            {TECHNICAL_INTERESTS.map((interest, index) => (
              <li key={index} className="text-sm" style={{ color: colors.text.secondary }}>
                • {interest}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  )
}

function CareerTrajectorySection() {
  const colors = THEME.colors
  
  return (
    <motion.section 
      className="py-12 px-6"
      {...SYSTEM_MOUNT.runtime}
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm mb-6" style={{ color: colors.text.tertiary }}>
          {'> cat trajectory.txt'}
        </div>
        <motion.div 
          className="rounded-lg p-6"
          style={{ 
            backgroundColor: colors.bg.surface,
            borderColor: colors.border.hover,
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          {...SYSTEM_MOUNT.runtime}
          transition={{ ...SYSTEM_MOUNT.runtime.transition, delay: 0.1 }}
          whileHover={{ 
            borderColor: colors.border.active,
            boxShadow: `0 0 12px ${OS_COLORS.glow.low}`,
            transition: { duration: 0.2 },
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: colors.text.secondary }}>{CAREER_TRAJECTORY}</p>
        </motion.div>
      </div>
    </motion.section>
  )
}

function LicensesCertificationsSection() {
  const colors = THEME.colors
  
  if (LICENSES_CERTIFICATIONS.length === 0) return null

  return (
    <motion.section 
      className="py-12 px-6"
      style={{ backgroundColor: colors.bg.panel }}
      {...SYSTEM_MOUNT.runtime}
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-sm mb-6" style={{ color: colors.text.tertiary }}>
          {'> ls licenses_certifications/'}
        </div>
        <motion.div 
          className="space-y-3"
          variants={staggerContainerOS}
          initial="hidden"
          animate="visible"
        >
          {LICENSES_CERTIFICATIONS.map((cert, index) => (
            <motion.div 
              key={index} 
              className="rounded-lg p-4"
              style={{ 
                backgroundColor: colors.bg.surface,
                borderColor: colors.border.hover,
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
              variants={mountVariants}
              whileHover={{ 
                opacity: 0.95,
                borderColor: colors.border.active,
                boxShadow: `0 0 10px ${OS_COLORS.glow.low}`,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-mono text-sm" style={{ color: colors.text.primary }}>{cert.name}</h3>
                  <div className="text-xs mt-1" style={{ color: colors.text.secondary }}>{cert.issuer}</div>
                </div>
                <div className="text-xs font-mono" style={{ color: colors.text.tertiary }}>{cert.year}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

// ===== Main Page =====
export default function ProfessionalPage() {
  const colors = THEME.colors
  
  return (
    <main 
      className="min-h-screen text-white" 
      style={{ 
        zoom: 0.9,
        backgroundColor: colors.bg.panel,
      }}
    >
      <SystemHeader />
      <div className="pt-12">
        <HeroSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <SkillsSection />
        <TechnicalInterestsSection />
        <CareerTrajectorySection />
        <LicensesCertificationsSection />
        
        {/* Footer */}
        <motion.footer 
          className="py-8 px-6 mt-12"
          style={{ 
            borderTopColor: colors.border.default,
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
          }}
          {...SYSTEM_MOUNT.runtime}
        >
          <div className="max-w-7xl mx-auto text-center">
            <Link 
              href="/"
              className="font-mono text-xs transition-colors inline-block"
              style={{ color: colors.text.tertiary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.text.primary
                e.currentTarget.style.textShadow = `0 0 8px ${OS_COLORS.glow.low}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.text.tertiary
                e.currentTarget.style.textShadow = 'none'
              }}
            >
              {'> exit'}
            </Link>
          </div>
        </motion.footer>
      </div>
    </main>
  )
}
