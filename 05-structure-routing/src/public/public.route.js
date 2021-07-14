routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('pub', {
            url: '/login',
            template: require('./public.view.html')
        });
}
