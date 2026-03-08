import { CTASection } from '../components/landing/cta-section'
import { DashboardPreview } from '../components/landing/DashboardPreview'
import FAQSection from '../components/landing/FAQSection'
import { FeaturesSection } from '../components/landing/features-section'
import LandingFinanceSection from '../components/landing/FinanceSection'
import { Footer } from '../components/landing/footer'
import HeroSection from '../components/landing/hero-section'
import { Navbar } from '../components/landing/navbar'

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col bg-background font-serif'>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DashboardPreview />
      <LandingFinanceSection />
      {/* <PrescriptionSection/> */}
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
