;(function() {
  'use strict';

  angular
    .module('app.news')
    .directive('smallArticle', smallArticle);

  smallArticle.$inject = ['$sce', '$state'];

  function smallArticle($sce, $state) {
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
      $scope.goToArticle = function(id) {
        $state.go('article', {id: id});
      };
    }

  }

})();
