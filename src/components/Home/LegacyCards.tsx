'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
    {
        title: 'Pioneers',
        description: 'We don\'t follow best practice, we create it. Our strategies are built to dominate search engines and social platforms.',
        color: 'bg-[#111212]',
        textColor: 'text-white'
    },
    {
        title: 'Award Winning',
        description: 'Recognised globally for our innovative approach to search-first content marketing and digital PR campaigns.',
        color: 'bg-[#b4f3df]',
        textColor: 'text-[#111212]'
    },
    {
        title: 'Speed',
        description: 'We move at the speed of culture. Reacting to trends before they peak, putting our clients at the forefront of the conversation.',
        color: 'bg-[#718494]',
        textColor: 'text-white'
    }
]

export default function LegacyCards() {
    const containerRef = useRef<HTMLElement>(null)
    const cardsWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const cardsWrapper = cardsWrapperRef.current
        
        if (!container || !cardsWrapper) return

        const cardElements = gsap.utils.toArray<HTMLElement>('.legacy-card')
        
        if (cardElements.length === 0) return

        const ctx = gsap.context(() => {
            // Pin the container
            ScrollTrigger.create({
                trigger: container,
                start: 'top top',
                end: `+=${cardElements.length * 100}%`,
                pin: true,
                pinSpacing: true,
            })

            // Animate cards stacking
            cardElements.forEach((card, index) => {
                if (index === 0) return 

                gsap.fromTo(card, 
                    { y: '100vh', scale: 1 },
                    {
                        y: `${index * 32}px`, 
                        scale: 1 - (index * 0.04), 
                        ease: 'none',
                        scrollTrigger: {
                            trigger: container,
                            start: `top+=${(index - 0.5) * 100}% top`,
                            end: `top+=${index * 100}% top`,
                            scrub: 1,
                        }
                    }
                )
            })

        }, container)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="bg-[#e7e6e0] min-h-screen relative overflow-hidden flex items-center justify-center -mt-10 pt-20">
            <div className="absolute top-20 left-10 md:left-20 z-10">
                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black text-[#111212] leading-none uppercase tracking-tighter">
                    A Legacy <br />In The Making
                </h2>
            </div>

            <div ref={cardsWrapperRef} className="relative w-full max-w-4xl mx-auto px-5 h-[60vh] md:h-[70vh] flex items-center justify-center mt-20">
                {cards.map((card, index) => (
                    <div 
                        key={index} 
                        className={`legacy-card absolute top-0 left-0 w-full h-full rounded-[40px] p-10 md:p-16 flex flex-col justify-between ${card.color} ${card.textColor} shadow-2xl origin-top`}
                        style={{ zIndex: index + 1 }}
                    >
                        <div>
                            <span className="text-xl md:text-2xl font-bold opacity-60">0{index + 1}</span>
                            <h3 className="mt-4 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.9] tracking-tighter uppercase">
                                {card.title}
                            </h3>
                        </div>
                        <p className="max-w-xl text-lg md:text-2xl font-bold leading-tight">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
            
            <div className="absolute bottom-10 right-10 md:right-20 z-50">
                <a href="/contact" className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-black rounded-full text-black font-bold text-lg overflow-hidden transition-colors hover:text-white">
                    <span className="absolute inset-0 bg-black translate-y-[100%] rounded-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                    <span className="relative z-10 flex items-center gap-2">
                        Send Us Your Brief <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                </a>
            </div>
        </section>
    )
}
