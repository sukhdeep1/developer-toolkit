console.log "developer-toolkit"
angular.module( 'developer-toolkit', ['corespring-ng-services', 'ngResource'])
  .config ['$routeProvider', '$httpProvider', ($router, $httpProvider) ->
    #$httpProvider.defaults.useXDomain = true;
    #delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $router.when '/player', {templateUrl: '/partials/player', controller: "Player"}
    $router.when '/api', {templateUrl: '/partials/api', controller: "Api"}
    $router.otherwise {redirectTo: '/player'}
  ]

