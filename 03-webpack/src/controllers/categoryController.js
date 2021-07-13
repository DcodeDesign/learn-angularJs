'use strict';

export default {
    name: 'categoryList',
    controller: function ($scope, categoryProvider) {
        $scope.categories = categoryProvider.getCategories();
    }
}
