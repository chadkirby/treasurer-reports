import TitleSlide from './TitleSlide';
import ExecutiveSummary from './ExecutiveSummary';
import FinancialPosition from './FinancialPosition';
import IncomeAnalysis from './IncomeAnalysis';
import SpendingByCategory from './SpendingByCategory';
import SpendingByPayee from './SpendingByPayee';
import StormwaterMaintenance from './StormwaterMaintenance';
import ReserveStudy from './ReserveStudy';
import CastAndFramework from './CastAndFramework';
import AuthorityFramework from './AuthorityFramework';

export const DECKS = [
  { id: 'owners', label: 'Owners' },
  { id: 'board', label: 'Board' },
  { id: 'background', label: 'Background' },
];

const OWNER_ONLY_MODE = import.meta.env.VITE_DECK_VISIBILITY === 'owners-only';

export const VISIBLE_DECKS = OWNER_ONLY_MODE
  ? DECKS.filter((deck) => deck.id === 'owners')
  : DECKS;

export const DEFAULT_DECK = VISIBLE_DECKS[0]?.id || 'owners';

export const SLIDES = [
  {
    slug: '',
    title: 'Home',
    component: TitleSlide,
    tags: ['owners', 'board'],
  },
  {
    slug: 'executive-summary',
    title: 'Executive Summary',
    component: ExecutiveSummary,
    tags: ['owners', 'board'],
    markdown: {
      main: '2021-2025/Executive Summary.md',
    },
  },
  {
    slug: 'financial-position',
    title: 'Overall Financial Position',
    component: FinancialPosition,
    tags: ['owners', 'board'],
    markdown: {
      observations: '2021-2025/Observations.md',
    },
  },
  {
    slug: 'income',
    title: 'Income Analysis',
    component: IncomeAnalysis,
    tags: ['owners', 'board'],
    markdown: {
      commentary: '2021-2025/Cash Inflows.md',
    },
  },
  {
    slug: 'spending-category',
    title: 'Spending: By Category',
    component: SpendingByCategory,
    tags: ['owners', 'board'],
    markdown: {
      commentary: '2021-2025/Cash Outflows by Category.md',
    },
  },
  {
    slug: 'spending-payee',
    title: 'Spending: By Payee',
    component: SpendingByPayee,
    tags: ['board'],
    markdown: {
      commentary: '2021-2025/Cash Outflows by Payee.md',
    },
  },
  {
    slug: 'stormwater-maintenance',
    title: 'Stormwater Maintenance',
    component: StormwaterMaintenance,
    tags: ['board'],
    markdown: {
      main: '2021-2025/Stormwater Maintenance.md',
    },
  },
  {
    slug: 'reserves',
    title: 'Reserve Study',
    component: ReserveStudy,
    tags: ['board'],
    markdown: {
      main: '2021-2025/Reserve Study Analysis.md',
    },
  },
  {
    slug: 'cast-framework',
    title: 'Cast & Legal Framework',
    component: CastAndFramework,
    tags: ['background'],
    markdown: {
      developerRelationship: 'relationships-developer.md',
      homeownerRelationship: 'relationships-homeowner.md',
    },
  },
  {
    slug: 'authority-framework',
    title: 'Authority Framework',
    component: AuthorityFramework,
    tags: ['background'],
    markdown: {
      main: 'relationships-authority.md',
    },
  },
];

export function isDeckVisible(deckId) {
  return VISIBLE_DECKS.some((deck) => deck.id === deckId);
}

export function getSlidesForDeck(deckId) {
  return SLIDES.filter((slide) => slide.tags.includes(deckId));
}

export function getFirstSlideForDeck(deckId) {
  return getSlidesForDeck(deckId)[0] || null;
}

export function buildDeckPath(deckId, slug = '') {
  return slug ? `/${deckId}/${slug}` : `/${deckId}`;
}

export function getMarkdownFilenameForSlide(slide, deckId, contentKey = 'main') {
  if (!slide) return null;
  const deckOverrides = slide.deckMarkdown?.[deckId];
  if (deckOverrides && deckOverrides[contentKey]) return deckOverrides[contentKey];
  return slide.markdown?.[contentKey] || null;
}
