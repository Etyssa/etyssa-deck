angular.module('etyssaBrowser')
  .directive('fullHeight', ["$window", function ($window) {
    'use strict';

    var link = function($scope, element) {
      var padding  = 10;
      var relayout = function() {
        element.height(angular.element($window).height() - element.offset().top - padding);
      };
      // relayout
      relayout();
      // bind relayout on window resize
      angular.element($window).bind("resize", relayout);
    };

    return {
      restrict: 'A',
      link : link
    };
  }]);

// EOF
