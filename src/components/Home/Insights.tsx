'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

const articles = [
    {
        category: 'Insights',
        title: 'The future of search is here, and it\'s not Google',
        date: '12 Oct 2023',
        image: 'https://rise-atseven.transforms.svdcdn.com/production/images/google-sge-header.png?auto=format&dm=1750948726&fit=crop&q=100&w=800',
        featured: true
    },
    {
        category: 'News',
        title: 'Rise at Seven named Content Marketing Agency of the Year',
        date: '05 Sep 2023',
        image: 'https://rise-atseven.transforms.svdcdn.com/production/images/awards-win.jpg?auto=format&dm=1750948726&fit=crop&q=100&w=800'
    },
    {
        category: 'Insights',
        title: 'How to build a reactive PR strategy that actually works',
        date: '28 Aug 2023',
        image: 'https://rise-atseven.transforms.svdcdn.com/production/images/reactive-pr.jpg?auto=format&dm=1750948726&fit=crop&q=100&w=800'
    }
]

export default function Insights() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

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

    const featuredArticle = articles.find(a => a.featured)
    const standardArticles = articles.filter(a => !a.featured)

    return (
        <section ref={sectionRef} className="bg-[#e7e6e0] text-[#111212] py-32 rounded-t-[40px] relative z-20 -mt-10">
            <div className="mx-auto max-w-[1880px] px-5 sm:px-8 lg:px-12">
                
                <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <h2 className="text-[clamp(3.5rem,6vw,6rem)] font-black leading-none tracking-tighter uppercase">
                        Insights &<br />News
                    </h2>
                    <a href="/blog" className="group flex items-center gap-2 text-xl font-bold border-b-2 border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors">
                        View All <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Featured Article */}
                    {featuredArticle && (
                        <a href="/blog/future-of-search" className="group col-span-1 lg:col-span-7 flex flex-col cursor-pointer">
                            <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden mb-6">
                                <Image 
                                    src={featuredArticle.image} 
                                    alt={featuredArticle.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    unoptimized
                                />
                                <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                                    {featuredArticle.category}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-black/60 font-bold mb-3">
                                <span>{featuredArticle.date}</span>
                            </div>
                            <h3 className="text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-tight group-hover:underline decoration-4 underline-offset-4">
                                {featuredArticle.title}
                            </h3>
                        </a>
                    )}

                    {/* Secondary Column */}
                    <div className="col-span-1 lg:col-span-5 flex flex-col gap-12">
                        {/* Articles */}
                        <div className="flex flex-col gap-8">
                            {standardArticles.map((article, i) => (
                                <a key={i} href="/blog/article" className="group flex gap-6 items-center cursor-pointer">
                                    <div className="relative w-1/3 aspect-square rounded-[24px] overflow-hidden shrink-0">
                                        <Image 
                                            src={article.image} 
                                            alt={article.title}
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase tracking-widest text-black/60 mb-2">
                                            {article.category}
                                        </span>
                                        <h4 className="text-xl md:text-2xl font-black leading-tight tracking-tight group-hover:underline decoration-2 underline-offset-2">
                                            {article.title}
                                        </h4>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-[#b4f3df] rounded-[32px] p-8 md:p-12 flex flex-col justify-center h-full">
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
                                Subscribe to<br />The Brief
                            </h3>
                            <p className="font-bold text-black/80 mb-8">
                                Weekly insights on search, social, and how to build category leaders.
                            </p>
                            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="w-full bg-transparent border-b-2 border-black py-3 text-lg font-bold placeholder:text-black/40 focus:outline-none"
                                />
                                <button type="submit" className="self-start mt-4 bg-black text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105">
                                    Subscribe →
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
