;(function() {
  'use strict';

  angular
    .module('app.news')
    .directive('smallArticle', smallArticle);

  smallArticle.$inject = [];

  function smallArticle() {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/components/news/smallArticle.html'
    };

    return directive;

  }

})();
