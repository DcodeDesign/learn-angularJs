'use strict';
import angular from 'angular';
import '@uirouter/angularjs';
import 'ngstorage';
import 'angular-messages';

import {signin, refreshToken, refreshPage, redirect} from './services/auth.service';
import routes from './routes/routes';

import 'jquery';
import '@popperjs/core';
import 'bootstrap';
import './app.scss'

angular
    .module('app', ['ui.router', 'ngMessages', 'ngStorage'])
    .service('$authService', ['$http', '$localStorage', signin])
    .config(['$stateProvider', '$urlRouterProvider',routes])
    .run(['$rootScope', '$http', '$location', '$localStorage', '$interval', refreshToken])
    .run(['$http', '$localStorage', refreshPage])
    .run(['$rootScope', '$location', '$localStorage', redirect]);
