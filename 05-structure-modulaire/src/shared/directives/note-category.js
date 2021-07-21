'use strict';
require('./note-category.css')

function noteCategory() {

    return {
        restrict: 'A',
        scope: { },
        templateUrl: require('./note-category.html'),
        link: function(scope, element, attrs, controller, transcludeFn){
            initController();

            function initController() {

            }

        }
    }
}

angular.module('app')
    .directive('noteCategory', [noteCategory])

module.exports = {
    name: 'noteCategory',
    directive: noteCategory
}

