angular.module('developer-toolkit')
  .controller('TokenGenerator', [ '$scope', 'AccessToken', function ($scope, AccessToken) {

    var labels = {
      generate: "Generate",
      loading: "Loading..."
    };

    $scope.generateButtonLabel = labels.generate;

    $scope.generateToken = function () {
      var onSuccess = function (data) {
        $scope.$emit('setAccessToken',
          { accessToken: data.access_token });
        $scope.generateButtonLabel = labels.generate;
      };

      var onError = function (error) {
        console.warn("An error occured: "+error);
        if (error.client_id)
          $scope.errorMessage = "Client Id: "+error.client_id[0].toString();
        else if (error.client_secret)
          $scope.errorMessage = "Client Secret: "+error.client_secret[0].toString();
        else
          $scope.errorMessage = "Error: "+error.message;
        $scope.generateButtonLabel = labels.generate;
      }
      $scope.generateButtonLabel = labels.loading;
      $scope.errorMessage = null;
      AccessToken.generate($scope.appVars.clientId, $scope.appVars.clientSecret, onSuccess, onError);
    };

  }]);



