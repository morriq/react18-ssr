import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router-dom";
import routes from "src/routes";

interface Properties {
  state: {};
}

function App({ state }: Properties): ReactElement {
  return (
    <Switch>
      {routes.map(({ path, exact, component: Component }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={() => <Component {...state} />}
        />
      ))}
    </Switch>
  );
}

export default hot(App);
