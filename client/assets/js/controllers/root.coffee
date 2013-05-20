angular.module('developer-toolkit')
  .controller('Root', ['$scope', '$rootScope', ($scope, $rootScope) ->
    console.log "root : #{$scope}"
    $rootScope.accessToken = "No token"

    $rootScope.$watch 'accessToken', (newValue) ->
      console.log "new token: #{newValue}"
  ])
