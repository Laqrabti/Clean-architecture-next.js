// app/components/TestButton.tsx
"use client"
export default function TestButton() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tailwind CSS Test</h1>
      <button 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        onClick={() => alert('Tailwind is working!')}
      >
        Click Me (Red Button)
      </button>
      
      <div className="mt-4 p-4 border border-gray-200 rounded-lg">
        <p className="text-gray-700">If the button is red and changes shade when hovered, Tailwind is working correctly.</p>
      </div>
    </div>
  );
