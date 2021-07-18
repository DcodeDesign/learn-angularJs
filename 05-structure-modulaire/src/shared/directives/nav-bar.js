'use strict';

function navBar($state, LoginSvc) {

  return {
    restrict: 'A',
    scope: {

    },
    templateUrl: require('./nav-bar.html'),
    link: function(scope, element, attrs, controller, transcludeFn){
      scope.title = 'app'
      scope.signout = function (){
        LoginSvc.logout()
        $state.go('login')
      }
    }
  }
}

angular.module('app')
    .directive('navBar', ['$state' ,'LoginSvc', navBar])

module.exports = {
    name: 'navBar',
    directive: navBar
}

