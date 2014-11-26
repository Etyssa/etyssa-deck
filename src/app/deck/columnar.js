angular.module('etyssaBrowser')
  // Service which return a column object
  .factory('column', ["entries", function (entries) {
    'use strict';
    return function(params) {
      // default params values
      if (params.limit === undefined) {
        params.limit = 50;
      }
      // return a column object
      return {
        // params    : params,
        entries   : entries.query(params),
        get_title : function() {
          var title = "";
          if (params.to_address) { if (title !== "") { title += " | "; } title += params.to_address; }
          if (params.cat)        { if (title !== "") { title += " | "; } title += params.cat; }
          if (params.tag)        { if (title !== "") { title += " | "; } title += params.tag; }
          if (title === "")      { title = "Home"; }
          return title;
        }
      };
    };
  }])
  // Directive which create a column representation
  .directive('columnar', ["$window", "column", function ($window, column) {
    'use strict';
    var link = function($scope, element) {
      var _column    = column($scope.query);
      $scope.entries = _column.entries;
      $scope.title   = _column.get_title();
    };
    return {
      restrict    : 'E',
      templateUrl : "app/deck/column.html",
      link        : link,
      scope       : {
        query : "="
      }
    };
  }]
);

// EOF
