'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Introduction() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const textRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const title = titleRef.current
        const text = textRef.current

        if (!section || !title || !text) return

        // Wait a tick for fonts to render, or just run immediately
        const splitTitle = new SplitType(title, { types: 'lines,words,chars' })
        
        const ctx = gsap.context(() => {
            gsap.from(splitTitle.chars, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                },
                autoAlpha: 0,
                y: 50,
                rotateX: -90,
                stagger: 0.02,
                duration: 1,
                ease: 'back.out(1.7)',
                transformOrigin: '50% 50% -50px'
            })

            gsap.from(text, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 65%',
                },
                autoAlpha: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.3
            })
        }, section)

        return () => {
            ctx.revert()
            splitTitle.revert()
        }
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#e7e6e0] px-5 py-24 sm:px-8 lg:px-12 text-[#111212] rounded-t-[40px] relative z-10 -mt-10">
            <div className="mx-auto max-w-6xl flex flex-col items-center text-center">
                <h2 ref={titleRef} className="text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.9] tracking-tighter mb-12 [perspective:1000px]">
                    Driving Demand<br />
                    <span className="inline-flex items-center gap-4">
                        &amp; Discovery
                        <span className="inline-block w-[clamp(4rem,10vw,8rem)] h-[clamp(2rem,5vw,4rem)] bg-black rounded-full overflow-hidden shrink-0 mt-2">
                            <Image src="https://rise-atseven.transforms.svdcdn.com/production/images/Rise-at-Seven-Homepage-GIF-2.gif?auto=format&dm=1750948726&fit=crop&q=100&w=300" className="w-full h-full object-cover opacity-80" alt="Decoration" width={300} height={150} unoptimized />
                        </span>
                    </span>
                </h2>
                
                <p ref={textRef} className="max-w-3xl text-[clamp(1.2rem,2.5vw,2rem)] font-bold leading-tight text-black/80">
                    We are a search-first content marketing agency that builds category leaders on every searchable platform.
                </p>

                <div className="mt-16 flex gap-4">
                    <a href="/about" className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-black rounded-full text-black font-bold text-lg overflow-hidden transition-colors hover:text-white">
                        <span className="absolute inset-0 bg-black translate-y-[100%] rounded-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                        <span className="relative z-10 flex items-center gap-2">
                            Find out more <span className="transition-transform group-hover:translate-x-1">→</span>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    )
}
