import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = "" }) => {
  return (
    <section id={id} className={`py-20 px-6 max-w-7xl mx-auto relative z-10 ${className}`}>
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">{title}</h2>
        {subtitle && <p className="text-slate-500 text-lg max-w-2xl font-light">{subtitle}</p>}
        <div className="h-1.5 w-24 bg-emerald-500 mt-8 rounded-full"></div>
      </div>
      {children}
    </section>
  );
};

export default Section;
