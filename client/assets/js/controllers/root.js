angular.module('developer-toolkit')
  .controller('Root', ['$scope', '$rootScope', function ($scope, $rootScope) {


    $rootScope.accessToken = null;

    $rootScope.$watch('accessToken', function (newValue) {
      console.log("new token: #{newValue}");
    });

  }]);
