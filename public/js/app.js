(function () {
    'use strict';
    angular.module('truxApp', [
        'ngRoute', 'ngResource',
        'angular-loading-bar',
        'auth',
        'search',
        'vehicles'
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
            when('/vehicle/:id', {
                templateUrl: 'modules/vehicles/details.html',
                controller: 'VehiclesController'
            }).
            when('/account', {
                templateUrl: 'modules/account/account.html',
                controller: 'AuthController'  // FIXME: use the account controller
            }).
            otherwise({
                redirectTo: '/'
            });
        $httpProvider.interceptors.push(['$q', '$location', '$rootScope', 'TokenService', function ($q, $location, $rootScope, tokenService) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    var token = tokenService.getToken();
                    if (token != null) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        tokenService.setToken(null);
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            }
        }]);
        $locationProvider.html5Mode(true);
    }]).
    run(['$rootScope', '$location', 'TokenService', function($rootScope, $location, tokenService) {
        $rootScope.$on( "$routeChangeStart", function(event, next) {
            if (tokenService.getToken() == null) {
                if (next && next.templateUrl && next.templateUrl.indexOf('modules/account/') == 0) {
                    $location.path("/signin");
                }
            }
        });
        tokenService.setToken(localStorage.token);
        if(!tokenService.isTokenValid()) {
            // TODO: if the 'remember me' was enabled, re-signin using the expired token, else remove it from the local storage
        }
    }]);
})();
