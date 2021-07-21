'use strict';

function NoteSvc($http){

    function createCategory(titre, note, callback) {
        $http.post('http://localhost:3000/api/category/create', {titre: titre, note: note})
            .catch(function(error) {
                if(error) {
                    return false;
                }
            }).then(function (response) {
            if (response) {
                console.log('successful')
                callback(true);
            } else {
                console.log('failed')
                callback(false);
            }
        });
    }

    function getAllCategories(callback) {
        $http.get('http://localhost:3000/api/category/getAll')
            .then(function (response) {
                callback(response)
            });
    }

    return {
        createCategory: createCategory,
        getAllCategories: getAllCategories
    }

}

const serviceConfig = [
    '$http',
    NoteSvc
]

angular.module('app')
    .factory('NoteSvc', serviceConfig)

module.exports = {
    name: 'NoteSvc',
    factory: serviceConfig
}

