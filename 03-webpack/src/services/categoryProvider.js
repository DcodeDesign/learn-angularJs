'use strict';

const categories = [
    {'id' : 1, 'name' : 'films'},
    {'id' : 2, 'name' : 'musiques'}
];

export default {
    name: 'categoryProvider',
    service: function () {
        this.getCategories = function () {
            return categories
        }
    }
}
