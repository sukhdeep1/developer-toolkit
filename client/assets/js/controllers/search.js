(function () {

  var controller = function ($scope, $routeParams) {
    console.log("Search controller");

    if($routeParams.accessToken){
      $scope.$emit('setAccessToken', $routeParams);
    }

    $scope.$on('searchResultReceived', function(event, result){
      $scope.appVars.searchCount = result.count;
      $scope.appVars.searchItems = result.data;
    });

    $scope.$watch('appVars.accessToken', function(){
     $scope.appVars.searchCount = NaN;
     $scope.appVars.searchItems = [];
    });

  };

  angular.module('developer-toolkit').controller('Search', ['$scope', '$routeParams', controller ]);

}).call(this);
