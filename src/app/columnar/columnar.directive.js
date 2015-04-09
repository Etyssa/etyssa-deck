(function() {
  'use strict';
  
  function columnarDirective(columnFactory,contactFactory) {
    function controller($scope) {
      $scope.loading = true;
      $scope.title  = $scope.column.get_title();
      $scope.delete = columnFactory.delete;
      $scope.configure = columnFactory.configure;

      $scope.contact = function(entry) {
        // content_type and column passed to contact view
        entry.content_type = $scope.column.content_type;
        entry.column = $scope.column;
        contactFactory.open_modal(entry);
      };

      $scope.remove_entry = function(index) {
        if($scope.column.content_type=="inbox"){
          var entry = $scope.column.entries[index];
          contactFactory.delete(entry);
        }else if($scope.column.content_type=="entries"){
        }
        $scope.column.entries.splice(index, 1);
      };

      $scope.$watchCollection('column.params', function() {
      // detect when loading is finished
        $scope.column.update_entries().$promise.then(function(data) {
          $scope.column.entries = data;
          $scope.loading = false;
        });
      });
    }
    return {
      restrict    : 'E',
      templateUrl : 'app/columnar/column.html',
      controller  : ['$scope', controller],
      scope       : {
        column : "=columnarColumn"
      }
    };
  }

  angular.module('etyssaDeck')
    // Directive which create a column representation
    .directive('columnar', ["columnFactory","contactFactory", columnarDirective]);

})();
