import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Здравствуйте! Я виртуальный помощник мастера. Чем могу помочь? Я знаю всё о коже, уходе за ней и стоимости изделий.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg.text);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-leather-800 text-white p-4 rounded-full shadow-lg hover:bg-leather-700 transition-all duration-300 transform hover:scale-110 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-leather-200 flex flex-col transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'}`} style={{ maxHeight: '80vh', height: '500px' }}>
        
        {/* Header */}
        <div className="bg-leather-800 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-full">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Помощник Мастера</h3>
              <p className="text-[10px] text-leather-200 opacity-80">Отвечает мгновенно</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-leather-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-leather-200' : 'bg-leather-700'}`}>
                  {msg.role === 'user' ? <User size={14} className="text-leather-800" /> : <Bot size={14} className="text-white" />}
                </div>
                <div className={`p-3 rounded-lg text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-white text-leather-900 rounded-tr-none' 
                    : 'bg-leather-700 text-leather-50 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex gap-2 max-w-[85%]">
                 <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-leather-700">
                    <Loader2 size={14} className="text-white animate-spin" />
                 </div>
                 <div className="bg-leather-700 p-3 rounded-lg rounded-tl-none">
                   <div className="flex space-x-1">
                     <div className="w-1.5 h-1.5 bg-leather-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                     <div className="w-1.5 h-1.5 bg-leather-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                     <div className="w-1.5 h-1.5 bg-leather-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                   </div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-leather-200 bg-white rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Спросите о коже, уходе..."
              className="flex-1 bg-leather-50 border border-leather-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-leather-500 transition-colors text-leather-900 placeholder:text-leather-400"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-leather-800 text-white p-2 rounded-md hover:bg-leather-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};