import angular from 'angular';
import config from '../config/config';

import navigation from './navigation/navigation.component';

export default angular
  .module(`${config.appName}.component`, [
    navigation
  ])
  .name;
