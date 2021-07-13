'use strict';

export const itemList = {
    name: 'itemList',
    controller: function ($scope,  itemProvider) {
        $scope.items = itemProvider.getItems();
    }
}

export const itemCreate = {
    name: 'itemCreate',
    controller:  function ($scope, categoryProvider, itemProvider)  {
        $scope.categories = categoryProvider.getCategories();
        $scope.items = itemProvider.getItems();

        $scope.createItem = function (item) {
            $scope.items = itemProvider.create(item);
        }
    }
}
