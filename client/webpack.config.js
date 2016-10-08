const path = require('path')
const webpack = require('webpack')

const dev = (process.env.NODE_ENV !== 'production')

function getEntrySources(sources) {
  if (dev) {
    sources.push('webpack-dev-server/client?http://localhost:3000')
    sources.push('webpack/hot/only-dev-server')
  }

  return sources
}

function getLoaders(loaders) {
  loaders.push('babel')

  return loaders
}

function getPlugins(plugins) {
  if (dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return plugins
}

module.exports = {
  devtool: dev ? 'eval' : '',
  entry: {
    pongmmo: getEntrySources([
      './src',
    ]),
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    root: [path.resolve('./src'), path.resolve('./src/components')],
    extensions: ['', '.js', '.jsx'],
  },
  plugins: getPlugins([]),
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: getLoaders([]),
    }],
  },
}
