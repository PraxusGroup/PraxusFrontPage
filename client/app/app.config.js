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
        name: 'article',
        url: '/article',
        title: 'Praxus Front Page',
        views: {
          main: {
            templateUrl: 'app/views/article/article.html',
            controller: 'ArticleController',
            controllerAs: 'vm'
          },
          sideNav: {
            templateUrl: 'app/views/sideNav/article.sideNav.html',
            controller: 'ArticleNavController',
            controllerAs: 'vm'
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
            templateUrl: 'app/views/sideNav/admin.sideNav.html',
            controller: 'AdminNavController',
            controllerAs: 'vm'
          }
        }
      });

    $urlRouterProvider.otherwise('main');

  }

})();
