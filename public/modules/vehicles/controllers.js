(function () {
    'use strict';

    angular.module('vehicles').
    controller('VehiclesController', ['$rootScope', '$scope', '$location', 'VehiclesService', '$routeParams',
            function ($rootScope, $scope, $location, vehiclesService, $routeParams) {

        if($routeParams && $routeParams.id) {
            $scope.vehicle = {id: $routeParams.id}; // TODO: Load from db/cache
        }
    }]);
})();
