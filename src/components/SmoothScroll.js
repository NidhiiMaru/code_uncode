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
            duration: 0.9,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.8,
            infinite: false,
        })

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        // Use GSAP ticker for smooth integration
        const onTick = (time) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(onTick)

        // Ensure triggers calculate with Lenis active
        requestAnimationFrame(() => ScrollTrigger.refresh())

        gsap.ticker.lagSmoothing(0)

        // Cleanup
        return () => {
            lenis.destroy()
            gsap.ticker.remove(onTick)
        }
    }, [])

    return <>{children}</>
}
