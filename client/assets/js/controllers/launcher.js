angular.module('developer-toolkit')
  .controller('Launcher', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {

    $scope.mode = "preview";
    $scope.limitedModes = [
      {mode: "preview", show: ["itemId"]},
      {mode: "render", show: ["sessionId"]},
      {mode: "administer", show: ["sessionId", "itemId"]},
      {mode: "aggregate", show: ["assessmentId","itemId"] }
    ];

    $scope.codemirrorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      //readOnly: 'nocursor',
      mode: 'htmlmixed'
    };

    $scope.modes = $scope.limitedModes.concat( [{mode: "*", show: ["sessionId", "itemId", "assessmentId"]} ])


    $scope.backToSearch = function () {
      $location.search('itemId', null).path('/search');
    };


    if($routeParams.accessToken){
      $scope.$emit('setAccessToken', $routeParams.accessToken);
    }

    if (!$routeParams.itemId) {
      $scope.backToSearch();
      return;
    }

  }]);