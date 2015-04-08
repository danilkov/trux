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
    config(['$routeProvider', '$httpProvider', '$locationProvider', 'TokenService', function ($routeProvider, $httpProvider, $locationProvider, tokenService) {
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
            when('/details/:id', {
                templateUrl: 'modules/account/account.html',
                controller: 'AuthController'  // FIXME: use the item controller and html
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
    }]);
})();
