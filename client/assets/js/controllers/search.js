(function () {

  var controller = function ($scope, $routeParams) {

    $scope.searchInProgress = false;

    $scope.loadMore = function(){
      if($scope.appVars.searchItems.length < $scope.appVars.searchCount){
        $scope.$broadcast("loadMoreSearchResults");
      }
    };

    if($routeParams.accessToken){
      $scope.$emit('setAccessToken', $routeParams);
    }

    $scope.searchResultsReceived = function(result){
      $scope.appVars.searchCount = result.count;
      $scope.appVars.searchItems = result.data;
    };

    $scope.moreSearchResultsReceived = function(result){
      $scope.appVars.searchCount = result.count;
      $scope.appVars.searchItems = $scope.appVars.searchItems.concat(result.data);
    };

    $scope.$watch('appVars.accessToken', function(){
      $scope.clearCurrentSearch();
    });

    $scope.clearCurrentSearch = function(){
      $scope.appVars.searchCount = NaN;
      $scope.appVars.searchItems = [];
    };

  };

  angular.module('developer-toolkit').controller('Search', ['$scope', '$routeParams', controller ]);

}).call(this);

