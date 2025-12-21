// components/InteractiveNavbar.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, X, MessageSquare, Send } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function InteractiveNavbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: 'Hello! I am your AI assistant. How can I help you today?', sender: 'bot', timestamp: new Date() },
  ]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Safe test video URL
  const testVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

  // Video event handlers
  const handleMouseEnter = () => {
    if (videoRef.current && !chatbotOpen) {
      videoRef.current.play().catch(e => console.log('Video play error:', e));
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !chatbotOpen) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setChatbotOpen(true);
    
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Chatbot functionality
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! How can I assist you further?",
        "I understand. Let me check that for you.",
        "That's a great question! Here's what I think...",
        "I'll help you with that right away.",
        "Is there anything specific you'd like to know?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: ChatMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && chatbotOpen) {
        setChatbotOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [chatbotOpen]);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo/Brand */}
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">BrandLogo</h1>
              </div>
              
              {/* Desktop Navigation Links */}
              <nav className="hidden md:block" aria-label="Main navigation">
                <div className="ml-10 flex items-baseline space-x-6">
                  {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                      aria-label={`Navigate to ${item}`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            {/* Right Section: Video + Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Video Chatbot Trigger */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={handleVideoClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-32 h-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  aria-label="Video chatbot trigger. Hover to play video, click to open chatbot"
                  title="Hover to play video, click to open chatbot"
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                    src={testVideoUrl}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="https://images.unsplash.com/photo-1514888286974-6d03bde4ba14?w=160&h=80&fit=crop"
                    aria-label="Preview video that plays on hover"
                  />
                  
                  {/* Hover Play Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {isPlaying ? 'Playing...' : 'Hover to play'}
                    </div>
                  </div>
                  
                  {/* Click to Chat Indicator */}
                  <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Click to chat
                  </div>
                </button>
                
                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Hover to play • Click for chatbot
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
                {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <nav id="mobile-menu" aria-label="Mobile navigation">
              <div className="md:hidden border-t border-gray-200 mt-2 pt-4 pb-4">
                <div className="space-y-1">
                  {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                      aria-label={`Navigate to ${item}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          )}
        </div>
      </nav>

      {/* Chatbot Modal */}
      {chatbotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Chatbot dialog">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setChatbotOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close chatbot"
            onKeyDown={(e) => e.key === 'Enter' && setChatbotOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full" aria-hidden="true">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">AI Assistant</h2>
                    <p className="text-blue-100 text-sm">Online • Ready to help</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setChatbotOpen(false)}
                  className="text-white/80 hover:text-white text-xl transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded p-1"
                  aria-label="Close chatbot dialog"
                >
                  <span className="sr-only">Close chatbot</span>
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50" aria-live="polite">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                      }`}
                      role={msg.sender === 'bot' ? "status" : "none"}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-3">
                <div className="flex-grow relative">
                  <label htmlFor="chat-input" className="sr-only">
                    Type your message to the chatbot
                  </label>
                  <textarea
                    id="chat-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message here..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={1}
                    aria-label="Chat message input"
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      message.trim()
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                    aria-label="Send message"
                    title={message.trim() ? "Send message" : "Type a message to enable send"}
                  >
                    <span className="sr-only">Send message</span>
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send • Esc to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}