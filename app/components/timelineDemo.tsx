"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';

export default function TimelineDemo() {
  useEffect(() => {
    // 1. SIMPLE TWEEN - All 3 boxes move TOGETHER
    gsap.to(".box", { 
      rotation: 27, 
      x: 100, 
      duration: 1 
    });

    // 2. TIMELINE - Boxes move ONE AFTER ANOTHER (sequenced)
    const tl = gsap.timeline();
    tl.to("#green", { duration: 1, x: 200 })  // Green moves first (1s)
      .to("#blue", { duration: 2, x: 300 })   // Blue moves AFTER green finishes (2s)
      .to("#orange", { duration: 1, x: 100 }); // Orange moves AFTER blue finishes (1s)
    
    // Total timeline duration: 1 + 2 + 1 = 4 seconds
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* SECTION 1: SIMPLE TWEEN */}
      <div className="mb-12">
        <h2 className="text-2xl text-white mb-4">1. Simple Tween (All move together)</h2>
        <div className="flex gap-4">
          {["red", "green", "blue"].map(color => (
            <div 
              key={color}
              className={`box w-20 h-20 bg-${color}-500 rounded-lg`}
            />
          ))}
        </div>
        <p className="text-gray-300 mt-2">All 3 boxes rotate & move right simultaneously</p>
      </div>

      {/* SECTION 2: TIMELINE */}
      <div className="mb-12">
        <h2 className="text-2xl text-white mb-4">2. Timeline (Sequenced)</h2>
        <div className="flex flex-col gap-4">
          <div id="green" className="w-20 h-20 bg-green-500 rounded-lg" />
          <div id="blue" className="w-20 h-20 bg-blue-500 rounded-lg" />
          <div id="orange" className="w-20 h-20 bg-orange-500 rounded-lg" />
        </div>
        <p className="text-gray-300 mt-2">Green → Blue → Orange (one after another)</p>
      </div>

      {/* VISUAL EXPLANATION */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl text-yellow-300 mb-3">Key Difference:</h3>
        <ul className="text-gray-300 space-y-2">
          <li>• <strong>Tween:</strong> Animates elements <strong>simultaneously</strong></li>
          <li>• <strong>Timeline:</strong> Creates a <strong>sequence</strong> (one after another)</li>
          <li>• Timeline = Control multiple animations as a single unit</li>
        </ul>
      </div>
    </div>
  );
}