"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * TimerExample
 * - shows setInterval created once on mount
 * - interval callback runs repeatedly (browser timer)
 * - cleanup runs only on unmount (or before effect re-run if deps changed)
 */
export default function TimerExample() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    console.log("✅ useEffect: mount -> create interval");

    // create interval once
    intervalRef.current = window.setInterval(() => {
      console.log("🔄 interval tick (callback running)");
      setCount(prev => prev + 1); // triggers re-render
    }, 1000);

    // cleanup: runs on unmount (or before re-running effect)
    return () => {
      console.log("🧹 cleanup called -> clearing interval");
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []); // empty => run once on mount

  console.log("📝 Render with count:", count);
  return <div>Count: {count}</div>;
}
