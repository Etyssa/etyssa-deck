angular.module('etyssaDeck')
  .controller('MainCtrl',
    ["$scope",
    function ($scope) {
      'use strict';
      $scope.columns = [];
      $scope.columns.push({});
      $scope.columns.push({to_address:"issy"});
      $scope.columns.push({to_address:"issy", cat:"sports", tag: "tennis"});
      $scope.columns.push({to_address:"issy", tag:"chien"});
      $scope.columns.push({to_address:"issy", tag:"chat"});
    }]
  );

// EOF
