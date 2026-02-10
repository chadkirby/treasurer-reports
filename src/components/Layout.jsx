import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

const SLIDES = [
  { path: '/', title: 'Home' },
  { path: '/methodology', title: 'Methodology' },
  { path: '/executive-summary', title: 'Executive Summary' },
  { path: '/financial-position', title: 'Overall Financial Position' },
  { path: '/income', title: 'Income Analysis' },
  { path: '/spending-category', title: 'Spending: By Category' },
  { path: '/spending-payee', title: 'Spending: By Payee' },
  { path: '/reserves', title: 'Reserve Study' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = SLIDES.findIndex(s => s.path === location.pathname);
  const currentSlide = SLIDES[currentIndex] || { title: 'Treasurer\'s Report' };

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < SLIDES.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) navigate(SLIDES[currentIndex - 1].path);
  };

  const goToNext = () => {
    if (hasNext) navigate(SLIDES[currentIndex + 1].path);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasNext, hasPrevious]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffff8] text-slate-900 font-serif">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#fffff8] border-b border-slate-300 z-50 w-full shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-normal text-black m-0 tracking-wide font-serif italic">HOA Treasurer's Report</h1>
              <span className="text-sm italic text-slate-600 font-sans">2021—2025 Financial Overview</span>
            </div>
            <div className="text-sm font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {currentIndex + 1} / {SLIDES.length}
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-24 px-4 container mx-auto slide-content max-w-5xl text-lg">
        <div className="bg-transparent rounded-none p-0 min-h-full">
            <Outlet />
        </div>
      </main>

      {/* Footer / Navigation Controls */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-[#fffff8]/95 border-t border-slate-300 z-10 font-mono w-full">
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
            <button
              onClick={goToPrevious}
              disabled={!hasPrevious}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${!hasPrevious ? 'text-slate-300 cursor-not-allowed opacity-0' : 'text-slate-700 hover:text-black hover:underline cursor-pointer'}`}
            >
              &larr; Previous
            </button>

            <div className="flex gap-2">
               {SLIDES.map((slide, idx) => (
                 <button
                   key={slide.path}
                   onClick={() => navigate(slide.path)}
                   className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-black scale-125' : 'bg-slate-300 hover:bg-slate-400'}`}
                   title={slide.title}
                 />
               ))}
            </div>

            <button
              onClick={goToNext}
              disabled={!hasNext}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${!hasNext ? 'text-slate-300 cursor-not-allowed opacity-0' : 'text-slate-900 hover:text-black hover:underline cursor-pointer'}`}
            >
              Next &rarr;
            </button>
        </div>
      </footer>
    </div>
  );
}

export { SLIDES };
