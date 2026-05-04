'use client'

import gsap from 'gsap'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Logo } from '../icons'

const navItems = [
    { label: 'Services +', href: '/services' },
    { label: 'International +', href: '/international' },
    { label: 'About +', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Webinar', href: '/webinar' },
]

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null)
    const ctaRef = useRef<HTMLAnchorElement>(null)
    const isHiddenRef = useRef(false)

    const morphCta = (isActive: boolean) => {
        const cta = ctaRef.current

        if (!cta) {
            return
        }

        const pillRadius = window.matchMedia('(min-width: 640px)').matches ? 24 : 22

        gsap.to(cta, {
            borderRadius: isActive ? 13 : pillRadius,
            duration: 0.72,
            ease: 'power4.out',
            overwrite: 'auto',
        })
    }

    useEffect(() => {
        const nav = navRef.current
        const cta = ctaRef.current

        if (!nav) return

        // Initial state: hidden
        gsap.set(nav, { autoAlpha: 0, yPercent: -100 })
        isHiddenRef.current = true

        let heroNavVisible = false

        const setNavVisibility = (hidden: boolean) => {
            if (isHiddenRef.current === hidden) return
            isHiddenRef.current = hidden

            gsap.to(nav, {
                autoAlpha: hidden ? 0 : 1,
                yPercent: hidden ? -100 : 0,
                duration: 0.4,
                ease: 'power3.out',
                overwrite: 'auto'
            })
        }

        // Intersection Observer for Hero Nav
        const heroNav = document.querySelector('[data-hero-nav]')
        const observer = new IntersectionObserver(
            ([entry]) => {
                heroNavVisible = entry.isIntersecting
                if (heroNavVisible) setNavVisibility(true)
            },
            { threshold: 0 }
        )

        if (heroNav) observer.observe(heroNav)

        // Scroll listener
        let lastScroll = window.scrollY
        const handleScroll = () => {
            const currentScroll = window.scrollY
            const delta = currentScroll - lastScroll
            
            // Threshold to avoid jitter
            if (Math.abs(delta) < 5) return
            
            lastScroll = currentScroll

            // If hero nav is in view, always hide
            if (heroNavVisible || currentScroll < 100) {
                setNavVisibility(true)
                return
            }

            // Past hero: show on scroll up, hide on scroll down
            setNavVisibility(delta > 0)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
            gsap.killTweensOf(nav)
            if (cta) gsap.killTweensOf(cta)
        }
    }, [])

    return (
        <header
            ref={navRef}
            className="fixed left-0 top-0 z-[100] w-full px-1.5 py-1.5 pointer-events-none md:px-2"
        >
            <nav
                aria-label="Primary navigation"
                className="mx-auto flex min-h-16 w-full max-w-[1880px] items-center justify-between rounded-[32px] bg-[#d8d3d8]/90 px-5 text-[#080808] shadow-[0_16px_70px_rgba(0,0,0,0.16)] backdrop-blur-2xl pointer-events-auto sm:px-7 lg:px-10"
            >
                <Link
                    href="/"
                    className="flex shrink-0 items-center text-[clamp(1.35rem,2vw,1.68rem)] font-semibold leading-none tracking-normal"
                    aria-label="Rise at Seven home"
                >
                    <div className='h-6'>
                        <Logo />
                    </div>
                </Link>

                <div className="hidden items-center gap-[clamp(1.25rem,3.1vw,3.2rem)] text-base font-semibold leading-none lg:flex">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.href} className="transition-opacity hover:opacity-60">
                            {item.label}
                        </Link>
                    ))}
                </div>

                <Link
                    ref={ctaRef}
                    href="/contact"
                    onBlur={() => morphCta(false)}
                    onFocus={() => morphCta(true)}
                    onPointerEnter={() => morphCta(true)}
                    onPointerLeave={() => morphCta(false)}
                    className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[22px] bg-[#111212] px-5 text-sm font-bold text-white [transform:translateZ(0)] [will-change:border-radius] sm:h-12 sm:rounded-[24px] sm:px-7"
                >
                    <span className="relative inline-block h-[1.1em] overflow-hidden whitespace-nowrap leading-none sm:hidden">
                        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2">
                            <span className="flex items-center gap-2">
                                <span>Contact</span>
                                <ArrowUpRight size={16} />
                            </span>
                            <span className="flex items-center gap-2">
                                <span>Contact</span>
                                <ArrowUpRight size={16} />
                            </span>
                        </span>
                    </span>
                    <span className="relative hidden h-[1.1em] overflow-hidden whitespace-nowrap leading-none sm:inline-block">
                        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2">
                            <span className="flex items-center gap-2">
                                <span>Get In Touch</span>
                                <ArrowUpRight size={18} />
                            </span>
                            <span className="flex items-center gap-2">
                                <span>Get In Touch</span>
                                <ArrowUpRight size={18} />
                            </span>
                        </span>
                    </span>
                </Link>
            </nav>
        </header>
    )
}
