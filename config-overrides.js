// config-overrides.js
const path = require("path");
const { addWebpackResolve, addWebpackModuleRule } = require("customize-cra");

module.exports = function override(config, env) {
  // Resolve the path, os, and crypto modules
  config = addWebpackResolve({
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
    },
  })(config, env);

  // Add a module rule to handle crypto-browserify
  config = addWebpackModuleRule({
    test: /crypto-browserify/,
    use: [{ loader: "null-loader" }],
  })(config, env);

  return config;
};
