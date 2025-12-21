'use client';

import { useState, useEffect } from 'react';
import { Hotel, Search, Send, User, Bot, Loader2, GlobeIcon, RefreshCcwIcon, CopyIcon } from 'lucide-react';

// Define our message type
type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  ui?: 'hotel_list' | null; // This controls if we render special UI
};

// Dummy hotel data to simulate an API response
const dummyHotels = [
  { id: 1, name: 'Grand Plaza Hotel', location: 'New York', price: 299, rating: 4.7 },
  { id: 2, name: 'Sunset Resort & Spa', location: 'Miami', price: 459, rating: 4.9 },
  { id: 3, name: 'Mountain View Lodge', location: 'Denver', price: 189, rating: 4.4 },
  { id: 4, name: 'Oceanfront Paradise', location: 'San Diego', price: 389, rating: 4.8 },
];

export default function AdvancedChatbot() {
  // State for messages and loading
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: 'Hello! I can help you find hotels. Try asking: "Show me hotels in New York" or simply click the demo button below.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to simulate an API call with a delay
  const simulateAPIcall = async (userQuery: string) => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determine response based on query
    let responseContent = `I received your query: "${userQuery}". Here are some hotels I found:`;
    let showHotelUI = userQuery.toLowerCase().includes('hotel') || userQuery.toLowerCase().includes('stay');
    
    // Add assistant's response
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: responseContent,
      ui: showHotelUI ? 'hotel_list' : null
    }]);
    
    setIsLoading(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate API response
    simulateAPIcall(input);
  };

  // Function to handle hotel selection (interactive!)
  const handleHotelSelect = (hotelId: number) => {
    const selectedHotel = dummyHotels.find(h => h.id === hotelId);
    
    // Add a system message about the selection
    const selectionMessage: ChatMessage = {
      id: `sel-${Date.now()}`,
      role: 'assistant',
      content: `Great choice! You selected ${selectedHotel?.name}. Shall I help you with the booking?`,
    };
    
    setMessages(prev => [...prev, selectionMessage]);
  };

  // Render special UI components based on message type
  const renderMessageContent = (message: ChatMessage) => {
    // If this message has a hotel UI, render the hotel list
    if (message.ui === 'hotel_list') {
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{message.content}</p>
          
          {/* Interactive Hotel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {dummyHotels.map((hotel) => (
              <div 
                key={hotel.id} 
                className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer bg-white"
                onClick={() => handleHotelSelect(hotel.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <GlobeIcon className="inline w-3 h-3 mr-1" />
                      {hotel.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-700">${hotel.price}</div>
                    <div className="text-sm text-amber-600">
                      {'★'.repeat(Math.floor(hotel.rating))}
                      <span className="text-gray-400">{'★'.repeat(5 - Math.floor(hotel.rating))}</span>
                      <span className="ml-1 text-gray-600">{hotel.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  Select This Hotel
                </button>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 mt-3">Click any hotel to select it!</p>
        </div>
      );
    }
    
    // Otherwise, render plain text
    return <p className="text-gray-700">{message.content}</p>;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Chat Container */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Chatbot</h1>
                <p className="text-blue-100 text-sm">Powered by Ninzoky • Online</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <RefreshCcwIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="h-[500px] overflow-y-auto p-6 bg-gray-50">
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
              >
                {/* Avatar */}
                {message.role !== 'user' && (
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                
                {/* Message Bubble */}
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div className={`rounded-2xl p-4 ${message.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 rounded-tl-none shadow-sm'}`}>
                    {renderMessageContent(message)}
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                    {message.role === 'user' ? 'You' : 'Assistant'} • Just now
                  </div>
                </div>
                
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching for hotels...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Input Area */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about hotels, destinations, or click 'Demo Hotel Search'..."
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-3 flex gap-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <CopyIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex gap-2">
              {/* Demo Button */}
              <button
                onClick={() => {
                  setInput('Show me luxury hotels');
                  setTimeout(() => handleSend(), 100);
                }}
                className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Hotel className="w-4 h-4" />
                Demo Hotel Search
              </button>
              
              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button 
              onClick={() => {
                setInput('Hotels in Paris under $200');
                setTimeout(() => handleSend(), 100);
              }}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Paris Budget
            </button>
            <button 
              onClick={() => {
                setInput('Beach resorts with spa');
                setTimeout(() => handleSend(), 100);
              }}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Beach Resorts
            </button>
            <button 
              onClick={() => {
                setInput('Best rated hotels in Tokyo');
                setTimeout(() => handleSend(), 100);
              }}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Tokyo Top Rated
            </button>
          </div>
        </div>
      </div>
      
      {/* Info Panel */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Search className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-900">How This Works</h3>
            <p className="text-sm text-blue-700">
              This chatbot simulates API calls with dummy data. Click "Demo Hotel Search" or type a query about hotels to see interactive hotel cards appear in the chat. Click any hotel to select it!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}