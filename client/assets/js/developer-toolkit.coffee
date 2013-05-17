console.log "developer-toolkit"
angular.module( 'developer-toolkit', ['corespring-services', 'ngResource'])
  .config ['$routeProvider', ($router) ->
    $router.when '/player', {templateUrl: '/partials/player', controller: "Player"}
    $router.when '/api', {templateUrl: '/partials/api', controller: "Api"}
    $router.otherwise {redirectTo: '/player'}
  ]

