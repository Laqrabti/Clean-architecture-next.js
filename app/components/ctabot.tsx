'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Settings,
  Bell,
  Send,
  Mic,
  Paperclip,
  Bot,
  User,
  Moon,
  Sun,
  Volume2,
  VolumeX
} from 'lucide-react';


type Sender = 'bot' | 'user';

type Message = {
  id: string;
  text: string;
  sender: Sender;
  time: string;
};

type Notification = {
  id: string;
  text: string;
  type: 'alert' | 'confirmation' | 'update';
  time: string;
  unread: boolean;
};

type UploadedFile = {
  id: string;
  name: string;
  mime: string;
  size: string;
  kind: string;
};

const formatTime = (d = new Date()) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const makeId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const ChatBot2: React.FC = () => {
  // UI customization knobs (you can also expose these as props)
  const [notifSize, setNotifSize] = useState<number>(46); // px; controls diameter of the notif button
  const [accentColor, setAccentColor] = useState<string>('#06b6d4'); // ninzoky accent (cyan-ish)

  // Core chat state
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: makeId(), text: "Hello! I'm your Ninzoky AI travel concierge. Ready to plan your perfect journey?", sender: 'bot', time: '10:00 AM' },
    { id: makeId(), text: 'Looking for a 5-day Tokyo itinerary with cherry blossom spots', sender: 'user', time: '10:01 AM' },
    { id: makeId(), text: "Great choice! Tokyo in spring is magical. I'll craft a personalized itinerary focusing on hidden sakura spots and local experiences.", sender: 'bot', time: '10:02 AM' },
  ]);

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: makeId(), text: 'Flight alert: Tokyo flights 15% cheaper today!', type: 'alert', time: '2 min ago', unread: true },
    { id: makeId(), text: 'Hotel booked: Park Hyatt Tokyo confirmed', type: 'confirmation', time: '1 hour ago', unread: true },
    { id: makeId(), text: 'Your itinerary is ready for review', type: 'update', time: '3 hours ago', unread: false },
  ]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [notificationPulse, setNotificationPulse] = useState(true);

  // Settings & customizing UI
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'dark' as 'dark' | 'light',
    sound: true,
    language: 'en',
    autoTranslate: false
  });

  // File upload
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotThinking, uploadedFiles]);

  // Notification pulse effect
  useEffect(() => {
    const id = setInterval(() => setNotificationPulse(prev => !prev), 2000);
    return () => clearInterval(id);
  }, []);

  // Helpers
  const unreadCount = notifications.filter(n => n.unread).length;

  // Send message
  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: makeId(), text: trimmed, sender: 'user', time: formatTime() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // simulate AI
    setIsBotThinking(true);
    const responses = [
      "I'm analyzing that for you... Let me check the best options.",
      'Great question! Searching my travel database now.',
      "Perfect! I'll find personalized recommendations for you."
    ];
    setTimeout(() => {
      const botMsg: Message = { id: makeId(), text: responses[Math.floor(Math.random() * responses.length)], sender: 'bot', time: formatTime() };
      setMessages(prev => [...prev, botMsg]);
      setIsBotThinking(false);
    }, 800 + Math.floor(Math.random() * 900));
  };
  const handleSend = () => sendMessage(inputText);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  // Voice toggle placeholder
  const handleVoiceToggle = () => setIsRecording(prev => !prev);

  // File handling
  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const mapped = files.map(f => ({
      id: makeId(),
      name: f.name,
      mime: f.type,
      size: `${(f.size / 1024).toFixed(1)} KB`,
      kind: f.type.startsWith('image') ? 'image' : f.type === 'application/pdf' ? 'pdf' : 'other'
    }));
    setUploadedFiles(prev => [...prev, ...mapped]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const triggerFileUpload = () => fileInputRef.current?.click();
  const removeUploadedFile = (id: string) => setUploadedFiles(prev => prev.filter(f => f.id !== id));

  // Notifications handlers
  const markNotificationAsRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));

  // Root style variables so the UI reflects the selected accent and notif size
  const rootStyle: React.CSSProperties = {
    // CSS variables for easy styling in child elements
    ['--ninzoky-accent' as any]: accentColor,
    ['--ninzoky-notif-size' as any]: `${notifSize}px`,
  };

  // Closed state floating button (keeps small unread badge)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Ninzoky chat"
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-2xl"
        style={{ background: `linear-gradient(90deg, ${accentColor} 0%, #3b82f6 100%)` }}
      >
        <Bot size={20} className="text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs font-semibold flex items-center justify-center text-white">
            {unreadCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div style={rootStyle} className="fixed bottom-6 right-6 z-50 w-96 h-[600px] flex flex-col font-sans">
      {/* Chat container */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-950 to-black rounded-2xl border shadow-2xl overflow-hidden relative" style={{ borderColor: 'rgba(6,182,212,0.18)' }}>
        {/* Header: logo, title, notification (moved here), settings, close */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-gray-900/70 to-black/70">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2 rounded-xl" style={{ background: `linear-gradient(135deg, ${accentColor}, #3b82f6)` }}>
                <Bot size={22} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900" />
            </div>
            <div>
              <h2 className="font-bold text-white">Ninzoky AI</h2>
              <p className="text-xs text-cyan-300/70 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Online • Travel Concierge
              </p>
            </div>
          </div>

          {/* Right controls: NOTIFICATION (bigger + on same level), SETTINGS, CLOSE */}
          <div className="flex items-center gap-2">
            {/* Notification button - size controlled by --ninzoky-notif-size variable */}
            <div className="relative" style={{ zIndex: 40 }}>
              <button
                onClick={() => setShowNotificationPanel(p => !p)}
                aria-label="Open notifications"
                title="Notifications"
                className="flex items-center justify-center rounded-full shadow-md transition-transform hover:scale-105"
                // use inline style so we can easily demonstrate how to manipulate size
                style={{
                  width: 'var(--ninzoky-notif-size)',
                  height: 'var(--ninzoky-notif-size)',
                  background: `linear-gradient(90deg, ${accentColor} 0%, #0ea5e9 100%)`,
                  border: '2px solid rgba(255,255,255,0.06)'
                }}
              >
                <Bell size={Math.max(16, Math.floor(notifSize * 0.45))} className="text-white" />
                {/* unread badge */}
                {unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex items-center justify-center text-[11px] font-semibold text-white rounded-full"
                    style={{
                      width: Math.max(18, Math.floor(notifSize * 0.45)),
                      height: Math.max(18, Math.floor(notifSize * 0.45)),
                      background: '#ef4444',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Panel anchored to the header button */}
              {showNotificationPanel && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-900 border rounded-2xl shadow-2xl p-3" style={{ transform: 'translateY(6px)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Travel Alerts</h3>
                    <button onClick={markAllAsRead} className="text-xs text-cyan-300 hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-56 overflow-y-auto space-y-2">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-3 rounded-lg cursor-pointer ${n.unread ? 'bg-blue-900/5' : 'bg-transparent'} hover:bg-gray-800/60`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm text-white">{n.text}</p>
                            <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                          </div>
                          {n.unread && <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1" />}
                        </div>
                        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                          n.type === 'alert' ? 'bg-red-900/20 text-red-400' :
                          n.type === 'confirmation' ? 'bg-green-900/20 text-green-400' :
                          'bg-blue-900/20 text-blue-400'
                        }`}>{n.type}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-center">
                    <button onClick={() => setShowNotificationPanel(false)} className="text-sm text-cyan-300 hover:text-cyan-200">Close</button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button
              onClick={() => setShowSettings(s => !s)}
              aria-label="Open settings"
              className="p-2 rounded-lg hover:bg-gray-800/40 transition-colors"
            >
              <Settings size={18} className="text-gray-300 hover:text-white" />
            </button>

            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="p-2 rounded-lg hover:bg-red-900/20 transition-colors"
            >
              <X size={18} className="text-gray-300 hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* Settings panel (contains knobs for notif size & accent color) */}
        {showSettings && (
          <div className="absolute top-16 right-4 w-72 bg-gray-900 border rounded-xl shadow-2xl z-50 p-4 animate-slideIn">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Settings</h3>
              <button onClick={() => setShowSettings(false)} className="text-sm text-gray-400">Close</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Notification size</label>
                <input
                  type="range"
                  min={36}
                  max={80}
                  value={notifSize}
                  onChange={(e) => setNotifSize(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-gray-400 mt-1">Current: {notifSize}px — change to increase/decrease button size</div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Accent color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-8 p-0 border-0 rounded"
                    aria-label="Choose accent color"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded p-2 text-sm text-white"
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">HEX or use the color picker.</div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Theme</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSettings(s => ({ ...s, theme: 'dark' }))}
                    className={`flex-1 py-2 rounded ${settings.theme === 'dark' ? 'bg-cyan-900/20 border border-cyan-700' : 'bg-gray-800'}`}
                  >Dark</button>
                  <button
                    onClick={() => setSettings(s => ({ ...s, theme: 'light' }))}
                    className={`flex-1 py-2 rounded ${settings.theme === 'light' ? 'bg-amber-900/20 border border-amber-700' : 'bg-gray-800'}`}
                  >Light</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-950/50 to-black/50">
          {messages.map(m => (
            <div key={m.id} className={`flex mb-4 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 ${m.sender === 'user' ? 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700/30 rounded-br-none' : 'bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700/30 rounded-bl-none'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {m.sender === 'bot' ? <Bot size={16} className="text-cyan-400" /> : <User size={16} className="text-blue-400" />}
                  <span className="text-xs font-semibold text-gray-300">{m.sender === 'bot' ? 'Ninzoky AI' : 'You'}</span>
                  <span className="text-xs text-gray-500 ml-auto">{m.time}</span>
                </div>
                <p className="text-gray-100 whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}

          {isBotThinking && (
            <div className="flex mb-4 justify-start">
              <div className="max-w-[40%] rounded-2xl p-3 bg-gray-800 border border-gray-700 flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150" />
                <span className="text-xs text-gray-400 ml-auto">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Uploaded preview */}
        {uploadedFiles.length > 0 && (
          <div className="px-4 pt-2 border-t border-gray-800/50">
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map(f => (
                <div key={f.id} className="flex items-center gap-2 bg-gray-900/50 rounded-lg px-3 py-2 border border-gray-700">
                  <Paperclip size={14} className="text-cyan-400" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-300 truncate max-w-[140px]">{f.name}</span>
                    <span className="text-[11px] text-gray-500">{f.size}</span>
                  </div>
                  <button onClick={() => removeUploadedFile(f.id)} className="ml-2 text-xs text-gray-400 hover:text-red-400">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-4 border-t bg-gradient-to-r from-gray-900/40 to-black/40">
          <div className="flex items-center gap-2">
            <button onClick={triggerFileUpload} className="p-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 transition-colors">
              <Paperclip size={20} className="text-gray-400 hover:text-white" />
            </button>
            <input ref={fileInputRef} type="file" onChange={handleFileUpload} className="hidden" multiple />

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about destinations, hotels, or itineraries..."
              className="flex-1 p-3 rounded-xl bg-gray-950 border border-gray-700 focus:border-cyan-500 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-colors"
            />

            <button onClick={handleVoiceToggle} className={`p-3 rounded-xl transition-all duration-300 ${isRecording ? 'bg-red-900/40 border-red-700 animate-pulse' : 'bg-gray-900 hover:bg-gray-800 border-gray-700'}`}>
              <Mic size={20} className={`${isRecording ? 'text-red-400' : 'text-gray-400 hover:text-cyan-400'}`} />
            </button>

            <button onClick={handleSend} disabled={!inputText.trim()} className="p-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold transition-all duration-200 flex items-center gap-2 shadow">
              <Send size={18} />
            </button>
          </div>

          {isRecording && (
            <div className="mt-3 p-3 bg-red-900/20 border border-red-700/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-red-300">Listening...</span>
              </div>
              <button onClick={handleVoiceToggle} className="text-xs bg-red-700 hover:bg-red-600 px-3 py-1 rounded-lg text-white">Stop</button>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {['Tokyo itinerary', 'Budget flights', 'Luxury hotels', 'Local food'].map(s => (
              <button key={s} onClick={() => setInputText(s)} className="text-xs px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 hover:text-white transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(12px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn { animation: slideIn 0.18s ease-out; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,200,255,0.18); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,200,255,0.32); }
      `}</style>
    </div>
  );
};

export default ChatBot2;
