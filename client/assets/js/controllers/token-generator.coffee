
angular.module('developer-toolkit')
  .controller('TokenGenerator', [ '$scope', 'AccessToken', ($scope, AccessToken) ->
    console.log "TokenGenerator"

    console.log "AccessToken..: #{AccessToken}"
    console.log " #{$scope.accessToken}"
  ])