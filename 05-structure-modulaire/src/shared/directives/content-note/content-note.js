'use strict';
require('./content-note.css')
const marked = require("marked");

function ContentNoteCtrl($scope, $rootScope, NoteSvc) {
    initController();

    function initController() {
        $scope.loadingNotes = false;
        $scope.createNote = createNote;
        $scope.previewMarkDown = previewMarkDown;
        $scope.activeViewNote = false;
        $scope.notes = []

        $scope.change=function($event){
            $scope.html = marked($event.target.value);
        };

        $rootScope.$on('selectedNote', function(event, message){
            console.log('selectedNote', message.emit);
            NoteSvc.getOneNote(message.emit, function (result) {
                console.log(result)
                if (result) {
                    $scope.notes = result.data;
                    $scope.loadingNotes = false;
                    $scope.titre = result.data.titre;
                    $scope.note = result.data.note ;
                    $scope.html = result.data.note ? marked(result.data.note) : '';
                    $scope.activeViewNote = true;
                } else {
                    $scope.error = 'Error';
                    $scope.loadingNotes = false;
                    $scope.activeViewNote = false;
                }
            });

        })
    }

    function previewMarkDown (value) {
        return marked(value)
    }

    function createNote() {
        $scope.loadingNotes = true;
        NoteSvc.createNote($scope.titre, $scope.note, function (result) {
            if (result === true) {
                $scope.loadingNotes = false;
                getAllNotes()
                emitEvent('refresh');
            } else {
                $scope.errorNotes = 'Error';
                $scope.loadingNotes = false;
            }
        });
    }

    function emitEvent(value){
        $scope.$emit('newNote', {
            emit: value
        })
    }

}

function contentNote() {
    return {
        restrict: 'A',
        templateUrl: require('./content-note.html')
    }
}

angular.module(process.env.ROOT)
    .controller('ContentNoteCtrl', ['$scope', '$rootScope', 'NoteSvc', ContentNoteCtrl])
    .directive('contentNote', [ contentNote])

module.exports = {
    name: 'contentNote',
    directive: contentNote
}

