'use strict';

function NoteSvc($http){

    function createNote(titre, note, callback) {
        $http.post('http://localhost:3000/api/note/create', {titre: titre, note: note})
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

    function getAllNotes(callback) {
        $http.get('http://localhost:3000/api/note/getAll')
            .then(function (response) {
                callback(response)
            });
    }

    return {
        createNote: createNote,
        getAllNotes: getAllNotes
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

