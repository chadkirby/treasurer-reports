import { Navigate, useParams } from 'react-router-dom';
import { DeckProvider } from '../context/DeckContext';
import {
  buildDeckPath,
  DEFAULT_DECK,
  getFirstSlideForDeck,
  getSlidesForDeck,
  isDeckVisible,
} from '../slides/registry';

export default function PrintDeck() {
  const { deck } = useParams();

  if (!deck || !isDeckVisible(deck)) {
    const fallbackSlide = getFirstSlideForDeck(DEFAULT_DECK);
    return <Navigate to={buildDeckPath(DEFAULT_DECK, fallbackSlide?.slug || '')} replace />;
  }

  const slides = getSlidesForDeck(deck);
  if (!slides.length) return null;

  return (
    <div className="print-deck-screen" data-print-deck={deck}>
      {slides.map((slide) => {
        const SlideComponent = slide.component;
        return (
          <section className="print-slide" key={slide.slug || 'home'}>
            <DeckProvider value={{ activeDeck: deck, currentSlide: slide }}>
              <SlideComponent />
            </DeckProvider>
          </section>
        );
      })}
    </div>
  );
}
