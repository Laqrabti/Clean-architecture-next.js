"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaRobot, FaTimes, FaMicrophone, FaPaperPlane, FaExpand, FaCompress } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

type Attachment = {
  type: "image" | "link" | "card" | "html";
  url?: string;
  title?: string;
  snippet?: string;
};

type Message = {
  id: number;
  text?: string;
  sender: "user" | "ai";
  timestamp: Date;
  attachments?: Attachment[];
};

export default function ChatBot() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: "ai", timestamp: new Date() },
  ]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const draggableRef = useRef<any>(null);

  // utility: small debounce
  const debounce = (fn: Function, wait = 120) => {
    let t: any;
    return (...args: any[]) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  // Ensure widget is fully inside viewport (called on open, on drag end, on resize)
  const ensureInViewport = () => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const padding = 12; // visual padding from edges

    let dx = 0;
    let dy = 0;

    if (rect.left < padding) dx = padding - rect.left;
    if (rect.right > window.innerWidth - padding) dx = (window.innerWidth - padding) - rect.right;
    if (rect.top < padding) dy = padding - rect.top;
    if (rect.bottom > window.innerHeight - padding) dy = (window.innerHeight - padding) - rect.bottom;

    if (dx !== 0 || dy !== 0) {
      // use relative animation so we don't need current transform parsing
      gsap.to(el, {
        x: `+=${dx}`,
        y: `+=${dy}`,
        duration: 0.28,
        ease: "power2.out",
        onComplete: () => {
          // let Draggable update its internal values
          try { draggableRef.current?.update(); } catch (e) { /* ignore */ }
        }
      });
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize draggable only once
  useEffect(() => {
    const initDraggable = async () => {
      if (!containerRef.current) return;

      // Kill previous instance if exists
      if (draggableRef.current) {
        try { draggableRef.current.kill(); } catch (e) { /* ignore */ }
        draggableRef.current = null;
      }

      try {
        const Draggable = (await import('gsap/Draggable')).default;
        gsap.registerPlugin(Draggable);

        // Create Draggable and bind to header only (".drag-handle") so inner clicks/inputs won't start dragging
        draggableRef.current = Draggable.create(containerRef.current, {
          type: "x,y",
          edgeResistance: 0.65,
          bounds: document.documentElement,
          inertia: true,
          handle: ".drag-handle",
          allowContextMenu: true,
          onPress() {
            gsap.to(containerRef.current, { scale: 0.98, duration: 0.12 });
          },
          onRelease() {
            gsap.to(containerRef.current, { scale: 1, duration: 0.12 });
          },
          onDragEnd: debounce(() => {
            ensureInViewport();
          }, 60),
        })[0];
      } catch (e) {
        console.warn('Draggable plugin failed to load:', e);
      }

      // Ensure visible on mount
      ensureInViewport();
    };

    initDraggable();

    // Resize handler — keep it inside viewport
    const onResize = debounce(() => {
      ensureInViewport();
      try { draggableRef.current?.update(); } catch (e) { /* ignore */ }
    }, 120);

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      try { draggableRef.current?.kill(); } catch (e) { /* ignore */ }
      draggableRef.current = null;
    };
  }, []);

  // Expand / collapse animation — measure natural height for smooth animation
  useEffect(() => {
    const el = containerRef.current;
    const body = chatBodyRef.current;
    if (!el || !body) return;

    // temporarily set overflow hidden so we can animate height
    body.style.overflow = "hidden";

    if (isExpanded) {
      // measure natural height
      body.style.height = "auto";
      const natural = body.scrollHeight;
      body.style.height = "0px";

      const tl = gsap.timeline();
      tl.to(el, { width: 420, height: 600, duration: 0.38, ease: "power2.out" })
        .to(body, { height: natural, opacity: 1, duration: 0.28, ease: "power2.out" }, "-=.24");

      // ensure fully on-screen after expand
      setTimeout(() => ensureInViewport(), 360);

      // focus input after expand
      setTimeout(() => inputRef.current?.focus(), 360);
    } else {
      const tl = gsap.timeline();
      tl.to(body, { height: 0, opacity: 0, duration: 0.22, ease: "power2.in" })
        .to(el, { width: 60, height: 60, duration: 0.38, ease: "power2.out" }, "-=.08");
    }
  }, [isExpanded]);

  // Send message (functional updates to avoid stale closures)
  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");

    // Simulated AI reply — in production you would call your backend here
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: "I received your message. This is a simulated response from the AI.",
        sender: "ai",
        timestamp: new Date(),
      }]);
    }, 800);
  };

  // Recording simulation
  const toggleRecording = () => {
    setIsRecording((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          setMessages((prevMsgs) => [...prevMsgs, {
            id: Date.now(),
            text: "This is a simulated voice input message.",
            sender: "user",
            timestamp: new Date(),
          }]);
          setIsRecording(false);
        }, 1600);
      }
      return next;
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMinimizedClick = () => setIsExpanded(true);

  // Render attachments (images, links, cards)
  const renderAttachment = (att: Attachment, i: number) => {
    switch (att.type) {
      case "image":
        return (
          <div key={i} className="mt-2 rounded-lg overflow-hidden">
            <img src={att.url} alt={att.title || "image"} className="w-full object-cover max-h-48 rounded" />
            {att.title && <div className="text-xs mt-1 opacity-70">{att.title}</div>}
          </div>
        );
      case "link":
        return (
          <a key={i} href={att.url} target="_blank" rel="noreferrer" className="block mt-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700">
            <div className="text-sm font-medium">{att.title || att.url}</div>
            {att.snippet && <div className="text-xs opacity-70">{att.snippet}</div>}
          </a>
        );
      case "card":
        return (
          <div key={i} className="mt-2 p-3 rounded-lg bg-gray-800">
            <div className="font-semibold">{att.title}</div>
            {att.snippet && <div className="text-xs opacity-70">{att.snippet}</div>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Chat assistant"
      className="fixed bottom-4 right-4 w-[60px] h-[60px] rounded-2xl shadow-2xl overflow-hidden z-50 bg-gradient-to-br from-gray-900 to-black border border-gray-800"
    >
      {/* Header (drag handle) */}
      <div
        className="drag-handle relative h-[60px] px-4 flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 cursor-grab"
        aria-hidden={!isExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <SiOpenai className="text-gray-900 text-lg" />
            </div>
            {isRecording && <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />}
          </div>

          {isExpanded && (
            <div className="text-white">
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-xs opacity-80">Always here to help</p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded((s) => !s)}
            className="text-white hover:text-gray-200 transition-colors z-20 relative"
            aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
          >
            {isExpanded ? <FaCompress /> : <FaExpand />}
          </button>

          <button
            onClick={() => setIsExpanded(false)}
            className="text-white hover:text-gray-200 transition-colors z-20 relative"
            aria-label="Close chat"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Chat Body */}
      <div ref={chatBodyRef} className="opacity-0 h-0 flex flex-col bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none"
                      : "bg-gray-800 text-gray-100 rounded-bl-none"
                  }`}
                >
                  {message.text && <p className="text-sm">{message.text}</p>}

                  {message.attachments?.map((att, i) => renderAttachment(att, i))}

                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-gray-800 bg-gray-900 p-4">
          {isRecording && (
            <div className="mb-3 p-3 bg-red-900/20 border border-red-500/30 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-red-300">Recording... Speak now</span>
                </div>
                <button onClick={toggleRecording} className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg">
                  Stop
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
              />

              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                <button type="button" onClick={handleSend} className="p-2 hover:text-purple-400 transition-colors" aria-label="Send message">
                  <FaPaperPlane />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleRecording}
              className={`p-3 rounded-xl transition-all duration-300 ${isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"}`}
              aria-label={isRecording ? "Stop recording" : "Start voice recording"}
            >
              <FaMicrophone className="text-white" />
            </button>
          </div>

          <div className="flex justify-center space-x-4 mt-3">
            <button onClick={() => setMessages([])} className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg">
              Clear Chat
            </button>
            <button className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg">Export</button>
            <button className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg">Settings</button>
          </div>
        </div>
      </div>

      {/* Minimized Tile (click to expand) */}
      {!isExpanded && (
        <div className="absolute inset-0 flex items-center justify-center" onClick={handleMinimizedClick} role="button" tabIndex={0} aria-label="Open chat">
          <div className="relative">
            <FaRobot className="text-white text-2xl" />
            {messages.length > 1 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />}
          </div>
        </div>
      )}
    </div>
  );
}
