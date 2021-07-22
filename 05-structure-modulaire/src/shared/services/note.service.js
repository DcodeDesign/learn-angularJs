'use strict';

function NoteSvc($rootScope, $http){

    function createNote(titre, note, cat_id, callback) {
        console.log(titre, note, cat_id)
        $http.post(process.env.API_HOST + '/note/create', {titre: titre, note: note, cat: cat_id})
            .catch(function(error) {
                if(error) {
                    return false;
                }
            }).then(function (response) {
            if (response) {
                console.log('successful')
                callback(response);
            } else {
                console.log('failed')
                callback(false);
            }
        });
    }

    function getCatNotes(cat_id, callback) {
        $http.get(process.env.API_HOST + '/note/getAllByCategory/' + cat_id)
            .catch(function(error) {
                if(error) {
                    return false;
                }
            }).then(function (response) {
            if (response) {
                console.log('successful')
                callback(response);
            } else {
                console.log('failed')
                callback(response);
            }
        });
    }

    function getAllNotes(callback) {
        $http.get(process.env.API_HOST + '/note/getAll')
            .then(function (response) {
                callback(response)
            });
    }

    function getOneNote(note_id, callback) {
        $http.get(process.env.API_HOST + '/note/getOne/' + note_id)
            .then(function (response) {
                console.log(response);
                callback(response);
            });
    }

    return {
        createNote: createNote,
        getAllNotes: getAllNotes,
        getCatNotes: getCatNotes,
        getOneNote: getOneNote
    }

}

const serviceConfig = [
    '$rootScope',
    '$http',
    NoteSvc
]

angular.module(process.env.ROOT)
    .factory('NoteSvc', serviceConfig)

module.exports = {
    name: 'NoteSvc',
    factory: serviceConfig
}

