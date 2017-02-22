module.exports = function (app) {
  console.log('development mode')

  const webpack = require('webpack')
  const configw = require('../../webpack.config')
  const compiler = webpack(configw)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: configw.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}
