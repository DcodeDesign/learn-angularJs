import angular from 'angular';
import template from './items.html';

import directive from '../../../directives/itemDecoratorDirective';
import itemsProvider from "../../../services/itemProvider";

export default angular
    .module('items.view', [
    ])
    .service(itemsProvider.name, itemsProvider.service)
    .directive(directive.name, directive.directive)
    .component('items', {
        template,
        controller: [itemsProvider.name, function (items) {
            const ctrl = this;
            ctrl.items = items.getItems();
        }]
    })
    .name;

