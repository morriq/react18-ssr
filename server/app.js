const express = require("express");
const app = express();
const render = require("./render");

app.use(render).get("/*", (request, response) => {
  response.redirect(301, "/");
});

module.exports = app;
