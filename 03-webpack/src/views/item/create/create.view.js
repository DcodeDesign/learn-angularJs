import angular from 'angular';
import template from './create.html';

import itemsProvider from "../../../services/itemProvider";
import categoryProvider from "../../../services/categoryProvider";

export default angular
    .module('create.view', [])
    .service(itemsProvider.name, itemsProvider.service)
    .service(categoryProvider.name, categoryProvider.service)
    .component('create', {
        template,
        controller: [
            itemsProvider.name,
            categoryProvider.name,
            function (itemsProvider, categoriesProvider) {
                const ctrl = this;

                ctrl.items = itemsProvider.getItems();
                ctrl.categories = categoriesProvider.getCategories();

                ctrl.createItem = function (item) {
                    ctrl.items = itemsProvider.create(item);
                }
            }]
    })
    .name;

