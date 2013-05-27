angular.module('developer-toolkit')
  .controller('TokenGenerator', [ '$scope', 'AccessToken', function ($scope, AccessToken) {

    var labels = {
      generate: "Generate",
      loading: "Loading..."
    };

    var tokenString = function (appVars, unknown, notOk, ok) {
      if (!appVars.accessToken) {
        return unknown;
      }
      if (appVars.apiCallFailed) {
        return notOk;
      }
      return ok;
    }

    $scope.$watch('appVars.accessToken', function(newValue){
     console.log("[TokenGenerator] access token changed: " + newValue);
    });

    $scope.getIconClass = function(appVars){
      return tokenString(appVars, "icon-token-unknown", "icon-token-not-ok", "icon-token-ok")
    }

    $scope.getTokenFormTitle = function(appVars){
     return tokenString(appVars,
       "Enter a token or create one",
       "Something is wrong with this token",
       "Everything is ok" )
    }


    $scope.showTokenForm = false;

    $scope.$watch('appVars.apiCallFailed', function (newValue) {
      console.log("TokenGenerator: api call failed: " + newValue);
      if (newValue) {
        $scope.tokenFormTitle = "There is something wrong!";
      }
      else {

      }
    }, true);

    $scope.tokenFormTitle = "Enter an access token or create one";

    $scope.generateButtonLabel = labels.generate;

    $scope.generateToken = function () {
      var onSuccess = function (data) {
        $scope.$emit('setAccessToken',
          { accessToken: data.access_token });
        $scope.generateButtonLabel = labels.generate;
      };

      var onError = function (error) {
        console.warn("An error occured: " + error);
        if (error.client_id)
          $scope.errorMessage = "Client Id: " + error.client_id[0].toString();
        else if (error.client_secret)
          $scope.errorMessage = "Client Secret: " + error.client_secret[0].toString();
        else
          $scope.errorMessage = "Error: " + error.message;
        $scope.generateButtonLabel = labels.generate;
      }
      $scope.generateButtonLabel = labels.loading;
      $scope.errorMessage = null;
      AccessToken.generate($scope.appVars.clientId, $scope.appVars.clientSecret, onSuccess, onError);
    };

  }]);



