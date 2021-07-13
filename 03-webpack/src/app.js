'use strict';
import angular from 'angular';
import config from './config/config';
import views from './views/views.module';
import components from './components/components.module';
import '@uirouter/angularjs';

angular
    .module(config.appName, [
        views,
        components,
        'ui.router'
    ])
    .config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider) => {
        Object.keys(config.stateUrls).forEach(stateKey => {
            $stateProvider.state({
                name: stateKey,
                component: stateKey,
                url: config.stateUrls[stateKey]
            });
        });

        $locationProvider.html5Mode(true);
    }]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [config.appName], {strictDi: true});
});

