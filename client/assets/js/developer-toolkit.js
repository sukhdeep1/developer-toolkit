angular.module('developer-toolkit', [
    'corespring-ng-services',
    'corespring-ng-utils',
    'ui',
    'ngResource'])
  .config(['$routeProvider', function ($router) {
    $router
      .when('/search', {templateUrl: '/partials/search', controller: "Search"})
      .when('/api', {templateUrl: '/partials/api', controller: "Api"})
      .when('/launcher', {templateUrl: '/partials/launcher', controller: "Launcher"})
      .otherwise({redirectTo: '/search'});
  }]);


