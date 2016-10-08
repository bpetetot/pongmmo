const path = require('path')
const webpack = require('webpack')

const dev = (process.env.NODE_ENV !== 'production')

function getEntrySources(sources) {
  if (dev) {
    sources.push('webpack-dev-server/client?http://192.168.43.60:8888')
    sources.push('webpack/hot/only-dev-server')
  }

  return sources
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
      './src/main.js',
    ]),
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    root: [path.resolve('./src'), path.resolve('./src/components')],
    extensions: ['', '.js'],
  },
  plugins: getPlugins([]),
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
    }],
  },
}
