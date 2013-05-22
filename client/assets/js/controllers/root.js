angular.module('developer-toolkit')
  .controller('Root', ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location) {

      /** @note Using object model so that bindings will fire across nested scopes */
      $rootScope.appVars = { accessToken: null }

      $rootScope.$on('setAccessToken', function (event, token) {
        console.log("set access token: " + token);
        $rootScope.appVars.accessToken = token;
      });

      $rootScope.$on('launchItem', function (event, item) {
        $location.search('itemId', item.id).path('/launcher');
      });

    }]);
