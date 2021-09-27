import { lazy, Suspense } from "react";
import { hydrate } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "src/routes/Home";

const Offer = lazy(() => import("src/routes/Offer"));

function bootstrap({ scope, key }) {
  const root = document.getElementById("app");
  const state = scope[key];
  delete scope[key];

  hydrate(
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact render={() => <Home {...state} />} />
        <Route
          path={"/offer"}
          exact
          render={() => (
            <Suspense fallback={<span>loading...</span>}>
              <Offer {...state} />
            </Suspense>
          )}
        />
      </Switch>
    </BrowserRouter>,
    root
  );
}

export { bootstrap };
