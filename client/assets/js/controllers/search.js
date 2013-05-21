angular.module('developer-toolkit')
  .controller('Search',
    ['$scope', '$rootScope','Collections', 'ItemSearch',
      function ($scope, $root, Collections, ItemSearch) {

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
              });
          } else {
            $scope.collections = [];
          }
        };

        $root.$watch('accessToken', function (newToken) {
          $scope.resetForm();
          $scope.updateCollections(newToken);
        });

        $scope.search = function () {

          ItemSearch.query(
            $root.accessToken,
            {searchText: $scope.keyword, collection: $scope.collection },
            0,
            50,
            function (result) {

              $root.$broadcast('searchResultReceived', result);
              //console.log("Got a result: " + result);
              //$parent.items = result.data;
              //$parent.count = result.count;
            },
            function (error) {
              console.warn("An error occurred");
            });
        };
      }]);