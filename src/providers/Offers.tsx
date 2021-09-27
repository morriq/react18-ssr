import { createContext, useContext } from "react";

const OffersContext = createContext({
  offers: [],
});

export function OffersProvider({ children, offers }) {
  return (
    <OffersContext.Provider value={{ offers }}>
      {children}
    </OffersContext.Provider>
  );
}

export function useOffers() {
  const context = useContext(OffersContext);

  return context;
}
