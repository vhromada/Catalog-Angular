var util = require('gulp-util');

module.exports = {
  appliaction: {
    name: 'Catalog'
  },
  gulp: {
    httpServer: {
      host: util.env.HOST || 'localhost',
      port: util.env.PORT || 8000,
      lrPort: util.env.LRPORT || 35729,
      run: false,
      proxy: false
    },
    dirs: {
      build: 'build/',
      src: 'src/',
      parts: {
        app: 'app/',
        css: 'css/'
      },
      srcApp: 'src/app/',
      srcCss: 'src/css/',
      buildCss: 'build/css/'
    },
    filename: {
      index: 'index.html',
      css: 'styles.css',
      js: {
        application: 'scripts.js',
        vendor: 'vendor.js',
        templates: 'templates.js'
      }
    }
  }
};
