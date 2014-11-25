
angular.module('etyssaBrowser',
  [ 'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.router',
    'etyssa'
  ]
)
.config(function ($stateProvider, $urlRouterProvider) {
  'use strict';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/deck/main.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('/');
});

// EOF