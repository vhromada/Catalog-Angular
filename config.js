var util = require('gulp-util');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (isDevelopment) {
  return {
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
        application: 'app.js',
        vendor: 'vendor.js'
      }
    },
    webpack: {
      context: __dirname + '/app',
      entry: './modules/index.js',
      output: {
        filename: 'app.js'
      },
      module: {
        loaders: [
          {test: /\.css$/, loader: extractTextPlugin.extract("style-loader", "css-loader")},
          {test: /\.less$/, loader: extractTextPlugin.extract("style-loader", "css-loader!less-loader")},
          {test: /\.scss$/, loader: extractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
          {test: /\.sass$/, loader: extractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
          {test: /\.styl$/, loader: extractTextPlugin.extract("style-loader", "css-loader!stylus-loader")},
          {test: /\.woff$/, loader: "file-loader"},
          {test: /\.woff2$/, loader: "file-loader"},
          {test: /\.ttf$/, loader: "file-loader"},
          {test: /\.eot$/, loader: "file-loader"},
          {test: /\.svg$/, loader: "file-loader"}
        ]
      },
      plugins: (function () {
        var plugins = [
          new extractTextPlugin('app.css', {
            allChunks: true
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin()];
        if (!isDevelopment) {
          plugins.push(
            // Render styles into separate cacheable file to prevent FOUC and
            // optimize for critical rendering path.
            new webpack.optimize.UglifyJsPlugin({
              compress: {
                warnings: false
              }
            })
          );
        }
        return plugins;
      })()
    }
  }
};
