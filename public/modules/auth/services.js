(function () {
    'use strict';

    angular.module('auth', []).
    service('AuthService', ['$http', 'urls', function ($http, urls) {
        this.signup = function (data, success, error) {
            $http.post(urls.BASE_API + '/signup', data).success(success).error(error);
        };
        this.signin = function (data, success, error) {
            $http.post(urls.BASE_API + '/signin', data).success(success).error(error);
        };
        this.refresh = function(success, error) {
            $http.get(urls.BASE_API + '/token-refresh').success(success).error(error);
        };
        this.logout = function (success) {
            success();
        };
    }]);
})();
