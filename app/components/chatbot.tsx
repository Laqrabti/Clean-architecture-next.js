// ChatbotLogoTransitionSimple.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

export default function ChatbotLogoTransitionSimple() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const navBtnRef = useRef<HTMLButtonElement | null>(null);
  const cloneRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [open, setOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = heroRef.current!;
    const navBtn = navBtnRef.current!;
    if (!hero || !navBtn) return;

    // Create clone (visual only)
    const clone = hero.cloneNode(true) as HTMLDivElement;
    clone.style.position = "fixed";
    clone.style.top = "0px";
    clone.style.left = "0px";
    clone.style.margin = "0";
    clone.style.zIndex = "9999";
    clone.style.pointerEvents = "none";
    clone.style.willChange = "transform,opacity";
    clone.style.transformOrigin = "center center";
    document.body.appendChild(clone);
    cloneRef.current = clone;

    // place clone on top of hero initially (viewport coordinates)
    function placeCloneOnHero() {
      const fr = hero.getBoundingClientRect();
      clone.style.width = `${fr.width}px`;
      clone.style.height = `${fr.height}px`;
      clone.style.left = `${fr.left}px`;
      clone.style.top = `${fr.top}px`;
      clone.style.transform = `translate(0px, 0px) scale(1)`;
      clone.style.opacity = "1";
      hero.style.visibility = "hidden"; // keep original for accessibility but hide visually
    }

    placeCloneOnHero();

    // compute static geometry used for transform (recompute on resize)
    let dx = 0, dy = 0, scaleTo = 1, startScroll = 0, endScroll = 0, heroHeight = 0;
    function computeGeometry() {
      const fr = hero.getBoundingClientRect();
      const lr = navBtn.getBoundingClientRect();
      // centers (viewport coords)
      const fcx = fr.left + fr.width / 2;
      const fcy = fr.top + fr.height / 2;
      const lcx = lr.left + lr.width / 2;
      const lcy = lr.top + lr.height / 2;

      dx = lcx - fcx;
      dy = lcy - fcy;

      scaleTo = lr.width / fr.width;

      // start when hero top is near top of viewport (little before)
      const pageHeroTop = window.scrollY + fr.top;
      startScroll = Math.max(0, pageHeroTop - window.innerHeight * 0.2);
      // end when hero bottom reaches nav button top
      const pageHeroBottom = pageHeroTop + fr.height;
      endScroll = pageHeroBottom - lr.height - 8;

      heroHeight = fr.height || 1;
    }

    computeGeometry();

    // scroll-driven update using rAF
    let lastScroll = window.scrollY;
    let ticking = false;

    function onScroll() {
      lastScroll = window.scrollY;
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(update);
      }
    }

    function clamp(v: number, a = 0, b = 1) {
      return Math.max(a, Math.min(b, v));
    }

    function update() {
      ticking = false;
      const s = clamp((lastScroll - startScroll) / (endScroll - startScroll || heroHeight), 0, 1);

      // Apply transforms relative to initial clone position
      const curX = dx * s;
      const curY = dy * s;
      const curScale = 1 + (scaleTo - 1) * s;

      if (cloneRef.current) {
        cloneRef.current.style.transform = `translate(${curX}px, ${curY}px) scale(${curScale})`;
        // small fade and scale of nav visibility
        cloneRef.current.style.opacity = `${1 - 0.2 * s}`;
      }

      // toggle nav button shown state; navVisible true when nearly complete
      if (s > 0.92 && !navVisible) setNavVisible(true);
      if (s < 0.08 && navVisible && !open) setNavVisible(false);
    }

    // resize / load handlers to remeasure geometry and reposition clone
    function onResizeOrLoad() {
      placeCloneOnHero();
      computeGeometry();
      update();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResizeOrLoad);
    window.addEventListener("orientationchange", onResizeOrLoad);
    window.addEventListener("load", onResizeOrLoad);

    // initial update
    update();

    return () => {
      // cleanup
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResizeOrLoad);
      window.removeEventListener("orientationchange", onResizeOrLoad);
      window.removeEventListener("load", onResizeOrLoad);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
      hero.style.visibility = "visible";
    };
  }, [navVisible, open]);

  // toggle handler
  function toggleChat() {
    setOpen(v => !v);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-center z-40 pointer-events-none">
        <div className="flex items-center justify-center">
          <div className="text-sm font-semibold mr-4 pointer-events-auto">MySite</div>

          <button
            ref={navBtnRef}
            aria-label={open ? "Close chat" : "Open chat"}
            onClick={toggleChat}
            className={`pointer-events-auto transform transition-all duration-200 ease-out flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium shadow-lg
              ${navVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            style={{
              background: "linear-gradient(135deg,#06b6d4, #7c3aed)",
              color: "white",
              boxShadow: "0 6px 18px rgba(15,23,42,0.18)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M21 15a2 2 0 0 1-2 2H9l-5 3V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10z" stroke="white" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <main className="pt-16">
        <section className="h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
          {/* Hero chatbot card (cloned & animated) */}
          <div
            ref={heroRef}
            role="region"
            aria-label="chatbot preview"
            className="w-[340px] max-w-[90vw] bg-white rounded-2xl shadow-2xl p-4 pointer-events-auto"
            style={{ border: "1px solid rgba(2,6,23,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold">AI</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Ninzoky Assistant</div>
                <div className="text-xs text-gray-500">Ask about trips, hotels and itineraries</div>
              </div>
              <button onClick={() => setOpen(true)} aria-label="Open chat" className="ml-2 px-3 py-1 rounded-md bg-indigo-600 text-white text-sm">
                Open
              </button>
            </div>

            <div className="mt-3 text-sm text-gray-600">
              Try: "Best coastal destinations this summer with $7000 and high safety"
            </div>
          </div>
        </section>

        {/* content */}
        <section className="max-w-4xl mx-auto p-8">
          <h2 className="text-2xl font-bold mb-4">Sample content</h2>
          <p className="mb-6">Scroll down and watch the chatbot shrink and float into the navbar.</p>

          <div className="space-y-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold">Section {i + 1}</h3>
                <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Chat panel (toggle) */}
      <div aria-hidden={!open} className={`fixed right-6 bottom-6 z-50 transition-transform duration-300 ${open ? "translate-y-0 scale-100" : "translate-y-6 scale-95"}`}>
        <div className="w-[360px] max-w-[92vw] bg-white rounded-2xl shadow-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold">AI</div>
              <div>
                <div className="text-sm font-semibold">Ninzoky Assistant</div>
                <div className="text-xs text-gray-500">How can I help?</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(false)} className="text-sm text-gray-500">Close</button>
            </div>
          </div>

          <div className="mt-3">
            <textarea aria-label="chat input" placeholder="Type your question..." className="w-full min-h-[100px] border rounded-md p-2 text-sm" />
            <div className="mt-3 flex justify-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
