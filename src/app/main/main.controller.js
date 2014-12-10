(function() {
  'use strict';

  function MainCtrl($modal) {
    var vm = this;
    vm.columns = [
      {content_type: "entries"},
      {content_type: "inbox"},
      {content_type: "entries", query: {to_address:"issy"}},
      {content_type: "entries", query: {to_address:"issy", cat:"sports", tag: "tennis"}},
      {content_type: "entries", query: {to_address:"issy", tag:"chien"}},
      {content_type: "entries", query: {to_address:"issy", tag:"chat"}}
    ];

    vm.openNewColumn = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/main/modal.html',
        controller: "ModalInstanceCtrl as modal"
      });
    };
  }

  function ModalInstanceCtrl ($scope, $modalInstance) {
    var vm = this;
    vm.ok = function () {
    };
    vm.cancel = function () {
      $modalInstance.close();
    };
  }

  angular.module('etyssaDeck')
    .controller('MainCtrl', ['$modal',MainCtrl])
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', ModalInstanceCtrl]);

})();

// EOF
