'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function SmoothScroll({ children }) {
    useEffect(() => {
        // Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)

        // Initialize Lenis with enhanced smooth scrolling
        const lenis = new Lenis({
            duration: 1.5, // Increased for more noticeable smoothness
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.2, // Increased for more responsive scrolling
            touchMultiplier: 2,
            infinite: false,
        })

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        // Use GSAP ticker for smooth integration
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        // Cleanup
        return () => {
            lenis.destroy()
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000)
            })
        }
    }, [])

    return <>{children}</>
}
