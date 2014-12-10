
angular.module('etyssaDeck',
  [ 'etyssaDeck.navbar',
    'etyssa',
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.router'
  ]
)
.config(function ($stateProvider, $urlRouterProvider) {
  'use strict';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl as main'
    });

  $urlRouterProvider.otherwise('/');
});

// EOF