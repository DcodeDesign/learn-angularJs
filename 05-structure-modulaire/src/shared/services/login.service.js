'use strict';

function LoginSvc($rootScope, $http, $location, $localStorage) {

    function login(username, password, callback) {
        $http.post(process.env.API_HOST + '/auth/signin', {email: username, password: password})
            .catch(function (error) {
                if (error) {
                    return false;
                }
            }).then(function (response) {
            if (response) {
                console.log('successful login')
                $localStorage.currentUser = {email: username, token: response.data};
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data;
                callback(true);
            } else {
                console.log('failed login')
                callback(false);
            }
        }).catch(function (error) {
            if (error) {
                console.log(error)
            }
        });
    }

    function logout() {
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

angular.module(process.env.ROOT)
    .factory('LoginSvc', serviceConfig)

module.exports = {
    name: 'LoginSvc',
    factory: serviceConfig
}

