"use client"
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Search, TrendingUp, Image as ImageIcon, ArrowUpRight } from 'lucide-react'

// Import all images
import slider1 from '@/assets/slider/slider1.png'
import slider2 from '@/assets/slider/slider2.png'
import slider3 from '@/assets/slider/slider3.png'
import slider4 from '@/assets/slider/slider4.png'
import slider5 from '@/assets/slider/slider5.png'
import slider6 from '@/assets/slider/slider6.png'
import slider7 from '@/assets/slider/slider7.png'
import slider8 from '@/assets/slider/slider8.png'
import slider9 from '@/assets/slider/slider9.png'
import slider10 from '@/assets/slider/slider10.png'

gsap.registerPlugin(ScrollTrigger)

const works = [
    { client: 'SIXT', year: '[2023-2025]', image: slider1, tag: 'Car rental', icon: 'image', hoverColor: 'bg-[#cb7b36]', hoverText: 'An extra 3m clicks regionally through SEO' },
    { client: 'Dojo - B2B', year: '[2021-2025]', image: slider2, tag: 'Card Machines', icon: 'trend', hoverColor: 'bg-[#b4f3df]', hoverText: 'Doubled organic traffic in 6 months' },
    { client: 'Magnet Trade - B2B', year: '[2023-2024]', image: slider3, hoverColor: 'bg-[#111212]', hoverText: 'Revolutionising B2B trade marketing', textColor: 'text-white', tagTextColor: 'group-hover:text-white group-hover:border-white/30' },
    { client: 'Leading E Sim brand globally', year: '[2023-2025]', image: slider4, hoverColor: 'bg-[#e7e6e0]', hoverText: 'Connecting the world effortlessly' },
    { client: 'JD Sports', year: '[2025]', image: slider5, hoverColor: 'bg-[#b4f3df]', hoverText: 'Dominating sneaker culture search' },
    { client: 'Parkdean Resorts', year: '[2018-2025]', image: slider6, tag: 'UK holidays', icon: 'trend', hoverColor: 'bg-[#cb7b36]', hoverText: 'The UK\'s favorite holiday destination' },
    { client: 'Pooky', year: '[2025]', image: slider7, tag: 'Rechargeable Lights', icon: 'trend', hoverColor: 'bg-[#111212]', hoverText: 'Lighting up organic search', textColor: 'text-white', tagTextColor: 'group-hover:text-white group-hover:border-white/30' },
    { client: 'Revolution Beauty', year: '[2022-2025]', image: slider8, hoverColor: 'bg-[#b4f3df]', hoverText: 'Beautiful results across all channels' },
    { client: 'Lloyds Pharmacy', year: '[2022-23]', image: slider9, tag: 'STI tests', icon: 'trend', hoverColor: 'bg-[#cb7b36]', hoverText: 'Discreet and effective campaigns' },
    { client: 'PrettyLittleThing', year: '[2021-2023]', image: slider10, hoverColor: 'bg-[#111212]', hoverText: 'Setting trends in fashion SEO', textColor: 'text-white' }
]

export default function FeaturedWork() {
    const sectionRef = useRef<HTMLElement>(null)
    const leftColRef = useRef<HTMLDivElement>(null)
    const rightColRef = useRef<HTMLDivElement>(null)
    const cursorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const leftCol = leftColRef.current
        const rightCol = rightColRef.current
        const listItems = gsap.utils.toArray<HTMLElement>('.work-text-item')

        if (!section || !leftCol || !rightCol || listItems.length === 0) return

        const ctx = gsap.context(() => {
            const leftHeight = leftCol.scrollHeight
            const rightHeight = rightCol.scrollHeight
            const windowHeight = window.innerHeight

            // Custom cursor setup
            const cursor = cursorRef.current
            let handleMouseMove: ((e: MouseEvent) => void) | null = null
            
            if (cursor) {
                gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 })
                const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" })
                const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" })

                handleMouseMove = (e: MouseEvent) => {
                    xTo(e.clientX)
                    yTo(e.clientY)
                }
                window.addEventListener('mousemove', handleMouseMove)
            }

            // Maximum travel distances
            const rightMaxY = Math.max(0, rightHeight - windowHeight + 100)
            const leftMaxY = Math.max(0, leftHeight - windowHeight + 100)

            // Pin and scroll timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: `+=${rightMaxY}`, // Scroll distance equals right column's height
                    pin: true,
                    scrub: true,
                    onUpdate: () => {
                        const centerY = windowHeight / 2
                        listItems.forEach((item) => {
                            const rect = item.getBoundingClientRect()
                            const itemCenter = rect.top + rect.height / 2
                            const dist = Math.abs(centerY - itemCenter)

                            // Calculate opacity based on distance
                            // Maximum distance before fully faded is roughly 350px
                            const maxDist = windowHeight / 2.5
                            let opacity = 1 - (dist / maxDist)
                            opacity = Math.max(0.15, Math.min(1, opacity))

                            gsap.set(item, { opacity })
                        })
                    }
                }
            })

            tl.to(rightCol, {
                y: -rightMaxY,
                ease: 'none'
            }, 0)
                .to(leftCol, {
                    y: -leftMaxY,
                    ease: 'none'
                }, 0)

            return () => {
                if (handleMouseMove) {
                    window.removeEventListener('mousemove', handleMouseMove)
                }
            }
        }, section)

        return () => ctx.revert()
    }, [])

    const handleMouseEnter = () => {
        gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
    }

    const handleMouseLeave = () => {
        gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: 'power3.inOut' })
    }

    return (
        <section ref={sectionRef} className="relative bg-[#111212] text-white pt-16 md:pt-24 h-screen overflow-hidden z-20 rounded-t-[40px] -mt-10">
            <div className="mx-auto max-w-[1880px] px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row relative h-full">

                {/* Left Column - Scrolling List */}
                <div className="w-full md:w-[55%] h-full relative">
                    <div className="absolute top-0 left-0 w-full z-10 bg-gradient-to-b from-[#111212] to-transparent h-32 pointer-events-none" />
                    <p className="absolute top-0 left-0 text-white font-medium z-20">Featured Work</p>

                    <div ref={leftColRef} className="flex flex-col pt-[45vh] pb-[45vh] w-full">
                        {works.map((work, index) => {
                            // Split year if it needs to wrap
                            const isWrapYear = work.year.length > 8 && work.client.includes('Leading E Sim');

                            return (
                                <div key={index} className="work-text-item opacity-15 flex items-start justify-between w-full pr-4 md:pr-16 lg:pr-24 py-2">
                                    <h3 className="text-[clamp(3.5rem,6.5vw,7.5rem)] font-medium leading-[0.85] tracking-tighter max-w-[85%]">
                                        {work.client}
                                    </h3>
                                    <span className={`text-[10px] sm:text-xs font-mono mt-3 opacity-70 tracking-tight text-right shrink-0 leading-tight ${isWrapYear ? 'w-10 break-all' : ''}`}>
                                        {isWrapYear ? (
                                            <>
                                                <span className="block">[2023-</span>
                                                <span className="block">2025]</span>
                                            </>
                                        ) : work.year}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full z-10 bg-gradient-to-t from-[#111212] to-transparent h-32 pointer-events-none" />
                </div>

                {/* Right Column - Fast Scrolling Images */}
                <div className="hidden md:flex w-[45%] h-full justify-end relative pl-8">
                    <div ref={rightColRef} className="w-full flex flex-col pt-[15vh] pb-[15vh] gap-[8vh]">
                        {works.map((work, index) => (
                            <div 
                                key={index} 
                                className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shrink-0 group shadow-2xl cursor-none"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Image
                                    src={work.image}
                                    alt={work.client}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-transparent z-10"></div>

                                {/* Hover Overlay - Page transition sweep effect */}
                                <div className={`absolute inset-0 z-20 ${work.hoverColor || 'bg-[#cb7b36]'} flex items-start justify-start p-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]`}>
                                    {work.hoverText && (
                                        <h4 className={`text-[clamp(1.5rem,3vw,3rem)] font-medium leading-[0.95] tracking-tight w-[80%] ${work.textColor || 'text-[#111212]'}`}>
                                            {work.hoverText}
                                        </h4>
                                    )}
                                </div>

                                {work.tag && (
                                    <div className={`absolute bottom-6 right-6 z-30 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2.5 flex items-center gap-2.5 text-sm font-medium transition-all duration-500 group-hover:scale-105 group-hover:bg-transparent ${work.tagTextColor || 'group-hover:text-[#111212] group-hover:border-[#111212]/30'} cursor-pointer`}>
                                        <Search className="w-4 h-4" />
                                        <span>{work.tag}</span>
                                        {work.icon === 'trend' ? (
                                            <TrendingUp className="w-4 h-4" />
                                        ) : (
                                            <ImageIcon className="w-4 h-4" />
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Custom Cursor */}
            <div 
                ref={cursorRef}
                className="fixed top-0 left-0 w-24 h-24 sm:w-28 sm:h-28 bg-[#b4f3df] rounded-full flex items-center justify-center pointer-events-none z-[100]"
            >
                <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 text-[#111212]" strokeWidth={2.5} />
            </div>
        </section>
    )
}
