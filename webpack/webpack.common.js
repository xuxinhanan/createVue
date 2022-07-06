const path = require('path')
const { resolve } = require('path')

const { VueLoaderPlugin } = require('vue-loader/dist/index')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口
  entry: ['./src/index.js'],
  module: {
    rules: [
      // 转译 ts、js
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      // 处理vue
      {
        test: /\.vue$/,
        use: [{ loader: 'vue-loader' }]
      },
      // 处理 css、sass
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      // 处理 less
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      // 处理字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 添加 html 模板
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    })
    // 处理静态文件夹 static 复制到打包的 static 文件夹
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "../static"),
    //       to: "static",
    //     },
    //   ],
    // }),
  ],

  resolve: {
    // 缩小解析路径查找范围
    extensions: ['.js', '.vue', '.ts', '.tsx'],
    // 设置路径别名
    alias: {
      '@': resolve('src')
    }
  }
}
