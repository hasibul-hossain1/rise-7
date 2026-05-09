'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ArrowUpRight, X } from 'lucide-react'
import { Logo } from '../icons'

const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'International', href: '/international' },
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Webinar', href: '/webinar' },
]

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const overlayRef = useRef<HTMLDivElement>(null)
    const linksRef = useRef<HTMLDivElement>(null)

    // Handle scroll locking
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // Handle animation
    useEffect(() => {
        const overlay = overlayRef.current
        const links = linksRef.current
        if (!overlay || !links) return

        if (isOpen) {
            gsap.to(overlay, { autoAlpha: 1, duration: 0.4, ease: 'power3.out' })
            gsap.fromTo(links.children, 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.1 }
            )
        } else {
            gsap.to(overlay, { autoAlpha: 0, duration: 0.3, ease: 'power3.in' })
        }
    }, [isOpen])

    return (
        <>
            {/* Hamburger Button */}
            <button 
                onClick={() => setIsOpen(true)}
                className="flex lg:hidden flex-col justify-center items-center w-11 h-11 bg-[#111212] rounded-full text-white shrink-0 shadow-sm"
                aria-label="Open mobile menu"
            >
                <div className="w-5 h-[2px] bg-white rounded-full mb-1"></div>
                <div className="w-5 h-[2px] bg-white rounded-full"></div>
            </button>

            {/* Full Screen Overlay */}
            <div 
                ref={overlayRef}
                className="fixed inset-0 z-[200] bg-[#111212]/95 backdrop-blur-2xl flex flex-col px-4 py-6 invisible opacity-0 pointer-events-none"
            >
                <div className="pointer-events-auto h-full flex flex-col">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center mb-12">
                        <Link href="/" onClick={() => setIsOpen(false)} className="h-6 text-white shrink-0">
                            <Logo />
                        </Link>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="flex justify-center items-center w-11 h-11 bg-white/10 rounded-full text-white backdrop-blur-md"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div ref={linksRef} className="flex flex-col gap-6 flex-1 overflow-y-auto pt-4 px-2 pb-24">
                        {navItems.map((item) => (
                            <Link 
                                key={item.label} 
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-[clamp(2.5rem,8vw,3.5rem)] font-bold text-white tracking-tight leading-none"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Bottom Pinned CTA */}
                    <div className="mt-auto pt-6 border-t border-white/20">
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="group flex w-full h-14 items-center justify-center gap-2 rounded-full bg-white text-[16px] font-bold text-[#111212] transition-transform active:scale-95"
                        >
                            Get In Touch <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
