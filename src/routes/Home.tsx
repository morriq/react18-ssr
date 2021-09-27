import { css } from "@linaria/core";
import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import Link from "src/components/Link";
import StateContainer from "src/containers/StateContainer";
import { OffersProvider } from "src/providers/Offers";

const red = css`
  color: red;
`;

async function beforeHeadersResponse(request, response) {
  return {};
}

async function afterHeadersResponse(request, beforeHeadersData) {
  return {};
}

function Home({ offers }): ReactElement {
  return (
    <OffersProvider offers={offers}>
      <div className={red}>
        <div>home</div>
        <StateContainer />
      </div>
      <Link as="/offer" url="/offer">
        go to offer
      </Link>
    </OffersProvider>
  );
}

export default hot(Home);

export { beforeHeadersResponse, afterHeadersResponse };
