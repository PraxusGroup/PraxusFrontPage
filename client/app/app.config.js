;(function() {
  'use strict';

  angular
    .module('app')
    .config(AppConfig);

  AppConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function AppConfig($stateProvider, $urlRouterProvider) {

    var adminViews = {
      main: {
        templateUrl: 'app/views/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'vm'
      },
      sideNav: {
        templateUrl: 'app/views/sideNav/admin.sideNav.html',
        controller: 'AdminNavController',
        controllerAs: 'vm'
      },
      list: {
        templateUrl: 'app/views/admin/list.html',
        controller: 'AdminListController',
        controllerAs: 'vm'
      },
      create: {
        templateUrl: 'app/views/admin/create.html',
        controller: 'AdminCreateController',
        controllerAs: 'vm'
      },
      edit: {
        templateUrl: 'app/views/admin/edit.html',
        controller: 'AdminEditController',
        controllerAs: 'vm'
      }
    };

    var adminPermissions = {
      permissions: {
        only: ['admin', 'mod'],
        redirectTo: 'main'
      }
    };

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
        name: 'articleMock',
        url: '/article',
        bodyColor: '#fff',
        title: 'Praxus - Reading A Book',
        views: {
          main: {
            templateUrl: 'app/views/article/article.html',
            controller: 'ArticleController',
            controllerAs: 'vm'
          },
          sideNav: {
            templateUrl: 'app/views/sideNav/main.sideNav.html'
          }
        }
      })
      .state({
        name: 'article',
        url: '/article/{id}',
        bodyColor: '#fff',
        title: 'Praxus - Reading A Book',
        views: {
          main: {
            templateUrl: 'app/views/article/article.html',
            controller: 'ArticleController',
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
        data: adminPermissions,
        views: {
          main: adminViews.main,
          sideNav: adminViews.sideNav
        }
      })
      .state({
        name: 'adminArticlesList',
        title: 'Praxus Admin Panel - Articles List',
        url: '/admin/articles/list',
        data: adminPermissions,
        views: {
          main: adminViews.list,
          sideNav: adminViews.sideNav
        }
      })
      .state({
        name: 'adminArticlesCreate',
        title: 'Praxus Admin Panel - Articles Create',
        url: '/admin/articles/create',
        data: adminPermissions,
        views: {
          main: adminViews.create,
          sideNav: adminViews.sideNav
        }
      })
      .state({
        name: 'adminArticlesEdit',
        title: 'Praxus Admin Panel - Edit Article',
        url: '/admin/articles/{id}',
        data: adminPermissions,
        views: {
          main: adminViews.edit,
          sideNav: adminViews.sideNav
        }
      });

    $urlRouterProvider.otherwise( function($injector) {
      var $state = $injector.get('$state');
      $state.go('main');
    });

  }

})();
