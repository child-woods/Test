const path = require("path")
const webpack = require('webpack')
const HTMLPlugin = require("html-webpack-plugin")
const webpackMerge = require('webpack-merge')  // 合并一些webpack的配置，npm i webpack-merge -D
const baseConfig = require('./webpack.base')
const isDev = process.env.NODE_ENV === 'development' //判断运行环境是正式环境还是开发环境
  // npm i cross-env -D

const config = webpackMerge(baseConfig, {
    entry: {  // 入口
      app: path.join(__dirname,'../client/app.js')
    },
    output: {
      filename: '[name].[hash].js',
      // path: path.join(__dirname,'../dist'),
      // publicPath: '/public/'   // 静态资源应用时的路径
    },
    mode: 'production',
    plugins: [
      new HTMLPlugin({
        template: path.join(__dirname,'../client/template.html')  // 以client/template.html为模板，使得生成的js渲染到template.html中
      }), // npm i html-webpack-plugin -D
      new HTMLPlugin({
        template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
        filename: 'server.ejs'   // npm i ejs ejs-compiled-loader -S
      })
    ]
})

if(isDev){  // 如果是开发环境，则加一些配置
  config.entry = {
    app: [
      'react-hot-loader/patch',      // npm i react-hot-loader -D
      path.join(__dirname,'../client/app.js')
    ]
  }
  config.devServer = {  // npm i webpack-dev-server -D
    host: '0.0.0.0', // 表示可以以任何形式访问，如127.0.0.1,localhost:端口号 或者是本机的ip
    port: '8888',
    contentBase: path.join(__dirname,'../dist'),
    hot: true,
    overlay: {
      errors: true // 错误提醒
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api':'http://localhost:3333'
    }
  },
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
