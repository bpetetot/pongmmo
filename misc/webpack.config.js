const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

// vendors manifests
const pixijs = require('../dist/pixijs-manifest.json')
const socketio = require('../dist/socketio-manifest.json')
const matterjs = require('../dist/matterjs-manifest.json')

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
  }

  plugins.push(new webpack.DllReferencePlugin({ context: '.', manifest: pixijs }))
  plugins.push(new webpack.DllReferencePlugin({ context: '.', manifest: socketio }))
  plugins.push(new webpack.DllReferencePlugin({ context: '.', manifest: matterjs }))


  plugins.push(new HtmlWebpackPlugin({ hash: true, template: require.resolve('./index.html') }))
  plugins.push(new AddAssetHtmlPlugin({ filepath: require.resolve('../dist/pixijs.bundle.js'), hash: true, includeSourcemap: false }))
  plugins.push(new AddAssetHtmlPlugin({ filepath: require.resolve('../dist/socketio.bundle.js'), hash: true, includeSourcemap: false }))
  plugins.push(new AddAssetHtmlPlugin({ filepath: require.resolve('../dist/matterjs.bundle.js'), hash: true, includeSourcemap: false }))

  return plugins
}

module.exports = {
  devtool: dev ? 'eval-source-map' : '',
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
    path: path.join(__dirname, '..', 'dist/'),
    filename: 'client.js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      'node_modules',
      './src',
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
