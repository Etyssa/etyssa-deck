(function() {
  'use strict';

  function ContactCtrl($scope, contactFactory) {
    var vm = this;
    vm.send = function () {
      var message = contactFactory.send_message(vm);
    };
  }
  angular.module('etyssaDeck')
    .controller('ContactCtrl', ['$scope', 'contactFactory' , ContactCtrl]);

})();


(function() {
  'use strict';

  function NewContactModalInstanceCtrl ($scope, $modalInstance , contactFactory, etyssaApi, columnFactory,  contactInstance ) {
    var vm = this;

    if (typeof(contactInstance) !== "undefined") {
      vm = _.merge(vm, contactInstance);
    }

    vm.next = function () {
      //nextEntry = vm.column.list
    }

    vm.send = function () {
      var message = contactFactory.send(vm);
      //columnFactory.pushMessage(message);
      $modalInstance.close();
    };

    vm.cancel = $modalInstance.close;
  }

  angular.module('etyssaDeck')
    .controller('NewContactModalInstanceCtrl', ['$scope', '$modalInstance', 'contactFactory', 'etyssaApi', 'columnFactory', 'contactInstance' , NewContactModalInstanceCtrl]);

})();



// EOF
