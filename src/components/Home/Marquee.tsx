'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Marquee() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const textContainer = textRef.current

        if (!section || !textContainer) return

        const ctx = gsap.context(() => {
            // Animate horizontally based on scroll
            gsap.to(textContainer, {
                xPercent: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#b4f3df] text-[#111212] py-20 overflow-hidden relative z-20 -mt-10 rounded-t-[40px]">
            <div ref={textRef} className="whitespace-nowrap flex items-center w-[200vw]">
                <h2 className="text-[clamp(6rem,12vw,14rem)] font-black uppercase leading-none tracking-tighter">
                    Chasing Consumers <span className="text-black/30">Not Algorithms</span>&nbsp;&nbsp;—&nbsp;&nbsp;Chasing Consumers <span className="text-black/30">Not Algorithms</span>&nbsp;&nbsp;—&nbsp;&nbsp;
                </h2>
            </div>
        </section>
    )
}
