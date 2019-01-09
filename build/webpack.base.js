// 公共配置
const path = require('path')
module.exports = {
  output: {
    path: path.join(__dirname,'../dist'),
    publicPath: '/public/',   // 静态资源应用时的路径
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre', // 表示在执行真的代码之前执行下面的eslint
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',  // npm i eslint-loader -D
        exclude: [  // 屏蔽node_modules下的代码，即不对node_modules下的代码进行eslint检测
          path.resolve(__dirname,'../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname,'../node_modules')
        ]
      }
    ]
  }
}
