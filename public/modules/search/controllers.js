(function () {
    'use strict';

    var items = [];

    angular.module('search').
    controller('SearchController', ['$rootScope', '$scope', '$location', 'SearchService', 'TokenService',
            function ($rootScope, $scope, $location, searchService, tokenService) {
        function searchSuccess(res) {
            if(res && res.items) { // TODO: verify if it's an array
                $scope.items = res.items;
                items = res.items;
            }
        }

        function searchFailed() {
            $rootScope.error = 'Search failed';
            items = [];
            $scope.items = items;
        }

        $scope.search = function() {
            var formData = {
                type: $scope.type,
                feature1: $scope.feature1
            };
            searchService.search(formData, searchSuccess, searchFailed);
        };

        $scope.advancedSearch = function() {
            if(tokenService.getToken() == null) {
                $rootScope.error = 'Access denied';
                return;
            }
            var formData = {
                type: $scope.type,
                feature1: $scope.feature1,
                feature2: $scope.feature2,
                feature3: $scope.feature3
            };

            searchService.advancedSearch(formData, searchSuccess, searchFailed);
        };
        $scope.viewDetails = function(id) {
            $location.path("/details/" + id);
        };

        $scope.items = items;
    }]);
})();
