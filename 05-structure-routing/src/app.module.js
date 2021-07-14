import angular from 'angular'
import uirouter from 'angular-ui-router'

import routes from './app.routes'
import publicModule  from './public/public.module.js'

angular.module('app', [uirouter, 'ng',  publicModule ])
    .config(routes)
