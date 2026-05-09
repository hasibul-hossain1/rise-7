'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

// Using hero-image as placeholder for the people working
import iconImage from '@/assets/hero-image.webp'

const serviceRows = [
    ['Digital PR', 'Organic Social & Content'],
    ['Search & Growth Strategy', 'Content Experience'],
    ['Data & Insights', 'Onsite SEO']
]

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const rowsRef = useRef<HTMLDivElement>(null)

    const morphCta = (e: React.PointerEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>, isActive: boolean) => {
        const cta = e.currentTarget
        const pillRadius = window.matchMedia('(min-width: 640px)').matches ? 24 : 22
        gsap.to(cta, {
            borderRadius: isActive ? 12 : pillRadius,
            duration: 0.72,
            ease: 'power4.out',
            overwrite: 'auto',
        })
    }

    useEffect(() => {
        const section = sectionRef.current
        const header = headerRef.current
        const rows = rowsRef.current

        if (!section || !header || !rows) return

        const ctx = gsap.context(() => {
            // Animate header and elements
            gsap.from([header, ...rows.children], {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#e7e6e0] text-[#111212] py-16 md:py-24 rounded-t-[40px] relative z-30 -mt-10">
            <div className="mx-auto max-w-[1880px] px-5 sm:px-8 lg:px-12">
                
                {/* Top centered button */}
                <div className="flex justify-center mb-16 md:mb-24">
                    <Link
                        href="/work"
                        onBlur={(e) => morphCta(e, false)}
                        onFocus={(e) => morphCta(e, true)}
                        onPointerEnter={(e) => morphCta(e, true)}
                        onPointerLeave={(e) => morphCta(e, false)}
                        className="group inline-flex h-11 sm:h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[22px] sm:rounded-[24px] bg-white px-5 sm:px-7 text-sm font-bold text-[#111212] [transform:translateZ(0)] [will-change:border-radius] shadow-sm"
                    >
                        <span className="relative inline-block h-[1.1em] overflow-hidden whitespace-nowrap leading-none">
                            <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2">
                                <span className="flex items-center gap-2">
                                    <span>Explore Our Work</span>
                                    <ArrowUpRight size={16} />
                                </span>
                                <span className="flex items-center gap-2">
                                    <span>Explore Our Work</span>
                                    <ArrowUpRight size={16} />
                                </span>
                            </span>
                        </span>
                    </Link>
                </div>

                {/* Header Row */}
                <div ref={headerRef} className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 border-b border-black/10 pb-12 gap-8 lg:gap-0">
                    <h2 className="text-[clamp(4rem,9vw,9.5rem)] font-medium leading-[0.85] tracking-tighter flex items-center flex-wrap">
                        Our 
                        <span className="w-[80px] h-[80px] md:w-[130px] md:h-[130px] rounded-[32px] overflow-hidden relative shrink-0 mx-3 md:mx-5 inline-block align-middle transform translate-y-[-5%] shadow-lg">
                            <Image 
                                src={iconImage} 
                                alt="Services" 
                                fill 
                                className="object-cover" 
                                sizes="(max-width: 768px) 80px, 130px"
                            />
                        </span>
                        Services
                    </h2>
                    
                    <div className="shrink-0 lg:mb-4">
                        <Link
                            href="/services"
                            onBlur={(e) => morphCta(e, false)}
                            onFocus={(e) => morphCta(e, true)}
                            onPointerEnter={(e) => morphCta(e, true)}
                            onPointerLeave={(e) => morphCta(e, false)}
                            className="group inline-flex h-11 sm:h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[22px] sm:rounded-[24px] bg-white px-5 sm:px-7 text-sm font-bold text-[#111212] [transform:translateZ(0)] [will-change:border-radius] shadow-sm"
                        >
                            <span className="relative inline-block h-[1.1em] overflow-hidden whitespace-nowrap leading-none">
                                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2">
                                    <span className="flex items-center gap-2">
                                        <span>View All Services</span>
                                        <ArrowUpRight size={16} />
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span>View All Services</span>
                                        <ArrowUpRight size={16} />
                                    </span>
                                </span>
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Services Grid List */}
                <div ref={rowsRef} className="flex flex-col">
                    {serviceRows.map((row, i) => (
                        <div key={i} className="flex flex-col md:flex-row border-b border-black/10 py-6 md:py-10 gap-4 md:gap-8">
                            {row.map((service, j) => (
                                <div key={j} className="w-full md:w-1/2 flex items-center">
                                    <div className="group relative inline-flex items-center px-4 md:px-6 py-2 md:py-3 -ml-4 md:-ml-6 cursor-pointer rounded-full transition-all duration-500">
                                        
                                        {/* Hover Background Image */}
                                        <div className="absolute inset-0 opacity-0 scale-[0.98] group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out z-0 rounded-full overflow-hidden pointer-events-none">
                                            <Image 
                                                src={iconImage} 
                                                alt={service} 
                                                fill 
                                                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                            />
                                            <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 flex items-center text-[#111212] group-hover:text-white transition-colors duration-500">
                                            {/* Arrow Container */}
                                            <div className="overflow-hidden flex items-center justify-start transition-all duration-500 ease-out w-0 opacity-0 -translate-x-4 group-hover:w-10 md:group-hover:w-14 group-hover:opacity-100 group-hover:translate-x-0">
                                                <ArrowUpRight strokeWidth={2.5} className="w-8 h-8 md:w-10 md:h-10 shrink-0" />
                                            </div>
                                            
                                            {/* Text */}
                                            <h3 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-medium tracking-tight whitespace-nowrap">
                                                {service}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
