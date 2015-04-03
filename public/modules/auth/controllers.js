(function () {
    'use strict';

    angular.module('auth').
    controller('AuthController', ['$rootScope', '$scope', 'AuthService', 
            function ($rootScope, $scope, authService) {
        function successAuth(res) {
            if($rootScope.setToken) {
                $rootScope.setToken(res.token);
            }
            window.location = "/";
        }

        function successLogout() {
            if($rootScope.setToken) {
                $rootScope.setToken(null);
            }
            window.location = "/";
        }

        $scope.signin = function () {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            authService.signin(formData, successAuth, function () {
                $rootScope.error = 'Invalid credentials.';
            })
        }

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
        }

        $scope.logout = function () {
            authService.logout(successLogout);
        }
    }]);
})();
