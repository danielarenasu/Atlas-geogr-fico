import React, { useState } from 'react';
import Section from './components/Section';
import ChatBot from './components/ChatBot';
import ColumbusGuide from './components/ColumbusGuide';
import FootprintTrail from './components/FootprintTrail';
import ContinentCard from './components/ContinentCard';
import GlobeModal from './components/GlobeModal';
import { CONTINENTS, COUNTRIES, OCEANS } from './constants';

const App: React.FC = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden relative">
      <FootprintTrail />
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black text-emerald-600 flex items-center gap-2">🌏 CONOCE TU MUNDO</span>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setIsProjectModalOpen(true)} className="text-sm font-bold text-slate-500 hover:text-emerald-600 uppercase tracking-widest">PROYECTO</button>
          </div>
          <button onClick={() => setIsMapOpen(true)} className="bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-black hover:bg-emerald-600">MAPA GLOBAL</button>
        </div>
      </nav>

      <header className="pt-48 pb-32 px-6 bg-emerald-600 text-center relative text-white">
        <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter uppercase">Atlas Universal</h1>
        <p className="text-xl md:text-3xl max-w-4xl mx-auto mb-14 font-light">Explora datos precisos, capitales y fronteras actualizadas.</p>
        <button onClick={() => scrollToSection('explorar')} className="bg-white text-emerald-600 px-12 py-6 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition-transform">EXPLORAR NACIONES 🗺️</button>
      </header>

      <Section id="explorar" title="Atlas por Continente">
        <div className="grid grid-cols-1 gap-12">
          {CONTINENTS.map((cont) => (
            <ContinentCard key={cont.name} continent={cont} countries={COUNTRIES.filter(c => c.continent === cont.name)} />
          ))}
        </div>
      </Section>

      <Section id="oceanos" title="Océanos del Mundo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OCEANS.map((ocean) => (
            <div key={ocean.name} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="text-2xl font-black text-slate-800 uppercase mb-2">{ocean.name}</h3>
              <p className="text-sm font-black text-emerald-600 mb-4">{ocean.size}</p>
              <p className="text-slate-500 text-sm">{ocean.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <footer className="py-24 bg-slate-900 text-white text-center">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">© 2025 • ATLAS GEOGRÁFICO CONOCE TU MUNDO</p>
      </footer>

      <ColumbusGuide />
      <ChatBot />
      <GlobeModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </div>
  );
};

export default App;