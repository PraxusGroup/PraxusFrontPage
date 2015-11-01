;(function() {
  'use strict';

  angular
    .module('app', [
      'ngAnimate',
      'ngMdIcons',
      'ui.router',
      'ui.materialize',
      'angular-redactor',
      'ngReadingTime',
      'LocalForageModule',
      'app.nav',
      'app.news',
      'app.forum'
    ]);

})();
