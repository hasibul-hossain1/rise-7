'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const clients = [
    'Gymshark',
    'PlayStation',
    'Next',
    'Revolution Beauty',
    'Halfords',
    'B&Q',
    'Capital One',
    'Monzo'
]

export default function SocialProof() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLHeadingElement>(null)
    const clientsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const text = textRef.current
        const clientsContainer = clientsRef.current

        if (!section || !text || !clientsContainer) return

        const ctx = gsap.context(() => {
            gsap.from(text, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                },
                autoAlpha: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            })

            gsap.from(clientsContainer.children, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                },
                autoAlpha: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#e7e6e0] px-5 py-24 sm:px-8 lg:px-12 text-[#111212] overflow-hidden">
            <div className="mx-auto w-full flex flex-col items-center text-center">
                <h2 ref={textRef} className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight mb-12 opacity-80 uppercase">
                    The agency behind...
                </h2>
                
                <div ref={clientsRef} className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 md:gap-x-24 md:gap-y-16 max-w-[1400px]">
                    {clients.map((client) => (
                        <div key={client} className="text-2xl md:text-[2.5rem] font-black text-[#111212] uppercase tracking-tighter mix-blend-multiply transition-transform hover:scale-110 cursor-pointer">
                            {client}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
