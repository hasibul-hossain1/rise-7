'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ReadyToRise() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const text = textRef.current

        if (!section || !text) return

        const ctx = gsap.context(() => {
            // Text scrub animation
            gsap.fromTo(text, 
                { x: '100vw' }, 
                { 
                    x: '-100%', 
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    }
                }
            )
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#e7e6e0] py-24 md:py-40 overflow-hidden relative z-20">
            <div className="w-full flex items-center justify-start">
                <h2 
                    ref={textRef} 
                    className="text-[clamp(8rem,18vw,22rem)] font-medium leading-none tracking-tighter text-[#111212] whitespace-nowrap will-change-transform"
                >
                    Ready to Ris<span className="text-[0.6em] relative -top-[0.4em]">e</span> at Seven?
                </h2>
            </div>
        </section>
    )
}
