import { css } from "@linaria/core";
import { ReactElement } from "react";
import StateContainer from "src/containers/StateContainer";
import { OfferProvider } from "src/providers/Offer";

const blue = css`
  color: blue;
`;

export default function Offer({ offer }): ReactElement {
  return (
    <OfferProvider offer={offer}>
      <div className={blue}>
        <div>offer</div>
        <StateContainer />
      </div>
    </OfferProvider>
  );
}
