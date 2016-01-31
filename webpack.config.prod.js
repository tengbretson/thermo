var webpack = require('webpack');
var path = require('path');

var version = require('./package.json').version;

module.exports = {
  entry: [ './web-ui/src/public/index' ],
  output: {
    path: path.join(__dirname, 'web-ui', 'build', 'public'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compressor: { warnings: false }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      APP_VERSION: JSON.stringify(version)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'web-ui/src/public'),
        query: {
          presets: ['react', 'stage-0', 'es2015']
        }
      }
    ]
  }
};
