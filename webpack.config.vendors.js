const webpack = require('webpack')

module.exports = {
  entry: {
    pixijs: ['pixi.js'],
    socketio: ['socket.io-client'],
    matterjs: ['matter-js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: 'dist/vendors/',
    library: '[name]_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'dist/vendors/[name]-manifest.json',
      name: '[name]_lib',
    }),
  ],
  externals: './node_modules',
}
