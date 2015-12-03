;(function() {
  'use strict';

  angular
    .module('app.core')
    .config(AppConfig);

  /* @ngInject */
  function AppConfig($locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');
      $state.go('portal');
    });

  }

})();
