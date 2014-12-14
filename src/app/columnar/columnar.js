(function() {
  'use strict';
  
  function columnFactory(entries, message, $modal) {

    var columns = [];

    // different kind of column
    function create_column_object(content_type, params) {
      var column = {
        entries: function(params) {
          return {
            entries   : entries.query(params),
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
            get_title : function() {return "Inbox";},
            entries   : message.query({mailbox:"inbox"})
          };
        }
      }[content_type](params);
      column.content_type = content_type;
      column.params       = params;
      column.get_index    = function() {return columns.indexOf(this);};
      return column;
    }

    function open_modal(index) {
      $modal.open({
        templateUrl: 'app/main/modal.html',
        controller: 'NewColumnModalInstanceCtrl as modal',
        resolve: {
          columnInstance : function() {return columns[index];}
        }
      });
    }

    // exposed API
    return {
      create : function(column) {
        // default params values
        var params   = column.params || {};
        params.limit = column.params.limit || 50;
        // return a column object
        var column_instance = create_column_object(column.content_type, column.params);
        columns.push(column_instance);
        return column_instance;
      },
      list : columns,
      delete: function(index) {
        columns.splice(index, 1);
      },
      askForNewColumn: open_modal,
      configure: function(index) {
        open_modal(index);
      }
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
