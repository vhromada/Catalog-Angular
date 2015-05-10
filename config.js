var util = require('gulp-util');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  gulp: {
    httpServer: {
      host: util.env.HOST || 'localhost',
      port: util.env.PORT || 8000,
      lrPort: util.env.LRPORT || 35729
    },
    dirs: {
      src: 'app/',
      build: 'build/'
    },
    filename: {
      index: 'index.html',
      js: {
        application: 'application.js',
        vendor: 'vendor.js'
      }
    }
  },
  webpack: {
    entry: './app/modules/index.js',
    output: {
      filename: 'application.js'
    },
    module: {
      loaders: [
        {test: /\.css$/, loader: "style!css"}
      ]
    },
    plugins: [
      new webpack.optimize.DedupePlugin()
      // uncomment for production. comment out during dev
      //new webpack.optimize.UglifyJsPlugin({
      //  mangle: false
      //})
    ]
  }
};
