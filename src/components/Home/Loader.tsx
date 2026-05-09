'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const path = pathRef.current
    if (!container || !path) return

    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(container, { display: 'none' })
        document.body.style.overflow = ''
      }
    })

    // Initial delay so the user sees the mint screen for a moment
    tl.to(path, {
      duration: 0.8,
      attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 120 0 0 Z" },
      ease: "power3.in",
      delay: 0.4
    })
    .to(path, {
      duration: 0.4,
      attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" },
      ease: "power3.out"
    })
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] pointer-events-none flex flex-col">
      <svg className="w-full h-[100vh] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
          fill="#b4f3df"
        />
      </svg>
    </div>
  )
}
