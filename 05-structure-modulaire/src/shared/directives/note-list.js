'use strict';
require('./note-list.css')

function NoteListCtrl($scope, NoteSvc) {
    initController();

    $scope.$on('myEvent', function(event, message){
        console.log(' NoteListCtrl myEvent');
        getAllNotes();
    })

    function initController() {
        $scope.loadingNotes = false;
        $scope.notes = []
        getAllNotes();
    }

    /*function onChange() {
        console.log('refresh')
        getAllNotes();
    }

    $scope.$watch('out', onChange);*/

    function getAllNotes() {
        $scope.loadingNotes = true;
        NoteSvc.getAllNotes(function (result) {
            console.log(result)
            if (result) {
                $scope.notes = result.data;
                $scope.loadingNotes = false;
            } else {
                $scope.error = 'Error';
                $scope.loadingNotes = false;
            }
        });
    }
}

function noteList(NoteSvc) {
    return {
        restrict: 'A',
        templateUrl: require('./note-list.html'),
    }
}

angular.module('app')
    .controller('NoteListCtrl', ['$rootScope', 'NoteSvc', NoteListCtrl])
    .directive('noteList', ['NoteSvc', noteList])

module.exports = {
    name: 'noteList',
    directive: noteList
}

