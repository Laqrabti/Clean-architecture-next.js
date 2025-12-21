// app/components/Destination.tsx
"use client";
import { useRef } from "react";

export default function Destination() {
  // Create a ref for the target location
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={targetRef} // ← THIS REF captures the DOM element
      className="logo-target"
      style={{
        width: '100px',
        height: '100px',
        border: '2px dashed gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: '50px',
        top: '50px'
      }}
    >
      Logo will land here
    </div>
  );
}