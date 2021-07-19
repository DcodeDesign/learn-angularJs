const angular = require('angular');

function accountCtrl ($scope, $http) {

    $scope.navBar = require('../../shared/includes/navbar.html')

    initController();

    function initController() {
        $http.get('http://localhost:3000/api/user/current')
            .then(function (response) {
                $scope.name = response.data.name;
                $scope.email = response.data.email
            });
    }
}

const stateConfig = {
    name: 'account',
    url: '/account',
    templateUrl: require('./account.html'),
    controller: 'accountCtrl'
};

accountCtrl.$inject = [
    '$scope',
    '$http'
]

function routeConfig($stateProvider) {
    $stateProvider.state(stateConfig)
}

angular.module('app')
    .controller('accountCtrl', accountCtrl)
    .config([ '$stateProvider', routeConfig ])

module.exports = stateConfig;
