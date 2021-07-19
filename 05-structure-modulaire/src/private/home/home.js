'use strict';
const angular = require('angular');
const marked = require("marked");
require('./home.css')

function homeCtrl($scope, $http, NoteSvc) {
    console.log($scope, $http, NoteSvc)

    initController();

    function initController() {
        $scope.loading = false;
        $scope.loadingNotes = false;
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
            } else {
                $scope.error = 'Error';
                $scope.loading = false;

            }
        });

    }

}

const stateConfig = {
    name: 'home',
    url: '/home',
    templateUrl: require('./home.html'),
    controller: 'homeCtrl'
};

homeCtrl.$inject = [
    '$scope',
    '$http',
    'NoteSvc'
]

function routeConfig($stateProvider) {
    $stateProvider.state(stateConfig)
}

angular.module('app')
    .controller('homeCtrl', homeCtrl)
    .config(['$stateProvider', routeConfig])

module.exports = stateConfig;
