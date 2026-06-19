import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'
import ScrollProgress from '@/components/ui/ScrollProgress'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Emami Consulting — Dental Technology Roadmap Engine',
  description:
    'An expert decision system that turns expensive dental-technology decisions into clear, expert-reviewed implementation roadmaps. Led by Dr. Justin Emami, DDS.',
  openGraph: {
    title: 'Emami Consulting — Dental Technology Roadmap Engine',
    description: 'Buy clarity before buying technology.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B1A28',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}
      style={
        {
          '--display': 'var(--font-fraunces), Georgia, serif',
          '--ui': 'var(--font-inter), system-ui, sans-serif',
          '--mono': 'var(--font-mono), ui-monospace, monospace',
        } as React.CSSProperties
      }
    >
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <LenisProvider>
          <ScrollProgress />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
