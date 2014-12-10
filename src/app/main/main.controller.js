(function() {

  function MainCtrl() {
    'use strict';
    var vm = this;
    vm.columns = [
      {content_type: "entries"},
      {content_type: "inbox"},
      {content_type: "entries", query: {to_address:"issy"}},
      {content_type: "entries", query: {to_address:"issy", cat:"sports", tag: "tennis"}},
      {content_type: "entries", query: {to_address:"issy", tag:"chien"}},
      {content_type: "entries", query: {to_address:"issy", tag:"chat"}}
    ];
  }

  angular.module('etyssaDeck')
    .controller('MainCtrl', [MainCtrl]);

})();

// EOF
