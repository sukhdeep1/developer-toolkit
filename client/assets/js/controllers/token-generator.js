angular.module('developer-toolkit')
  .controller('TokenGenerator', [ '$scope', '$rootScope', 'AccessToken', function ($scope, $rootScope, AccessToken) {

    var labels = {
      generate: "Generate",
      loading: "Loading..."
    };

    $scope.generateButtonLabel = labels.generate;

    $scope.generateToken = function () {
      var onSuccess = function (data) {
        $rootScope.accessToken = data.access_token;
        $scope.generateButtonLabel = labels.generate;
      };
      var onError = function (error) {
        console.warn("An error occured: #{error})");
      }
      $scope.generateButtonLabel = labels.loading;
      AccessToken.generate($scope.clientId, $scope.clientSecret, onSuccess, onError);
    };

    $scope.$watch('accessToken', function (newValue) {
      if (newValue) {
        $rootScope.accessToken = newValue;
      }
    });


  }]);



