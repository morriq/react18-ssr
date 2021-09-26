const { Router } = require("express");
const { join } = require("path");
const { pipeToNodeWritable } = require("react-dom/server");

const render = ({ template, response, bundle }) => {
  const [startDocument, bodyTag, endDocument] = template.split(/(\<body.*?\>)/);
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

  setTimeout(abort, 3000);
};

function developmentMode() {
  const webpack = require("webpack");
  const middleware = require("webpack-dev-middleware");
  const webpackConfig = require("../webpack.config")();
  const _eval = require("eval");
  const compiler = webpack(
    webpackConfig.map((config) => ({ ...config, mode: "development" }))
  );

  const router = new Router();

  router.use(middleware(compiler, { serverSideRender: true }));
  router.get("/", (request, response) => {
    const { devMiddleware } = response.locals.webpack;
    const outputFileSystem = devMiddleware.outputFileSystem;
    const jsonWebpackStats = devMiddleware.stats.toJson();

    const { outputPath } = jsonWebpackStats.children[0];

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
