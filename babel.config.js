module.exports = ({ cache }) => {
  cache(true);
  const plugins = ["react-hot-loader/babel", "@babel/plugin-transform-runtime"];

  const presets = [
    "@babel/env",
    "@babel/typescript",
    [
      "@babel/react",
      {
        runtime: "automatic",
      },
    ],
  ];
  return { presets, plugins };
};
