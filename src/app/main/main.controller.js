(function() {
  'use strict';

  function MainCtrl($scope, $modal, columnFactory) {
    var vm = this;
    $scope.columns = columnFactory.list;
    vm.openNewColumn = $modal.open.bind(null, {
      templateUrl: 'app/main/modal.html',
      controller: 'NewColumnModalInstanceCtrl as modal'
    });
    // open a new modal to create a new column
    vm.openNewColumn();
  }

  angular.module('etyssaDeck')
    .controller('MainCtrl', ['$scope', '$modal', 'columnFactory', MainCtrl]);

})();

// EOF
