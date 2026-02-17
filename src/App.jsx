import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import {
  buildDeckPath,
  DEFAULT_DECK,
  getFirstSlideForDeck,
  getSlidesForDeck,
  isDeckVisible,
} from './slides/registry';
import './index.css';

function DeckSlideRoute() {
  const { deck, slideSlug } = useParams();

  if (!deck || !isDeckVisible(deck)) {
    const defaultSlide = getFirstSlideForDeck(DEFAULT_DECK);
    return <Navigate to={buildDeckPath(DEFAULT_DECK, defaultSlide?.slug || '')} replace />;
  }

  const slides = getSlidesForDeck(deck);
  const targetSlug = slideSlug || '';
  const slide = slides.find((item) => item.slug === targetSlug);

  if (!slide) {
    return <Navigate to={buildDeckPath(deck, slides[0]?.slug || '')} replace />;
  }

  const SlideComponent = slide.component;
  return <SlideComponent />;
}

function App() {
  const defaultSlide = getFirstSlideForDeck(DEFAULT_DECK);
  const defaultPath = buildDeckPath(DEFAULT_DECK, defaultSlide?.slug || '');

  // Use HashRouter for GitHub Pages compatibility
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to={defaultPath} replace />} />
        <Route path="/:deck" element={<Layout />}>
          <Route index element={<DeckSlideRoute />} />
          <Route path=":slideSlug" element={<DeckSlideRoute />} />
        </Route>
        <Route path="*" element={<Navigate to={defaultPath} replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
