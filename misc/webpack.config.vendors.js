const webpack = require('webpack')

module.exports = {
  entry: {
    pixijs: ['pixi.js'],
    socketio: ['socket.io-client'],
    p2: ['p2'],
  },
  output: {
    filename: '[name].bundle.js',
    path: 'dist/',
    library: '[name]_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'dist/[name]-manifest.json',
      name: '[name]_lib',
    }),
  ],
  module: {
    rules: [
      { test: /\.json$/, use: ['json-loader'] },
    ],
  },
  externals: './node_modules',
}
