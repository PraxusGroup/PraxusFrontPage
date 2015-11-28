;(function() {
  'use strict';

  angular
    .module('app.core')
    .config(AppConfig);

  AppConfig.$inject = ['$urlRouterProvider'];

  function AppConfig($urlRouterProvider) {

    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');
      $state.go('main');
    });

  }

})();
