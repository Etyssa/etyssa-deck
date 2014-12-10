(function() {
  'use strict';

  function MainCtrl($scope, $modal, columnFactory) {
    var vm = this;

    $scope.columns = columnFactory.list;

    vm.openNewColumn = $modal.open.bind(null, {
      templateUrl: 'app/main/modal.html',
      controller: 'NewColumnModalInstanceCtrl as modal'
    });

  }

  function NewColumnModalInstanceCtrl ($scope, $modalInstance, columnFactory, Categories) {
    var vm = this;
    // vm.form = [];
    vm.categories = Categories.query();
    vm.ok = function (d) {
      columnFactory.create(vm.contentType, vm.params);
      $modalInstance.close();
    };
    vm.cancel = $modalInstance.close;
  }

  angular.module('etyssaDeck')
    .controller('MainCtrl', ['$scope', '$modal', 'columnFactory', MainCtrl])
    .controller('NewColumnModalInstanceCtrl', ['$scope', '$modalInstance', 'columnFactory', 'Categories', NewColumnModalInstanceCtrl]);

})();

// EOF
