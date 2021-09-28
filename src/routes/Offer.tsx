import { css } from "@linaria/core";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import StateContainer from "src/containers/StateContainer";
import { OfferProvider } from "src/providers/Offer";

const blue = css`
  color: blue;
`;

const beforeHeadersResponse = process.env.IS_BROWSER
  ? async () => {}
  : async function () {
      return {};
    };

const afterHeadersResponse = process.env.IS_BROWSER
  ? async () => {}
  : async function () {
      return {
        offer: {
          id: 1,
          title: "",
          salary: 0,
        },
      };
    };

export default function Offer({ offer }): ReactElement {
  return (
    <OfferProvider offer={offer}>
      <div className={blue}>
        <div>offer</div>
        <StateContainer />
      </div>
      <Link to="/">go to home</Link>
    </OfferProvider>
  );
}

export { beforeHeadersResponse, afterHeadersResponse };
