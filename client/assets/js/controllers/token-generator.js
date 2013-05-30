angular.module('developer-toolkit.controllers')
  .controller('TokenGenerator', [ '$scope', 'AccessToken', function ($scope, AccessToken) {

    'use strict';

    $scope.labels = {
      formTitle: {
        unknown: "Enter a token or create one",
        notOk: "Something is wrong with this token",
        ok: "Everything is ok"
      },
      button: {
        generate: "Generate",
        loading: "Loading..."
      }
    };

    var tokenString = function (appVars, unknown, notOk, ok) {
      if (!appVars.accessToken) {
        return unknown;
      }
      if (appVars.apiCallFailed) {
        return notOk;
      }
      return ok;
    };

    $scope.$watch('appVars.accessToken', function (newValue) {
      console.log("[TokenGenerator] access token changed: " + newValue);
    });

    $scope.getIconClass = function (appVars) {
      return tokenString(appVars, "icon-token-unknown", "icon-token-not-ok", "icon-token-ok");
    };

    $scope.getTokenFormTitle = function (appVars) {
      return tokenString(appVars,
        $scope.labels.formTitle.unknown,
        $scope.labels.formTitle.notOk,
        $scope.labels.formTitle.ok);
    };


    $scope.showTokenForm = false;

    $scope.$watch('appVars.apiCallFailed', function (newValue) {
      if (newValue) {
        $scope.tokenFormTitle = $scope.labels.formTitle.notOk;
      }
    }, true);

    $scope.tokenFormTitle = $scope.labels.formTitle.unknown;

    $scope.generateButtonLabel = $scope.labels.button.generate;

    $scope.generateToken = function () {
      var onSuccess = function (data) {
        $scope.$emit('setAccessToken',
          { accessToken: data.access_token });
        $scope.generateButtonLabel = $scope.labels.button.generate;
      };

      var onError = function (error) {
        if (error.client_id) {
          $scope.errorMessage = "Client Id: " + error.client_id[0].toString();
        } else if (error.client_secret) {
          $scope.errorMessage = "Client Secret: " + error.client_secret[0].toString();
        } else {
          $scope.errorMessage = "Error: " + error.message;
          $scope.generateButtonLabel = $scope.labels.button.generate;
        }
      };
      $scope.generateButtonLabel = $scope.labels.button.loading;
      $scope.errorMessage = null;
      AccessToken.generate($scope.appVars.clientId, $scope.appVars.clientSecret, onSuccess, onError);
    };

  }]);



