import { ReactElement } from "react";
import Home from "src/routes/Home";
import Offer from "src/routes/Offer";
interface Route {
  filename: string;
  path: string;
  exact: boolean;
  component: (state: any) => ReactElement;
}

const routes: Route[] = [
  {
    filename: "Home",
    path: "/",
    exact: true,
    component: Home,
  },
  {
    filename: "Offer",
    path: "/offer",
    exact: false,
    component: Offer,
  },
];

export default routes;
