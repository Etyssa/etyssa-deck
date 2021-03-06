(function() {
  'use strict';

  function MainCtrl($scope, columnFactory) {
    var vm = this;
    vm.columns = columnFactory.list;
    vm.askForNewColumn = columnFactory.askForNewColumn;

    // open a new modal to create a new column
    if (columnFactory.list <= 0) {
      vm.askForNewColumn();
    }

    vm.delete = columnFactory.delete;
    vm.configure = columnFactory.configure;

  }

  angular.module('etyssaDeck')
    .controller('MainCtrl', ['$scope', 'columnFactory' , MainCtrl]);

})();

// EOF
