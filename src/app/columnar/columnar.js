(function() {
  'use strict';
  
  function columnFactory(entries, message, $modal) {

    var columns = [];

    // different kind of column
    function create_column_object(content_type, params) {
      return {
        entries: function(params) {
          return {
            entries   : entries.query(params),
            get_index : function() {return columns.indexOf(this);},
            get_title : function() {
              var title = "";
              // ugly ----> filter
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
            get_index : function() {return columns.indexOf(this);},
            get_title : function() {return "Inbox";},
            entries   : message.query({mailbox:"inbox"})
          };
        }
      }[content_type](params);
    }

    // exposed API
    return {
      create : function(content_type, params) {
        // default params values
        params       = params || {};
        params.limit = params.limit || 50;
        // return a column object
        var column = create_column_object(content_type, params);
        columns.push(column);
        return column;
      },
      list : columns,
      delete: function(index) {
        columns.splice(index, 1);
      },
      askForNewColumn: $modal.open.bind(null, {
        templateUrl: 'app/main/modal.html',
        controller: 'NewColumnModalInstanceCtrl as modal'
      })
    };
  }

  function columnarDirective (columnFactory) {
    function controller($scope) {
      $scope.loading = true;
      $scope.title  = $scope.column.get_title();
      $scope.delete = function(index) {
        columnFactory.delete(index);
      };
      $scope.configure = function(index) {
        columnFactory.configure(index);
      };
      // detect when loading is finished
      $scope.column.entries.$promise.then(function(){
        $scope.loading = false;
      });
    }
    return {
      restrict    : 'E',
      templateUrl : "app/columnar/column.html",
      controller  : ["$scope", controller],
      scope       : {
        column : "=columnarColumn"
      }
    };
  }

angular.module('etyssaDeck')
  // Service which return a column object
  .factory('columnFactory', ["Entries", "Message", "$modal", columnFactory])
  // Directive which create a column representation
  .directive('columnar', ["columnFactory", columnarDirective]);

})();


// EOF
