angular.module('etyssaDeck')

  // Set the height of Deck Columns
  .directive('fullHeight', ["$window", "$timeout", function ($window, $timeout) {
    'use strict';
    var link = function($scope, element) {
      var padding  = 5;
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
