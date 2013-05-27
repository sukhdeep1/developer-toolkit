angular.module('developer-toolkit')
  .controller('Root', ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location) {

      /** @note Using object model so that bindings will fire across nested scopes */
      $rootScope.appVars = { accessToken: null }

      $rootScope.$on('setAccessToken', function (event, obj) {
        $rootScope.appVars.accessToken = obj.accessToken;
      });

      $rootScope.$on('launchItem', function (event, item) {
        $location
          .search('itemId', item.id)
          .search('accessToken', $rootScope.appVars.accessToken)
          .path('/launcher');
      });

      $rootScope.$on('apiCallFailed', function (event, item) {
        console.warn("api call failed: " + item);
        $rootScope.appVars.apiCallFailed = true;
      });

      $rootScope.$on('apiCallSucceeded', function (event, item) {
        console.warn("api call succeeded: " + item);
        $location.search('accessToken', $rootScope.appVars.accessToken);
        $rootScope.appVars.apiCallFailed = false;
      });

    }]);
