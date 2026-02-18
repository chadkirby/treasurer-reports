import React from 'react';
import Slide from '../components/ui/Slide';

export default function TitleSlide() {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="mb-8 p-4 border-b-2 border-black w-32"></div>
      <h1 className="text-6xl font-normal text-black mb-6 leading-tight italic">
        Treasurer's Report
      </h1>
      <p className="text-3xl text-slate-700 font-serif mb-12">
        {currentDate}
      </p>
      <div className="flex gap-16 text-slate-600 text-sm font-mono uppercase tracking-widest">
           Chad Kirby, Treasurer
      </div>
    </div>

  );
}
