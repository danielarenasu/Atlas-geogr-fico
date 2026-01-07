
import React, { useState, useEffect } from 'react';

const ColumbusGuide: React.FC = () => {
  const [speechIndex, setSpeechIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const phrases = [
    "¡Tierra a la vista de los conocimientos!",
    "La geografía es el ojo de la historia.",
    "¿Sabías que el mundo es mucho más grande de lo que pensaba?",
    "Sigue explorando, este atlas es un gran trabajo.",
    "¡Navega por los continentes con curiosidad!",
    "Cada mapa cuenta una historia diferente."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeechIndex((prev) => (prev + 1) % phrases.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start pointer-events-none select-none">
      {/* Globo de Texto */}
      <div className={`mb-4 ml-8 p-4 bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-[200px] transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-[11px] font-bold text-slate-700 leading-tight italic">
          "{phrases[speechIndex]}"
        </p>
        <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-r border-b border-emerald-50 rotate-45"></div>
      </div>

      {/* Personaje Cristóbal Colón (SVG Animado) */}
      <div className="relative w-32 h-48 animate-float-ship pointer-events-auto cursor-help group" onClick={() => setIsVisible(!isVisible)}>
        <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-2xl">
          {/* Sombra proyectada */}
          <ellipse cx="50" cy="145" rx="30" ry="5" fill="black" opacity="0.1" />
          
          {/* Cuerpo / Capa */}
          <path d="M30 130 L50 60 L70 130 Z" fill="#4a1a1a" /> {/* Traje interior */}
          <path d="M30 65 Q10 100 25 140 L75 140 Q90 100 70 65" fill="#1e293b" /> {/* Capa oscura */}
          
          {/* Brazos */}
          <rect x="25" y="80" width="10" height="30" rx="5" fill="#1e293b" className="animate-explain-left" />
          <rect x="65" y="80" width="10" height="30" rx="5" fill="#1e293b" />
          
          {/* Pergamino en mano */}
          <rect x="15" y="105" width="20" height="15" rx="2" fill="#fef3c7" className="animate-explain-left" />
          <line x1="15" y1="110" x2="35" y2="110" stroke="#d97706" strokeWidth="0.5" className="animate-explain-left" />
          
          {/* Cuello */}
          <rect x="42" y="55" width="16" height="10" fill="#f5ccb0" />
          
          {/* Cabeza (Ajustada curva superior para reducir frente) */}
          <path d="M35 40 Q35 25 50 25 Q65 25 65 40 L65 55 Q50 65 35 55 Z" fill="#f5ccb0" />
          
          {/* Pelo (Ajustado inicio) */}
          <path d="M35 35 Q30 40 35 55 M65 35 Q70 40 65 55" stroke="#94a3b8" strokeWidth="5" fill="none" strokeLinecap="round" />
          
          {/* Sombrero (Bicornio clásico - Bajado para cubrir más frente) */}
          <path d="M25 32 Q50 12 75 32 Q50 27 25 32" fill="#0f172a" />
          <circle cx="50" cy="25" r="3" fill="#fbbf24" /> {/* Detalle dorado bajado */}
          
          {/* Ojos */}
          <circle cx="43" cy="42" r="1.5" fill="#0f172a" className="animate-blink" />
          <circle cx="57" cy="42" r="1.5" fill="#0f172a" className="animate-blink" />
          
          {/* Nariz y Boca */}
          <path d="M48 45 L50 48 L52 45" fill="none" stroke="#d4a383" strokeWidth="1" />
          <path d="M45 52 Q50 55 55 52" fill="none" stroke="#d4a383" strokeWidth="1" className="animate-talk-subtle" />
        </svg>

        {/* Etiqueta flotante al pasar el mouse */}
        <div className="absolute -top-4 left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-black uppercase px-2 py-1 rounded-md whitespace-nowrap">
          Cristóbal Colón • Tu Guía
        </div>
      </div>

      <style>{`
        @keyframes float-ship {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0); }
        }
        @keyframes explain-left {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg) translateY(-5px); }
        }
        @keyframes talk-subtle {
          0%, 100% { d: path("M45 52 Q50 55 55 52"); }
          50% { d: path("M45 53 Q50 57 55 53"); }
        }
        .animate-float-ship { animation: float-ship 6s ease-in-out infinite; }
        .animate-blink { animation: blink 4s infinite; transform-origin: center; }
        .animate-explain-left { animation: explain-left 3s ease-in-out infinite; transform-origin: top right; }
        .animate-talk-subtle { animation: talk-subtle 0.5s infinite; }
      `}</style>
    </div>
  );
};

export default ColumbusGuide;
