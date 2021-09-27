import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";

interface Properties {
  scope: { [key: string]: Object };
  key: string;
}

function bootstrap({ scope, key }: Properties) {
  const root = document.getElementById("app");
  const state = scope[key];
  delete scope[key];

  hydrate(
    <BrowserRouter forceRefresh>
      <App state={state} />
    </BrowserRouter>,
    root
  );
}

export { bootstrap };
