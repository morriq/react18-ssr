module.exports = ({ cache }) => {
  cache(true);
  const plugins = ["react-hot-loader/babel", "@babel/plugin-transform-runtime"];

  const presets = [
    [
      "@babel/env",
      {
        modules: false,
      },
    ],
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
