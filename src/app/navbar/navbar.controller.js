(function() {
  'use strict';
  
  function NavbarCtrl(columnFactory) {
    this.columns = columnFactory.columns;

  }

angular.module('etyssaDeck.navbar', [])
  .controller('NavbarCtrl', ['columnFactory', NavbarCtrl]);

})();

// EOF
