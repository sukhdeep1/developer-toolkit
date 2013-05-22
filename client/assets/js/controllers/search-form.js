angular.module('developer-toolkit')
  .controller('SearchForm',
    ['$scope', 'Collections', 'ItemSearch',
      function ($scope, Collections, ItemSearch) {

        $scope.resetForm = function () {
          console.log("resetForm");
          $scope.keyword = null;
        };

        $scope.updateCollections = function (token) {
          console.log("updateCollections");
          if (token) {
            Collections.get({access_token: token},
              function (data) {
                $scope.collections = data;
              },
              function error(e){
                $scope.collections = [];
              });
          } else {
            $scope.collections = [];
          }
        };

        $scope.$watch('appVars.accessToken', function (newToken) {
          $scope.resetForm();
          $scope.updateCollections(newToken);
        });

        $scope.search = function () {

          ItemSearch.query(
            $scope.appVars.accessToken,
            {searchText: $scope.keyword, collection: $scope.collection },
            0,
            50,
            function (result) {
              $scope.$emit('searchResultReceived', result);
            },
            function (error) {
              console.warn("An error occurred");
            });
        };
      }]);