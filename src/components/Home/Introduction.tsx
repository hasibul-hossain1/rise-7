'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import tiktokIt from "@/assets/tiktok-it.webp"

gsap.registerPlugin(ScrollTrigger)

export default function Introduction() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const leftTextRef = useRef<HTMLParagraphElement>(null)
    const buttonsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const title = titleRef.current
        const leftText = leftTextRef.current
        const buttons = buttonsRef.current

        if (!section || !title || !leftText || !buttons) return

        const splitTitle = new SplitType(title, { types: 'lines,words' })

        const ctx = gsap.context(() => {
            // Left text animation
            gsap.from(leftText, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
                autoAlpha: 0,
                x: -30,
                duration: 1,
                ease: 'power3.out'
            })

            // Title animation
            gsap.from(splitTitle.words, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
                y: 50,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power3.out'
            })

            // Buttons animation
            gsap.from(buttons.children, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
                autoAlpha: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.2,
                ease: 'power3.out',
                clearProps: 'all'
            })
        }, section)

        return () => {
            ctx.revert()
            splitTitle.revert()
        }
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#e7e6e0] px-4 md:px-10 py-16 lg:py-24 text-[#111212] rounded-t-[40px] relative z-10 -mt-10">
            <div className="w-full flex flex-col lg:flex-row lg:justify-between items-start gap-8 lg:gap-20">

                {/* Left Side */}
                <div className="w-full lg:w-[28%] lg:pt-4">
                    <p ref={leftTextRef} className="text-[clamp(1.1rem,2vw,1.4rem)] font-bold leading-[1.3] text-black tracking-tight">
                        A global team of search-first content marketers engineering semantic relevancy & category signals for both the internet and people
                    </p>
                </div>

                {/* Right Side */}
                <div className="w-full lg:w-[62%] lg:ml-auto flex flex-col items-start lg:items-end">
                    <h2 ref={titleRef} className="text-[clamp(2rem,6vw,5rem)] font-black leading-[0.9] tracking-tighter mb-10 text-left lg:text-right w-fit lg:ml-auto">
                        Driving Demand &<br />
                        <span className="flex items-center justify-start lg:justify-end gap-4">
                            Discovery
                            <span className="inline-block w-[clamp(3.5rem,9vw,7rem)] h-[clamp(2.5rem,6vw,4.5rem)] bg-black rounded-2xl overflow-hidden shrink-0 mt-2 rotate-[-2deg]">
                                <Image
                                    src={tiktokIt}
                                    className="w-full h-full object-cover"
                                    alt="Discovery"
                                    priority
                                />
                            </span>
                        </span>
                    </h2>

                    <div ref={buttonsRef} className="flex flex-wrap items-center justify-start lg:justify-end gap-4 md:gap-10 relative z-20 w-full">
                        <button className="bg-white text-black px-8 h-[56px] rounded-full flex items-center gap-3 font-bold shadow-sm hover:scale-105 transition-transform duration-300 group whitespace-nowrap">
                            Our Story <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                        </button>
                        <button className="text-black/80 hover:text-black font-bold flex items-center gap-2 transition-all group whitespace-nowrap h-[56px] px-2 hover:opacity-70">
                            Our Services <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}
