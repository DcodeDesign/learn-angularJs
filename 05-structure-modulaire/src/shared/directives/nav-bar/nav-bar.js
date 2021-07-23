'use strict';
require('./nav-bar.css')

function navBar($state, LoginSvc) {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: require('./nav-bar.html'),
    link: function(scope){
      scope.title =  'app';
      scope.signout = function (){
        LoginSvc.logout()
        $state.go('login')
      }
    }
  }
}

angular.module(process.env.ROOT)
    .directive('navBar', ['$state' ,'LoginSvc', navBar])

module.exports = {
    name: 'navBar',
    directive: navBar
}

