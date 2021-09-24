const express = require("express");
const app = express();
const { join } = require("path");
const { readFileSync } = require("fs");
const { pipeToNodeWritable } = require("react-dom/server");

// const webpack = require("webpack");
// const middleware = require("webpack-dev-middleware");
// const webpackConfig = require("../webpack.config")();
// const compiler = webpack(webpackConfig);

// app.use(middleware(compiler));

const [startDocument, bodyTag, endDocument] = readFileSync(
  join(__dirname, "../dist/index.html"),
  "utf-8"
).split(/(\<body.*?\>)/);

const bundle = require("../dist/server");

app.use(express.static(join(__dirname, "../dist"), { index: false }));
app.get("/", (request, response) => {
  let didError = false;
  const { startWriting, abort } = pipeToNodeWritable(
    bundle.render(),
    response,
    {
      onCompleteAll() {
        response.write(endDocument);
      },
      onReadyToStream() {
        // If something errored before we started streaming, we set the error code appropriately.
        response.statusCode = didError ? 500 : 200;
        response.setHeader("Content-type", "text/html");
        response.write(startDocument);
        response.write(bodyTag);
        startWriting();
      },
      onError(error) {
        didError = true;
        console.error(error);
      },
    }
  );
});

module.exports = app;
