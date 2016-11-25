const path = require('path')
const fs = require('fs')

const dev = (process.env.NODE_ENV !== 'production')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => { nodeModules[mod] = `require('${mod}')` })

module.exports = {
  devtool: dev ? 'eval' : '',
  target: 'node',
  entry: { server: './src/server.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.js'],
  },
  module: {
    rules: [{
      test: /\.js/,
      use: ['babel-loader'],
    }],
  },
  externals: nodeModules,
}
