
angular.module('etyssaDeck',
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
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('/');
});

// EOF