(function () {
    "use strict";

    angular.module('public')
      .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['user'];
    function MyInfoController(user) {
      var $ctrl = this;
      $ctrl.signedUp = false;
      if (user) {
        $ctrl.firstName = user.firstName;
        $ctrl.lastName = user.lastName;
        $ctrl.email = user.email;
        $ctrl.phone = user.phone;
        $ctrl.favoriteDish = user.favoriteDish;
        $ctrl.favoriteMenuItem = user.favoriteMenuItem;
        $ctrl.signedUp = true;
      }
      else {
        $ctrl.signedUp = false;
      }
    }
  })();