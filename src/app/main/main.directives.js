angular.module('etyssaDeck')

  // Set the height of Deck Columns

  .directive('scrollIf', function scrollIf() {
    function link($scope, element) {
      $scope.$watch('scrollIf', function() {
        if ($scope.scrollIf) {
          window.scrollTo(element[0].offsetLeft - 220, 0);
        }
      });
    }
    return {
      restrict: 'A',
      scope: {
        scrollIf: '='
      },
      link: link
    };
  })

  .directive('fullHeight', ["$window", "$timeout", "columnFactory", function ($window, $timeout, columnFactory) {
    'use strict';
    var link = function($scope, element) {
      var padding  = 0;
      var relayout = function() {
        $timeout(function() {
          element.height(angular.element($window).height() - element.offset().top - padding);
        });
      };
      // relayout
      relayout();
      // bind relayout on window resize
      angular.element($window).bind("resize", relayout);
    };
    return {
      restrict : 'A',
      link     : link
    };
  }]);

// EOF
