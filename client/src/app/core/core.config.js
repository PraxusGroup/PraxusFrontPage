;(function() {
  'use strict';

  angular
    .module('app.core')
    .config(AppConfig);

  /* @ngInject */
  function AppConfig($cookiesProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');
      $state.go('portal');
    });

    $cookiesProvider.defaults = {
      domain: 'praxusgroup.com'
    };

  }

})();
