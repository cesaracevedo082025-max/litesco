'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ConsentProvider from '@/components/ui/ConsentProvider'

export default function SiteChrome({ children }) {
  const pathname = usePathname()
  const isCms = pathname?.startsWith('/cms-servicios')

  // El CMS es un panel interno para administradores: no lleva navbar,
  // footer, botón de WhatsApp ni banner de cookies del sitio público.
  if (isCms) {
    return children
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <ConsentProvider />
      <Navbar />
      <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 bg-stone-900">
        {children}
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  )
}
