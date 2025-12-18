import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Teamir Teshome - Portfolio',
  description: 'Welcome to my portfolio',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

