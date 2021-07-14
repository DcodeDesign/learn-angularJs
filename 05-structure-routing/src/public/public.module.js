import angular from 'angular'
import uirouter from 'angular-ui-router'
import routes from './public.route'

export default angular.module('publicModule', [uirouter])
    .config(routes)

