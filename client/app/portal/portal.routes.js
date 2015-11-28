;(function() {
  'use strict';

  angular
    .module('app.portal')
    .config(AppConfig);

  AppConfig.$inject = ['$stateProvider'];

  function AppConfig($stateProvider) {

    $stateProvider
      .state({
        name: 'portal',
        url: '/portal',
        title: 'Praxus Front Page',
        views: {
          main: {
            templateUrl: 'app/portal/portal.html',
            controller: 'portalController',
            controllerAs: 'vm'
          },
          sideNav: {
            templateUrl: 'app/layout/main.sidebar.html'
          }
        }
      });
  }

})();
