// app/components/LogoAnimator.tsx
"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LogoAnimator() {
  useEffect(() => {
    // Step 1: Find elements
    const sourceLogo = document.getElementById('source-logo');
    const targetSection = document.getElementById('destination-section');
    
    if (!sourceLogo || !targetSection) return;

    // Step 2: Create a clone of the logo
    const clone = sourceLogo.cloneNode(true) as HTMLElement;
    clone.id = 'logo-clone';
    clone.style.position = 'fixed';
    clone.style.zIndex = '1000';
    
    // Position clone exactly where source logo is
    const sourceRect = sourceLogo.getBoundingClientRect();
    clone.style.top = `${sourceRect.top}px`;
    clone.style.left = `${sourceRect.left}px`;
    document.body.appendChild(clone);

    // Step 3: Find target position
    const target = targetSection.querySelector('.logo-target');
    if (!target) return;
    
    const targetRect = target.getBoundingClientRect();

    // Step 4: Animate!
    gsap.to(clone, {
      x: targetRect.left - sourceRect.left,
      y: targetRect.top - sourceRect.top,
      scale: 1.5,
      duration: 1,
      scrollTrigger: {
        trigger: targetSection,
        start: "top center", // When section reaches center of viewport
        end: "top top",
        scrub: true, // Animation follows scroll
      }
    });

    // Cleanup
    return () => {
      if (clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }
    };
  }, []);

  return null; // This component doesn't render anything
}