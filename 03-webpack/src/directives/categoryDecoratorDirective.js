import decorator from '../views/category/directive/decorator.html'
export default {
    name: 'decorateCategory',
    directive: function ()  {
        return {
            template: decorator,
            restrict: 'A'
        };
    }
}
