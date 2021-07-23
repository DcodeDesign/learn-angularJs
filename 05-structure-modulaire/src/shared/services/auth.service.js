export function refreshToken($rootScope, $http, $location, $localStorage, $interval) {
    $interval(function () {
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
                        console.log(error)
                        return false
                    }
                }).then(function (resp) {
                if(resp){
                    $localStorage.currentUser = { email: $localStorage.currentUser.email , token: resp.data };
                    $http.defaults.headers.common.Authorization = 'Bearer ' + resp.data;
                } else {
                    $location.path('/login');
                }
            }).catch(function(error) {
                if(error) {
                    $location.path('/login');
                }
            });
        } else{

        }
    }, 900000);
}

export function refreshPage( $http,$localStorage, $location) {
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }else{
        $location.path('/login');
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
