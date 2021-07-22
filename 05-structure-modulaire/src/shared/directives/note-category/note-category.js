'use strict';
require('./note-category.css')

function NoteCategoryCtrl($scope, CategorySvc) {

    initController()

    function initController() {
        $scope.isActiveCategory = true;
        $scope.category = null;
        $scope.loadingCategory = false;
        $scope.activeCategory = null;
        $scope.loadingCategories = false;
        getAllCategories();
    }

    $scope.activeCreaCat = function () {
        $scope.isActiveCategory = !$scope.isActiveCategory;
    }

    $scope.createCategory = function () {
        $scope.loadingCategory = true;
        CategorySvc.createCategory($scope.category, function (result) {
            if (result === true) {
                $scope.loading = false;
                getAllCategories();
                $scope.activeCreaCat();
                emitEventCat($scope.category)
            } else {
                $scope.errorCategory = 'Error';
                $scope.loadingCategory = false;
            }
        });
    }

    function emitEventCat(value){
        $scope.$emit('newCategory', {
            emit: value
        })
    }

    function getAllCategories() {
        $scope.loadingCategories = true;
        CategorySvc.getAllCategories(function (result) {
            if (result) {
                $scope.categories = result.data;
                $scope.loadingCategories = false;
            } else {
                $scope.errorCategory = 'Error';
                $scope.loadingCategories = false;
            }
        });
    }

    $scope.selectedCategory = function (value) {
        $scope.activeCategory = value;
        emitEvent(value)
    }

    function emitEvent(value){
        $scope.$emit('selectedCategory', {
            emit: value
        })
    }
}

function noteCategory() {
    return {
        restrict: 'A',
        templateUrl: require('./note-category.html')
    }
}

angular.module(process.env.ROOT)
    .controller('NoteCategoryCtrl', ['$scope', 'CategorySvc', NoteCategoryCtrl])
    .directive('noteCategory', [noteCategory])

module.exports = {
    name: 'noteCategory',
    directive: noteCategory
}

