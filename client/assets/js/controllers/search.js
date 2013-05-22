(function () {

  var controller = function ($scope, $routeParams) {
    console.log("Search controller");

    if($routeParams.accessToken && $routeParams.clientId){
      $scope.$emit('setTokenAndClientId', $routeParams);
    }

    $scope.$on('searchResultReceived', function(event, result){
      $scope.appVars.searchCount = result.count;
      $scope.appVars.searchItems = result.data;
    });

    $scope.$watch('appVars.accessToken', function(){
     $scope.appVars.searchCount = 0;
     $scope.appVars.searchItems = [];
    });

  };

  angular.module('developer-toolkit').controller('Search', ['$scope', '$routeParams', controller ]);

}).call(this);

