(function() {
  'use strict';
  
  function columnarDirective(columnFactory,messageFactory) {
    function controller($scope) {
      $scope.loading = true;
      $scope.title  = $scope.column.get_title();
      $scope.delete = function(index) {
        columnFactory.delete(index);
      };
      $scope.configure = function(index) {
        columnFactory.configure(index);
      };
      $scope.contact = function(entry) {
        messageFactory.contactAboutEntry(entry);
      };
      $scope.removeEntry = function(index) {
        if($scope.column.content_type=="inbox"){
            var entry = $scope.column.entries[index];
            messageFactory.delete(entry);
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
    .directive('columnar', ["columnFactory","messageFactory", columnarDirective]);

})();
