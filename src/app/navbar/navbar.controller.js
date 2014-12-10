(function() {
  'use strict';
  
  function NavbarCtrl(columnFactory) {
    this.columns = columnFactory.list;
  }

angular.module('etyssaDeck.navbar', [])
  .controller('NavbarCtrl', ['columnFactory', NavbarCtrl]);

})();

// EOF
