;(function() {
  'use strict';

  angular
    .module('app')
    .controller('ArticleNavController', ArticleNavController);

  ArticleNavController.$inject = ['$rootScope'];

  function ArticleNavController($rootScope){
    $rootScope.paddingClass = 'added-nav-padding';
  }

})();
