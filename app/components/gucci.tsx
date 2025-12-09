// components/LogoTransitionClient.tsx  (Next.js 'use client' component)
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LogoTransition() {
  const heroRef = useRef<HTMLDivElement|null>(null);
  const navRef  = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hero = heroRef.current!;
    const nav  = navRef.current!;
    if (!hero || !nav) return;

    // Create a cloned element so we can animate freely without reflow
    const clone = hero.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.top = `${hero.getBoundingClientRect().top}px`;
    clone.style.left = `${hero.getBoundingClientRect().left}px`;
    clone.style.margin = "0";
    clone.style.zIndex = "2000";
    clone.style.willChange = "transform,opacity";
    document.body.appendChild(clone);
    hero.style.visibility = "hidden";

    function refresh() {
      const from = hero.getBoundingClientRect();
      const to   = nav.getBoundingClientRect();
      const dx = (to.left + to.width/2) - (from.left + from.width/2);
      const dy = (to.top  + to.height/2) - (from.top  + from.height/2);
      const scale = to.width / from.width;

      gsap.set(clone, { x:0, y:0, scale:1, transformOrigin: "center center" });
      // scrubbed animation controlled by scroll
      gsap.to(clone, {
        scrollTrigger: {
          trigger: hero, // start when hero comes into view
          start: "top top",
          end: "+=400", // adjust length / can use function of distance
          scrub: 0.6,
          onUpdate(self) {
            // nothing needed — gsap does the interpolation
          },
          invalidateOnRefresh: true
        },
        x: dx,
        y: dy - window.scrollY, // adjust for fixed vs viewport
        scale: scale,
        ease: "none",
        onComplete() { /* optional */ },
      });
    }

    refresh();
    ScrollTrigger.addEventListener("refreshInit", ()=>{ /* nothing */ });
    window.addEventListener("resize", () => { ScrollTrigger.refresh(); });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      clone.remove();
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-center">
        <div ref={navRef} className="text-lg font-bold">GUCCI</div>
      </nav>

      <section className="h-[120vh] flex items-center justify-center">
        <div ref={heroRef} className="text-6xl font-extrabold">GUCCI</div>
      </section>

      <div className="h-[2000px]"></div>
    </>
  );
}
