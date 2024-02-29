(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.input = "";
        $scope.message = "Please enter data first";
        $scope.CheckSize = function () {
            if ($scope.input.length > 0) {
                $scope.message = ProcessInput($scope.input);
            } else {
                $scope.message = "Please enter data first";
            }
        };
        function ProcessInput(input) {
            var items = input.split(',');
            var filteredItems = items.filter(function (item) {
                return item.split(' ').join('') != '';
            });
            if (filteredItems.length < 4) {
                return "Enjoy!";
            } else {
                return "Too Much!";
            }
        }
    }
})();