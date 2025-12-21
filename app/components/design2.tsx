import React from 'react';

const SimpleFlexDemo = () => {
  return (
    <div className="p-4">
      {/* Without flex - stacked vertically */}
      <div className="mb-8">
        <h3 className="font-bold mb-2">1. WITHOUT flex (default: vertical stack)</h3>
        <div className="border-2 p-4">
          <div className="w-20 h-20 bg-red-500 mb-2">Box 1</div>
          <div className="w-20 h-20 bg-blue-500 mb-2">Box 2</div>
          <div className="w-20 h-20 bg-green-500">Box 3</div>
        </div>
      </div>

      {/* With flex - side by side */}
      <div className="mb-8">
        <h3 className="font-bold mb-2">2. WITH flex (side by side)</h3>
        <div className="flex border-2 p-4">
          <div className="w-20 h-20 bg-red-500">Box 1</div>
          <div className="w-20 h-20 bg-blue-500">Box 2</div>
          <div className="w-20 h-20 bg-green-500">Box 3</div>
        </div>
      </div>

      {/* With flex and items-center */}
      <div>
        <h3 className="font-bold mb-2">3. WITH flex items-center (vertically aligned)</h3>
        <div className="flex items-center border-2 p-4 h-32">
          <div className="w-20 h-12 bg-red-500">Short</div>
          <div className="w-20 h-28 bg-blue-500">Tall</div>
          <div className="w-20 h-16 bg-green-500">Medium</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleFlexDemo;