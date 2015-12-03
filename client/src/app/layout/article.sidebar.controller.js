;(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ArticleNavController', ArticleNavController);

  /* @ngInject */
  function ArticleNavController($rootScope){
    $rootScope.paddingClass = 'added-nav-padding';
  }

})();
