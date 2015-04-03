(function () {
    'use strict';
    angular.module('truxApp', [
        'ngRoute',
        'angular-loading-bar',
        'auth',
        'search'
    ]).
    constant('urls', {
        BASE: '',
        BASE_API: '/api/v1'
    }).
    config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'modules/search/search.html',
                controller: 'SearchController'
            }).
            when('/signin', {
                templateUrl: 'modules/auth/signin.html',
                controller: 'AuthController'
            }).
            when('/signup', {
                templateUrl: 'modules/auth/signup.html',
                controller: 'AuthController'
            }).
            when('/account', {
                templateUrl: 'modules/account/account.html',
                controller: 'AuthController'  // FIXME: use the account controller
            }).
            otherwise({
                redirectTo: '/'
            });
        $httpProvider.interceptors.push(['$q', '$location', '$rootScope', function ($q, $location, $rootScope) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    var token = $rootScope.getToken();
                    if (token != null) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $rootScope.setToken(null);
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            }
        }]);
        $locationProvider.html5Mode(true);
    }]).
    run(['$rootScope', '$location', function($rootScope, $location) {
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

        $rootScope.setToken = function(token) {
            if(token) {
                localStorage.token = token;
                $rootScope.tokenClaims = getTokenClaims(token);
                $rootScope.token = token;
                if($rootScope.isTokenValid()) {
                    return;
                }
            }
            delete localStorage.token;
            delete $rootScope.tokenClaims;
            delete $rootScope.token;
        };

        $rootScope.getToken = function() {
            if($rootScope.isTokenValid()) {
                return localStorage.token;
            }
            $rootScope.setToken(null);
            return null;
        };

        $rootScope.isTokenValid = function() {
            if (localStorage.token != null && $rootScope.tokenClaims != null &&
                    new Date().getTime() <= $rootScope.tokenClaims.exp * 1000) {
                return true;
            }
            return false;
        };

        $rootScope.hasPermission = function(resource) {
            // TODO: implement
            return false;
        };

        $rootScope.$on( "$routeChangeStart", function(event, next) {
            if ($rootScope.getToken() == null) {
                if (next && next.templateUrl && next.templateUrl.indexOf('modules/account/') == 0) {
                    $location.path("/signin");
                }
            }
        });
        $rootScope.setToken(localStorage.token);
    }]);
})();
