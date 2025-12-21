"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { FaRobot, FaTimes, FaMicrophone, FaPaperPlane, FaExpand, FaCompress } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

gsap.registerPlugin(Draggable);

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
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

  // scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize draggable
  useEffect(() => {
    if (!containerRef.current) return;

    // clean up previous instance
    if (draggableRef.current) {
      draggableRef.current.kill();
      draggableRef.current = null;
    }

    draggableRef.current = Draggable.create(containerRef.current, {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: document.documentElement,
      inertia: true,
      allowContextMenu: true,
      onPress() {
        // slightly scale while pressing for tactile feedback
        gsap.to(containerRef.current, { scale: 0.98, duration: 0.12 });
      },
      onRelease() {
        gsap.to(containerRef.current, { scale: 1, duration: 0.12 });
      },
    })[0];

    return () => {
      if (draggableRef.current) {
        draggableRef.current.kill();
        draggableRef.current = null;
      }
    };
  }, []);

  // Expand / collapse animation
  useEffect(() => {
    const el = containerRef.current;
    const body = chatBodyRef.current;
    if (!el || !body) return;

    // ensure overflow hidden so height animates cleanly
    body.style.overflow = "hidden";

    if (isExpanded) {
      // calculate natural height
      // temporarily make visible to measure scrollHeight
      body.style.height = "auto";
      const natural = body.scrollHeight;
      body.style.height = "0px";

      const tl = gsap.timeline();
      tl.to(el, { width: 420, height: 600, duration: 0.38, ease: "power2.out" })
        .to(body, { height: natural, opacity: 1, duration: 0.28, ease: "power2.out" }, "-=.24");

      // focus input after expand
      setTimeout(() => inputRef.current?.focus(), 360);
    } else {
      const tl = gsap.timeline();
      tl.to(body, { height: 0, opacity: 0, duration: 0.22, ease: "power2.in" })
        .to(el, { width: 60, height: 60, duration: 0.38, ease: "power2.out" }, "-=.08");
    }
  }, [isExpanded]);

  // Send message (fixed to use functional updates so timeouts don't use stale state)
  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updated = [...prev, newUserMessage];
      return updated;
    });

    setInputText("");

    // Simulated AI reply
    setTimeout(() => {
      setMessages((prev) => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: "I received your message. This is a simulated response from the AI.",
          sender: "ai",
          timestamp: new Date(),
        };
        return [...prev, aiResponse];
      });
    }, 800);
  };

  // Recording simulation (also fixed to use functional updates)
  const toggleRecording = () => {
    setIsRecording((prev) => {
      const next = !prev;
      if (next) {
        // start simulated recording
        setTimeout(() => {
          setMessages((prevMsgs) => {
            const voiceMessage: Message = {
              id: Date.now(),
              text: "This is a simulated voice input message.",
              sender: "user",
              timestamp: new Date(),
            };
            return [...prevMsgs, voiceMessage];
          });
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

  // clicking the minimized tile should expand
  const handleMinimizedClick = () => setIsExpanded(true);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Chat assistant"
      className="fixed bottom-4 right-4 w-[60px] h-[60px] rounded-2xl shadow-2xl overflow-hidden z-50 bg-gradient-to-br from-gray-900 to-black border border-gray-800"
    >
      {/* Header (drag handle) */}
      <div
        className="relative h-[60px] px-4 flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 cursor-grab"
        aria-hidden={isExpanded ? "false" : "true"}
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
                  <p className="text-sm">{message.text}</p>
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
