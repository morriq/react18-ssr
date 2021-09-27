import { css } from "@linaria/core";
import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import Link from "src/components/Link";
import StateContainer from "src/containers/StateContainer";
import { OfferProvider } from "src/providers/Offer";

const blue = css`
  color: blue;
`;

async function beforeHeadersResponse(request, response) {
  return {};
}

async function afterHeadersResponse(request, beforeHeadersData) {
  return {};
}

function Offer({ offer }): ReactElement {
  return (
    <OfferProvider offer={offer}>
      <div className={blue}>
        <div>offer</div>
        <StateContainer />
      </div>
      <Link as="/" url="/">
        go to home
      </Link>
    </OfferProvider>
  );
}

export default hot(Offer);

export { beforeHeadersResponse, afterHeadersResponse };
