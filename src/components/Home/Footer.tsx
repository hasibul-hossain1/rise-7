'use client'

import { Logo } from '../icons'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-[#111212] text-white pt-24 pb-8 px-5 sm:px-8 lg:px-12 rounded-t-[40px] relative z-30 -mt-10 flex flex-col">
            <div className="mx-auto w-full max-w-[1880px] flex flex-col">
                
                {/* Top Section */}
                <div className="flex flex-col xl:flex-row justify-between items-start gap-16 xl:gap-8 mb-24 lg:mb-32">
                    
                    {/* Newsletter & Social */}
                    <div className="flex flex-col gap-6 w-full xl:w-[400px] shrink-0">
                        <h3 className="text-2xl font-bold tracking-tight">Stay updated with Rise news</h3>
                        
                        <div className="relative w-full">
                            <input 
                                type="email" 
                                placeholder="Your Email Address" 
                                className="w-full bg-[#1c1d1d] text-white placeholder:text-white/40 rounded-full py-4 pl-6 pr-16 focus:outline-none focus:ring-1 focus:ring-[#b4f3df] transition-shadow"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#b4f3df] text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                <ArrowUpRight size={18} strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {['f', 'X', 'in', 'y', 't', 'i'].map((social, i) => (
                                <a key={i} href="#" className="bg-white text-black rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1 hover:bg-white/80 transition-colors">
                                    {social} <ArrowUpRight size={10} strokeWidth={3} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 lg:gap-x-24 gap-y-12 w-full xl:w-auto xl:ml-auto">
                        
                        {/* Column 1 */}
                        <div className="flex flex-col gap-3 border-l border-white/20 pl-5">
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">Services</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">Work</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">About</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">Culture</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">Meet The Risers</a>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-3 border-l border-white/20 pl-5">
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">Testimonials</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">Blog & Resources</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">Webinars</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">Careers</a>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col gap-3 border-l border-white/20 pl-5 col-span-2 md:col-span-1">
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">Sheffield</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">Manchester</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">London</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors">New York</a>
                            <a href="#" className="font-medium hover:text-[#b4f3df] transition-colors mt-2">Contact</a>
                        </div>

                    </div>
                </div>

                {/* Massive Logo Area */}
                <div className="w-full mb-16 lg:mb-24 flex items-end justify-center relative">
                    <div className="w-full text-white">
                        <Logo />
                    </div>
                    <span className="absolute right-0 top-0 lg:-top-4 text-white text-[clamp(2rem,5vw,6rem)] leading-none font-bold">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[clamp(2rem,6vw,5rem)] h-[clamp(2rem,6vw,5rem)]">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9 8h3.5a2.5 2.5 0 0 1 0 5H9V8z" />
                            <path d="M9 13h3l2.5 4" />
                        </svg>
                    </span>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-center text-[10px] sm:text-xs text-white/50 font-medium gap-4">
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-center lg:text-left">
                        <span>&copy; {new Date().getFullYear()} Rise at Seven Ltd. All rights reserved.</span>
                        <span className="hidden sm:inline">&bull;</span>
                        <span>Company Number 11956187</span>
                        <span className="hidden sm:inline">&bull;</span>
                        <span>VAT Registered GB 322402945</span>
                        <span className="hidden sm:inline">&bull;</span>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <span className="hidden sm:inline">&bull;</span>
                        <a href="#" className="hover:text-white transition-colors">Terms & conditions</a>
                    </div>
                    <div className="shrink-0 text-center lg:text-right mt-2 lg:mt-0">
                        Website MadeByShape
                    </div>
                </div>

            </div>
        </footer>
    )
}
