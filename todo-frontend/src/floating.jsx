import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';
import './chatbot.css';

const CombinedChatbot = () => {
  // State for the floating robot
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [robotMode, setRobotMode] = useState("idle"); // idle, active, thinking, blink

  // State for the chatbot
  const [messages, setMessages] = useState([
    { }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [robotEmotion, setRobotEmotion] = useState('neutral');
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // Robot animation for floating button
  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (robotMode === "idle") {
        // Random eye blink occasionally
        if (Math.random() > 0.8) {
          setRobotMode("blink");
          setTimeout(() => setRobotMode("idle"), 300);
        }
      }
    }, 2000);
    
    return () => clearInterval(animationInterval);
  }, [robotMode]);

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setRobotMode("active");
      setTimeout(() => setRobotMode("idle"), 2000);
    }
  };

  // Create background elements for the chatbot
  const generateBackgroundElements = () => {
    const elements = [];
    
    // Create circuit lines
    for (let i = 0; i < 8; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const width = 50 + Math.random() * 100;
      const delay = Math.random() * 5;
      const rotation = Math.random() * 360;
      
      elements.push(
        <div 
          key={`line-${i}`}
          className="circuit-line bg-element"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${width}px`,
            transform: `rotate(${rotation}deg)`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    
    // Create dots
    for (let i = 0; i < 12; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      
      elements.push(
        <div 
          key={`dot-${i}`}
          className="circuit-dot bg-element"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    
    // Create data bubbles
    for (let i = 0; i < 5; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = 20 + Math.random() * 40;
      const delay = Math.random() * 5;
      
      elements.push(
        <div 
          key={`bubble-${i}`}
          className="data-bubble bg-element"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    
    // Create code symbols
    const symbols = ['{ }', '< >', '[ ]', '( )', '0 1', '// '];
    for (let i = 0; i < 6; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const rotation = Math.random() * 60 - 30;
      
      elements.push(
        <div 
          key={`symbol-${i}`}
          className="code-symbol bg-element"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${rotation}deg)`,
            animationDelay: `${delay}s`
          }}
        >
          {symbols[i % symbols.length]}
        </div>
      );
    }
    
    // Create mini robots
    for (let i = 0; i < 4; i++) {
      const top = 10 + Math.random() * 80;
      const left = 10 + Math.random() * 80;
      const delay = Math.random() * 5;
      
      elements.push(
        <div 
          key={`mini-robot-${i}`}
          className="mini-robot bg-element"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    
    return elements;
  };

  // Send message function for the chatbot
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    // setLoading(true);
    setRobotEmotion('thinking');
    setRobotMode("thinking"); // Also update floating robot state
    
    // try {
    //   // You can replace this with your actual API endpoint
    //   // For now, simulate a response after a delay
    //   setTimeout(() => {
    //     // Generate different responses based on input
    //     let botResponse = "";
    //     const lowercaseMsg = input.toLowerCase();
        
    //     if (lowercaseMsg.includes("hello") || lowercaseMsg.includes("hi")) {
    //       botResponse = "Hello! Nice to meet you. What can I do for you today?";
    //       setRobotEmotion('happy');
    //     } else if (lowercaseMsg.includes("how are you")) {
    //       botResponse = "I'm running at optimal performance, thanks for asking! How about you?";
    //       setRobotEmotion('happy');
    //     } else if (lowercaseMsg.includes("your name")) {
    //       botResponse = "I'm Medicure Assistant, your friendly AI healthcare assistant!";
    //       setRobotEmotion('happy');
    //     } else if (lowercaseMsg.includes("help") || lowercaseMsg.includes("assist")) {
    //       botResponse = "I'd be happy to help! I can provide health information, answer medical questions, or just chat. What's on your mind?";
    //       setRobotEmotion('neutral');
    //     } else if (lowercaseMsg.includes("thank")) {
    //       botResponse = "You're welcome! Always happy to assist with your healthcare needs.";
    //       setRobotEmotion('happy');
    //     } else if (lowercaseMsg.includes("bye") || lowercaseMsg.includes("goodbye")) {
    //       botResponse = "Goodbye! Click on me whenever you need help with medical information.";
    //       setRobotEmotion('neutral');
    //     } else {
    //       botResponse = `Thanks for your message. How can I assist you with your healthcare needs today?`;
    //       setRobotEmotion('neutral');
    //     }
        
    //     setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    //     setLoading(false);
    //     setRobotMode("active"); // Update floating robot state
        
    //     // Reset robot mode after response
    //     setTimeout(() => setRobotMode("idle"), 2000);
    //   }, 1500);
      
      const res = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      
      setMessages((prev) => [...prev, { type: 'bot', text: data.reply }]);
      
      // Set robot emotion based on bot's reply
      if (data.reply.toLowerCase().includes('error')) {
        setRobotEmotion('concerned');
      } else {
        setRobotEmotion('happy');
      }
 
      
    // } catch (err) {
    //   setMessages((prev) => [...prev, { type: 'bot', text: "Error: Couldn't reach server." }]);
    //   setRobotEmotion('concerned');
    //   setRobotMode("idle");
    // }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Full Chat Window */}
      {isChatOpen && (
        <div className="bg-white rounded-3xl shadow-2xl mb-6 overflow-hidden border border-indigo-300 animate-fadeIn w-[400px] h-[600px]">
          {/* Close button */}
          <button 
            onClick={toggleChat} 
            className="absolute top-4 right-4 text-indigo-600 hover:bg-indigo-100 rounded-full p-2 transition-colors z-10"
          >
            <X size={20} />
          </button>
          
          {/* Chatbot from the second code */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            {/* Background Elements */}
            {generateBackgroundElements()}
            
            <div className="w-full h-full bg-white flex flex-col relative overflow-hidden chatbot-container">
              {/* Robot Avatar with Animation */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                <div className="ripple ripple-1"></div>
                <div className="ripple ripple-2"></div>
                <div className="ripple ripple-3"></div>
                
                <div className={`robot-avatar ${robotEmotion}`}>
                  <div className="right-eye"></div>
                  <div className="mouth"></div>
                  <div className="headphone-left"></div>
                  <div className="headphone-right"></div>
                  <div className="connector"></div>
                  <div className="antenna"></div>
                  
                  {/* Chat bubble that appears based on emotion */}
                  {robotEmotion === 'neutral' && (
                    <div className="chat-bubble">Hi, how can I help you?</div>
                  )}
                  {robotEmotion === 'happy' && (
                    <div className="chat-bubble">Great! I'm glad I could help.</div>
                  )}
                  {robotEmotion === 'concerned' && (
                    <div className="chat-bubble">I'm sorry, there seems to be an issue.</div>
                  )}
                  {robotEmotion === 'thinking' && (
                    <div className="chat-bubble">Hmm, let me think about that...</div>
                  )}
                </div>
              </div>
              
              <div className="text-3xl font-bold text-indigo-800 mb-8 mt-28 text-center chatbot-title">
                Medicure Assistant
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 px-6 messages-container">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message ${msg.type === 'user' ? 'user-message ml-auto' : 'bot-message mr-auto'}`}
                  >
                    {msg.text}
                  </div>
                ))}
                {loading && (
                  <div className="typing-indicator mr-auto">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="mt-4 mx-6 mb-6 flex space-x-4 input-container">
                <input
                  ref={chatInputRef}
                  type="text"
                  placeholder="Ask something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 border-2 border-indigo-300 rounded-xl px-4 py-3 bg-white text-indigo-800 focus:outline-none focus:border-indigo-500"
                />
                <button 
                  onClick={sendMessage} 
                  className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-500 transition-colors focus:outline-none send-button"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Floating Robot Button - LARGER SIZE */}
      <button
        onClick={toggleChat}
        className="relative bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg transition-all duration-300 hover:transform hover:scale-105 border-4 border-blue-400"
      >
        <div className="w-20 h-20 relative">
          {/* Robot Head */}
          <div className="absolute top-1 left-3 w-14 h-10 bg-gray-100 rounded-t-xl border-2 border-blue-300"></div>
          
          {/* Robot Eyes */}
          {robotMode === "blink" ? (
            <>
              <div className="absolute top-4 left-6 w-3 h-0.5 bg-blue-600 rounded-full"></div>
              <div className="absolute top-4 left-11 w-3 h-0.5 bg-blue-600 rounded-full"></div>
            </>
          ) : robotMode === "thinking" ? (
            <>
              <div className="absolute top-4 left-6 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="absolute top-4 left-11 w-3 h-3 bg-blue-600 rounded-full animate-pulse delay-100"></div>
            </>
          ) : (
            <>
              <div className="absolute top-4 left-6 w-3 h-3 bg-blue-600 rounded-full"></div>
              <div className="absolute top-4 left-11 w-3 h-3 bg-blue-600 rounded-full"></div>
            </>
          )}
          
          {/* Robot Mouth */}
          {robotMode === "active" ? (
            <div className="absolute top-8 left-7 w-6 h-1.5 bg-blue-600 rounded-full"></div>
          ) : robotMode === "thinking" ? (
            <div className="absolute top-8 left-6 w-8 h-1 bg-blue-600 rounded-sm"></div>
          ) : (
            <div className="absolute top-8 left-7 w-6 h-1 bg-blue-600"></div>
          )}
          
          {/* Robot Antennas */}
          <div className="absolute top-0 left-6 w-1.5 h-3 bg-gray-300 rounded-t-sm"></div>
          <div className="absolute -top-2 left-5.5 w-3 h-2 bg-red-500 rounded-full animate-pulse"></div>
          
          <div className="absolute top-0 left-11 w-1.5 h-4 bg-gray-300 rounded-t-sm"></div>
          <div className="absolute -top-3 left-10.5 w-3 h-2 bg-blue-400 rounded-full animate-ping"></div>
          
          {/* Robot Body */}
          <div className="absolute top-11 left-3 w-14 h-8 bg-gray-100 rounded-b-xl border-2 border-blue-300"></div>
          
          {/* Control Panel */}
          <div className="absolute top-13 left-5 w-10 h-3 bg-blue-200 rounded grid grid-cols-3 gap-1 p-0.5">
            <div className="bg-green-400 rounded-full w-1 h-1"></div>
            <div className="bg-yellow-400 rounded-full w-1 h-1"></div>
            <div className="bg-red-400 rounded-full w-1 h-1"></div>
          </div>
          
          {/* Robot Arms */}
          <div className="absolute top-12 left-1 w-2 h-6 bg-gray-300 rounded-l-lg"></div>
          <div className="absolute top-12 right-1 w-2 h-6 bg-gray-300 rounded-r-lg"></div>
        </div>
        
        {/* Message Icon */}
        <div className="absolute -top-1 -right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center border border-blue-500">
          <MessageSquare size={14} className="text-blue-600" />
        </div>
      </button>
      
      {/* CSS for typing and animations */}
      <style jsx>{`
        /* Typing indicator styles */
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-dot {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: #9ca3af;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .typing-dot:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-dot:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CombinedChatbot;