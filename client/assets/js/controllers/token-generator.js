angular.module('developer-toolkit')
  .controller('TokenGenerator', [ '$scope', 'AccessToken', function ($scope, AccessToken) {

    var labels = {
      generate: "Generate",
      loading: "Loading..."
    };

    $scope.generateButtonLabel = labels.generate;

    $scope.generateToken = function () {
      var onSuccess = function (data) {
        $scope.$emit('setTokenAndClientId',
          {
            accessToken: data.access_token,
            clientId: $scope.appVars.clientId
          });
        $scope.generateButtonLabel = labels.generate;
      };
      var onError = function (error) {
        console.warn("An error occured: #{error})");
      }
      $scope.generateButtonLabel = labels.loading;
      AccessToken.generate($scope.appVars.clientId, $scope.appVars.clientSecret, onSuccess, onError);
    };

  }]);



