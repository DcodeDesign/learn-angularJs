import decorator from '../views/item/directive/decorator.html'
export default {
    name: 'decorateItem',
    directive: function() {
        return {
            template: decorator,
            restrict: 'E'
        };
    }
}
