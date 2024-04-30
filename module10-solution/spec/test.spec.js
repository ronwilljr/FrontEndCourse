describe('The menu service', function () {
    'use strict';
    var $httpBackend;
    var menuService;
    var ApiPath;
    var testData = {
        description: "chunks of chicken, breaded and deep-fried with a sesame seed sauce",
        name: "Sesame Chicken",
        price_large: 13.95,
        short_name: "D3"
    };
    beforeEach(function () {
      module('common');
      inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        menuService = $injector.get('MenuService');
        ApiPath = $injector.get('ApiPath');
      });
    });
    it('should retrieve D3', function() {
      $httpBackend.expectGET(ApiPath + '/menu_items/D/menu_items/3.json').respond(testData);
      menuService.getMenuItem('D4').then(function(item) {
        console.log('item: ')
        console.log(item.short_name)
        console.log('testData: ')
        console.log(testData.short_name)
        expect(item).toEqual(testData);
      });
      $httpBackend.flush();
    });
    it('should fail to retrieve D3', function() {
      $httpBackend.expectGET(ApiPath + '/menu_items/NULL/menu_items/NaN.json').respond(null);
      menuService.getMenuItem('null').then(function(item) {
        console.log('item: ')
        console.log(item)
        expect(item).toEqual('null');
      });
      $httpBackend.flush();
    });
});