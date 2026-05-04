'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const services = [
    { id: '01', title: 'SEO', subtitle: 'Search Engine Optimisation' },
    { id: '02', title: 'Digital PR', subtitle: 'Link Building & PR Campaigns' },
    { id: '03', title: 'Social Media', subtitle: 'Organic & Paid Social' },
    { id: '04', title: 'Content', subtitle: 'Creative & Strategy' },
    { id: '05', title: 'Data & Analytics', subtitle: 'Measurement & Insights' }
]

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null)
    const itemsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const itemsContainer = itemsRef.current

        if (!section || !itemsContainer) return

        const ctx = gsap.context(() => {
            gsap.from(itemsContainer.children, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                },
                autoAlpha: 0,
                y: 50,
                duration: 1,
                stagger: 0.15,
                ease: 'expo.out'
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#e7e6e0] text-[#111212] py-32 rounded-t-[40px] relative z-30 -mt-10">
            <div className="mx-auto max-w-[1880px] px-5 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row gap-12 justify-between items-start mb-24">
                    <h2 className="text-[clamp(3.5rem,6vw,6rem)] font-black leading-[0.85] tracking-tighter uppercase">
                        Our Core <br />Services
                    </h2>
                    <p className="max-w-md text-lg md:text-xl font-bold leading-tight">
                        We build category leaders using a unique blend of organic marketing services designed to dominate search engines and social feeds.
                    </p>
                </div>

                <div ref={itemsRef} className="flex flex-col border-t-2 border-black/10">
                    {services.map((service) => (
                        <a 
                            key={service.id} 
                            href={`/services/${service.title.toLowerCase().replace(/ /g, '-')}`}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b-2 border-black/10 hover:border-black transition-colors duration-300"
                        >
                            <div className="flex items-start gap-8">
                                <span className="text-xl md:text-2xl font-bold text-black/40 mt-3">{service.id}</span>
                                <div>
                                    <h3 className="text-[clamp(3.5rem,7vw,7.5rem)] font-black leading-[0.85] tracking-tighter uppercase group-hover:translate-x-6 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform">
                                        {service.title}
                                    </h3>
                                    <p className="mt-4 text-lg md:text-2xl font-bold text-black/60 group-hover:translate-x-6 transition-transform duration-700 delay-75 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform">
                                        {service.subtitle}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-8 md:mt-0 opacity-0 -translate-x-12 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hidden md:block will-change-transform">
                                <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
                                    <span className="text-white text-3xl">→</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
