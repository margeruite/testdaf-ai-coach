import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TestDaF AI Coach - Your Personal German Language Tutor',
  description: 'Master TestDaF with AI-powered personalized coaching. Native language support, intelligent feedback, and adaptive learning paths.',
  keywords: ['TestDaF', 'German language', 'AI tutor', 'language learning', 'exam preparation'],
  authors: [{ name: 'TestDaF AI Team' }],
  openGraph: {
    title: 'TestDaF AI Coach',
    description: 'Your personal AI tutor for TestDaF success',
    type: 'website',
    locale: 'en_US',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#006A6B',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}