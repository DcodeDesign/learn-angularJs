'use strict';

app.directive('decorateCategory', () => {
    return {
        templateUrl: './src/views/category/directive/decorator.html',
        restrict: 'A'
    };
});
