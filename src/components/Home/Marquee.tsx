'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// Import placeholder images for the marquee
import image1 from '@/assets/slider/slider1.png'
import image2 from '@/assets/slider/slider2.png'

gsap.registerPlugin(ScrollTrigger)

export default function Marquee() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const textContainer = textRef.current

        if (!section || !textContainer) return

        const ctx = gsap.context(() => {
            // Setup continuous looping marquee
            // The container has 4 sets of the text/images. 
            // Moving by -50% means it travels exactly 2 sets, which matches the visual exactly.
            const marqueeTween = gsap.to(textContainer, {
                x: '-50%',
                repeat: -1,
                duration: 60, // Much slower base speed
                ease: 'none'
            })

            ScrollTrigger.create({
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate: (self) => {
                    const velocity = Math.abs(self.getVelocity())
                    const targetSpeed = 1 + (velocity / 200)
                    
                    // Tween to the target speed quickly
                    gsap.to(marqueeTween, {
                        timeScale: Math.min(targetSpeed, 4), // cap max speed lower
                        duration: 0.1,
                        overwrite: true
                    })
                    
                    // Automatically decelerate back to 1 shortly after scrolling stops
                    gsap.to(marqueeTween, {
                        timeScale: 1,
                        duration: 1.5,
                        delay: 0.15,
                        overwrite: 'auto'
                    })
                }
            })

        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-transparent py-24 md:py-32 overflow-hidden relative z-20">
            <div ref={textRef} className="flex whitespace-nowrap w-max">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16">
                        <h2 className="text-[clamp(5rem,10vw,12rem)] font-medium text-[#111212] tracking-tighter leading-none">
                            Not Algorithms
                        </h2>
                        
                        <div className="relative shrink-0 w-[14vw] h-[16vw] min-w-[120px] min-h-[140px] max-w-[240px] max-h-[280px] rounded-2xl md:rounded-[32px] overflow-hidden shadow-xl">
                            <Image src={image1} fill alt="" className="object-cover" sizes="(max-width: 768px) 120px, 240px" />
                        </div>
                        
                        <h2 className="text-[clamp(5rem,10vw,12rem)] font-medium text-[#111212] tracking-tighter leading-none">
                            Chasing Consumers
                        </h2>
                        
                        <div className="relative shrink-0 w-[14vw] h-[16vw] min-w-[120px] min-h-[140px] max-w-[240px] max-h-[280px] rounded-2xl md:rounded-[32px] overflow-hidden shadow-xl">
                            <Image src={image2} fill alt="" className="object-cover" sizes="(max-width: 768px) 120px, 240px" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
