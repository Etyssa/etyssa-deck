(function() {
  'use strict';

  function NewContactModalInstanceCtrl ($scope, $modalInstance , messageFactory, etyssaApi, columnFactory,  contactInstance ) {
    var vm = this;

    if (typeof(contactInstance) !== "undefined") {
      vm.contact = contactInstance;
    }

    vm.send = function () {
      var message = messageFactory.sendMessage(vm.contact);
      columnFactory.pushMessage(message);
      $modalInstance.close();
    };

    vm.cancel = $modalInstance.close;
  }

  angular.module('etyssaDeck')
    .controller('NewContactModalInstanceCtrl', ['$scope', '$modalInstance', 'messageFactory', 'etyssaApi', 'columnFactory', 'contactInstance' , NewContactModalInstanceCtrl]);

})();

// EOF
