const common = require('./webpack.common.js')
const path = require('path')
const { merge } = require('webpack-merge')

const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = merge(common, {
  // 开发环境
  mode: 'development',
  // source-map
  devtool: 'eval-cheap-module-source-map',
  // 缓存
  cache: {
    type: 'filesystem'
  },
  // 出口
  output: {
    filename: 'js/[name].[fullhash].js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    host: 'localhost', // 指定host，，改为0.0.0.0可以被外部访问
    port: 8081, // 指定端口号
    open: false, // 服务启动后自动打开默认浏览器
    historyApiFallback: true, // 当找不到页面时，会返回index.html
    hot: true, // 启用模块热替换HMR，在修改模块时不会重新加载整个页面，只会更新改变的内容
    compress: true, // 启动GZip压缩
    https: false, // 是否启用https协议
    proxy: {
      // 需要代理到的真实目标服务器，可以解决前端跨域请求的问题
      '/api': 'www.baidu.com'
    }
  },
  module: {
    rules: [
      // 处理图片资源
      {
        test: /\.(png|svg|jpg|gif|cur)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [new ESLintPlugin({ extensions: ['js', 'ts', 'vue'] })]
})
