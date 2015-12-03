;(function() {
  'use strict';

  angular
    .module('app.portal')
    .config(AppConfig);

  /* @ngInject */
  function AppConfig($stateProvider) {

    $stateProvider
      .state({
        name: 'portal',
        url: '/portal',
        title: 'Praxus Front Page',
        views: {
          'main@': {
            templateUrl: 'app/portal/portal.html',
            controller: 'PortalController',
            controllerAs: 'vm'
          },
          'sidebar@': {
            controller: 'MainSidebarController',
            controllerAs: 'vm',
            templateUrl: 'app/layout/main.sidebar.html'
          }
        }
      });
  }

})();
