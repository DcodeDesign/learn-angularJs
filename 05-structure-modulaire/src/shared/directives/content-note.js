'use strict';
require('./content-note.css')
const marked = require("marked");

function ContentNoteCtrl($scope, NoteSvc) {
    initController();
    $scope.out = 'not modified';
    function initController() {
        $scope.loading = false;

        $scope.createNote = createNote;
        $scope.previewMarkDown = previewMarkDown;
        $scope.notes = []

        $scope.change=function($event){
            $scope.html = marked($event.target.value);
        };
        getAllNotes();
    }

    function previewMarkDown (value) {
        return marked(value)
    }

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

    function createNote() {
        $scope.loading = true;
        NoteSvc.createNote($scope.titre, $scope.note, function (result) {
            if (result === true) {
                $scope.loading = false;
                getAllNotes()
                emitEvent('test');
            } else {
                $scope.error = 'Error';
                $scope.loading = false;
            }
        });
    }

    function emitEvent(value){
        $scope.$emit('myEvent', {
            emit: value
        })
    }

}

function contentNote() {
    return {
        restrict: 'A',
        templateUrl: require('./content-note.html'),
    }
}

angular.module('app')
    .controller('ContentNoteCtrl', ['$scope', 'NoteSvc', ContentNoteCtrl])
    .directive('contentNote', [ contentNote])

module.exports = {
    name: 'contentNote',
    directive: contentNote
}

