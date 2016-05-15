/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'ng2-bootstrap/**/*.js',
      'angular2-toaster/**/*.js',
      'firebase/**/*.js',
      'angularfire2/**/*.js',
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      '@angular/**/*.js',
      'font-awesome/css/font-awesome.css',
      'font-awesome/fonts/*',
      'bootstrap/dist/css/bootstrap.css',
      'angular2-toaster/lib/toaster.css'
    ]
  });
};
