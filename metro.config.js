const path = require("path");

// Use Expo's default Metro config as a base so we keep the proper
// resolver/transformer settings for Expo packages (they may include
// TypeScript sources under node_modules that require the default config).
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const defaultConfig = getDefaultConfig(projectRoot);

// Merge our extraNodeModules mapping onto the default resolver.
defaultConfig.resolver = defaultConfig.resolver || {};
defaultConfig.resolver.extraNodeModules = Object.assign(
  {},
  defaultConfig.resolver.extraNodeModules,
  {
    "expo-keep-awake": path.resolve(__dirname, "shims", "expo-keep-awake.js"),
  }
);

module.exports = defaultConfig;
