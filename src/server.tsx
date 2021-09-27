import App from "src/App";
import { DataProvider } from "src/providers/Data";

function render() {
  const data = createServerData();

  return (
    <DataProvider data={data}>
      <div id="app">
        <App />
      </div>
    </DataProvider>
  );
}

export { render };

function createServerData() {
  let done = false;
  let promise = null;
  return {
    read(setState) {
      if (done) {
        return;
      }
      if (promise) {
        throw promise;
      }
      promise = new Promise((resolve) => {
        setTimeout(() => {
          done = true;
          promise = null;
          setState([
            "Wait, it doesn't wait for React to load?",
            "How does this even work?",
            "I like marshmallows",
          ]);
          resolve();
        }, 100);
      });
      throw promise;
    },
  };
}
