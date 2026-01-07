
import React from 'react';

interface GlobeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobeModal: React.FC<GlobeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
        <div className="p-6 bg-white border-b border-sky-50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-sky-900">Explorador Global</h2>
            <p className="text-sm text-slate-500">Navega libremente por el globo terráqueo</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-sky-50 rounded-full transition-colors text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 bg-slate-100 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11394103.743265584!2d-45.7277873!3d-27.4208581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar" 
            className="w-full h-full border-none"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa Global Interactivo"
          ></iframe>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-4 rounded-2xl border border-sky-100 shadow-lg pointer-events-none max-w-xs hidden md:block">
            <p className="text-xs font-bold text-sky-600 uppercase mb-1">Tip de navegación</p>
            <p className="text-xs text-slate-600">Usa el cursor para girar el globo, la rueda del ratón para hacer zoom y explora cada rincón del planeta.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobeModal;
