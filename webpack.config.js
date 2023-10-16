const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDirectory = path.resolve(__dirname);
const { presets } = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
  "react-native-safe-area-context",
  "@react-navigation/native",
  "react-native-paper",
  "react-native",
  "react-native-progress",
  "@expo/vector-icons/build",
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  include: [
    path.resolve(__dirname, "index.web.js"), // Entry to your application
    path.resolve(__dirname, "App.web.tsx"), // Change this to your main App file
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "node_modules/react-native-uncompiled"),
    ...compileNodeModules,
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      //presets,
      presets: ["module:metro-react-native-babel-preset"],
      plugins: ["react-native-web"],
    },
  },
};

const iconLoaderConfiguration = {
  test: /\.ttf$/,
  loader: "url-loader",
  include: [
    path.resolve(__dirname, "node_modules/@expo/vector-icons"),
    path.resolve(__dirname, "assets/fonts"),
  ],
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: "@svgr/webpack",
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
    },
  },
};

module.exports = {
  entry: {
    app: path.join(__dirname, "index.web.js"),
  },
  output: {
    path: path.resolve(appDirectory, "dist"),
    publicPath: "/",
    filename: "bundle.web.js",
  },
  resolve: {
    extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".web.js", ".js"],
    alias: {
      "react-native$": "react-native-web",
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      iconLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== "production",
    }),
  ],
};
