import angular from 'angular';
import template from './categories.html';

import categoryProvider from "../../../services/categoryProvider";
import directive from "../../../directives/categoryDecoratorDirective";

export default angular
    .module('categories.view', [
    ])
    .service(categoryProvider.name, categoryProvider.service)
    .directive(directive.name, directive.directive)
    .component('categories', {
        template,
        controller: [categoryProvider.name, function (categories) {
            const ctrl = this;
            ctrl.categories = categories.getCategories();
        }]
    })
    .name;
