'use strict';
import angular from 'angular';

export default angular.config(
    function ($routeProvider) {
        $routeProvider
            .when('/items', {
            controller: 'itemList',
            templateUrl: './src/views/item/categories.html'
        })
            .when('/items/new', {
            controller: 'itemCreate',
            templateUrl: './src/views/item/create.html'
        })
            .when('/categories', {
            controller: 'categoryList',
            templateUrl: './src/views/category/categories.html'
        });
    }
);
