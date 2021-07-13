import angular from 'angular';
import config from '../config/config';

import itemsListView from './item/list/items.view';
import itemsCreateView from './item/create/create.view';
import categoriesListView from './category/list/categories.view';

export default angular
    .module(`${config.appName}.views`, [
        itemsListView,
        itemsCreateView,
        categoriesListView
    ])
    .name;
