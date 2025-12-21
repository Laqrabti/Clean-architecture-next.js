export function ChatbotUI() {
  return (
    <div className="
      w-96 h-[600px] mx-auto 
      bg-gray-50 border border-gray-200 
      rounded-2xl shadow-lg
      flex flex-col
    ">
      
      {/* HEADER SECTION */}
      <div className="
        bg-blue-600 text-white 
        p-4 rounded-t-2xl
        flex items-center justify-between
      ">
        {/* Left: Title & Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            🤖
          </div>
          <div>
            <h2 className="font-bold">AI Assistant</h2>
            <p className="text-xs opacity-80">Online</p>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex gap-2">
          {/* Config Icon */}
          <button className="
            w-8 h-8 
            bg-white/20 hover:bg-white/30 
            rounded-full flex items-center justify-center
            transition-colors
          ">
            ⚙️
          </button>
          
          {/* Close Icon */}
          <button className="
            w-8 h-8 
            bg-white/20 hover:bg-white/30 
            rounded-full flex items-center justify-center
            transition-colors
          ">
            ✕
          </button>
        </div>
      </div>

      {/* MESSAGES SECTION (Scrollable) */}
      <div className="
        flex-1 p-4 overflow-y-auto
        flex flex-col gap-4
      ">
        {/* Bot Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            🤖
          </div>
          <div className="
            bg-white p-3 rounded-2xl rounded-tl-none
            max-w-[80%] shadow-sm
          ">
            <p>Hello! How can I help you today?</p>
            <p className="text-xs text-gray-400 mt-1">2:30 PM</p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-3 justify-end">
          <div className="
            bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none
            max-w-[80%] shadow-sm
          ">
            <p>Can you explain Tailwind CSS?</p>
            <p className="text-xs opacity-80 mt-1">2:31 PM</p>
          </div>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
            U
          </div>
        </div>

        {/* Empty state hint */}
        <p className="text-center text-gray-400 text-sm py-8">
          Start typing to begin conversation...
        </p>
      </div>

      {/* INPUT SECTION */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          {/* Text Input */}
          <input 
            type="text"
            placeholder="Type your message..."
            className="
              flex-1 px-4 py-3 
              border border-gray-300 rounded-full
              focus:outline-none focus:ring-2 focus:ring-blue-500
              placeholder:text-gray-400
            "
          />
          
          {/* Send Button */}
          <button className="
            w-12 h-12 
            bg-blue-600 hover:bg-blue-700 
            text-white rounded-full 
            flex items-center justify-center
            transition-colors
          ">
            ↑
          </button>
        </div>
        
        {/* Helper text */}
        <p className="text-xs text-gray-400 text-center mt-2">
          Press Enter to send • Ctrl+Space for commands
        </p>
      </div>
    </div>
  );
}