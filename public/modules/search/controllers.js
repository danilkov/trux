(function () {
    'use strict';

    angular.module('search').
    controller('SearchController', ['$rootScope', '$scope', '$location', 'SearchService',
            function ($rootScope, $scope, $location, searchService) {
        function searchSuccess(res) {
            if(res && res.items) { // TODO: verify if it's an array
                $scope.items = res.items;
                sessionStorage.items = items;
            }
        }

        $scope.search = function() {
            var formData = {
                type: $scope.type,
                feature1: $scope.feature1
            };
            searchService.search(formData, searchSuccess, function () {
                $rootScope.error = 'Search failed';
            })
        };

        $scope.advancedSearch = function() {
            if($rootScope.getToken() == null) {
                $rootScope.error = 'Access denied';
                return;
            }
            var formData = {
                type: $scope.type,
                feature1: $scope.feature1,
                feature2: $scope.feature2,
                feature3: $scope.feature3
            };

            searchService.advancedSearch(formData, searchSuccess, function (res) {
                $rootScope.error = res.error || 'Failed to sign up.';
            })
        };
        $scope.viewDetails = function(id) {
            $location.path("/details/" + id);
        };

        $scope.items = sessionStorage.items;
    }]);
})();
