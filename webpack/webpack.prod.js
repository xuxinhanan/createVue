const common = require("./webpack.common.js");
const path = require("path");
const { merge } = require("webpack-merge");

// 压缩CSS插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  optimization: {
    // 分离chunks
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial", // 只打包初始时依赖的第三方
        },
      },
    },
    minimize: true, // 是否压缩
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset",
      },
    ],
  },
  plugins: [
    // 提取样式文件
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css",
    }),
    // 打包速度分析工具
    new BundleAnalyzerPlugin(),
  ],
});
