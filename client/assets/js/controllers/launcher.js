angular.module('developer-toolkit.controllers')
  .controller('Launcher',
    ['$scope',
      '$routeParams',
      '$location',
      '$timeout',
      'LauncherTemplate',
      'EncryptOptions',
      'CorespringConfig',
      'ItemSession',
      function ($scope, $routeParams, $location, $timeout, LauncherTemplate, EncryptOptions, CorespringConfig, ItemSession) {

        'use strict';

        $scope.getConfigLinkLabel = function (show) {
          return (show ? "Hide" : "Show") + " configuration options";
        };

        $timeout(function () {
          $scope.launcherReady = true;
        }, 1000);

        $scope.showConfigOptions = false;

        $scope.mode = "preview";
        $scope.modes = [
          {mode: "preview", show: ["itemId", "expires"]},
          {mode: "render", show: ["sessionId", "expires"]},
          {mode: "administer", show: ["sessionId", "itemId", "expires"]},
          {mode: "aggregate", show: ["assessmentId", "itemId", "expires"] }
        ];

        $scope.editorText = "Please hold...";

        $scope.codemirrorOptions = {
          lineWrapping: true,
          lineNumbers: true,
          theme: 'elegant',
          readOnly: true,
          mode: 'htmlmixed'
        };

        $scope.backToSearch = function () {
          $location
            .search('itemId', null)
            .path('/search');
        };


        if ($routeParams.accessToken) {
          $scope.$emit('setAccessToken', $routeParams);
        }

        if (!$routeParams.itemId) {
          $scope.backToSearch();
          return;
        }

        $scope.options = {
          itemId: $routeParams.itemId,
          mode: "preview",
          expires: 0
        };

        $scope.overrides = {
          itemId: false,
          sessionId: false,
          mode: false
        };

        $scope.$watch('appVars.accessToken', function (a, b) {
          if (a !== b) {
            $scope.reRender();
          }
        });

        $scope.$watch('options', function () {
          $scope.reRender();
        }, true);
        $scope.$watch('requestedOptions',function(){
          var clientOptions = getClientOptions();
          if($scope.encryptionResult){
            $scope.updateTemplate($scope.encryptionResult.clientId, 
                                  $scope.encryptionResult.options, 
                                  JSON.stringify(clientOptions), 
                                  $scope.encryptionResult.request);
          }
        });
        $scope.$watch('overrides', function (a, b) {
          var k, equal = true;
          for (k in a) {
            if (a[k] !== b[k]) {
              equal = false;
            }
          }
          if (!equal) {
            $scope.reRender();
          }
        }, true);
        function getClientOptions(){
          var clientOptions = {};
          clientOptions.mode = $scope.options.mode;
          addId(clientOptions, 'itemId');
          addId(clientOptions, 'sessionId');
          addId(clientOptions, 'assessmentId');
          try{
            clientOptions = _.extend(clientOptions,JSON.parse($scope.requestedOptions))
          } catch (e){}
          return clientOptions;
        }
        function addId(obj, key) {
          if ($scope.show(key)) {
            obj[key] = $scope.options[key];
          }
        };        
        $scope.reRender = function () {

          var addWildcard = function (obj, key, value) {
            if ($scope.overrides[key]) {
              obj[key] = value;
            }
          };

          var serverOptions = {};
          addWildcard(serverOptions, "itemId", "*");
          addWildcard(serverOptions, "sessionId", "*");
          addWildcard(serverOptions, "mode", "*");


          var optionsToEncrypt, clientOptions = {};
          clientOptions = getClientOptions();

          optionsToEncrypt = _.extend(_.clone($scope.options), serverOptions);

          $scope.clientSideOptions = clientOptions;

          var onSuccess = function (data) {
            $scope.encryptionResult = data;
            $scope.updateTemplate(data.clientId, data.options, JSON.stringify(clientOptions), data.request);
          };

          $scope.encryptOptions(optionsToEncrypt, onSuccess);
        };

        $scope.prettify = function (s) {
          try {
            var obj = JSON.parse(s);
            return JSON.stringify(obj, undefined, 2);
          } catch (e) {
            return s;
          }
        };

        $scope.updateTemplate = function (clientId, encryptedOptions, overrides, raw) {
          var url = CorespringConfig.url;
          var prettyJson = $scope.prettify(raw);
          $scope.editorText = LauncherTemplate.template(url, clientId, encryptedOptions, overrides, prettyJson);
        };

        $scope.errorMessage = "Your access token has expired. Please generate a new one at the top of the page.";

        $scope.encryptOptions = function (opts, onSuccess) {
          var onError = function (data) {
            console.warn("error: ");
            $scope.editorText = $scope.errorMessage;
            $scope.$emit('apiCallFailed', 'encrypt-options');
          };

          var s = function (data) {
            onSuccess(data);
            $scope.$emit('apiCallSucceeded', 'encrypt-options');
          };

          EncryptOptions.encrypt($scope.appVars.accessToken, opts, s, onError);
        };

        $scope.copyToClipboard = function () {
          window.prompt("Copy to clipboard: Ctrl+C (Cmd+C for mac), Enter", $scope.editorText);
        };


        $scope.show = function (controlName) {
          var m = _.find($scope.modes, function (m) {
            return m.mode === $scope.options.mode;
          });
          return _.contains(m.show, controlName);
        };

        $scope.$watch('pickerExpires', function (newValue) {
          if (newValue) {
            var arr = newValue.split("/");
            if (arr.length === 3) {
              var date = parseInt(arr[1], 10);
              var month = parseInt(arr[0], 10) - 1;
              var year = parseInt(arr[2], 10);
              var d = new Date(year, month, date);
              $scope.options.expires = d.getTime();
            }
          }
        });

        $scope.previewInNewWindow = function () {
          var out = ["clientId=" + $scope.encryptionResult.clientId,
            "encrypted=" + $scope.encryptionResult.options,
            "overrides=" + JSON.stringify($scope.clientSideOptions)];
          window.open('/run-launcher?' + out.join("&"), '_blank');
        };


        $scope.createItemSession = function(){
          console.log($scope.options.itemId);
          ItemSession.create({itemId:  $scope.options.itemId, accessToken: $scope.appVars.accessToken }, function onCreated(session){
            $scope.options.sessionId = session.id;
          });
        };

      }]);