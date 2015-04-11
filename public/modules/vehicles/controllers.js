(function () {
    'use strict';

    angular.module('vehicles').
    controller('VehiclesController',
            ['$rootScope', '$scope', 'TokenService', 'VehiclesService', '$routeParams',
            function ($rootScope, $scope, tokenService, vehiclesService, $routeParams) {
        function success(vehicle) {
            $scope.vehicle = vehicle;
        }

        function error(error) {
            $rootScope.error = error.error; // TODO: improve error handling
        }

        if($routeParams && $routeParams.id) {
            if(tokenService.getToken() == null) {
                vehiclesService.preview($routeParams.id, success, error);
            }
            else {
                vehiclesService.get($routeParams.id, success, error);
            }
        }
    }]);
})();
