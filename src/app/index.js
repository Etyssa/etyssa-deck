
angular.module('etyssaDeck',
  [ 'etyssaDeck.navbar',
    'etyssa',
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.router',
    'ui.bootstrap'
  ]
).run(["api", function(api) {
    api.init({email:"olivoelement", password:"coucou"});
}]
);

// EOF