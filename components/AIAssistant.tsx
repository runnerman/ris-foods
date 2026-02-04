
import React, { useState, useRef, useEffect } from 'react';
import { getChefResponse } from '../geminiService.ts';
import { ICONS } from '../constants.tsx';
import { ChatMessage } from '../types.ts';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Namaskaram! I am **Chef Malabar**. What authentic Kerala breakfast shall we plan today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChefResponse(input, messages.map(m => ({ role: m.role, content: m.content })));
      setMessages(prev => [...prev, { role: 'model', content: response, timestamp: new Date() }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', content: "I'm having a little trouble in the kitchen right now. Could you try again?", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[60] bg-emerald-800 text-white p-4 rounded-full shadow-2xl shadow-emerald-900/40 hover:scale-110 transition-transform flex items-center gap-3 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <ICONS.Chef />
        <span className="font-bold pr-2 text-sm">Ask Chef Malabar</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-8 sm:right-8 w-full sm:w-[400px] h-[600px] bg-white sm:rounded-3xl shadow-2xl z-[70] flex flex-col overflow-hidden border border-amber-100">
          <div className="bg-emerald-800 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <ICONS.Chef />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Chef Malabar</h3>
                <span className="text-[10px] opacity-70 uppercase tracking-widest font-bold">Expert Kitchen AI</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <ICONS.X />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow p-6 overflow-y-auto bg-amber-50/30 space-y-6"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-emerald-800 text-white rounded-tr-none' 
                      : 'bg-white text-stone-800 rounded-tl-none border border-amber-100'
                  }`}
                >
                  <div 
                    className="prose prose-sm max-w-none" 
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} 
                  />
                  <div className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-white' : 'text-stone-500'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-amber-100 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-amber-100">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about recipes or products..."
                className="w-full bg-amber-50 rounded-xl py-4 pl-4 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 transition-all text-stone-800"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors disabled:opacity-50"
              >
                <ICONS.Send />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
