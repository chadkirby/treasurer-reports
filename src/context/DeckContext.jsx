import React from 'react';

const DeckContext = React.createContext({
  activeDeck: null,
  currentSlide: null,
});

export function DeckProvider({ value, children }) {
  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}

export function useDeckContext() {
  return React.useContext(DeckContext);
}
