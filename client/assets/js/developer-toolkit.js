angular.module('developer-toolkit', [
    'developer-toolkit.controllers',
    'corespring-ng-services',
    'corespring-ng-utils',
    'cs.directives',
    'ui',
    'ngResource', 
    'ngRoute'])
  .config(['$routeProvider', function ($router) {
    $router
      .when('/search', {templateUrl: '/partials/search', controller: "Search"})
      //Not specced yet
      //.when('/api', {templateUrl: '/partials/api', controller: "Api"})
      .when('/launcher', {templateUrl: '/partials/launcher', controller: "Launcher"})
      .otherwise({redirectTo: '/search'});
  }]);


