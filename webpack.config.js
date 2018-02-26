const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/app/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: path.join(__dirname, '/app/index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: path.join(__dirname, '/build')
  },
  plugins: [HTMLWebpackPluginConfig]
}
