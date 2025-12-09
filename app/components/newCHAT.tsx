"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ChatbotTransitionClient() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navBtnRef = useRef<HTMLButtonElement | null>(null);
  const cloneRef = useRef<HTMLElement | null>(null);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);

  const [open, setOpen] = useState(false);

  // --------------------------------------------------
  //  SCROLL FLIP TRANSITION (Hero → Nav Island)
  // --------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hero = heroRef.current!;
    const navBtn = navBtnRef.current!;
    if (!hero || !navBtn) return;

    const clone = hero.cloneNode(true) as HTMLElement;
    clone.classList.add("fixed", "z-[9999]", "pointer-events-none");
    clone.style.willChange = "transform, opacity";
    document.body.appendChild(clone);
    cloneRef.current = clone;

    hero.style.visibility = "hidden";

    function build() {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(clone);

      const from = hero.getBoundingClientRect();
      const to = navBtn.getBoundingClientRect();

      clone.style.width = `${from.width}px`;
      clone.style.height = `${from.height}px`;
      clone.style.left = `${from.left}px`;
      clone.style.top = `${from.top}px`;

      gsap.set(clone, { x: 0, y: 0, scale: 1, autoAlpha: 1 });

      const fcx = from.left + from.width / 2;
      const fcy = from.top + from.height / 2;
      const tcx = to.left + to.width / 2;
      const tcy = to.top + to.height / 2;

      const dx = tcx - fcx;
      const dy = tcy - fcy;
      const scale = to.width / from.width;

      gsap.set(navBtn, { autoAlpha: 0, scale: 0.85 });

      gsap.to(clone, {
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=400",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const p = self.progress;
            gsap.set(navBtn, { autoAlpha: p, scale: 0.85 + p * 0.15 });
          },
        },
        x: dx,
        y: dy,
        scale: scale,
        ease: "none",
      });
    }

    build();
    window.addEventListener("resize", () => {
      build();
      ScrollTrigger.refresh();
    });

    return () => {
      if (clone && clone.parentElement) clone.remove();
      hero.style.visibility = "visible";
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // --------------------------------------------------
  //  DYNAMIC ISLAND OPEN/CLOSE
  // --------------------------------------------------
  useEffect(() => {
    const nav = navRef.current!;
    const btn = navBtnRef.current!;
    if (!nav || !btn) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(
      btn,
      { width: 300, height: 44, borderRadius: 9999, duration: 0.25 },
      0
    );
    tl.to(nav, { "--panel-scale": 1, duration: 0.25 }, 0);

    gsap.set(btn, { width: 44, height: 44, borderRadius: 9999 });
    gsap.set(nav, { "--panel-scale": 0 });

    openTlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const toggleIsland = () => {
    const tl = openTlRef.current;
    if (!tl) return;
    open ? tl.reverse() : tl.play();
    setOpen(!open);
  };

  // --------------------------------------------------
  //  UI
  // --------------------------------------------------
  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 h-16 flex items-center justify-center z-50 pointer-events-none"
      >
        <div className="flex items-center gap-4 pointer-events-auto">
          <span className="font-semibold text-gray-700">MySite</span>

          {/* ---------- Dynamic Island Button ---------- */}
          <div className="relative">
            <button
              ref={navBtnRef}
              onClick={toggleIsland}
              className="
                bg-gradient-to-r from-cyan-500 to-violet-600
                shadow-xl border border-white/20
                flex items-center justify-center
                text-white
                transition-all
              "
            >
              {/* Chat icon */}
              <svg
                width="18"
                height="18"
                fill="none"
                className="text-white"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H9l-5 3V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* ---------- Expanding Chat Panel ---------- */}
            <div
              className="
                absolute top-14 right-0 w-[350px] max-w-[90vw]
                origin-top-right
                bg-white rounded-xl shadow-2xl
                p-4
              "
              style={{
                transform: "scale(var(--panel-scale))",
              }}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-lg flex items-center justify-center font-bold">
                    AI
                  </div>
                  <div>
                    <p className="font-semibold">Ninzoky Assistant</p>
                    <p className="text-xs text-gray-500">
                      Ask about trips & hotels
                    </p>
                  </div>
                </div>

                <button
                  onClick={toggleIsland}
                  className="text-sm text-gray-700"
                >
                  Close
                </button>
              </div>

              {/* Message Box */}
              <textarea
                className="
                  w-full min-h-[100px]
                  border border-gray-300 rounded-lg
                  p-2 text-sm outline-none
                "
                placeholder="Ask anything..."
              ></textarea>

              <div className="mt-3 flex justify-end">
                <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION (gets cloned & animated) */}
      <main className="pt-16">
        <section className="h-screen flex items-center justify-center bg-gray-50">
          <div
            ref={heroRef}
            className="
              bg-white rounded-2xl shadow-xl w-[340px] max-w-[90vw]
              p-4 border border-gray-100
            "
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white flex items-center justify-center font-bold">
                AI
              </div>
              <div>
                <p className="font-bold text-lg">Ninzoky Assistant</p>
                <p className="text-xs text-gray-500 mt-1">
                  Try asking: "Best summer cities under $7000"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Page content */}
        <section className="max-w-3xl mx-auto p-8 space-y-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow">
              <h3 className="font-semibold">Section {i + 1}</h3>
              <p className="text-gray-500 text-sm mt-1">
                Scroll to see the chatbot shrink smoothly into the navbar like
                Gucci.
              </p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
