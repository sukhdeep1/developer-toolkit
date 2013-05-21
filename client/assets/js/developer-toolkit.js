angular.module('developer-toolkit', [
    'corespring-ng-services',
    'corespring-ng-utils',
    'ui.jq',
    'ngResource'])
  .config(['$routeProvider', function ($router) {
    $router
      .when('/player', {templateUrl: '/partials/player', controller: "Player"})
      .when('/api', {templateUrl: '/partials/api', controller: "Api"})
      .otherwise({redirectTo: '/player'});
  }]);


