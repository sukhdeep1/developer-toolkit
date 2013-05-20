angular.module('developer-toolkit')
  .controller('TokenGenerator', [ '$scope', '$rootScope','AccessToken', ($scope, $rootScope, AccessToken) ->

    $scope.generateToken = ->
      onSuccess = (data) ->
        console.log "Got a toke: #{data}"
        $rootScope.accessToken = data.access_token
        null

      onError = (error) -> console.warn "An error occured: #{error}"
      AccessToken.generate $scope.clientId, $scope.clientSecret, onSuccess, onError
  ])

