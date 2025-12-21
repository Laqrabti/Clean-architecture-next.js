import React from 'react';

export const FlexDirectionDemo = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Flex Direction Demo</h2>
      
      {/* DIV 1: Vertical Stack (default without flex) */}
      <div className="mb-8 p-4 border-2 border-gray-300 rounded">
        <h3 className="font-bold mb-2">Div 1: Default Vertical Stack (no flex)</h3>
        <div className="space-y-2">
          <div className="w-24 h-16 bg-blue-500 flex items-center justify-center text-white">A</div>
          <div className="w-24 h-16 bg-green-500 flex items-center justify-center text-white">B</div>
          <div className="w-24 h-16 bg-red-500 flex items-center justify-center text-white">C</div>
        </div>
      </div>

      {/* DIV 2: Horizontal Row (flex default) */}
      <div className="mb-8 p-4 border-2 border-gray-300 rounded">
        <h3 className="font-bold mb-2">Div 2: Horizontal Row (flex = side by side)</h3>
        <div className="flex"> {/* Default: row direction */}
          <div className="w-24 h-16 bg-blue-500 flex items-center justify-center text-white">A</div>
          <div className="w-24 h-16 bg-green-500 flex items-center justify-center text-white">B</div>
          <div className="w-24 h-16 bg-red-500 flex items-center justify-center text-white">C</div>
        </div>
      </div>

      {/* DIV 3: Horizontal Row with items-center (vertical centering) */}
      <div className="mb-8 p-4 border-2 border-gray-300 rounded">
        <h3 className="font-bold mb-2">Div 3: `flex items-center` (vertically centers in row)</h3>
        <div className="flex items-center h-32 bg-gray-100"> {/* items-center = vertical center */}
          <div className="w-24 h-12 bg-blue-500 flex items-center justify-center text-white">Short</div>
          <div className="w-24 h-20 bg-green-500 flex items-center justify-center text-white">Tall</div>
          <div className="w-24 h-16 bg-red-500 flex items-center justify-center text-white">Medium</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Different heights but aligned vertically</p>
      </div>

      {/* DIV 4: Column with items-center (horizontal centering) */}
      <div className="mb-8 p-4 border-2 border-gray-300 rounded">
        <h3 className="font-bold mb-2">Div 4: `flex-col items-center` (horizontally centers in column)</h3>
        <div className="flex flex-col items-center h-64 bg-gray-100">
          <div className="w-32 h-16 bg-blue-500 flex items-center justify-center text-white">Wide</div>
          <div className="w-20 h-16 bg-green-500 flex items-center justify-center text-white">Narrow</div>
          <div className="w-24 h-16 bg-red-500 flex items-center justify-center text-white">Medium</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Different widths but aligned horizontally</p>
      </div>

      {/* DIV 5: Column with justify-center (vertical centering) */}
      <div className="p-4 border-2 border-gray-300 rounded">
        <h3 className="font-bold mb-2">Div 5: `flex-col justify-center` (vertically centers in column)</h3>
        <div className="flex flex-col justify-center h-64 bg-gray-100">
          <div className="w-24 h-16 bg-blue-500 flex items-center justify-center text-white">A</div>
          <div className="w-24 h-16 bg-green-500 flex items-center justify-center text-white">B</div>
          <div className="w-24 h-16 bg-red-500 flex items-center justify-center text-white">C</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Centered vertically as a group</p>
      </div>
    </div>
  );
};
