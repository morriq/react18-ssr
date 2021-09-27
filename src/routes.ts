import { Request, Response } from "express";
import { ReactElement } from "react";
import Home from "src/routes/Home";
import Offer from "src/routes/Offer";

interface Route {
  path: string;
  exact: boolean;
  component: (state: any) => ReactElement;
  /** Place valid to puts redirects. It executes before streaming */
  beforeHeadersResponse: (
    request: Request,
    response: Response
  ) => Promise<Object>;
  /** All data required for application to successful launch */
  afterHeadersResponse: (
    request: Request,
    beforeHeadersData: Object
  ) => Promise<Object>;
}

const routes: Route[] = [
  {
    path: "/",
    exact: true,
    component: Home,
    beforeHeadersResponse: async (request, response) => {
      return {};
    },
    afterHeadersResponse: async (request, beforeHeadersData) => {
      return {
        offers: [
          {
            id: 1,
            title: "",
            salary: 0,
          },
        ],
      };
    },
  },
  {
    path: "/offer",
    exact: false,
    component: Offer,
    beforeHeadersResponse: async (request, response) => {
      return {};
    },
    afterHeadersResponse: async (request, beforeHeadersData) => {
      return {
        offer: {
          id: 1,
          title: "",
          salary: 0,
        },
      };
    },
  },
];

export default routes;
