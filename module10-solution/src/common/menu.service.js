(function () {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);

  function shortNameDirectoryBuilder(shortName) {
    var category = '';
    var num = '';
    var endPath = '';
    var temp = -1;
    var imgNum = '';
    for (var i = 0; i < shortName.length; i++) {
      if (isNaN(shortName.charAt(i))) {
        category += shortName.charAt(i);
      }
      else {
        temp = parseInt(shortName.charAt(i)) - 1
        if (temp === 0) {
          imgNum += "";
        }
        else {
          num += temp.toString();
          imgNum = num
        }
      }
    }
    endPath = `/menu_items/${category.toUpperCase()}/menu_items/${num}.json`
    console.log(endPath)
    return { 
      directory: endPath, 
      imgData: [category, imgNum]
    };
  }

  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;

    service.getMenuItem = function (shortName) {
      const directories = shortNameDirectoryBuilder(shortName);
      return $http.get(ApiPath + directories.directory).then(function (response) {
        var data = {
          ...response.data,
          imageData: directories.imgData
        };
        return data;
      });
    }
  }
})();
