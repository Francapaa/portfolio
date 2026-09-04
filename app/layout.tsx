import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Francisco Caparruva — Software Engineer',
  description: 'Portfolio of Francisco Caparruva, software engineer and AI builder crafting interfaces, infrastructure, and intelligent systems.',
  generator: 'v0.app',
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
