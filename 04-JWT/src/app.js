'use strict';
import angular from 'angular';
import '@uirouter/angularjs';
import 'ngstorage';
import 'angular-messages';

import {signin, refreshToken} from './services/auth.service';
import routes from './routes/routes'

angular
    .module('app', ['ui.router', 'ngMessages', 'ngStorage'])
    .service('$authService', ['$http', '$localStorage', signin])
    .config(['$stateProvider', '$urlRouterProvider',routes])
    .run(['$rootScope', '$http', '$location', '$localStorage', '$interval', refreshToken]);
