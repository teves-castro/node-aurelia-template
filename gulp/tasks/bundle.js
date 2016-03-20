var gulp = require('gulp');
var bundler = require('aurelia-bundler');

var bundles = {
    "dist/app-build": {
        includes: [
            "[*.js]"
        ],
        exclude: [
            "jspm_packages"
        ],
        options: {
            "inject": true,
            "minify": true,
            "rev": true
        }
    }
}

var config = {
    force: true,                    // Force overwrite bundle file if already exists. Default false 
    baseURL: './src/client',       // `baseURL of the application`  
    configPath: './src/client/config.js',        // `config.js` path. Must be within `baseURL`  
    bundles: bundles
};

gulp.task('unbundle', function() {
    return bundler.unbundle(config);
});

gulp.task('bundle', ['unbundle'], function() {   // Running `unbundle` before bundling is a good practice. 
    return bundler.bundle(config);
});