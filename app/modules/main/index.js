'use strict';

var mainController = require('./main.controller.js');

require('ng-cache!./main.html');
module.exports = angular.module('catalogApp.main', [])
  .controller('MainController', ['$scope', mainController]);
