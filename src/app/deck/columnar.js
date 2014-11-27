angular.module('etyssaDeck')
  // Service which return a column object
  .factory('column', ["entries", function (entries) {
    'use strict';
    
    var nb_column = 0;

    return function(params) {
      // default params values
      if (params.limit === undefined) {
        params.limit = 50;
      }
      // increment nb_column
      ++nb_column;
      // return a column object
      return {
        // params    : params,
        entries   : entries.query(params),
        index     : nb_column,
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
      $scope.column  = _column;
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
