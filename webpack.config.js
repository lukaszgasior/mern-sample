const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: ['webpack-hot-middleware/client?reload=true', './client/BlogApp.js'],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        include: path.resolve(__dirname, 'client'),
        test: /\.js$/,
        loader: ['react-hot-loader/webpack', 'babel-loader']
      }
    ]
  }
}
