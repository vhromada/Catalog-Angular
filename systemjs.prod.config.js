(function (global) {
    System.config({
        paths: {
            'npm:': 'libs/'
        },
        map: {
            'app': 'app',
            '@angular/core': 'npm:core.umd.min.js',
            '@angular/common': 'npm:common.umd.min.js',
            '@angular/compiler': 'npm:compiler.umd.min.js',
            '@angular/platform-browser': 'npm:platform-browser.umd.min.js',
            '@angular/platform-browser-dynamic': 'npm:platform-browser-dynamic.umd.min.js',
            '@angular/http': 'npm:http.umd.min.js',
            '@angular/router': 'npm:router.umd.min.js',
            '@angular/forms': 'npm:forms.umd.min.js',
            'rxjs': 'npm:rxjs'
        },
        packages: {
            app: {
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: 'systemjs-angular-loader.js'
                    }
                }
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);

document.addEventListener('DOMContentLoaded', function () {
    System.import('app')
        .then(null, console.error.bind(console));
});
