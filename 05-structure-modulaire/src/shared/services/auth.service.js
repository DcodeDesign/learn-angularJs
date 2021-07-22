export function refreshToken($rootScope, $http, $location, $localStorage, $interval) {

    $interval(function () {
        if ($localStorage.currentUser) {
            $http({
                method: 'GET',
                url: process.env.API_HOST + '/auth/refresh-token',
                headers: {
                    'Authorization': `Bearer ${$localStorage.currentUser.token}`
                }
            }).then(function (resp) {
                console.log('resp', resp);
                $localStorage.currentUser = { email: $localStorage.currentUser.email , token: resp.data };
                $http.defaults.headers.common.Authorization = 'Bearer ' + resp.data;
            })
        }
    }, 1200000);
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
