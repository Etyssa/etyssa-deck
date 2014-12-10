(function() {
  (function() {
    var config_data, config_module;
    config_data = {
      GENERAL_CONFIG: {
        ETYSSA_API_TOKEN: "a5ec51cb-8590-4a50-b797-9fbbaf50854a",
        API_HOST: "http://api.scriptysse.fr"
      }
    };
    config_module = angular.module('etyssa.config', []);
    return angular.forEach(config_data, function(key, value) {
      return config_module.constant(value, key);
    });
  })();

}).call(this);



(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name etyssa
    * @description
   */
  angular.module('etyssa', ["etyssa.config"]).factory('Services', [
    "$resource", "GENERAL_CONFIG", function($resource, GENERAL_CONFIG) {
      return $resource("" + GENERAL_CONFIG.API_HOST + "/rest/services/:service_name/?token=:token", {
        token: GENERAL_CONFIG.ETYSSA_API_TOKEN
      }, {
        query: {
          method: "GET",
          isArray: true,
          transformResponse: function(data, headersGetter) {
            return angular.fromJson(data).services;
          }
        }
      });
    }
  ]).factory('Categories', [
    "$resource", "GENERAL_CONFIG", function($resource, GENERAL_CONFIG) {
      return $resource("" + GENERAL_CONFIG.API_HOST + "/rest/categories?token=:token", {
        token: GENERAL_CONFIG.ETYSSA_API_TOKEN
      }, {});
    }
  ]).factory('Search', [
    "$resource", "GENERAL_CONFIG", function($resource, GENERAL_CONFIG) {
      return $resource("" + GENERAL_CONFIG.API_HOST + "/rest/search?cat=:cat&token=:token", {
        token: GENERAL_CONFIG.ETYSSA_API_TOKEN
      }, {});
    }
  ]).factory('Entries', [
    "$resource", "GENERAL_CONFIG", function($resource, GENERAL_CONFIG) {
      return $resource("" + GENERAL_CONFIG.API_HOST + "/rest/entries/:entry_id?token=:token", {
        token: GENERAL_CONFIG.ETYSSA_API_TOKEN
      }, {});
    }
  ]).factory('Users', [
    "$resource", "GENERAL_CONFIG", function($resource, GENERAL_CONFIG) {
      return $resource("" + GENERAL_CONFIG.API_HOST + "/rest/users/:user_id?token=:token", {
        token: GENERAL_CONFIG.ETYSSA_API_TOKEN
      }, {});
    }
  ]).factory('Profile', [
    "$resource", "GENERAL_CONFIG", function($resource, GENERAL_CONFIG) {
      return $resource("" + GENERAL_CONFIG.API_HOST + "/rest/me/?token=:token", {
        token: GENERAL_CONFIG.ETYSSA_API_TOKEN
      }, {});
    }
  ]).factory('Message', [
    "$resource", "GENERAL_CONFIG", function($resource, GENERAL_CONFIG) {
      return $resource("" + GENERAL_CONFIG.API_HOST + "/rest/messages/?token=:token", {
        token: GENERAL_CONFIG.ETYSSA_API_TOKEN
      }, {});
    }
  ]);

  angular.module('etyssa').factory('api', [
    "$http", "$cookies", function($http, $cookies) {
      return {
        init: function(credential) {
          $http.defaults.headers.common.email = credential.email;
          $http.defaults.headers.common.password = CryptoJS.SHA1(credential.password);
        }
      };
    }
  ]);

  angular.module('etyssa').factory('httpInterceptor', [
    "$q", "$window", "$location", function($q, $window, $location) {
      return function(promise) {
        var error, success;
        success = function(response) {
          return response;
        };
        error = function(response) {
          console.warn("httpInterceptor", response.status, response.status);
          return $q.reject(response);
        };
        return promise.then(success);
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=etyssa.js.map
