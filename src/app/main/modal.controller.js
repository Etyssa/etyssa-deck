(function() {
  'use strict';

  function NewColumnModalInstanceCtrl ($scope, $modalInstance, columnFactory, etyssaApi, columnInstance) {
    var vm = this;
    if (typeof(columnInstance) !== "undefined") {
      vm.column = columnInstance;
    }
    else {
      vm.column = {};
      vm.column.params = {};
    }
    vm.categories = etyssaApi.categories.query();
    vm.ok = function (d) {
      if (vm.column.$$hashKey) {
      } else {
        columnFactory.create(vm.column);
      }
      $modalInstance.close();
    };
    vm.cancel = $modalInstance.close;
  }

  angular.module('etyssaDeck')
    .controller('NewColumnModalInstanceCtrl', ['$scope', '$modalInstance', 'columnFactory', 'etyssaApi', 'columnInstance', NewColumnModalInstanceCtrl]);

})();

// EOF
