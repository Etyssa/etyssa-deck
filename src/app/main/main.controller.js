(function() {
  'use strict';

  function MainCtrl($scope, $modal, columnFactory) {
    var vm = this;

    $scope.columns = columnFactory.list;
    columnFactory.create("entries", {});
    vm.openNewColumn = $modal.open.bind(null, {
      templateUrl: 'app/main/modal.html',
      controller: 'NewColumnModalInstanceCtrl as modal'
    });

  }

  angular.module('etyssaDeck')
    .controller('MainCtrl', ['$scope', '$modal', 'columnFactory', MainCtrl]);

})();

// EOF
