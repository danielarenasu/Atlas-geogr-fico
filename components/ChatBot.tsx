import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { geminiService } from '../geminiService';

const RobotsAnim: React.FC = () => (
  <div className="flex items-end gap-1 mb-2 mr-3 pointer-events-none drop-shadow-xl scale-90 md:scale-100 origin-bottom-right">
    <div className="animate-bounce" style={{ animationDuration: '3.5s' }}>
      <svg width="40" height="80" viewBox="0 0 40 80">
        <circle cx="20" cy="15" r="8" fill="#D4AF37" stroke="#996515" strokeWidth="1" />
        <rect x="12" cy="25" width="16" height="25" rx="4" fill="#D4AF37" stroke="#996515" strokeWidth="1" />
        <line x1="12" y1="30" x2="5" y2="45" stroke="#D4AF37" strokeWidth="3" />
        <line x1="28" y1="30" x2="35" y2="45" stroke="#D4AF37" strokeWidth="3" />
        <rect x="13" cy="52" width="6" height="25" fill="#D4AF37" stroke="#996515" />
        <rect x="21" cy="52" width="6" height="25" fill="#D4AF37" stroke="#996515" />
      </svg>
    </div>
    <div className="animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.4s' }}>
      <svg width="35" height="55" viewBox="0 0 40 60">
        <path d="M10 20 Q20 5 30 20 Z" fill="#E2E8F0" stroke="#1E40AF" strokeWidth="1" />
        <rect x="10" cy="20" width="20" height="25" fill="#F8FAFC" stroke="#1E40AF" />
        <rect x="5" cy="25" width="5" height="30" fill="#E2E8F0" />
        <rect x="30" cy="25" width="5" height="30" fill="#E2E8F0" />
      </svg>
    </div>
  </div>
);

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "¡Hola! Soy tu asistente de geografía de Conoce tu mundo. ¿Deseas que resolvamos alguna duda sobre países o curiosidades territoriales?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    
    try {
      const aiResponse = await geminiService.askDaniel(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, hubo un problema al conectar con el asistente. Inténtalo de nuevo más tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {!isOpen && <RobotsAnim />}
      {isOpen && (
        <div className="w-72 md:w-[360px] h-[520px] bg-white rounded-[2.5rem] shadow-2xl border border-emerald-100 flex flex-col mb-4 overflow-hidden animate-in zoom-in duration-300 origin-bottom-right">
          <div className="bg-emerald-600 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center text-xl">🤖</div>
              <div>
                <p className="font-black text-[12px] uppercase tracking-widest leading-tight">Asistente Virtual</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-tight">Geografía Activa</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-emerald-700/50 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-[12px] shadow-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-emerald-50'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-emerald-50 shadow-sm flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-emerald-50 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu pregunta aquí..."
                className="flex-1 bg-slate-100 border-none rounded-2xl py-3 px-5 text-[12px] outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400"
              />
              <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-emerald-600 text-white w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            <p className="text-[9px] text-slate-400 text-center mt-3 font-medium uppercase tracking-tighter">Desarrollado con Gemini AI • Conoce Tu Mundo</p>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-600 text-white w-16 h-16 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-4 border-white relative group"
      >
        <span className="text-3xl group-hover:rotate-12 transition-transform">🌍</span>
        {!isOpen && <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[11px] font-bold animate-bounce shadow-lg">1</span>}
      </button>
    </div>
  );
};

export default ChatBot;
