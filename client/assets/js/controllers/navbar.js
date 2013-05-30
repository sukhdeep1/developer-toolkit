angular.module('developer-toolkit.controllers')
  .controller('Navbar', ['$scope', '$location', function ($scope, $location) {

    'use strict';

    $scope.isActive = function (path) {
      return $location.path() === path;
    };

    $scope.navTo = function (path) {
      $location.path(path);
    };

  }]);