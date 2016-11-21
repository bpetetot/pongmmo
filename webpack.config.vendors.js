const webpack = require('webpack')

module.exports = {
  entry: {
    pixijs: ['pixi.js'],
    socketio: ['socket.io-client'],
  },
  output: {
    filename: '[name].bundle.js',
    path: 'vendors/',
    library: '[name]_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'vendors/[name]-manifest.json',
      name: '[name]_lib',
    }),
  ],
  externals: './node_modules',
}
