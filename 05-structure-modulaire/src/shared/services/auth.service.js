export function refreshToken($rootScope, $http, $location, $localStorage, $interval) {

    const interval = $interval(function () {
        console.log($localStorage.currentUser)
        if ($localStorage.currentUser) {
            $http({
                method: 'GET',
                url: process.env.API_HOST + '/auth/refresh-token',
                headers: {
                    'Authorization': `Bearer ${$localStorage.currentUser.token}`
                }
            }).catch(
                (error) => {
                    if(error){
                        return false
                    }
                }).then(function (resp) {
                if(resp){
                    console.log('resp', resp);
                    $localStorage.currentUser = { email: $localStorage.currentUser.email , token: resp.data };
                    $http.defaults.headers.common.Authorization = 'Bearer ' + resp.data;
                } else {
                    $location.path('/login');
                }

            })
        } else{
            $location.path('/login');
        }
    }, 1100000);
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
