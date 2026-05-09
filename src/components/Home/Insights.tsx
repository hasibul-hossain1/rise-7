'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const articles = [
    {
        author: 'Ray Saddiq',
        readTime: '3 mins',
        title: 'Rise at Seven Appoints Hollie Lovell as Senior Operations Lead',
        image: '/insight_card_1.png',
        badge: null
    },
    {
        author: 'Ray Saddiq',
        readTime: '2 mins',
        title: 'Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion',
        image: '/insight_card_2.png',
        badge: null
    },
    {
        author: 'Carrie Rose',
        readTime: '2 mins',
        title: 'Ryan McNamara Is Now Rise at Seven\'s Global Operations Director',
        image: '/insight_card_3.png',
        badge: 'News'
    }
]

export default function Insights() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLAnchorElement>(null)

    const morphCta = (e: React.PointerEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>, isActive: boolean) => {
        const cta = e.currentTarget
        const pillRadius = window.matchMedia('(min-width: 640px)').matches ? 24 : 20
        gsap.to(cta, {
            borderRadius: isActive ? 12 : pillRadius,
            duration: 0.72,
            ease: 'power4.out',
            overwrite: 'auto',
        })
    }

    useEffect(() => {
        const section = sectionRef.current
        const header = headerRef.current
        const grid = gridRef.current

        if (!section || !header || !grid) return

        const ctx = gsap.context(() => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
                autoAlpha: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            })

            gsap.from(grid.children, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                },
                autoAlpha: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#e7e6e0] text-[#111212] pt-20 pb-32 relative z-20">
            <div className="mx-auto max-w-[1880px] px-5 sm:px-8 lg:px-12">
                
                {/* Header Area */}
                <div 
                    ref={headerRef} 
                    className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 md:py-8 border-t border-b border-black/10 mb-12 gap-6"
                >
                    <h2 className="text-[clamp(4rem,8vw,8rem)] font-medium leading-[0.8] tracking-tighter flex items-center flex-wrap">
                        What&apos;s
                        <span className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-[16px] md:rounded-[24px] overflow-hidden relative shrink-0 mx-2 md:mx-4 inline-block align-middle transform -translate-y-1 md:-translate-y-2 shadow-md">
                            <Image 
                                src="/header_whats_new.png" 
                                alt="What's New" 
                                fill 
                                className="object-cover" 
                                sizes="(max-width: 768px) 60px, 100px"
                            />
                        </span>
                        New
                    </h2>
                    
                    <div className="shrink-0 pt-2 md:pt-0">
                        <Link
                            ref={ctaRef}
                            href="/blog"
                            onBlur={(e) => morphCta(e, false)}
                            onFocus={(e) => morphCta(e, true)}
                            onPointerEnter={(e) => morphCta(e, true)}
                            onPointerLeave={(e) => morphCta(e, false)}
                            className="group inline-flex h-10 sm:h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[20px] sm:rounded-[24px] bg-white px-5 sm:px-6 text-[13px] sm:text-sm font-bold text-[#111212] [transform:translateZ(0)] [will-change:border-radius] shadow-sm"
                        >
                            <span className="relative inline-block h-[1.1em] overflow-hidden whitespace-nowrap leading-none">
                                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2">
                                    <span className="flex items-center gap-1.5">
                                        <span>Explore More Thoughts</span>
                                        <ArrowUpRight size={14} className="stroke-[3]" />
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span>Explore More Thoughts</span>
                                        <ArrowUpRight size={14} className="stroke-[3]" />
                                    </span>
                                </span>
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Cards Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {articles.map((article, i) => (
                        <a key={i} href="/blog/article" className="group flex flex-col cursor-pointer">
                            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[24px] md:rounded-[32px] overflow-hidden mb-5">
                                <Image 
                                    src={article.image} 
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                {article.badge && (
                                    <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-white">
                                        {article.badge}
                                    </div>
                                )}
                            </div>
                            
                            {/* Meta info */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm shrink-0">
                                    <div className="w-4 h-4 rounded-full overflow-hidden relative">
                                        <Image 
                                            src={`https://ui-avatars.com/api/?name=${article.author.replace(' ', '+')}&background=random&color=fff&size=64`}
                                            alt={article.author}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-[#111212]">{article.author}</span>
                                </div>
                                <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm shrink-0 text-[#111212]/70">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span className="text-xs font-bold">{article.readTime}</span>
                                </div>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-[clamp(1.5rem,2.2vw,2rem)] font-medium leading-[1.1] tracking-tight group-hover:opacity-70 transition-opacity">
                                {article.title}
                            </h3>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

