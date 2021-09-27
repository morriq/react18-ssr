import { Route, StaticRouter, Switch } from "react-router-dom";
import routes from "src/routes";
import Home from "src/routes/Home";
import Offer from "src/routes/Offer";

function render({ state, location }) {
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
        <Switch>
          <Route path={"/"} exact render={() => <Home {...state} />} />
          <Route path={"/offer"} exact render={() => <Offer {...state} />} />
        </Switch>
      </div>
    </StaticRouter>
  );
}

export { render, routes };
