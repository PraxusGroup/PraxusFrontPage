;(function() {
  'use strict';

  angular
    .module('app', [
      'ngAnimate',
      'ngMdIcons',
      'ngCookies',
      'ui.router',
      'ui.materialize',
      'angular-redactor',
      'ngReadingTime',
      'ngFileUpload',
      'lbServices',
      'LocalForageModule',
      'app.nav',
      'app.news',
      'app.forum'
    ]);

})();
