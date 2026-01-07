
import React, { useState } from 'react';
import { Continent, Country } from '../types';

interface ContinentCardProps {
  continent: Continent;
  countries: Country[];
}

const ContinentCard: React.FC<ContinentCardProps> = ({ continent, countries }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const accent = continent.colorClass === 'sky' ? 'sky' : 'emerald';

  return (
    <div className={`bg-white border border-${accent}-100 rounded-[3rem] overflow-hidden transition-all duration-500 ${isExpanded ? `ring-4 ring-${accent}-400/20 shadow-2xl` : 'hover:shadow-xl'}`}>
      <div 
        className="p-10 cursor-pointer flex flex-col md:flex-row justify-between items-center group gap-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-8 w-full">
          <div className={`h-20 w-20 bg-${accent}-500 text-white rounded-3xl flex items-center justify-center text-4xl font-bold group-hover:rotate-12 transition-transform shadow-xl`}>
            {continent.name === 'Islas y Territorios' ? '🏝️' : continent.name[0]}
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{continent.name}</h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{continent.countriesCount} Países Registrados</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <button className={`p-4 rounded-2xl bg-slate-50 text-slate-400 transition-all duration-500 ${isExpanded ? 'rotate-180 bg-emerald-500 text-white' : ''}`}>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
             </svg>
           </button>
        </div>
      </div>

      <div className={`transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[8000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-10 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
             <div className="flex flex-col justify-center space-y-8 bg-white p-8 rounded-[2.5rem] border border-slate-50">
                <div className="h-1 w-12 bg-emerald-500 rounded-full"></div>
                <p className="text-slate-600 text-xl leading-relaxed font-light italic">
                  {continent.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 rounded-3xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Naciones</p>
                    <p className="text-2xl font-black text-slate-800">{continent.countriesCount}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Superficie</p>
                    <p className="text-2xl font-black text-slate-800">{continent.area}</p>
                  </div>
                </div>
             </div>
             
             <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 flex flex-col h-full max-h-[600px]">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-6">Listado Completo de Naciones ({countries.length})</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar pr-2 flex-1">
                  {countries.map((country) => (
                    <div key={`${country.isoCode}-${country.name}`} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-sm group/country">
                      <img 
                        src={`https://flagcdn.com/w80/${country.isoCode}.png`} 
                        className="w-10 h-6 object-cover rounded shadow-sm group-hover/country:scale-110 transition-transform bg-slate-50" 
                        alt={`Bandera de ${country.name}`} 
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-slate-800 truncate">{country.name}</p>
                        <p className="text-[9px] text-emerald-600 uppercase font-black">{country.capital}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center text-xs font-black uppercase tracking-[0.3em] gap-6">
             <div className="flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                Conoce Tu Mundo • Atlas Completo 2025
             </div>
             <div className="text-emerald-400">
                Información Territorial Verificada
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinentCard;
