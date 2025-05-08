import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Muñe Chic - Boutique',
  description: 'Tu destino premium de moda',
  icons: {
    icon: [
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/images/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/manifest.json',
  themeColor: '#fde3ec',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50`}>
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <Navbar />
        </header>
        
        <main className="min-h-screen max-w-[1400px] mx-auto px-6 md:px-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
} 