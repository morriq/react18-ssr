import { ReactElement } from "react";
import { useOffer } from "src/providers/Offer";
import { useOffers } from "src/providers/Offers";

export default function StateContainer(): ReactElement {
  const { offer } = useOffer();
  const { offers } = useOffers();

  return (
    <>
      <div>{JSON.stringify(offer)}</div>
      <div>{JSON.stringify(offers)}</div>
    </>
  );
}
