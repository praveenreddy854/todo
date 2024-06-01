const path = require("path");
module.exports = {
  entry: "./src/index.tsx", // Entry point of your application
  output: {
    filename: "bundle.js", // Output bundle file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: ["remove-hashbag-loader", "source-map-loader"],
      },
    ],
  },
  resolveLoader: {
    alias: {
      "remove-hashbag-loader": path.resolve(
        __dirname,
        "loaders/remove-hashbag-loader.js"
      ),
    },
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"), // Serve files from this directory
    port: 3000, // Port for the development server
    open: true, // Open the default web browser when the server starts
  },
};
