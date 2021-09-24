module.exports = ({ cache }) => {
  cache(true);

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
  return { presets };
};
