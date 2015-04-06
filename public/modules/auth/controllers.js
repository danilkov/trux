(function () {
    'use strict';

    angular.module('auth').
    controller('AuthController', ['$rootScope', '$scope', '$location', '$interval', 'AuthService',
            function ($rootScope, $scope, $location, $interval, authService) {
        function setToken(token) {
            if($rootScope.setToken) {
                $rootScope.setToken(token);
            }
        }
        function successAuth(res) {
            setToken(res.token);
            $location.path("/");
            //window.location = "/";
        }

        function successLogout() {
            setToken(null);
            //$location.path("/");
            window.location = "/";
        }

        function refreshToken() {
            if($rootScope.getToken) {
                var token = $rootScope.getToken();
                if(token) {
                    authService.refresh(function (res) {
                            setToken(res.token);
                        }, function () {
                            setToken(null);
                        });
                }
            }
        }

        if(!$rootScope.tokenRefreshPromise) {
            $rootScope.tokenRefreshPromise = $interval(refreshToken, 60000); // refresh the token every minute
        }

/*
        $scope.$on('$destroy', function() {
            if($rootScope.tokenRefreshPromise) {
                $interval.cancel($rootScope.tokenRefreshPromise);
                delete $rootScope.tokenRefreshPromise;
            }
        });
*/

        $scope.signin = function () {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            authService.signin(formData, successAuth, function () {
                $rootScope.error = 'Invalid credentials.';
            })
        };

        $scope.signup = function () {
            var formData = {
                name: $scope.name,
                email: $scope.email,
                password: $scope.password,
                password_confirmation: $scope.password_confirmation
            };

            authService.signup(formData, successAuth, function (res) {
                $rootScope.error = res.error || 'Failed to sign up.';
            })
        };

        $scope.logout = function () {
            authService.logout(successLogout);
        };
    }]);
})();
