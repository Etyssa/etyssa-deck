angular.module('etyssaDeck')
  // Service which return a column object
  .factory('column', ["entries", function (entries) {
    'use strict';

    var nb_column = 0;

    return function(params) {
      // increment nb_column
      ++nb_column;
      // default params values
      if (params.limit === undefined) {
        params.limit = 50;
      }
      // return a column object
      return {
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
    var controller = function($scope) {
      $scope.loading = true;
      $scope.column  = column($scope.query);
      $scope.title   = $scope.column.get_title();
      // detect when loading is finished
      $scope.column.entries.$promise.then(function(){
        $scope.loading = false;
      });
    };
    return {
      restrict    : 'E',
      templateUrl : "app/columnar/column.html",
      controller  : controller,
      scope       : {
        query : "="
      }
    };
  }]
);

// EOF
