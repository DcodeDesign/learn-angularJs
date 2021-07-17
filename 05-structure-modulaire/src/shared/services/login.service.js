'use strict';

function LoginSvc($rootScope, $http, $location, $localStorage, $interval){

  function login(username, password, callback) {
    $http.post('http://localhost:3000/api/auth/signin', {email: username, password: password})
        .catch(function(error) {
          if(error) {
            return false;
          }
        }).then(function (response) {
          if (response) {
            console.log('successful login')
            // store username and token in local storage to keep user logged in between page refreshes
            $localStorage.currentUser = {email: username, token: response.data};

            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data;

            // execute callback with true to indicate successful login
            callback(true);
          } else {
            console.log('failed login')
            // execute callback with false to indicate failed login
            callback(false);
          }
        });
  }

  function logout() {
    // remove user from local storage and clear http auth header
    delete $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = '';
  }

  return {
    login: login,
    logout: logout
  }

}

const serviceConfig = [
  '$rootScope',
  '$http',
  '$location',
  '$localStorage',
  '$interval',
  LoginSvc
]

angular.module('app')
  .factory('LoginSvc', serviceConfig)

module.exports = {
  name: 'LoginSvc',
  factory: serviceConfig
}

