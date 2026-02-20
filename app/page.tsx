import { CTASection } from '../components/landing/cta-section'
import { FeaturesSection } from '../components/landing/features-section'
import { Footer } from '../components/landing/footer'
import { HeroSection } from '../components/landing/hero-section'
import { Navbar } from '../components/landing/navbar'
import { TechStackSection } from '../components/landing/tech-stack-section'

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col bg-background'>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TechStackSection />
      <CTASection />
      <Footer/>
    </main>
  )
}
