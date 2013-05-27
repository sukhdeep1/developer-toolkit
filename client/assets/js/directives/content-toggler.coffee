angular.module('developer-toolkit')
  .directive('contentToggler', [ '$timeout', ($timeout) ->

    definition =
      link : ($scope, $element, $attrs) ->
        console.log "content toggler"

        $scope.$watch $attrs['ngModel'], (newValue) ->
          $scope.showContent = newValue

        $element.addClass('content-toggler')

        $content = $element.find("#content")
        $content.css('display', 'block')

        $content.addClass('popover fade bottom')

        $button = $element.find("#button")

        $scope.showContent = false

        $scope.$watch 'showContent', (show) ->
          if show
            $content.css('visibility', 'visible')
            $timeout( ->
              $content.addClass('in')
            , 300 )
          else
            $content.removeClass('in')
            $timeout( ->
              $content.css('visibility', 'hidden')
            , 300)


        $button.click ->
          $scope.$apply ->
            $scope.showContent = !$scope.showContent

    definition
  ])