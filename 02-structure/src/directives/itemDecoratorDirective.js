'use strict';

app.directive('decorateItem', function() {
    return {
        templateUrl: './src/views/item/directive/decorator.html',
        restrict: 'E'
    };
});
