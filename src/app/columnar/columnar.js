(function() {
  'use strict';
  
  function columnFactory(entries, message) {

    var columns = [];

      // different kind of column
      var columns_type = {
        entries: function(params) {
          return {
            entries   : entries.query(params),
            index     : columns.length,
            get_title : function() {
              var title = "";
              if (params.to_address) { if (title !== "") { title += " | "; } title += params.to_address; }
              if (params.cat)        { if (title !== "") { title += " | "; } title += params.cat; }
              if (params.tag)        { if (title !== "") { title += " | "; } title += params.tag; }
              if (title === "")      { title = "Home"; }
              return title;
            }
          };
        },
        inbox: function(params) {
          return {
            index     : columns.length,
            get_title : function(){return "Inbox";},
            entries   : message.query({mailbox:"inbox"})
          };
        }
      };
    // exposed API
    return {
      create : function(content_type, params) {
        // default params values
        params       = params || {};
        params.limit = params.limit || 50;
        // return a column object
        var column = columns_type[content_type](params);
        columns.push(column);
        return column;
      },
      columns : columns
    };
  }

  function columnarDirective (columnFactory) {
    function controller($scope) {
      $scope.loading = true;
      if (typeof($scope.columnarContentType) === "undefined") {throw "columnar directive need a columnar-content-type parameter";}
      $scope.column  = columnFactory.create($scope.columnarContentType, $scope.query);
      $scope.title   = $scope.column.get_title();
      // detect when loading is finished
      $scope.column.entries.$promise.then(function(){
        $scope.loading = false;
      });
    }
    return {
      restrict    : 'E',
      templateUrl : "app/columnar/column.html",
      controller  : controller,
      scope       : {
        query : "=",
        columnarContentType : "="
      }
    };
  }

angular.module('etyssaDeck')
  // Service which return a column object
  .factory('columnFactory', ["Entries", "Message", columnFactory])
  // Directive which create a column representation
  .directive('columnar', ["columnFactory", columnarDirective]);

})();


// EOF
