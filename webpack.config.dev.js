var webpack = require('webpack');
var path = require('path');

var version = require('./package.json').version;

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './web-ui/src/public/index'
  ],
  output: {
    path: path.join(__dirname, 'build', 'public'),
    publicPath: '/build/public',
    filename: 'index.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
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
          presets: ['react', 'stage-0', 'es2015'],
          env: {
            development: {
              plugins: [
                [
                  'react-transform', {
                    transforms: [
                      {
                        transform: 'react-transform-hmr',
                        imports: [ 'react' ],
                        locals: [ 'module' ]
                      }, {
                        transform: 'react-transform-catch-errors',
                        imports: [ 'react', 'redbox-react' ]
                      }
                    ]
                  }
                ]
              ]
            }
          }
        }
      }
    ]
  }
};
