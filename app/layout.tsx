import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://franciscocaparruva.com'),
  title: 'Francisco Caparruva — Software Engineer',
  description: 'Ingeniero de Software | AI Engineer',
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Francisco Caparruva — Software Engineer',
    description: 'Ingeniero de Software | AI Engineer',
    url: '/',
    type: 'website',
    siteName: 'Francisco Caparruva Portfolio',
    images: [
      {
        url: '/Fran.png',
        width: 1200,
        height: 630,
        alt: 'Francisco Caparruva — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Francisco Caparruva — Software Engineer',
    description: 'Ingeniero de Software | AI Engineer',
    images: ['/Fran.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
    ],
    apple: {
      url: '/apple-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
