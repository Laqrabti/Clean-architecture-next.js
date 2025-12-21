type TogglePanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function TogglePanel({ open, onClose }: TogglePanelProps) {
  // Child does NOT decide visibility
  if (!open) return null;

  return (
    <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      <h2 className="font-semibold mb-2">Child Panel</h2>

      <p className="text-sm text-gray-300 mb-4">
        I don’t control my own visibility.
        I just receive <code>open</code> and call <code>onClose()</code>.
      </p>

      {/* EVENT UP */}
      <button
        onClick={onClose}
        className="px-3 py-1 bg-red-600 rounded hover:bg-red-500 transition"
      >
        Close
      </button>
    </div>
  );
}
