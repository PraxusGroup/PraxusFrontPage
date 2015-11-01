;(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  AppController.$inject = ['$rootScope', '$state', '$timeout'];

  function AppController($rootScope, $state, $timeout){
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeSuccess', generateMenu);

    function generateMenu(event, toState){
      $rootScope.bodyColor = toState.bodyColor || '#e2e4e5';
    }
  }

})();
