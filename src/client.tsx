import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";

function bootstrap({ state }) {
  const root = document.getElementById("app");

  hydrate(
    <BrowserRouter forceRefresh>
      <App state={state} />
    </BrowserRouter>,
    root
  );
}

export { bootstrap };
