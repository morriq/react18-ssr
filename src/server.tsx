import { StaticRouter } from "react-router-dom";
import App from "src/App";
import clientRoutes from "src/routes";
import { afterHeadersResponse, beforeHeadersResponse } from "src/routes/Home";
import {
  afterHeadersResponse as offerAfterHeadersResponse,
  beforeHeadersResponse as offerBeforeHeadersResponse,
} from "src/routes/Offer";

interface Properties {
  location: string;
  state: Object;
}

function render({ state, location }: Properties) {
  return (
    <StaticRouter location={location}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
      window.INITIAL_STATE = ${JSON.stringify(state).replace(/</g, "\\u003c")}
      `,
        }}
      />
      <div id="app">
        <App state={state} />
      </div>
    </StaticRouter>
  );
}

const prefetchRoutes = [
  {
    filename: "Home",
    afterHeadersResponse,
    beforeHeadersResponse,
  },
  {
    filename: "Offer",
    afterHeadersResponse: offerAfterHeadersResponse,
    beforeHeadersResponse: offerBeforeHeadersResponse,
  },
];

const routes = clientRoutes.map((route) => {
  return {
    ...route,
    ...prefetchRoutes.find(({ filename }) => filename === route.filename),
  };
});

export { render, routes };
