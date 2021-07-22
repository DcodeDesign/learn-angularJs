'use strict';
const angular = require('angular');

require('./login.css')

function loginCtrl($scope, $localStorage, $location,LoginSvc) {

    $scope.login = login;
    $scope.error = null;
    $scope.loading = false;

    initController();

    function initController() {
        LoginSvc.logout();
    }

    function login() {
        $scope.loading = true;
        LoginSvc.login($scope.email, $scope.password, function (result) {
            if (result === true) {
                $location.path('/');
            } else {
                $scope.error = 'Username or password is incorrect';
                $scope.loading = false;

            }
        });
    }
}

var stateConfig = {
    name: 'login',
    url: '/login',
    templateUrl: require('./login.html'),
    controller: 'loginCtrl'
};

loginCtrl.$inject = [
    '$scope',
    '$localStorage',
    '$location',
    'LoginSvc'
]

function routeConfig($stateProvider) {
    $stateProvider.state(stateConfig)
}

angular.module(process.env.ROOT)
    .controller('loginCtrl', loginCtrl)
    .config(['$stateProvider', routeConfig])

module.exports = stateConfig;
