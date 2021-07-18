
import angular from 'angular';
import '@uirouter/angularjs';
import 'ngstorage';
import 'angular-messages';

require('dotenv').config();

// bootstrap and deps
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
require('font-awesome/css/font-awesome.css')
require('popper.js/dist/popper.js');
require('jquery/dist/jquery.js');

function importAll(r) {
  r.keys().forEach(r);
}

import {redirect, refreshPage, refreshToken} from "./shared/services/auth.service";
angular.module('app', ['ui.router', 'ngStorage', 'ngMessages'])
    .config(['$urlRouterProvider', function ($urlRouterProvider){
      $urlRouterProvider.otherwise('/home')
    }])
    .run(['$rootScope', '$http', '$location', '$localStorage', '$interval', refreshToken])
    .run(['$http', '$localStorage', refreshPage])
    .run(['$rootScope', '$location', '$localStorage', redirect]);

importAll(require.context('./shared/services', false, /\.js$/));
importAll(require.context('./shared/filters', false, /\.js$/));
importAll(require.context('./shared/directives', false, /\.js$/))

importAll(require.context('./public/login', false, /.js$/))
importAll(require.context('./private/account', false, /.js$/))
importAll(require.context('./private/home', true, /.js$/))


require('./app.css');
import './index.html';

console.log('test Ready')




