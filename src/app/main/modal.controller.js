(function() {
  'use strict';

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
    .controller('NewColumnModalInstanceCtrl', ['$scope', '$modalInstance', 'columnFactory', 'Categories', NewColumnModalInstanceCtrl]);

})();

// EOF
