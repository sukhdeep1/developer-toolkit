angular.module('developer-toolkit')
  .controller('Launcher',
    ['$scope',
      '$routeParams',
      '$location',
      'LauncherText',
      'EncryptOptions',
      'CorespringConfig',
      function ($scope, $routeParams, $location, LauncherText, EncryptOptions, CorespringConfig) {

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
          height: 500,
          theme: 'elegant',
          readOnly: 'nocursor',
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
        }

        $scope.overrides = {
          itemId: false,
          sessionId: false,
          mode: false
        }

        $scope.$watch('options', function () {
          $scope.reRender();
        }, true);

        $scope.$watch('overrides', function () {
          $scope.reRender();
        }, true);


        $scope.reRender = function(){

          var addWildcard = function(obj, key, value){
            if( $scope.overrides[key] ) {
              obj[key] = value;
            }
          };

          var serverOptions = {};
          addWildcard(serverOptions, "itemId", "*");
          addWildcard(serverOptions, "sessionId", "*");
          addWildcard(serverOptions, "mode", "*");


          var clientOptions = {};
          addWildcard(clientOptions, "itemId", $scope.options.itemId);
          addWildcard(clientOptions, "sessionId", $scope.options.sessionId);
          addWildcard(clientOptions, "mode", $scope.options.mode);

          var optionsToEncrypt = _.extend(_.clone($scope.options), serverOptions);
          var overrides = $scope.options;
          console.log("clientOptions: ", clientOptions);
          var onSuccess = function (data) {
            $scope.updateTemplate(data.clientId, data.options, JSON.stringify(clientOptions), data.request);
          };

          $scope.encryptOptions(optionsToEncrypt, onSuccess);
        };

        $scope.updateTemplate = function (clientId, encryptedOptions, overrides, raw) {
          var url = CorespringConfig.url;
          $scope.editorText = LauncherText.template(url, clientId, encryptedOptions, overrides, raw);
        };

        $scope.encryptOptions = function (opts, onSuccess) {
          var onError = function (data) {
            console.warn("error: ");
          }
          EncryptOptions.encrypt($scope.appVars.accessToken, opts, onSuccess, onError);
        };

        $scope.copyToClipboard = function () {
          window.prompt("Copy to clipboard: Ctrl+C (Cmd+C for mac), Enter", $scope.editorText);
        }


        $scope.show = function (controlName) {
          var m = _.find($scope.modes, function (m) {
            return m.mode == $scope.options.mode
          });
          return _.contains(m.show, controlName)
        }

        $scope.$watch('pickerExpires', function(newValue){
          if(newValue){
            var arr = newValue.split("/")
            if(arr.length == 3){
              var date = parseInt(arr[1]);
              var month = parseInt(arr[0]) - 1;
              var year = parseInt(arr[2]);
              var d = new Date(year, month, date);
              $scope.options.expires = d.getTime();
            }
          }
        });

      }]);