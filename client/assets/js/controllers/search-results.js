angular.module('developer-toolkit')
  .controller('SearchResults',
    ['$scope', 'ItemFormatter',
      function ($scope, ItemFormatter) {

        //Mixin Item Formatter
        angular.extend($scope, ItemFormatter);

        $scope.renderGrade = function (grades) {
          if (!grades) {
            return "";
          }
          return grades.join(", ");
        }

        $scope.renderStandards = function (standards) {
          if (!standards) {
            return "";
          }
          return (_.map(standards, function (s) {
            return s.dotNotation;
          })).join(", ");
        }

        $scope.renderPrimarySubject = function(subject){
          if(!subject){
            return "";
          }

          var filtered = _.filter([subject.category, subject.subject], function(s){
            return s != null && s.length > 0;
          });

          return filtered.join(": ");
        }

        $scope.getCode = function(item){
          console.log("getCode: " + item);
          $scope.$emit('launchItem', item);
        }

      }]);