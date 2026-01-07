
import React, { useState, useEffect, useCallback } from 'react';

interface Footprint {
  id: number;
  x: number;
  y: number;
  angle: number;
  side: 'left' | 'right';
}

const FootprintTrail: React.FC = () => {
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [nextSide, setNextSide] = useState<'left' | 'right'>('left');

  const addFootprint = useCallback((x: number, y: number) => {
    const dist = Math.hypot(x - lastPos.x, y - lastPos.y);
    
    // Solo dejamos huella si nos hemos movido lo suficiente (evitar amontonamiento)
    if (dist < 45) return;

    const angle = Math.atan2(y - lastPos.y, x - lastPos.x) * (180 / Math.PI) + 90;
    
    const newFootprint: Footprint = {
      id: Date.now(),
      x,
      y,
      angle,
      side: nextSide
    };

    setFootprints(prev => [...prev.slice(-15), newFootprint]); // Mantenemos máximo 15 huellas
    setLastPos({ x, y });
    setNextSide(prev => prev === 'left' ? 'right' : 'left');

    // Limpiar la huella después de un tiempo
    setTimeout(() => {
      setFootprints(prev => prev.filter(f => f.id !== newFootprint.id));
    }, 2500);
  }, [lastPos, nextSide]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      addFootprint(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [addFootprint]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ overflow: 'hidden' }}>
      {footprints.map((f) => (
        <div
          key={f.id}
          className="absolute transition-opacity duration-1000"
          style={{
            left: f.x,
            top: f.y,
            transform: `translate(-50%, -50%) rotate(${f.angle}deg) translateX(${f.side === 'left' ? '-12px' : '12px'})`,
            opacity: 0.15,
          }}
        >
          <svg
            width="18"
            height="32"
            viewBox="0 0 18 32"
            fill="currentColor"
            className="text-slate-800"
          >
            {/* Suela principal */}
            <path d="M9,0 C14,0 18,5 18,12 C18,18 14,22 9,22 C4,22 0,18 0,12 C0,5 4,0 9,0 Z" />
            {/* Tacón */}
            <path d="M4,24 L14,24 C16,24 16,32 14,32 L4,32 C2,32 2,24 4,24 Z" />
            {/* Dibujo de la suela */}
            <line x1="4" y1="5" x2="14" y2="5" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="3" y1="10" x2="15" y2="10" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="4" y1="15" x2="14" y2="15" stroke="white" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FootprintTrail;
