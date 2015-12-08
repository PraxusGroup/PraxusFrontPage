;(function() {
  'use strict';

  angular
    .module('app.core')
    .config(AppConfig);

  /* @ngInject */
  function AppConfig($windowProvider, $cookiesProvider, $locationProvider, $urlRouterProvider) {

    var hostname = $windowProvider.$get().location.hostname;

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');
      $state.go('portal');
    });

    if (hostname !== 'localhost') {
      $cookiesProvider.defaults = {
       domain: '.praxusgroup.com',
       secure: true
      };
    }

  }

})();
