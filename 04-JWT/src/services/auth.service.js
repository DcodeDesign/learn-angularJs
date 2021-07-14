export function signin($http, $localStorage) {
    let service = {};

    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(username, password, callback) {
        $http.post('http://localhost:3000/api/auth/signin', {email: username, password: password})
            .then(function (response) {
                // login successful if there's a token in the response
                if (response.data) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = {email: username, token: response.data};

                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data;

                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    // execute callback with false to indicate failed login
                    callback(false);
                }
            });
    }

    function Logout() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }
}

export function refreshToken($rootScope, $http, $location, $localStorage, $interval) {

    $interval(function () {
        if ($localStorage.currentUser) {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/auth/refresh-token',
                headers: {
                    'Authorization': `Bearer ${$localStorage.currentUser.token}`
                }
            }).then(function (resp) {
                $localStorage.currentUser = { email: $localStorage.currentUser.email , token: resp.data };
                $http.defaults.headers.common.Authorization = 'Bearer ' + resp.data;
            })
        }
    }, 4000);
}

export function refreshPage( $http,$localStorage) {
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }
}

export function redirect($rootScope, $location, $localStorage) {
    $rootScope.$on('$locationChangeStart', function () {
        let publicPages = ['/login'];
        let restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    })
}
