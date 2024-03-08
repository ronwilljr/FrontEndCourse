(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    function ShoppingListCheckOffService() {
        var service = this;
        var boughtItems = [];
        var unboughtItems = 
        [
            {name: "Avocados", quantity: "3", pricePerItem: 2},
            {name: "Tortilla Stacks", quantity: "2", pricePerItem: 3},
            {name: "Chicken Breasts", quantity: "4", pricePerItem: 4},
            {name: "Onions", quantity: "2", pricePerItem: 2},
            {name: "Cilantro Bundles", quantity: "2", pricePerItem: 2}
        ];
        service.buyItem = function (index) {
            var item = unboughtItems[index];
            item = { ...item, totalPrice: item.quantity * item.pricePerItem }
            boughtItems.push(item);
            unboughtItems.splice(index, 1);  
        }
        service.returnBoughtItems = function functionName() {
            return boughtItems;
        }
        service.returnUnboughtItems = function functionName() {
            return unboughtItems;
        }
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var unboughtList = this;
        unboughtList.items = ShoppingListCheckOffService.returnUnboughtItems();
        unboughtList.buyItem = function (index) {
            ShoppingListCheckOffService.buyItem(index);
        }
        unboughtList.empty = function () {
            if (unboughtList.items.length === 0)
                return true;
            return false;
        }
    }
    
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;
        boughtList.items = ShoppingListCheckOffService.returnBoughtItems();
        boughtList.empty = function () {
            if (boughtList.items.length === 0)
                return true;
            return false;
        }
    }
})();