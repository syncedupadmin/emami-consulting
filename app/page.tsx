import NavBar from '@/components/sections/NavBar'
import Hero from '@/components/sections/Hero'
import StatBand from '@/components/sections/StatBand'
import CoreRead from '@/components/sections/CoreRead'
import Problem from '@/components/sections/Problem'
import Expert from '@/components/sections/Expert'
import Offer from '@/components/sections/Offer'
import WizardPreview from '@/components/sections/WizardPreview'
import Journey from '@/components/sections/Journey'
import RevenueLadder from '@/components/sections/RevenueLadder'
import TwoTracks from '@/components/sections/TwoTracks'
import BuildPlan from '@/components/sections/BuildPlan'
import Engage from '@/components/sections/Engage'
import Footer from '@/components/sections/Footer'

export const metadata = {
  title: 'Emami Consulting | Dental Technology Roadmaps',
  description: 'Expert-reviewed, vendor-neutral dental technology roadmaps for practices ready to invest wisely. Buy clarity before you buy technology.',
}

export default function Home() {
  return (
    <main id="main">
      <NavBar />
      <Hero />
      <StatBand />
      <CoreRead />
      <Problem />
      <Expert />
      <Offer />
      <WizardPreview />
      <Journey />
      <RevenueLadder />
      <TwoTracks />
      <BuildPlan />
      <Engage />
      <Footer />
    </main>
  )
}
