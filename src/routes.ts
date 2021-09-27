import { afterHeadersResponse, beforeHeadersResponse } from "src/routes/Home";
import {
  afterHeadersResponse as offerAfterHeadersResponse,
  beforeHeadersResponse as offerBeforeHeadersResponse,
} from "src/routes/Offer";

const routes = [
  {
    path: "/",
    exact: true,
    beforeHeadersResponse: beforeHeadersResponse,
    afterHeadersResponse: afterHeadersResponse,
    template: "home.html",
  },
  {
    path: "/offer",
    exact: false,
    beforeHeadersResponse: offerBeforeHeadersResponse,
    afterHeadersResponse: offerAfterHeadersResponse,
    template: "offer.html",
  },
];

export default routes;
