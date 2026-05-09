'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'

import emiratesImage from "@/assets/swipe-images/emirates.webp"
import krogerImage from "@/assets/swipe-images/kroger.webp"
import redBullImage from "@/assets/swipe-images/red-bull.webp"
import sharkNinjaImage from "@/assets/swipe-images/shark-ninja.webp"

const clients = [
    { id: 'emirates', content: emiratesImage, isComponent: false },
    { id: 'kroger', content: krogerImage, isComponent: false },
    { id: 'redbull', content: redBullImage, isComponent: false },
    { id: 'sharkninja', content: sharkNinjaImage, isComponent: false },
    { id: 'emirates', content: emiratesImage, isComponent: false },
    { id: 'kroger', content: krogerImage, isComponent: false },
    { id: 'redbull', content: redBullImage, isComponent: false },
    { id: 'sharkninja', content: sharkNinjaImage, isComponent: false },
    { id: 'emirates', content: emiratesImage, isComponent: false },
    { id: 'kroger', content: krogerImage, isComponent: false },
    { id: 'redbull', content: redBullImage, isComponent: false },
    { id: 'sharkninja', content: sharkNinjaImage, isComponent: false },
]

export default function SocialProof() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const text = textRef.current

        if (!section || !text) return

        const ctx = gsap.context(() => {
            gsap.from(text, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                },
                autoAlpha: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#e7e6e0] py-20 text-[#111212] overflow-hidden">
            <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-14 px-4 md:px-10">
                <h2 ref={textRef} className="text-[clamp(0.6rem,1vw,0.9rem)] font-bold tracking-[0.1em] opacity-60 uppercase whitespace-nowrap">
                    The agency behind...
                </h2>

                <div className="relative flex-1 w-full overflow-hidden">
                    {/* Blurry edge effects */}
                    <div className="absolute left-0 top-0 bottom-0 w-[10%] z-10 pointer-events-none bg-gradient-to-r from-[#e7e6e0] via-[#e7e6e0]/50 to-transparent backdrop-blur-[1px]" />
                    <div className="absolute right-0 top-0 bottom-0 w-[10%] z-10 pointer-events-none bg-gradient-to-l from-[#e7e6e0] via-[#e7e6e0]/50 to-transparent backdrop-blur-[1px]" />

                    <Swiper
                        modules={[Autoplay, FreeMode]}
                        spaceBetween={50}
                        slidesPerView={2}
                        loop={true}
                        speed={5000}
                        freeMode={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            480: { slidesPerView: 2, spaceBetween: 60 },
                            768: { slidesPerView: 3, spaceBetween: 80 },
                            1200: { slidesPerView: 4, spaceBetween: 100 },
                            1600: { slidesPerView: 5, spaceBetween: 120 },
                        }}
                        className="social-proof-swiper flex items-center"
                    >
                        {clients.map((client, index) => {
                            return (
                                <SwiperSlide key={`${client.id}-${index}`} className="flex items-center justify-center py-2">
                                    <div className="h-8 md:h-10 lg:h-12 w-24 md:w-32 lg:w-40 flex items-center justify-center mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity duration-300">
                                        <Image
                                            src={client.content as any}
                                            alt={client.id}
                                            width={180}
                                            height={50}
                                            className="h-full w-auto object-contain pointer-events-none grayscale brightness-0"
                                            priority
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}


