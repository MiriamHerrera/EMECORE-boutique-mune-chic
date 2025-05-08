import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </header>
      
      <main className="min-h-screen max-w-[1400px] mx-auto px-6 md:px-8">
        {children}
      </main>

      <Footer />
    </>
  )
} 