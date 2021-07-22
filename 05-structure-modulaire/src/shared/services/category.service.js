'use strict';

function CategorySvc($http){

    function createCategory(titre, callback) {
        $http.post(process.env.API_HOST + '/category/create', {titre: titre})
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
        $http.get(process.env.API_HOST + '/category/getAll')
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
    CategorySvc
]

angular.module(process.env.ROOT)
    .factory('CategorySvc', serviceConfig)

module.exports = {
    name: 'CategorySvc',
    factory: serviceConfig
}

