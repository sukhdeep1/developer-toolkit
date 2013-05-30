angular.module('developer-toolkit')
  .directive('contentToggler', [
    '$timeout',
    function ($timeout) {

      'use strict';

      return {
        link: function ($scope, $element, $attrs) {
          var $button, $content;

          $scope.$watch($attrs.ngModel, function (newValue) {
            $scope.showContent = newValue;
          });

          $element.addClass('content-toggler');
          $content = $element.find("#content");
          $content.css('display', 'block');
          $content.css('visibility', 'hidden');
          $content.addClass('popover fade bottom');
          $button = $element.find("#button");

          $scope.showContent = false;

          $scope.$watch('showContent', function (show) {
            if (show) {
              $content.css('visibility', 'visible');
              $timeout(function () {
                $content.addClass('in');
              }, 300);
            } else {
              $content.removeClass('in');
              $timeout(function () {
                $content.css('visibility', 'hidden');
              }, 300);
            }
          });

          $button.click(function () {
            $scope.$apply(function () {
              $scope.showContent = !$scope.showContent;
            });
          });
        }
      };
    }
  ]);

