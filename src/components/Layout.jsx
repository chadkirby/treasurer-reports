import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import {
  buildDeckPath,
  DEFAULT_DECK,
  getSlidesForDeck,
  VISIBLE_DECKS,
} from '../slides/registry';
import { DeckProvider } from '../context/DeckContext';

export default function Layout() {
  const { deck: routeDeck, slideSlug } = useParams();
  const navigate = useNavigate();
  const paletteInputRef = React.useRef(null);
  const activeDeck = VISIBLE_DECKS.some((deck) => deck.id === routeDeck) ? routeDeck : DEFAULT_DECK;
  const slides = React.useMemo(() => getSlidesForDeck(activeDeck), [activeDeck]);

  const currentSlug = slideSlug || '';
  const currentIndex = slides.findIndex((slide) => slide.slug === currentSlug);
  const currentSlide = currentIndex >= 0 ? slides[currentIndex] : null;
  const [isPaletteOpen, setIsPaletteOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < slides.length - 1;
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSlides = React.useMemo(
    () =>
      slides.map((slide, idx) => ({ slide, idx })).filter(({ slide }) =>
        slide.title.toLowerCase().includes(normalizedQuery)
      ),
    [normalizedQuery, slides]
  );

  const goToPrevious = () => {
    if (hasPrevious) navigate(buildDeckPath(activeDeck, slides[currentIndex - 1].slug));
  };

  const goToNext = () => {
    if (hasNext) navigate(buildDeckPath(activeDeck, slides[currentIndex + 1].slug));
  };

  const closePalette = React.useCallback(() => {
    setIsPaletteOpen(false);
    setQuery('');
    setHighlightedIndex(0);
  }, []);

  const openPalette = React.useCallback(() => {
    setQuery('');
    setIsPaletteOpen(true);
    setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [currentIndex]);

  const goToSlide = React.useCallback(
    (slug) => {
      closePalette();
      navigate(buildDeckPath(activeDeck, slug));
    },
    [activeDeck, closePalette, navigate]
  );

  const isEditableTarget = React.useCallback((target) => {
    if (!(target instanceof HTMLElement)) return false;
    if (target.isContentEditable) return true;
    const tag = target.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select';
  }, []);

  React.useEffect(() => {
    if (isPaletteOpen) paletteInputRef.current?.focus();
  }, [isPaletteOpen]);

  React.useEffect(() => {
    if (!isPaletteOpen) return;
    setHighlightedIndex((prev) => {
      if (filteredSlides.length === 0) return -1;
      if (prev < 0 || prev >= filteredSlides.length) return 0;
      return prev;
    });
  }, [filteredSlides.length, isPaletteOpen]);

  // Keyboard navigation and command palette
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      const isPaletteInput = paletteInputRef.current && e.target === paletteInputRef.current;
      if (isEditableTarget(e.target) && !isPaletteInput) return;

      const isCommandPaletteShortcut =
        e.shiftKey && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p';

      if (isCommandPaletteShortcut) {
        e.preventDefault();
        openPalette();
        return;
      }

      if (isPaletteOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closePalette();
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (filteredSlides.length > 0) {
            setHighlightedIndex((prev) => (prev + 1) % filteredSlides.length);
          }
          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (filteredSlides.length > 0) {
            setHighlightedIndex((prev) =>
              prev <= 0 ? filteredSlides.length - 1 : prev - 1
            );
          }
          return;
        }

        if (e.key === 'Enter') {
          e.preventDefault();
          const selected = filteredSlides[highlightedIndex];
          if (selected) goToSlide(selected.slide.slug);
          return;
        }

        return;
      }

      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    closePalette,
    filteredSlides,
    goToSlide,
    goToNext,
    goToPrevious,
    highlightedIndex,
    isEditableTarget,
    isPaletteOpen,
    openPalette,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffff8] text-slate-900 font-serif">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#fffff8] border-b border-slate-300 z-50 w-full shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-normal text-black m-0 tracking-wide font-serif italic">HOA Treasurer's Report</h1>
              <span className="text-sm italic text-slate-600 font-sans">2021—2025 Financial Overview</span>
            </div>
            <div className="flex items-center gap-3">
              {VISIBLE_DECKS.length > 1 && (
                <label className="text-xs font-mono text-slate-600 flex items-center gap-2">
                  Deck
                  <select
                    value={activeDeck}
                    onChange={(e) => {
                      const nextDeck = e.target.value;
                      const nextSlides = getSlidesForDeck(nextDeck);
                      const nextSlide = nextSlides.find((slide) => slide.slug === currentSlug) || nextSlides[0];
                      navigate(buildDeckPath(nextDeck, nextSlide?.slug || ''));
                    }}
                    className="text-xs font-mono bg-[#f3efe3] border border-slate-300 rounded px-2 py-1"
                  >
                    {VISIBLE_DECKS.map((deck) => (
                      <option key={deck.id} value={deck.id}>
                        {deck.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div className="text-sm font-mono text-slate-500 bg-[#f3efe3] px-2 py-1 rounded">
                {Math.max(currentIndex + 1, 1)} / {slides.length}
              </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-24 px-4 container mx-auto slide-content max-w-5xl text-lg">
        <div className="bg-transparent rounded-none p-0 min-h-full">
            <DeckProvider value={{ activeDeck, currentSlide }}>
              <Outlet />
            </DeckProvider>
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
               {slides.map((slide, idx) => (
                 <button
                   key={slide.slug || 'home'}
                   onClick={() => navigate(buildDeckPath(activeDeck, slide.slug))}
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

      {isPaletteOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[1px] flex items-start justify-center pt-24 px-4"
          onClick={closePalette}
        >
          <div
            className="w-full max-w-2xl rounded-xl border border-slate-300 bg-[#fffff8] shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="slide-jump-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 id="slide-jump-title" className="text-lg font-serif italic text-black">
                Jump to Slide
              </h2>
              <input
                ref={paletteInputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                placeholder="Type a slide name..."
                className="mt-3 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-sans text-slate-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                role="combobox"
                aria-expanded="true"
                aria-controls="slide-jump-listbox"
                aria-autocomplete="list"
                aria-label="Search slides"
              />
            </div>

            <div id="slide-jump-listbox" role="listbox" className="p-2">
              {filteredSlides.length === 0 ? (
                <p className="px-3 py-8 text-xs text-slate-500 font-sans text-center">
                  No matching slides.
                </p>
              ) : (
                filteredSlides.map(({ slide, idx }, listIndex) => (
                  <button
                    key={slide.slug || 'home'}
                    onMouseEnter={() => setHighlightedIndex(listIndex)}
                    onClick={() => goToSlide(slide.slug)}
                    role="option"
                    aria-selected={listIndex === highlightedIndex}
                    className={`w-full text-left px-3 py-1 rounded-md transition-colors font-sans text-xs ${
                      listIndex === highlightedIndex
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span className="inline-block w-8 text-xs font-mono opacity-80">{idx + 1}.</span>
                    {slide.title}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
