
angular.module('etyssaDeck',
  [ 'ngEtyssa.services',
    'ngStorage',
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.router',
    'ui.bootstrap'
  ]
).config(['etyssaApiProvider', function(etyssaApiProvider) {
  etyssaApiProvider.API_HOST = 'http://api.scriptysse.fr';
  etyssaApiProvider.TOKEN = 'a5ec51cb-8590-4a50-b797-9fbbaf50854a';
  etyssaApiProvider.EMAIL = 'olivoelement';
  etyssaApiProvider.PASSWORD = 'coucou';
}]);


// EOF