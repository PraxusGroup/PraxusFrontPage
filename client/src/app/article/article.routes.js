;(function() {
  'use strict';

  angular
    .module('app.article')
    .config(AppConfig);

  /* @ngInject */
  function AppConfig($stateProvider) {

    $stateProvider
      .state({
        name: 'portal.article',
        url: '/article/{id}',
        bodyColor: '#fff',
        title: 'Praxus - Reading A Book',
        views: {
          'main@': {
            templateUrl: 'app/article/article.html',
            controller: 'ArticleController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();
