const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

module.exports = () => {
  const config = {
    resolve: {
      modules: [resolve(__dirname), "node_modules"],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: [
            "babel-loader",
            {
              loader: "@linaria/webpack-loader",
              options: {
                sourceMap: process.env.NODE_ENV !== "production",
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: process.env.NODE_ENV !== "production",
              },
            },
          ],
        },
      ],
    },
  };

  const client = merge(config, {
    name: "client",
    entry: ["react-hot-loader/patch", resolve(__dirname, "src/client")],
    output: {
      filename: "[name].[contenthash].bundle.js",
      library: ["application"],
    },
    resolve: {
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, "src/template.ejs"),
        filename: "template.html",
      }),
    ],
  });
  const server = merge(config, {
    name: "server",
    entry: [resolve(__dirname, "src/server")],
    output: {
      filename: "server.js",
      library: {
        type: "commonjs2",
      },
    },
    externals: [nodeExternals()],
    target: "node",
  });

  return [client, server];
};
