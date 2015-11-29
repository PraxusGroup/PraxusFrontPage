;(function() {
  'use strict';

  angular
    .module('app.admin')
    .config(AppConfig);

  AppConfig.$inject = ['$stateProvider'];

  function AppConfig($stateProvider) {

    var adminPermissions = {
      permissions: {
        only: ['admin', 'mod'],
        redirectTo: 'main'
      }
    };

    $stateProvider
    .state({
      name: 'admin',
      title: 'Praxus Admin Panel',
      url: '/admin',
      views: {
        'main@': {
          templateUrl: 'app/admin/dashboard.html',
          controller: 'AdminDashboardController',
          controllerAs: 'vm'
        },
        'sidebar@': {
          templateUrl: 'app/layout/admin.sidebar.html',
          controller: 'AdminNavController',
          controllerAs: 'vm'
        }
      }
    })
    .state({
      name: 'admin.articlesList',
      parent: 'admin',
      title: 'Praxus Admin Panel - Articles List',
      url: '/articles/list',
      views: {
        'main@': {
          templateUrl: 'app/admin/list.html',
          controller: 'AdminListController',
          controllerAs: 'vm'
        }
      }
    })
    .state({
      name: 'admin.articlesCreate',
      parent: 'admin',
      title: 'Praxus Admin Panel - Articles Create',
      url: '/articles/create',
      views: {
        'main@': {
          templateUrl: 'app/admin/create.html',
          controller: 'AdminCreateController',
          controllerAs: 'vm'
        }
      }
    })
    .state({
      name: 'admin.articlesEdit',
      parent: 'admin',
      title: 'Praxus Admin Panel - Edit Article',
      url: '/articles/{aid}',
      views: {
        'main@': {
          templateUrl: 'app/admin/edit.html',
          controller: 'AdminEditController',
          controllerAs: 'vm'
        }
      }
    });
  }

})();
