import * as Home from "src/routes/Home";
import * as Offer from "src/routes/Offer";

const routes = [
  {
    filename: "Home",
    path: "/",
    exact: true,
    component: Home.default,
    afterHeadersResponse: Home.afterHeadersResponse,
    beforeHeadersResponse: Home.beforeHeadersResponse,
  },
  {
    filename: "Offer",
    path: "/offer",
    exact: false,
    component: Offer.default,
    afterHeadersResponse: Offer.afterHeadersResponse,
    beforeHeadersResponse: Offer.beforeHeadersResponse,
  },
];

export default routes;
