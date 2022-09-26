const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  return {
    mode: env === "production" ? "development" : "production",
    entry: {
      Index: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "./js/dist"),
      filename: "[name].bundle.js",
      publicPath: "/",
    },
    devtool: "source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      hot: true,
      port: 9000,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".ts", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
        },
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({ template: "template.html" }),
    ],
  };
};
