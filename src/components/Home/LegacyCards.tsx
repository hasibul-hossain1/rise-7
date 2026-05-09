'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const cards = [
    {
        title: 'Pioneers',
        description: 'We\'re dedicated to creating the industry narrative that others\nfollow 3 years from now. We paved the path for creative\nSEO, multi-channel search with Digital PR, and Social Search and\nwe will continue to do it.\n\nWe\'re on a mission to be the first search-first agency to win a\nCannes Lion disrupting the status quo.',
        color: 'bg-[#111212]',
        textColor: 'text-white',
        image: '/pioneers.png',
        rotation: 4
    },
    {
        title: 'Award\nWinning',
        description: 'A roll top bath full of 79 awards. Voted The Drum\'s best\nagency outside of London. We are official judges for industry\nawards including Global Search Awards and Global Content\nMarketing Awards.',
        color: 'bg-[#b4f3df]',
        textColor: 'text-[#111212]',
        image: '/award.png',
        rotation: -4
    },
    {
        title: 'Speed',
        description: 'People ask us why we are called Rise at Seven? Ever heard the\nsaying Early Bird catches the worm? Google is moving fast, but\nhumans are moving faster. We chase consumers, not algorithms.\nWe\'ve created a service which takes ideas to result within\n60 minutes.',
        color: 'bg-[#ffffff]',
        textColor: 'text-[#111212]',
        image: '/speed.png',
        rotation: 3
    }
]

export default function LegacyCards() {
    const containerRef = useRef<HTMLElement>(null)
    const cardsWrapperRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLAnchorElement>(null)

    const morphCta = (isActive: boolean) => {
        const cta = ctaRef.current
        if (!cta) return
        const pillRadius = window.matchMedia('(min-width: 640px)').matches ? 28 : 24
        gsap.to(cta, {
            borderRadius: isActive ? 14 : pillRadius,
            duration: 0.72,
            ease: 'power4.out',
            overwrite: 'auto',
        })
    }

    useEffect(() => {
        const container = containerRef.current
        const cardsWrapper = cardsWrapperRef.current

        if (!container || !cardsWrapper) return

        const cardElements = gsap.utils.toArray<HTMLElement>('.legacy-card')

        if (cardElements.length === 0) return

        const ctx = gsap.context(() => {
            // Initial setting for rotation
            cardElements.forEach((card, index) => {
                gsap.set(card, { rotation: cards[index].rotation })
            })

            // Create a main timeline that pins the section and drives animations sequentially
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: `+=${(cardElements.length - 1) * 100}%`,
                    scrub: 1,
                    pin: true,
                }
            })

            // Animate cards moving UP and OUT sequentially
            cardElements.forEach((card, index) => {
                // The last card stays in place
                if (index === cardElements.length - 1) return

                tl.to(card, {
                    y: '-150vh',
                    rotation: cards[index].rotation * 2, // Exaggerate rotation slightly as it moves out
                    ease: 'none',
                })
            })

        }, container)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="bg-[#e7e6e0] min-h-screen relative overflow-hidden flex items-center justify-center">
            {/* Top tiny heading and V shape */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center flex flex-col items-center">
                {/* <div className="w-20 h-20 bg-[#111212] rotate-45 -translate-y-16 rounded-sm absolute" /> */}
                <h2 className="font-bold text-[#111212] font-sans tracking-tight relative mt-4 whitespace-nowrap">
                    A Legacy In The Making
                </h2>
            </div>

            <div ref={cardsWrapperRef} className="relative w-[90vw] max-w-[550px] h-[65vh] min-h-[550px] flex items-center justify-center mt-12">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`legacy-card absolute top-0 left-0 w-full h-full rounded-[40px] p-8 md:p-12 flex flex-col items-center justify-center text-center ${card.color} ${card.textColor} shadow-2xl origin-center`}
                        style={{ zIndex: cards.length - index }}
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden mb-6 flex-shrink-0 relative shadow-lg">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 128px, 160px"
                            />
                        </div>
                        <h3 className="text-[clamp(3.5rem,6vw,5rem)] font-black leading-[0.9] tracking-tighter mb-6 whitespace-pre-line">
                            {card.title}
                        </h3>
                        <p className="max-w-[400px] text-sm md:text-base font-medium leading-snug whitespace-pre-line px-2">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
