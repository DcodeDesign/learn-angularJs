import templateHome from "../views/home/home.view.html";
import controllerHome from "../views/home/home.controller";
import templateLogin from "../views/login/login.view.html";
import controllerLogin from "../views/login/login.controller";
import templateAccount from "../views/account/account.view.html";
import controllerAccount from "../views/account/account.controller";


export default function ($stateProvider, $urlRouterProvider) {
    // default route
    $urlRouterProvider.otherwise("/");

    // app routes
    $stateProvider
        .state('home', {
            url: '/',
            template: templateHome,
            controller: controllerHome,
            controllerAs: 'vm'
        })
        .state('login', {
            url: '/login',
            template: templateLogin,
            controller: ['$location', '$authService',  controllerLogin],
            controllerAs: 'vm'
        })
        .state('account', {
                url: '/account',
                template: templateAccount,
                controller: ['$http', controllerAccount],
                controllerAs: 'vm'
            });
}
