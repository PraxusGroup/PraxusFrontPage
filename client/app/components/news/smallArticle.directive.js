;(function() {
  'use strict';

  angular
    .module('app.news')
    .directive('smallArticle', smallArticle);

  smallArticle.$inject = ['$sce'];

  function smallArticle($sce) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/components/news/smallArticle.html',
      scope: {
        story: '='
      },
      controller: controller
    };

    return directive;

    function controller($scope) {
      $scope.story.content = $sce.trustAsHtml($scope.story.content);
    }

  }

})();
