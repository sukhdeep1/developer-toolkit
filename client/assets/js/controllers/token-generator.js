angular.module('developer-toolkit')
  .controller('TokenGenerator', [ '$scope', '$rootScope', 'AccessToken', function ($scope, $rootScope, AccessToken) {

    $scope.generateToken = function () {
      var onSuccess = function (data) {
        $rootScope.accessToken = data.access_token;
      };
      var onError = function (error) {
        console.warn("An error occured: #{error})");
      }
      AccessToken.generate($scope.clientId, $scope.clientSecret, onSuccess, onError);
    };
  }]);



