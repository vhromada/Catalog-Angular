var util = require('gulp-util');

module.exports = {
  application: {
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
        css: 'css/',
        styl: 'styl/'
      },
      srcApp: 'src/app/',
      srcCss: 'src/css/',
      srcStyl: 'src/styl/',
      buildCss: 'build/css/'
    },
    filename: {
      index: 'index.html',
      styl: 'catalog.styl',
      css: 'styles.css',
      js: {
        application: 'scripts.js',
        vendor: 'vendor.js',
        templates: 'templates.js'
      }
    }
  }
};
