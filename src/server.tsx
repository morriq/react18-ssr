import App from "src/App";
import { DataProvider } from "src/providers/Data";

function render() {
  const data = {};

  return (
    <DataProvider data={data}>
      <div id="app">
        <App />
      </div>
    </DataProvider>
  );
}

export { render };
