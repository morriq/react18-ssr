import { createContext, useContext } from "react";

const OfferContext = createContext({
  offer: null,
});

export function OfferProvider({ children, offer }) {
  return (
    <OfferContext.Provider value={{ offer }}>{children}</OfferContext.Provider>
  );
}

export function useOffer() {
  const context = useContext(OfferContext);

  return context;
}
