'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const works = [
    {
        client: 'Next',
        title: 'Making Next the ultimate destination for denim',
        image: 'https://rise-atseven.transforms.svdcdn.com/production/images/Next-Denim-Case-Study.jpg?auto=format&dm=1750948726&fit=crop&q=100&w=800'
    },
    {
        client: 'B&Q',
        title: 'Making B&Q the fastest growing home improvement brand on TikTok',
        image: 'https://rise-atseven.transforms.svdcdn.com/production/images/BQ-TikTok-Thumb.jpg?auto=format&dm=1750948726&fit=crop&q=100&w=800'
    },
    {
        client: 'Gymshark',
        title: 'Dominating SERPs for fitness apparel globally',
        image: 'https://rise-atseven.transforms.svdcdn.com/production/images/gymshark-1.png?auto=format&dm=1750948726&fit=crop&q=100&w=800'
    },
    {
        client: 'Revolution',
        title: 'Driving explosive growth in the beauty sector',
        image: 'https://rise-atseven.transforms.svdcdn.com/production/images/revolution-beauty-thumbnail.jpg?auto=format&dm=1750948726&fit=crop&q=100&w=800'
    }
]

export default function FeaturedWork() {
    const sectionRef = useRef<HTMLElement>(null)
    const rightColRef = useRef<HTMLDivElement>(null)
    const imagesRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const rightCol = rightColRef.current
        const listItems = gsap.utils.toArray<HTMLElement>('.work-item')
        const images = gsap.utils.toArray<HTMLElement>('.work-image')

        if (!section || !rightCol || listItems.length === 0 || images.length === 0) return

        const ctx = gsap.context(() => {
            // Pin the right column
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                pin: rightCol,
                pinSpacing: false,
            })

            // Animate opacity and translate of images based on active list item
            listItems.forEach((item, i) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => activateImage(i),
                    onEnterBack: () => activateImage(i),
                })
            })

            function activateImage(index: number) {
                images.forEach((img, i) => {
                    gsap.to(img, {
                        autoAlpha: i === index ? 1 : 0,
                        scale: i === index ? 1 : 1.15,
                        duration: 1.2,
                        ease: 'expo.out',
                        overwrite: 'auto'
                    })
                })
                
                listItems.forEach((item, i) => {
                    gsap.to(item, {
                        opacity: i === index ? 1 : 0.2,
                        duration: 0.6,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    })
                })
            }

            // Set initial state
            activateImage(0)

        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative bg-[#111212] text-white pt-24 pb-24 md:pb-0 z-20 rounded-t-[40px] -mt-10">
            <div className="mx-auto max-w-[1880px] px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row relative">
                
                {/* Left Column - Scrolling List */}
                <div ref={listRef} className="w-full md:w-1/2 flex flex-col pt-[30vh] pb-[30vh] relative z-10">
                    {works.map((work, index) => (
                        <div key={index} className="work-item py-24 md:py-40 flex flex-col justify-center min-h-[50vh] cursor-pointer group">
                            <h3 className="text-[clamp(4.5rem,9vw,9rem)] font-black leading-[0.85] tracking-tighter uppercase transition-colors group-hover:text-[#b4f3df] will-change-[color,opacity]">
                                {work.client}
                            </h3>
                            <p className="mt-6 text-xl md:text-3xl font-bold max-w-md leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {work.title}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Right Column - Pinned Images */}
                <div ref={rightColRef} className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center p-12">
                    <div ref={imagesRef} className="relative w-full h-[70vh] rounded-[32px] overflow-hidden">
                        {works.map((work, index) => (
                            <div key={index} className="work-image absolute inset-0 w-full h-full invisible">
                                <Image 
                                    src={work.image} 
                                    alt={work.title} 
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                        ))}
                        
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm tracking-widest uppercase scale-0 opacity-0 transition-all duration-500 hover:scale-110 cursor-pointer pointer-events-auto">
                                View
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
