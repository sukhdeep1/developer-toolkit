angular.module('developer-toolkit')
  .controller('Root', ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location) {

      /** @note Using object model so that bindings will fire across nested scopes */
      $rootScope.appVars = { accessToken: null }

      $rootScope.$on('setTokenAndClientId', function (event, obj) {
        $rootScope.appVars.accessToken = obj.accessToken;
        $rootScope.appVars.clientId = obj.clientId;
      });

      $rootScope.$on('launchItem', function (event, item) {
        $location
          .search('itemId', item.id)
          .search('clientId', $rootScope.appVars.clientId)
          .search('accessToken', $rootScope.appVars.accessToken)
          .path('/launcher');
      });

    }]);
