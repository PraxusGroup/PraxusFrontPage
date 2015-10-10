;(function() {
  'use strict';

  angular
    .module('app.news')
    .directive('mainArticle', mainArticle);

  mainArticle.$inject = [];

  function mainArticle() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/news/mainArticle.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {

      

    }
  }

})();
