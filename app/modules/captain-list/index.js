'use strict';

var captainListController = require('./captainList.controller.js');
var captainListService = require('./captainList.service.js');

module.exports = angular.module('catalogApp.captainList', [])
  .factory('CaptainListService', captainListService)
  .controller('CaptainListController', ['$scope', 'CaptainListService', captainListController])
