'use client'

import { Logo } from '../icons'

export default function Footer() {
    return (
        <footer className="bg-[#111212] text-white pt-32 pb-10 px-5 sm:px-8 lg:px-12 rounded-t-[40px] relative z-30 -mt-10 flex flex-col">
            <div className="mx-auto w-full max-w-[1880px] flex flex-col flex-1">
                
                {/* Massive Brand Title */}
                <div className="w-full mb-24">
                    <h2 className="text-[clamp(4rem,18vw,24rem)] font-black leading-[0.75] tracking-tighter uppercase mb-6 w-full text-center md:text-left">
                        Rise <br className="hidden md:block" />At <br className="hidden md:block" />Seven<span className="text-[#b4f3df]">®</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-32 border-t border-white/20 pt-16">
                    
                    {/* Column 1 - Offices */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h4 className="text-xl font-bold mb-4 opacity-50 uppercase tracking-widest">Offices</h4>
                            <ul className="flex flex-col gap-2 font-bold text-lg">
                                <li>London</li>
                                <li>Sheffield</li>
                                <li>Manchester</li>
                                <li>New York</li>
                            </ul>
                        </div>
                        <div>
                            <a href="mailto:hello@riseatseven.com" className="text-xl font-bold hover:text-[#b4f3df] transition-colors underline decoration-2 underline-offset-4">
                                hello@riseatseven.com
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Social */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl font-bold mb-2 opacity-50 uppercase tracking-widest">Social</h4>
                        <ul className="flex flex-col gap-2 font-bold text-lg">
                            <li><a href="#" className="hover:text-[#b4f3df] transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-[#b4f3df] transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-[#b4f3df] transition-colors">TikTok</a></li>
                            <li><a href="#" className="hover:text-[#b4f3df] transition-colors">Twitter (X)</a></li>
                        </ul>
                    </div>

                    {/* Column 3 - Company */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl font-bold mb-2 opacity-50 uppercase tracking-widest">Company</h4>
                        <ul className="flex flex-col gap-2 font-bold text-lg">
                            <li><a href="/about" className="hover:text-[#b4f3df] transition-colors">About Us</a></li>
                            <li><a href="/careers" className="hover:text-[#b4f3df] transition-colors">Careers</a></li>
                            <li><a href="/work" className="hover:text-[#b4f3df] transition-colors">Our Work</a></li>
                            <li><a href="/contact" className="hover:text-[#b4f3df] transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 4 - Legal */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl font-bold mb-2 opacity-50 uppercase tracking-widest">Legal</h4>
                        <ul className="flex flex-col gap-2 font-bold text-lg">
                            <li><a href="#" className="hover:text-[#b4f3df] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#b4f3df] transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-[#b4f3df] transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20 gap-6">
                    <div className="w-32 md:w-48 text-white opacity-80">
                        <Logo />
                    </div>
                    <div className="text-sm font-bold opacity-50 text-center md:text-right">
                        &copy; {new Date().getFullYear()} Rise at Seven. All rights reserved.<br />
                        <span className="text-xs">Search-First Content Marketing Agency</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
