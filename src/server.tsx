import { StaticRouter } from "react-router-dom";
import App from "src/App";
import routes from "src/routes";

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

export { render, routes };
