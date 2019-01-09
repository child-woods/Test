const path = require("path")
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
module.exports = webpackMerge(baseConfig, {
    target: 'node',  // 运行的环境
    entry: {  // 入口
      app: path.join(__dirname,'../client/server-entry.js')
    },
    output: {
      filename: 'server-entry.js',
      // path: path.join(__dirname,'../dist'),
      // publicPath: '/public/',   // 静态资源应用时的路径
      libraryTarget: 'commonjs2'  // amd cmd umd
    },
    mode: 'production'
})
