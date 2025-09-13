"use client"

import React, { useEffect, useState } from 'react'

export function ResizeWindow() {
    const [size, setSize] = useState({
            width: 0,
            height: 0
        })

    useEffect(()=> {
        
        const resizeWindow = () => {
            setSize({width: window.innerWidth, height: window.innerHeight})
        }

        document.addEventListener("resize", resizeWindow)

        return () => removeEventListener("resize", resizeWindow)

    }, [])
  return (
    <div>
      Window size: {size.width} x {size.height}
    </div>
  )
}


export function ButtonComponent() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Click Me
      </button>
    </div>
  );
}


import { useRef } from 'react'

export function DOMExample() {

    const divRef = useRef<HTMLDivElement>(null)

    const makeRed = () => {
        if (divRef.current) {
            divRef.current.style.background = "red";
            divRef.current.innerText = "changed";
            divRef.current.classList.add('active');
        }  
    }

    return (
            <div>
                <div ref={divRef} className="box">
                    Original content
                </div>
                <button onClick={makeRed}> modify dom</button>
            </div>
        )
}





