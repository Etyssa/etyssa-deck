(function() {
  'use strict';
  
  function columnFactory(entries, message) {

    var nb_column = 0;
      // different kind of column
      var columns = {
        entries: function(params) {
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
        },
        inbox: function(params) {
          return {
            index     : nb_column,
            get_title : function(){return "Inbox";},
            entries   : message.query({mailbox:"inbox"})
          };
        }
      };

    return function(content_type, params) {
      // increment nb_column
      ++nb_column;
      // default params values
      params       = params || {};
      params.limit = params.limit || 50;
      // return a column object
      return columns[content_type](params);
    };
  }

  function columnarDirective (columnFactory) {
    function controller($scope) {
      $scope.loading = true;
      if (typeof($scope.columnarContentType) === "undefined") {throw "columnar directive need a columnar-content-type parameter";}
      $scope.column  = columnFactory($scope.columnarContentType, $scope.query);
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
