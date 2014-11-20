angular.module('etyssaBrowser')
  .controller('MainCtrl', function ($scope, Entries) {
    'use strict';
    $scope.entries = Entries.query({to_address:"issy", limit:50});
  });

// EOF
