;(function() {
  'use strict';

  angular
    .module('app.core', [
      /* Angular Modules*/
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      /* Cross-app Modules*/
      'blocks.exception',
      'blocks.logger',
      'blocks.router',
      /* 3rd Party Modules*/
      'angularMoment',
      'lbServices',
      'LocalForageModule',
      'ngMdIcons',
      'permission',
      'ui.materialize',
      'ui.router'
    ]);

})();
