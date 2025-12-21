"use client"

import React, { useRef, useEffect} from "react"
import gsap from "gsap"

export default function TryMyself() {
    const logoRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLParagraphElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (!logoRef.current || !textRef.current || !buttonRef.current) return


        const logoTl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            repeatDelay: 1
        })
        
        logoTl.to(logoRef.current, {
            // GSAP ATTRIBUTES EXPLAINED:
            x: 200,         // Move 200px RIGHT (negative for left)
            y: 0,           // Vertical movement
            rotation: 360,  // Degrees to rotate
            duration: 3,    // Animation takes 3 seconds
            ease: "power2.inOut", // Easing: starts slow, speeds up, ends slo
        }).to(logoRef.current, {
            scale: 1.5,
            duration: 1,
            ease: "bounce.out"
        }).to(logoRef.current, {
             scale: 1,       // Return to normal size
            duration: 0.5,
            ease: "power1.out",
        })

        gsap.fromTo(textRef.current, 
            {opacity: 0, y: -100}, 
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "elastic.out(2, 0.1)",
                delay: 0.5
        })
    })
}