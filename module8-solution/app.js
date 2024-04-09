(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
      .directive('foundItems', FoundItemsDirective);
    function FoundItemsDirective() {
      var directive = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          onRemove: '&',
        }
      }
      return directive;
    }
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var narrowItDown = this;
      narrowItDown.found = [];
      narrowItDown.searchTerm = '';
      narrowItDown.search = function () {
        narrowItDown.found = [];
        if (narrowItDown.searchTerm.trim() != "") {
          var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);
          promise.then(function (result) {
            narrowItDown.found = result;
          })
            .catch(function (error) {
              console.log('Error: ', error);
            });
        }
      }
      narrowItDown.remove = function (index) {
        narrowItDown.found.splice(index, 1);
      }
    }
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var menuSearch = this;
      menuSearch.getMatchedMenuItems = function (searchTerm) {
        var response = $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        });
        return response.then(function (result) {
          var searchItems = [];
          var data = result.data;
          for (var category in data) {
            searchItems.push(data[category].menu_items.filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
          }
          return searchItems.flat();
        });
      };
    }
})();