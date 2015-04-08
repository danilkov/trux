(function () {
    'use strict';

    angular.module('auth', []).
    service('TokenService', ['$rootScope', function($rootScope) {
            function urlBase64Decode(str) {
                var output = str.replace('-', '+').replace('_', '/');

                switch (output.length % 4) {
                    case 0:
                        break;
                    case 2:
                        output += '==';
                        break;
                    case 3:
                        output += '=';
                        break;
                    default:
                        throw 'Illegal base64url string!';
                }
                return window.atob(output);
            }

            function getTokenClaims(token) {
                var claims = {};

                if(token != null) {
                    var encoded = token.split('.')[1];
                    try {
                        claims = JSON.parse(urlBase64Decode(encoded));
                    }
                    catch(e) {
                    }
                }
                return claims;
            }

            this.setToken = function(token) {
                if(token) {
                    localStorage.token = token;
                    $rootScope.tokenClaims = getTokenClaims(token);
                    $rootScope.token = token;
                    if(this.isTokenValid()) {
                        return;
                    }
                }
                delete localStorage.token;
                delete $rootScope.tokenClaims;
                delete $rootScope.token;
            };

            this.getToken = function() {
                if(this.isTokenValid()) {
                    return localStorage.token;
                }
                this.setToken(null);
                return null;
            };

            this.isTokenValid = function() {
                if (localStorage.token != null && $rootScope.tokenClaims != null &&
                        new Date().getTime() <= $rootScope.tokenClaims.exp * 1000) {
                    return true;
                }
                return false;
            };

            this.hasPermission = function(resource) {
                // TODO: implement
                return false;
            };
    }]).
    service('AuthService', ['$http', 'urls', function ($http, urls) {
        this.signup = function (data, success, error) {
            $http.post(urls.BASE_API + '/signup', data).success(success).error(error);
        };
        this.signin = function (data, success, error) {
            $http.post(urls.BASE_API + '/signin', data).success(success).error(error);
        };
        this.refresh = function(success, error) {
            $http.get(urls.BASE_API + '/token-refresh', {ignoreLoadingBar: true}).success(success).error(error);
        };
        this.logout = function (success) {
            success();
        };
    }]);
})();
