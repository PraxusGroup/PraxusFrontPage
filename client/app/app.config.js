;(function() {
  'use strict';

  angular
    .module('app')
    .config(AppConfig);

  AppConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function AppConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state({
        name: 'main',
        url: '/main',
        title: 'Praxus Front Page',
        views: {
          main: {
            templateUrl: 'app/views/main/main.html',
            controller: 'MainController',
            controllerAs: 'vm'
          },
          sideNav: {
            templateUrl: 'app/views/sideNav/main.sideNav.html'
          }
        }
      })
      .state({
        name: 'admin',
        title: 'Praxus Admin Panel',
        url: '/admin',
        views: {
          main: {
            templateUrl: 'app/views/admin/admin.html',
            controller: 'AdminController',
            controllerAs: 'vm'
          },
          sideNav: {
            templateUrl: 'app/views/sideNav/admin.sideNav.html'
          }
        }
      });

    $urlRouterProvider.otherwise('main');

  }

})();
