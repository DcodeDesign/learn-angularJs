'use strict';

const app = angular.module("app", [/* dependencies */])
.controller("myController", ($scope) => { 
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.items = [
        {'name' : 'Toto', 'age' : 18, 'sexe' : 'garçon'},
        {'name' : 'Tata', 'age' : 25, 'sexe' : 'fille'}
    ]
})
.controller("myController2", ($scope) => {
    $scope.firstName = "Thomas";
    $scope.lastName = "Gravy";
});