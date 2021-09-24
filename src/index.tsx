import ReactDOM from "react-dom";
import App from "src/App";

function bootstrap() {
  // @ts-ignore
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
}

export { bootstrap };
