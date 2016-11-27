const path = require('path')
const webpack = require('webpack')

// vendors manifests
const pixijs = require('./vendors/pixijs-manifest.json')
const socketio = require('./vendors/socketio-manifest.json')

const dev = (process.env.NODE_ENV !== 'production')

function getEntrySources(sources) {
  if (dev) {
    sources.push('webpack/hot/only-dev-server')
  }

  return sources
}

function getPlugins(plugins) {
  if (dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new webpack.DllReferencePlugin({ context: '.', manifest: pixijs }))
    plugins.push(new webpack.DllReferencePlugin({ context: '.', manifest: socketio }))
  }

  return plugins
}

module.exports = {
  devtool: dev ? 'eval' : '',
  devServer: {
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:9000',
        ws: true,
      },
    },
  },
  entry: {
    pongmmo: getEntrySources([
      './src/client.js',
    ]),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
    extensions: ['.js'],
  },
  plugins: getPlugins([]),
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
    }],
  },
}
