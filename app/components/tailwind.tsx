"use client"


import React, { useState } from 'react';

const TailwindMasterComponent = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [pixelSize, setPixelSize] = useState(20);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="p-4">
            
    {/* Row with justify-between */}
    <div className="flex justify-between border-2 p-4 mb-4">
      <div className="w-16 h-16 bg-blue-500">Start</div>
      <div className="w-16 h-16 bg-red-500">End</div>
    </div>

    {/* Row with items-center */}
    <div className="flex items-center border-2 p-4 h-32 mb-4">
      <div className="w-16 h-12 bg-green-500">Short</div>
      <div className="w-16 h-20 bg-yellow-500">Tall</div>
    </div>

    {/* Both together */}
    <div className="flex justify-between items-center border-2 p-4 h-32">
      <div className="w-16 h-12 bg-purple-500">Left</div>
      <div className="w-16 h-20 bg-pink-500">Center</div>
      <div className="w-16 h-16 bg-orange-500">Right</div>
    </div>
  </div>
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-10 p-4 bg-gray-800 rounded-lg">
        <h1 className="text-2xl font-bold">Tailwind CSS Master Component</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowGrid(!showGrid)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
          >
            {showGrid ? 'Hide' : 'Show'} Grid
          </button>
          <div className="flex items-center gap-2">
            <span>Pixel Size:</span>
            <input 
              type="range" 
              min="10" 
              max="50" 
              value={pixelSize}
              onChange={(e) => setPixelSize(parseInt(e.target.value))}
              className="w-32"
            />
            <span>{pixelSize}px</span>
          </div>
        </div>
      </div>

      {/* Main content with grid overlay */}
      <div className="relative border-2 border-gray-700 rounded-lg min-h-[500px]">
        {/* Grid overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal lines */}
            {Array.from({ length: Math.floor(500 / pixelSize) }).map((_, i) => (
              <div 
                key={`h-${i}`}
                className="absolute w-full border-t border-gray-600"
                style={{ top: `${i * pixelSize}px` }}
              >
                <span className="absolute left-0 -ml-12 text-xs text-gray-400">
                  {i * pixelSize}px
                </span>
              </div>
            ))}
            
            {/* Vertical lines */}
            {Array.from({ length: Math.floor(1000 / pixelSize) }).map((_, i) => (
              <div 
                key={`v-${i}`}
                className="absolute h-full border-l border-gray-600"
                style={{ left: `${i * pixelSize}px` }}
              >
                <span className="absolute top-0 -mt-6 text-xs text-gray-400">
                  {i * pixelSize}px
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Content demonstrating Tailwind concepts */}
        <div className="relative p-8">
          {/* Flex Container Examples */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Flex Layout Examples</h2>
            
            {/* Flex Centered */}
            <div className="flex flex-col mb-6">
              <h3 className="text-lg text-green-400 mb-2">1. Flex Centered (items-center justify-center)</h3>
              <div className="flex items-center justify-center h-40 bg-gray-800 rounded border-2 border-green-500">
                <div className="bg-green-600 p-4 rounded">Centered Content</div>
              </div>
            </div>

            {/* Flex Space Between */}
            <div className="flex flex-col mb-6">
              <h3 className="text-lg text-blue-400 mb-2">2. Flex Space Between (justify-between)</h3>
              <div className="flex justify-between items-center h-32 bg-gray-800 rounded p-4 border-2 border-blue-500">
                {[1, 2, 3].map(num => (
                  <div key={num} className="bg-blue-600 p-4 rounded">
                    Item {num}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Button Examples */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Button Examples</h2>
            <div className="flex flex-wrap gap-6">
              {/* Different padding examples */}
              <button className="px-2 py-1 bg-red-600 rounded">px-2 py-1</button>
              <button className="px-4 py-2 bg-orange-600 rounded">px-4 py-2</button>
              <button className="px-6 py-3 bg-yellow-600 rounded">px-6 py-3</button>
              
              {/* Different margin examples */}
              <button className="px-4 py-2 bg-green-600 rounded m-2">m-2</button>
              <button className="px-4 py-2 bg-teal-600 rounded mx-4 my-2">mx-4 my-2</button>
              <button className="px-4 py-2 bg-blue-600 rounded ml-8 mr-2 mt-4 mb-1">
                ml-8 mr-2 mt-4 mb-1
              </button>
            </div>
          </div>

          {/* Dimension Examples */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Dimension Examples</h2>
            <div className="grid grid-cols-4 gap-4">
              {['w-16 h-16', 'w-24 h-24', 'w-32 h-32', 'w-48 h-48'].map((size, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`bg-purple-600 flex items-center justify-center ${size} rounded`}>
                    {size}
                  </div>
                  <span className="text-xs mt-1 text-gray-400">
                    {size === 'w-16 h-16' ? '64px × 64px' : 
                     size === 'w-24 h-24' ? '96px × 96px' :
                     size === 'w-32 h-32' ? '128px × 128px' : '192px × 192px'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Input Examples */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Input Examples</h2>
            <div className="flex flex-col gap-4 max-w-md">
              <input 
                type="text" 
                placeholder="Default input (w-full)"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              />
              <input 
                type="text" 
                placeholder="Large input"
                className="w-64 p-4 text-lg rounded-lg bg-gray-700 border-2 border-blue-500"
              />
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Flex grow input"
                  className="flex-grow p-2 rounded bg-gray-700"
                />
                <button className="px-4 bg-indigo-600 rounded">Search</button>
              </div>
            </div>
          </div>

          {/* Image Examples */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Image Dimension Examples</h2>
            <div className="flex flex-wrap gap-8 items-end">
              {/* Square images */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-700 flex items-center justify-center rounded overflow-hidden">
                  <div className="text-center">
                    <div className="text-sm">32×32</div>
                    <div className="text-xs text-gray-400">w-32 h-32</div>
                  </div>
                </div>
                <span className="mt-2 text-sm">Square Image</span>
              </div>

              {/* Rectangle images */}
              <div className="flex flex-col items-center">
                <div className="w-48 h-24 bg-gray-700 flex items-center justify-center rounded overflow-hidden">
                  <div className="text-center">
                    <div className="text-sm">48×24</div>
                    <div className="text-xs text-gray-400">w-48 h-24</div>
                  </div>
                </div>
                <span className="mt-2 text-sm">Landscape</span>
              </div>

              {/* Responsive image */}
              <div className="flex flex-col items-center">
                <div className="w-full max-w-sm h-20 bg-gray-700 flex items-center justify-center rounded overflow-hidden">
                  <div className="text-center">
                    <div className="text-sm">max-w-sm</div>
                    <div className="text-xs text-gray-400">Responsive width</div>
                  </div>
                </div>
                <span className="mt-2 text-sm">Responsive Container</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with explanation */}
      <div className="mt-8 p-6 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Key Concepts Demonstrated:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-green-400">Spacing:</h4>
            <ul className="text-sm text-gray-300">
              <li>• p/m = padding/margin</li>
              <li>• t/r/b/l = top/right/bottom/left</li>
              <li>• x/y = horizontal/vertical</li>
              <li>• Numbers = 0.25rem increments (4px = 1 unit)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-400">Flexbox:</h4>
            <ul className="text-sm text-gray-300">
              <li>• flex = display: flex</li>
              <li>• items-center = align-items: center</li>
              <li>• justify-center = justify-content: center</li>
              <li>• justify-between = space between items</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-400">Dimensions:</h4>
            <ul className="text-sm text-gray-300">
              <li>• w-/h- = width/height</li>
              <li>• min-h-screen = 100vh minimum</li>
              <li>• Numbers = rem units (16 = 4rem = 64px)</li>
              <li>• full = 100%</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-yellow-400">Responsive:</h4>
            <ul className="text-sm text-gray-300">
              <li>• Default = mobile first</li>
              <li>• sm:/md:/lg: = breakpoints</li>
              <li>• max-w-* = maximum width</li>
              <li>• Use devtools to resize!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindMasterComponent;