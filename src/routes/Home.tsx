import { css } from "@linaria/core";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import StateContainer from "src/containers/StateContainer";
import { OffersProvider } from "src/providers/Offers";

const red = css`
  color: red;
`;

async function beforeHeadersResponse() {
  return {};
}

async function afterHeadersResponse() {
  return {
    offers: [
      {
        id: 1,
        title: "",
        salary: 0,
      },
    ],
  };
}

export default function Home({ offers }): ReactElement {
  return (
    <OffersProvider offers={offers}>
      <div className={red}>
        <div>home</div>
        <StateContainer />
      </div>
      <Link to="/offer">go to offer</Link>
    </OffersProvider>
  );
}

export { beforeHeadersResponse, afterHeadersResponse };
