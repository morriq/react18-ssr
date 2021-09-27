import { lazy, Suspense } from "react";
import { hydrate } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Offer from "src/routes/Offer";

const Home = lazy(() => import("src/routes/Home"));

function bootstrap({ scope, key }) {
  const root = document.getElementById("app");
  const state = scope[key];
  delete scope[key];

  hydrate(
    <BrowserRouter>
      <Switch>
        <Route path={"/offer"} exact render={() => <Offer {...state} />} />
        <Route
          path={"/"}
          exact
          render={() => (
            <Suspense fallback={<span>loading...</span>}>
              <Home {...state} />
            </Suspense>
          )}
        />
      </Switch>
    </BrowserRouter>,
    root
  );
}

export { bootstrap };
