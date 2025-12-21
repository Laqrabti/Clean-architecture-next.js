"use client";

import { useState, useEffect } from "react";

export default function TestComponent() {
  const [userId, setUserId] = useState(1);
  const [renderCount, setRenderCount] = useState(0);
  const [effectRuns, setEffectRuns] = useState(0);
  const [functionInstances, setFunctionInstances] = useState<string[]>([]);

  // This function recreates EVERY RENDER
   const fetchData = () => {
    console.log(`Fetching user ${userId} (Render #${renderCount})`);
    
    // Track function instance by memory reference
    const instanceId = `${userId}-${Math.random().toString(36).substr(2, 9)}`;
    setFunctionInstances(prev => [...prev.slice(-4), instanceId]);
  };

  // This effect runs when userId changes
  useEffect(() => {
    console.log("✅ EFFECT RUNNING - Fetching data...");
    fetchData();
    setEffectRuns(prev => prev + 1);
  }, [userId]); // 🔥 Depends on userId

  // Increment render count on every render
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  return (
    <div className="p-6 space-y-4 bg-gray-100 rounded-xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-2">Controls</h3>
          <div className="space-y-2">
            <button
              onClick={() => setUserId(prev => prev + 1)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Change User ID (Current: {userId})
            </button>
            
            <button
              onClick={() => setUserId(1)}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset to User 1
            </button>
            
            <button
              onClick={() => setFunctionInstances([])}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Function Log
            </button>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-2">Live Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Renders:</span>
              <span className="font-bold text-blue-600">{renderCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Effect Runs:</span>
              <span className="font-bold text-green-600">{effectRuns}</span>
            </div>
            <div className="flex justify-between">
              <span>Current User ID:</span>
              <span className="font-bold text-purple-600">{userId}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-bold mb-2">Function Instance Log</h3>
        <p className="text-sm text-gray-600 mb-3">
          Each render creates a NEW function instance. Last 4 shown:
        </p>
        <div className="space-y-2">
          {functionInstances.map((instance, index) => (
            <div 
              key={instance} 
              className="p-2 bg-gray-50 rounded border border-gray-200"
            >
              <div className="font-mono text-sm">
                {instance}
              </div>
              <div className="text-xs text-gray-500">
                Created at render #{renderCount - (functionInstances.length - index) + 1}
              </div>
            </div>
          ))}
          {functionInstances.length === 0 && (
            <p className="text-gray-500 text-center py-4">No function instances created yet</p>
          )}
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-bold text-yellow-800 mb-2">🔥 What to Observe:</h3>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-yellow-700">
          <li>Click "Change User ID" → Effect runs (count increases)</li>
          <li>Check console: <code>Fetching user X</code> appears</li>
          <li>New function instance appears in log</li>
          <li><strong>Render count increases MORE than effect runs</strong></li>
          <li>Functions recreate on EVERY render, but effect only runs when userId changes</li>
        </ol>
      </div>

      <div className="text-sm text-gray-600">
        <p>Open browser console to see logs when effects run vs functions recreate.</p>
      </div>
    </div>
  );
}




















// "use client"
// import { useRef, useEffect, useState } from "react";

// export default function MyComponent() {
//     const [Value, setValue] = useState<number>(1)

//     useEffect(()=> {
//       if (Value === 1) {
//         setValue(10 * Math.random())
//       }
//     }, [Value])

//   // const handleClick = () => {
//   //   console.log('React button clicked');
//   // };

//   return (
//     <div>
//       {Value}
//     </div>
//     // <button onClick={handleClick}>Click me</button>;
//   ) 
// }




// "use client"
// import { useRef, useEffect } from "react";

// export const MyComponent = () => {
//   const ref = useRef<HTMLDivElement>(null);
  
//   // This logs NULL (DOM not created yet)
//   console.log("During render:", ref.current); // null
  
  
//   useEffect(() => {
//     // This logs ACTUAL ELEMENT (DOM exists now)
//     console.log("After mount:", ref.current); // <div>...</div>
//   }, []);
  
//   return (
//     <div>
//       <div ref={ref}>Content</div>;
//     </div>
//   )
// };

// "use client";
// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";

// export default function FlexDemo() {
//   const boxesRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     boxesRef.current.forEach((box, i) => {
//       if (!box) return;
      
//       gsap.to(box, {
//         x: i * 100,
//         rotation: 360,
//         duration: 2,
//         delay: i * 0.3,
//         repeat: -1,
//         yoyo: true
//       });
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 p-8">
//       {/* WITHOUT flex center - boxes stack left/top */}
//       <h2 className="text-white text-2xl mb-4">Without Center (default)</h2>
//       <div className="border border-gray-600 h-64 mb-8">
//         {[1, 2, 3].map(i => (
//           <div 
//             key={i}
//             ref={el => {boxesRef.current[i] = el}}
//             className="w-20 h-20 bg-blue-500 m-2"
//           >
//             Box {i}
//           </div>
//         ))}
//       </div>

//       {/* WITH flex center - boxes center both ways */}
//       <h2 className="text-white text-2xl mb-4">With flex items-center justify-center</h2>
//       <div className="flex items-center justify-center border border-gray-600 h-64">
//         {[1, 2, 3].map(i => (
//           <div 
//             key={i+3}
//             ref={el => {boxesRef.current[i+3] = el}}
//             className="w-20 h-20 bg-green-500 m-2 flex items-center justify-center"
//           >
//             <span className="text-white font-bold">Box {i+3}</span>
//           </div>
//         ))}
//       </div>

//       {/* VISUAL GUIDE */}
//       <div className="mt-8 text-gray-300">
//         <p><strong>flex</strong> = enables flexbox</p>
//         <p><strong>items-center</strong> = vertical center (align-items: center)</p>
//         <p><strong>justify-center</strong> = horizontal center (justify-content: center)</p>
//         <p className="mt-4">Notice: Green boxes are centered BOTH ways, text inside them is also centered</p>
//       </div>
//     </div>
//   );
// }



// "use client"
// import React, {useRef, useEffect} from "react"
// import gsap from "gsap"

// export default function MyWork() {
//   const logoRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (!logoRef.current) return 

//     const logoTL = gsap.timeline({
//       repeat: -1,
//       yoyo: true,
//       repeatDelay: 1
//     })

//     logoTL.to(logoRef.current, {
//       x: 200,
//       rotation: 360,
//       duration: 3,
//       ease: "power1.inOut"
//     })
//     .to(logoRef.current, {
//       scale: 1.5,
//       duration: 1,
//       ease: "bounce.out"
//     })
//     .to(logoRef.current, {
//       scale: 1,
//       duration: 3,
//       ease: "power1.out"
//     })

//     return () => {
//       logoTL.kill()
//       gsap.killTweensOf(logoRef.current)
//     }

//   }, [])

//   return (
//     <div ref={logoRef} className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer">
//       <span className="text-white font-bold text-lg">logo</span>
//     </div>
//   )

// }

