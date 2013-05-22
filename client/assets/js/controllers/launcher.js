angular.module('developer-toolkit')
  .controller('Launcher',
    ['$scope',
      '$routeParams',
      '$location', 'LauncherText',
      function ($scope, $routeParams, $location, LauncherText) {

    $scope.mode = "preview";
    $scope.limitedModes = [
      {mode: "preview", show: ["itemId"]},
      {mode: "render", show: ["sessionId"]},
      {mode: "administer", show: ["sessionId", "itemId"]},
      {mode: "aggregate", show: ["assessmentId","itemId"] }
    ];

    $scope.editorText = LauncherText.template("url", "id", "options");

    $scope.codemirrorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      height: 500,
      theme: 'elegant',
      readOnly: 'nocursor',
      mode: 'htmlmixed'
    };

    $scope.modes = $scope.limitedModes.concat( [{mode: "*", show: ["sessionId", "itemId", "assessmentId"]} ])


    $scope.backToSearch = function () {
      $location
        .search('itemId', null)
        .search('clientId', null)
        .search('clientSecret', null)
        .path('/search');
    };


    if($routeParams.accessToken && $routeParams.clientId){
      $scope.$emit('setTokenAndClientId', $routeParams);
    }

    if (!$routeParams.itemId || !$routeParams.clientId) {
      $scope.backToSearch();
      return;
    }

  }]);