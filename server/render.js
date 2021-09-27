const { Router } = require("express");
const { join } = require("path");
const { renderToNodeStream } = require("react-dom/server");

const render = ({ template, response, bundle }) => {
  const [startDocument, bodyTag, endDocument] = template.split(/(\<body.*?\>)/);

  response.type("html").write(startDocument);
  response.write(bodyTag);

  const stream = renderToNodeStream(bundle.render());
  stream.pipe(response, { end: false });

  stream.on("end", () => {
    response.end(endDocument);
  });
};

function developmentMode() {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const { mergeWithCustomize, customizeArray } = require("webpack-merge");
  const webpackConfig = require("../webpack.config")();
  const _eval = require("eval");

  const compiler = webpack(
    webpackConfig
      .map((config) => ({ ...config, mode: "development" }))
      .map((config) =>
        config.name === "server"
          ? config
          : mergeWithCustomize({
              customizeArray: customizeArray({
                "entry.*": "prepend",
              }),
            })(config, {
              entry: [
                "webpack-hot-middleware/client?name=client&path=/__webpack_hmr",
              ],
              plugins: [new webpack.HotModuleReplacementPlugin()],
            })
      )
  );

  const router = new Router();

  router.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
    })
  );
  router.use(webpackHotMiddleware(compiler, { name: "client" }));
  router.get("/", (request, response) => {
    const { devMiddleware } = response.locals.webpack;
    const outputFileSystem = devMiddleware.outputFileSystem;
    const jsonWebpackStats = devMiddleware.stats.toJson();

    const { outputPath } = jsonWebpackStats.children.find(
      ({ name }) => name === "server"
    );

    const bundle = _eval(
      outputFileSystem.readFileSync(join(outputPath, "server.js"), "utf-8"),
      true
    );

    const template = outputFileSystem.readFileSync(
      join(outputPath, "template.html"),
      "utf-8"
    );

    render({ template, response, bundle });
  });

  return router;
}

function productionMode() {
  const { readFileSync } = require("fs");
  const express = require("express");

  const router = new Router();
  const bundle = require("../dist/server");
  const template = readFileSync(
    join(__dirname, "../dist/template.html"),
    "utf-8"
  );

  router.use(express.static(join(__dirname, "../dist"), { index: false }));
  router.get("/", (request, response) => {
    render({ template, response, bundle });
  });

  return router;
}

module.exports =
  process.env.NODE_ENV === "production" ? productionMode() : developmentMode();
