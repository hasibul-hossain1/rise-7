import React from 'react'
import Navbar from '@/components/Home/Navbar'
import Hero from '@/components/Home/Hero'
import SocialProof from '@/components/Home/SocialProof'
import Introduction from '@/components/Home/Introduction'
import FeaturedWork from '@/components/Home/FeaturedWork'
import Services from '@/components/Home/Services'
import Marquee from '@/components/Home/Marquee'
import LegacyCards from '@/components/Home/LegacyCards'
import Insights from '@/components/Home/Insights'
import Footer from '@/components/Home/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#e7e6e0] text-white overflow-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <Introduction />
      <FeaturedWork />
      <Services />
      <Marquee />
      <LegacyCards />
      <Insights />
      <Footer />
    </main>
  )
}
