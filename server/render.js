const { Router } = require("express");
const { join } = require("path");
const { renderToNodeStream } = require("react-dom/server");
const { matchPath } = require("react-router-dom");

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

  return [
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
    }),
    webpackHotMiddleware(compiler, { name: "client" }),
    (request, response, next) => {
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

      response.locals.template = template;
      response.locals.bundle = bundle;
      next();
    },
  ];
}

function productionMode() {
  const { readFileSync } = require("fs");
  const express = require("express");

  const bundle = require("../dist/server");
  const template = readFileSync(
    join(__dirname, "../dist/template.html"),
    "utf-8"
  );

  return [
    express.static(join(__dirname, "../dist"), { index: false }),
    (request, response, next) => {
      response.locals.template = template;
      response.locals.bundle = bundle;
      next();
    },
  ];
}

const router = new Router();

router.use(
  process.env.NODE_ENV === "production" ? productionMode() : developmentMode()
);

router.get("*", (request, response, next) => {
  const { template, bundle } = response.locals;

  const route = bundle.routes.find((route) => matchPath(request.path, route));

  if (!route) {
    return next();
  }

  const [startDocument, bodyTag, endDocument] = template.split(/(\<body.*?\>)/);

  route
    .beforeHeadersResponse(request, response, matchPath(request.path, route))
    .then((beforeHeadersData) => {
      if (response.headersSent) {
        return;
      }

      response.type("html").write(startDocument);
      response.write(bodyTag);

      return route
        .afterHeadersResponse(request, beforeHeadersData)
        .then((state) => {
          const stream = renderToNodeStream(
            bundle.render({ state, location: request.url })
          );
          stream.pipe(response, { end: false });

          stream.on("error", (error) => {
            console.error(error);
            response.write("failed serving html");
            response.end(endDocument);
          });
          stream.on("end", () => {
            response.end(endDocument);
          });
        });
    })
    .catch((error) => {
      console.error(error);
      response.end("failed fetching data");
    });
});

module.exports = router;
