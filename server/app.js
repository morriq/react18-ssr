const express = require("express");
const app = express();
const render = require("./render");

app.use(render);

module.exports = app;
