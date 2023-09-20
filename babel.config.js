module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      "react-native-reanimated/plugin",
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          "root": ["./src"],
          "extensions": [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json"
          ],
          "alias": {
            "screens": "./src/screens",
            "components": "./src/components",
            "assets": "./src/assets",
            "configs": "./src/configs",
            "hooks": "./src/hooks",
            "src": "./src"
          }
        }
      ]
    ]
  };
};
