import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WhyFoundersSection } from "@/components/why-founders-section"
import { DeliveryFrameworkSection } from "@/components/delivery-framework-section"
import { TechExpertiseSection } from "@/components/tech-expertise-section"
import { TeamSection } from "@/components/team-section"
import { SelectedWorkSection } from "@/components/selected-work-section"
import { BookCallSection } from "@/components/book-call-section"
import { SocialFooterSection } from "@/components/social-footer-section"

export default function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <WhyFoundersSection />
        <DeliveryFrameworkSection />
        <TechExpertiseSection />
        <TeamSection />
        <SelectedWorkSection />
        <BookCallSection />
      </main>
      <SocialFooterSection />
    </div>
  )
}
