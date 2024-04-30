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
        num += shortName.charAt(i)
      }
    }
    temp = parseInt(num) - 1
    num = temp.toString();
    if (temp === 0) {
      imgNum += "";
    }
    else {
      imgNum = num
    }
   
    endPath = `/menu_items/${category.toUpperCase()}/menu_items/${num}.json`
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
          imageData: directories.imgData,
          responseData: response.data
        };
        return data;
      });
    }
  }
})();
