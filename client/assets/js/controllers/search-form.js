angular.module('developer-toolkit.controllers')
  .controller('SearchForm',
    ['$scope', 'Collections', 'ItemSearch',
      function ($scope, Collections, ItemSearch) {

        'use strict';

        $scope.errorPrefix = "An error occurred: ";

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
              function error(e) {
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
        }, true);

        var lastSearchId = null;

        var itemSearch = function (searchUid, skip, resultHandler) {
          $scope.searchInProgress = true;

          ItemSearch.query(
            $scope.appVars.accessToken,
            {searchText: $scope.keyword, collection: {id: $scope.collectionId} },
            skip,
            50,
            function (result) {
              if (searchUid === lastSearchId) {
                resultHandler(result);
                $scope.searchInProgress = false;
              }
            },
            function (error) {
              if (searchUid === lastSearchId) {
                $scope.errorMessage = $scope.errorPrefix + error.message;
                $scope.searchInProgress = false;
              }
            }
          );
        };

        $scope.$on("loadMoreSearchResults", function () {
          console.log("SearchForm -> load more..");
          lastSearchId = new Date().getTime();
          itemSearch(lastSearchId, $scope.appVars.searchItems.length, $scope.moreSearchResultsReceived);
        });


        $scope.search = function () {

          $scope.errorMessage = null;

          if (!$scope.collectionId) {
            $scope.errorMessage = "Please select a collection";
            return;
          }

          $scope.clearCurrentSearch();
          lastSearchId = new Date().getTime();
          itemSearch(lastSearchId, 0, $scope.searchResultsReceived);
        };
      }

      ]);