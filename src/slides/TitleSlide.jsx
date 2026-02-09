import React from 'react';
import Slide from '../components/ui/Slide';

export default function TitleSlide() {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="mb-4">
        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-bold tracking-wider">HOA</span>
      </div>
      <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
        Treasurer's Report
      </h1>
      <p className="text-3xl text-slate-500 font-light mb-12">
        {currentDate}
      </p>

      <div className="flex gap-8 text-slate-400 text-sm">
        <div>
           <strong className="block text-slate-600 mb-1">Presented By</strong>
           Treasurer
        </div>
        <div>
           <strong className="block text-slate-600 mb-1">Period</strong>
           2021—2025
        </div>
      </div>
    </div>
  );
}
