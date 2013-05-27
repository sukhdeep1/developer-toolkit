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
                $scope.$emit('apiCallSucceeded', 'collections');
              },
              function error(e){
                $scope.collections = [];
                $scope.$emit('apiCallFailed', 'collections');
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
          $scope.errorMessage = null;
          if (!$scope.collection) {
            $scope.errorMessage = "Please select a collection";
            return;
          }

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
              $scope.errorMessage = "An error occurred: "+error.message;
            });
        };
      }]);