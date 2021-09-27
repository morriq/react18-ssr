import { hydrate } from "react-dom";
import App from "src/App";

function bootstrap() {
  const root = document.getElementById("app");
  hydrate(<App />, root);
}

export { bootstrap };
