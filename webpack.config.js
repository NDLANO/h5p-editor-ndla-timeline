const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";
const isDev = mode !== "production";

module.exports = {
  mode,
  entry: {
    "h5p-editor-timeline": path.join(__dirname, "src", "index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  resolve: {
    modules: [path.resolve("./src"), path.resolve("./node_modules")],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
          { loader: "ts-loader" },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    open: true,
  },
};

if (isDev) {
  module.exports.devtool = "inline-source-map";
}
