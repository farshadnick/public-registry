import Hero from '@/components/Hero'
import Features from '@/components/Features'
import RegistryTypes from '@/components/RegistryTypes'
import HowItWorks from '@/components/HowItWorks'
import QuickStart from '@/components/QuickStart'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Hero />
      <Features />
      <RegistryTypes />
      <HowItWorks />
      <QuickStart />
      <Footer />
    </main>
  )
}

