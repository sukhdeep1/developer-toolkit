angular.module('developer-toolkit')
  .controller('Root', ['$scope', ($scope) ->
    console.log "root : #{$scope}"
    $scope.accessToken = "No token"
  ])
