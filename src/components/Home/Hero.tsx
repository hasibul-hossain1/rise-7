'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LeftPaddy, Logo, RightPaddy } from '../icons'
import heroImage from '@/assets/hero-image.webp'
import { ArrowUpRight } from 'lucide-react'
import MobileMenu from './MobileMenu'

const platformLogos = [
  'Google',
  'ChatGPT',
  'Gemini',
  'TikTok',
  'YouTube',
  'Pinterest',
  'GIPHY',
  'reddit',
  'amazon',
]

const Badge = () => (
  <div className="flex items-center gap-6 text-white/90">
    {/* Left Laurel */}

    <div className="flex flex-col items-center">
      <p className="max-w-[180px] text-[10px] font-black uppercase tracking-[0.2em] leading-tight text-center opacity-70">
        #1 Most recommended content marketing agency
      </p>
      <div className="mt-4 flex items-center gap-4">
        <LeftPaddy />
        <div className="flex items-center gap-2">
          {['GLOBAL SEARCH AWARDS', 'THE DRUM', 'UK SOCIAL', 'CONTENT AWARDS'].map((award) => (
            <div key={award} className="flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/5 px-2.5 py-1 backdrop-blur-md">
              <span className="text-[9px] font-black uppercase tracking-tighter whitespace-nowrap text-white/90">{award}</span>
            </div>
          ))}
        </div>
        <RightPaddy />
      </div>
    </div>
  </div>
)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const morphCta = (isActive: boolean) => {
    const cta = ctaRef.current
    if (!cta) return
    const pillRadius = 24
    gsap.to(cta, {
      borderRadius: isActive ? 13 : pillRadius,
      duration: 0.72,
      ease: 'power4.out',
      overwrite: 'auto',
    })
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-reveal]', {
        autoAlpha: 0,
        y: 40,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.1,
        clearProps: 'all'
      })

      gsap.to('[data-hero-bg]', {
        scale: 1.1,
        duration: 20,
        ease: 'linear',
        repeat: -1,
        yoyo: true
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#e7e6e0] p-1.5 text-white">
      {/* Top Banner */}
      <a
        href="/reports"
        className="mb-2 flex min-h-8 items-center justify-center rounded-2xl bg-[#b4f3df] px-4 text-center text-sm font-semibold tracking-tight text-[#111212] transition-transform hover:scale-[1.01]"
      >
        <span className="mr-2">🚨</span>
        Where are your customers actually searching? Download the report
      </a>

      <div className="relative min-h-[calc(100vh-56px)] overflow-hidden rounded-[26px] bg-[#111212] px-2 pb-8 pt-20 lg:pt-28 sm:px-4 lg:px-6">
        {/* Navigation Wrapper */}
        <nav data-hero-nav className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-2 pt-4 sm:px-10 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <div className="h-6 text-white transition-opacity hover:opacity-80">
              <Logo />
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-[14px] font-bold tracking-tight text-white/90 lg:flex">
            <Link href="/services" className="transition-colors hover:text-white">Services +</Link>
            <Link href="/international" className="transition-colors hover:text-white">International +</Link>
            <Link href="/about" className="transition-colors hover:text-white">About +</Link>
            <Link href="/work" className="relative transition-colors hover:text-white">
              Work
              <span className="absolute -right-6 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#b4f3df] px-1 text-[10px] font-black text-[#111212]">25</span>
            </Link>
            <Link href="/careers" className="transition-colors hover:text-white">Careers</Link>
            <Link href="/blog" className="transition-colors hover:text-white">Blog</Link>
            <Link href="/webinar" className="transition-colors hover:text-white">Webinar</Link>
          </div>

          <Link
            ref={ctaRef}
            href="/contact"
            onBlur={() => morphCta(false)}
            onFocus={() => morphCta(true)}
            onPointerEnter={() => morphCta(true)}
            onPointerLeave={() => morphCta(false)}
            className="group hidden lg:inline-flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[24px] bg-white px-6 text-[14px] font-bold text-[#111212] transform-[translateZ(0)] will-change-[border-radius] transition-all"
          >
            <span className="relative inline-block h-[1.1em] overflow-hidden whitespace-nowrap leading-none">
              <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2">
                <span className="flex items-center gap-2">
                  <span>Get In Touch</span>
                  <ArrowUpRight size={16} />
                </span>
                <span className="flex items-center gap-2">
                  <span>Get In Touch</span>
                  <ArrowUpRight size={16} />
                </span>
              </span>
            </span>
          </Link>

          {/* Mobile Hamburger Menu */}
          <MobileMenu />
        </nav>

        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <div data-hero-bg className="absolute inset-0 origin-center scale-105">
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover object-center opacity-90 blur-[5px]"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-[#050b3d]/40 via-transparent to-[#111212]/70" />
          <div className="absolute inset-0 bg-[#050b3d]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(113,132,148,0.2)_0%,rgba(5,11,61,0.4)_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[calc(100vh-200px)] flex-col justify-between">
          <div className="flex flex-1 flex-col items-center justify-center pt-8 lg:pt-10 text-center">
            {/* Awards Badge */}
            <div data-hero-reveal className="mb-8 lg:mb-12">
              <Badge />
            </div>

            {/* Main Headline */}
            <h1
              data-hero-reveal
              className="flex max-w-8xl flex-col items-center text-[clamp(2.8rem,10.5vw,9rem)] font-black leading-[0.85] tracking-[-0.04em] text-white"
            >
              <span className="block">We Create</span>
              <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 text-center sm:gap-x-4 sm:gap-y-2">
                <span>Category</span>
                <span className="relative inline-flex h-[0.9em] w-[1.2em] sm:w-[0.9em] shrink-0 overflow-hidden rounded-[18px] shadow-2xl shadow-black/50 sm:rounded-[32px] lg:rounded-[40px]">
                  <Image
                    src={heroImage}
                    alt="Red Bull"
                    fill
                    className="object-cover scale-110"
                  />
                </span>
                <span>Leaders</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p data-hero-reveal className="mt-8 text-[clamp(1.25rem,2.2vw,2rem)] font-bold tracking-tight text-white/95">
              on every searchable platform
            </p>

            {/* Platform Logos */}
            <div
              data-hero-reveal
              className="mt-10 lg:mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 lg:gap-x-10 lg:gap-y-6 px-4"
            >
              {platformLogos.map((logo) => (
                <span key={logo} className="text-sm font-black uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                  {logo}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Info */}
          <div
            data-hero-reveal
            className="mt-10 lg:mt-16 grid gap-6 lg:gap-8 border-t border-white/10 pt-6 lg:pt-8 text-[15px] font-bold leading-snug text-white/80 md:grid-cols-2"
          >
            <p className="max-w-md">
              Organic media planners creating, distributing & optimising search-first content for SEO, Social, PR, Ai and LLM search
            </p>
            <div className="flex flex-col md:items-end">
              <p className="text-white">4 Global Offices serving</p>
              <p>UK, USA (New York) & EU</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
