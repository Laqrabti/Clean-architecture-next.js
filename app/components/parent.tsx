"use client"
import { useState } from "react";
import TogglePanel from "./child";

export default function Parent() {
  // SINGLE SOURCE OF TRUTH
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-center">Parent Component</h1>

        {/* Parent controls opening */}
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-500 transition"
        >
          Open Panel
        </button>

        {/* Props DOWN */}
        <TogglePanel
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
