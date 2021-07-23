angular.module('app')
    .component('home', {
        template: '<h1>Home</h1><p>Hello, {{ $ctrl.user.name }} !</p>',
        controller: function() {
            this.user = {name: 'world'};
        }
    }).config(['$stateProvider',function($stateProvider) {
    $stateProvider.state('/test', {
        template: '<home></home>',
        name: 'home',
        url: '/test'
    });
}]);
